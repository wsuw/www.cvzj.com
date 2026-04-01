import numpy as np
import cv2
import math

class Navigator:
    def __init__(self):
        # 系统词典：将目标名字转为自然语言
        self.name_map = {
            "person": "行人", "car": "汽车", "bicycle": "自行车", 
            "bus": "公交车", "truck": "卡车", "motorcycle": "摩托车"
        }

    def compute_path(self, perception_data):
        """
        核心物理寻路算法：安全掩膜合并、避障、多级测距决策
        """
        seg_map = perception_data["seg_map"]
        yolo_boxes = perception_data["yolo_boxes"]
        W, H = perception_data["W"], perception_data["H"]
        X_origin, Y_origin = int(W / 2), H

        # 1. 动态安全掩膜 (ADE20K 索引: 3:地板, 11:人行道)
        blind_path_mask = perception_data.get("blind_path_mask", np.zeros_like(seg_map))
        
        # 综合考虑室内地板与室外人行道
        safe_mask = ((seg_map == 3) | (seg_map == 11)).astype(np.uint8) * 255
        safe_mask = cv2.bitwise_or(safe_mask, blind_path_mask)

        # 2. 形态学抗噪
        kernel = np.ones((3, 3), np.uint8)
        clean_safe_mask = cv2.morphologyEx(safe_mask, cv2.MORPH_OPEN, kernel)
        clean_safe_mask = cv2.morphologyEx(clean_safe_mask, cv2.MORPH_CLOSE, kernel)

        # 3. 动态物体“黑洞”化 (像素级避障)
        for yb in yolo_boxes:
            mask = yb.get("mask")
            if mask is not None:
                clean_safe_mask[mask == 1] = 0
            else:
                x1, y1, x2, y2 = yb["coords"]
                clean_safe_mask[y1:y2, x1:x2] = 0

        # 4. 路径中轴线提取 (聚焦脚下 5 米，忽略远处消失点)
        path_centers = []
        # 仅采样图像下半部 (0.5H 到 0.8H) 以获得更准确的近场方向
        for y in range(int(H * 0.5), int(H * 0.8), 20):
            row_data = clean_safe_mask[y, :]
            valid_indices = np.where(row_data == 255)[0]
            if len(valid_indices) > 0:
                center_x = int(np.mean(valid_indices))
                path_centers.append((center_x, y))

        if path_centers:
            # 取路径中偏下方的点作为目标点，避免受远处透视收窄影响
            target_idx = min(len(path_centers) - 1, int(len(path_centers) * 0.7))
            target_point = path_centers[target_idx]
            
            X_target, Y_target = target_point
            dx = X_target - X_origin
            dy = Y_origin - Y_target 
            angle_radians = math.atan2(dx, dy)
            angle_degrees = math.degrees(angle_radians)
        else:
            target_point = None
            angle_degrees = 0.0

        # 5. 多级距离预警决策
        closest_dist = 99.0
        closest_obstacle = None
        
        # 找出正前方（偏航角覆盖范围内）最近的威胁物
        for yb in yolo_boxes:
            dist = yb.get("distance_m", 99.0)
            if yb["position"] == "正前方":
                if dist < closest_dist:
                    closest_dist = dist
                    closest_obstacle = yb

        # 核心逻辑：5米免打扰
        if closest_dist >= 5.0:
            instruction = "前方路径开阔，请放心直行。"
            instruction_code = "STRAIGHT"
            angle_degrees = 0.0 # 5米外强制归零，防止蛇形偏移
        else:
            obs_name = self.name_map.get(closest_obstacle["name"], "障碍物") if closest_obstacle else "障碍物"
            
            if closest_dist < 1.0:
                # 第一级：1米内 - 强制停止
                instruction = f"危险！正前方有{obs_name}，请立即停止！"
                instruction_code = "URGENT_STOP"
            elif 1.0 <= closest_dist < 3.0:
                # 第二级：3米内 - 强力避让
                side = "右侧" if angle_degrees > 0 else "左侧"
                instruction = f"避让预警！前方 {closest_dist} 米有{obs_name}，请向{side}绕行。"
                instruction_code = "BYPASS"
            else:
                # 第三级：5米内 - 告知性预警
                instruction = f"注意，前方 {closest_dist} 米有{obs_name}。"
                instruction_code = "WARNING"

        return {
            "clean_safe_mask": clean_safe_mask,
            "path_centers": path_centers,
            "target_point": target_point,
            "angle_degrees": angle_degrees,
            "instruction_code": instruction_code,
            "instruction": instruction,
            "X_origin": X_origin,
            "Y_origin": Y_origin,
            "closest_dist": closest_dist,
            "H": H, "W": W
        }
