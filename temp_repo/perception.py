import cv2
import numpy as np
import torch
from ultralytics import YOLO
from transformers import AutoImageProcessor, Mask2FormerForUniversalSegmentation, pipeline
from PIL import Image

class PerceptionSystem:
    def __init__(self):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        print(f"🖥️ 运行环境: {self.device}")
        
        # 1. Depth Anything V2 (极致实时 + FP16 加速)
        self.depth_pipe = pipeline("depth-estimation", model="depth-anything/Depth-Anything-V2-Small-hf", torch_dtype=torch.float16, device=0 if self.device=="cuda" else -1)
        
        # 2. Mask2Former (ADE20K 语义全场景分割 - 支持室内外 150 类)
        self.seg_processor = AutoImageProcessor.from_pretrained("facebook/mask2former-swin-tiny-ade-semantic")
        self.seg_model = Mask2FormerForUniversalSegmentation.from_pretrained("facebook/mask2former-swin-tiny-ade-semantic").to(self.device).eval()
        
        # 3. YOLO26-SEG (增强版实例分割)
        self.yolo_model = YOLO("yolo26n-seg.pt") 

    def analyze_frame(self, image_path):
        img_cv = cv2.imread(image_path)
        if img_cv is None:
            return None
        H, W, _ = img_cv.shape

        # --- 模型推理 ---
        # 1. 深度估计
        image_pil = Image.fromarray(cv2.cvtColor(img_cv, cv2.COLOR_BGR2RGB))
        depth_out = self.depth_pipe(image_pil)["depth"]
        depth_array = cv2.resize(np.array(depth_out), (W, H))
        depth_array = ((depth_array - depth_array.min()) / (depth_array.max() - depth_array.min() + 1e-5) * 255).astype(np.uint8)

        # 2. 语义分割 (ADE20K 版)
        inputs = self.seg_processor(images=image_pil, return_tensors="pt").to(self.device)
        with torch.no_grad():
            outputs = self.seg_model(**inputs)
        seg_map = self.seg_processor.post_process_semantic_segmentation(outputs, target_sizes=[(H, W)])[0].cpu().numpy()

        # 3. YOLO26-SEG 检测与分割
        results = self.yolo_model(img_cv, verbose=False)[0]
        yolo_boxes = []
        
        # 提取 Mask 信息
        has_masks = results.masks is not None
        if has_masks:
            masks_data = results.masks.data.cpu().numpy() 
            masks_data = np.stack([cv2.resize(m, (W, H)) for m in masks_data]) if len(masks_data) > 0 else []

        for i, box in enumerate(results.boxes):
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            conf = float(box.conf[0])
            cls = int(box.cls[0])
            
            if conf > 0.25:
                # 获取 mask 的中值深度以估算距离
                mask = (masks_data[i] > 0.5).astype(np.uint8) if has_masks and i < len(masks_data) else None
                
                # 计算物体距离 (基于 DA2 的逆深度标定 - 实验值)
                if mask is not None:
                    # 提取物体所在区域的深度的中位数 (防止边缘噪点干扰)
                    object_depth_samples = depth_array[mask == 1]
                    if len(object_depth_samples) > 0:
                        median_depth = np.median(object_depth_samples) / 255.0
                        # 标定公式: 距离(m) = K * (1.2 - 深度) / (深度 + 0.05)
                        distance_m = 3.5 * (1.05 - median_depth) / (median_depth + 0.05)
                        distance_m = round(max(0.3, min(20.0, distance_m)), 1)
                    else:
                        distance_m = 99.0 # 未知
                else:
                    # 如果没有 mask，使用 box 中心点的深度
                    cx, cy = (x1 + x2) // 2, (y1 + y2) // 2
                    median_depth = depth_array[min(H-1, cy), min(W-1, cx)] / 255.0
                    distance_m = 3.5 * (1.05 - median_depth) / (median_depth + 0.05)
                    distance_m = round(max(0.3, min(20.0, distance_m)), 1)
                
                center_x = (x1 + x2) / 2
                position = "左侧" if center_x < W*0.33 else "右侧" if center_x > W*0.66 else "正前方"
                
                item = {
                    "name": self.yolo_model.names[cls],
                    "coords": (x1, y1, x2, y2),
                    "conf": conf,
                    "position": position,
                    "mask": mask,
                    "distance_m": distance_m
                }
                yolo_boxes.append(item)

        # 4. 盲道检测 (HSV 空间黄色区域提取)
        hsv = cv2.cvtColor(img_cv, cv2.COLOR_BGR2HSV)
        lower_yellow = np.array([5, 40, 40])
        upper_yellow = np.array([30, 255, 255])
        blind_path_mask = cv2.inRange(hsv, lower_yellow, upper_yellow)
        kernel = np.ones((5, 5), np.uint8)
        blind_path_mask = cv2.morphologyEx(blind_path_mask, cv2.MORPH_OPEN, kernel)

        # 5. ADE20K 场景掩膜提取 (更新 ID 映射)
        # ID 6: Road, ID 11: Sidewalk, ID 3: Floor (Indoor), ID 5: Ceiling
        road_mask = (seg_map == 6).astype(np.uint8) * 255
        sidewalk_mask = (seg_map == 11).astype(np.uint8) * 255
        crosswalk_mask = np.zeros((H, W), dtype=np.uint8)

        # 6. 环境地标与室内外自适应判定
        # ADE20K: ID 1: building, ID 2: sky, ID 4: tree, ID 81: traffic light
        sky_pixels = np.sum(seg_map == 2)
        ceil_pixels = np.sum(seg_map == 5)
        is_indoor = ceil_pixels > 1000 and sky_pixels < 200
        
        scene_metadata = {
            "is_indoor": is_indoor,
            "current_env": "屋内/楼道" if is_indoor else "室外街道",
            "has_building": int(np.sum(seg_map == 1) > 1000),      
            "has_sky": int(sky_pixels > 500),
            "has_traffic_light": int(np.sum(seg_map == 81) > 50),     
            "ground_type": "floor" if is_indoor else ("sidewalk" if np.sum(sidewalk_mask) > np.sum(road_mask) else "road")
        }

        return {
            "img_cv": img_cv,
            "depth_array": depth_array,
            "seg_map": seg_map,
            "blind_path_mask": blind_path_mask,
            "crosswalk_mask": crosswalk_mask,
            "yolo_boxes": yolo_boxes,
            "scene_metadata": scene_metadata,
            "W": W,
            "H": H
        }
