import cv2
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image, ImageDraw, ImageFont
import os


class HUDVisualizer:
    def __init__(self):
        # 加载中文字体 (Windows 默认路径)
        self.font_path = "C:/Windows/Fonts/msyh.ttc"  # 微软雅黑
        if not os.path.exists(self.font_path):
            self.font_path = "C:/Windows/Fonts/simhei.ttf"  # 黑体备选

        self.font_size_large = 30
        self.font_size_small = 18
        try:
            self.font_large = ImageFont.truetype(self.font_path, self.font_size_large)
            self.font_small = ImageFont.truetype(self.font_path, self.font_size_small)
        except Exception as e:
            print(f"⚠️ 无法加载字体: {e}")
            self.font_large = None
            self.font_small = None

    def draw_text_chinese(self, img, text, position, color, size="large"):
        """使用 PIL 绘制中文字体以支持 UTF-8"""
        img_pil = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
        draw = ImageDraw.Draw(img_pil)
        font = self.font_large if size == "large" else self.font_small

        # PIL color is RGB
        draw.text(position, text, font=font, fill=(color[2], color[1], color[0]))
        return cv2.cvtColor(np.array(img_pil), cv2.COLOR_RGB2BGR)

    def render(self, perception_data, nav_state):
        """
        绘制高级导航界面 (FSD Style HUD)
        合并所有视觉信息，展示模型思考成果。
        """
        img_cv = perception_data["img_cv"]
        depth_array = perception_data["depth_array"]
        yolo_boxes = perception_data["yolo_boxes"]
        blind_path_mask = perception_data.get("blind_path_mask", None)

        clean_safe_mask = nav_state["clean_safe_mask"]
        angle_degrees = nav_state["angle_degrees"]
        instruction_code = nav_state["instruction_code"]
        instruction_text = nav_state.get("instruction", "")

        # ==========================================
        # 1. 铺设绿色安全可达区 + 橙色导盲砖区 + 青色斑马线区
        # ==========================================
        overlay = np.zeros_like(img_cv)
        # 普通安全区 -> 绿色
        overlay[clean_safe_mask == 255] = (0, 255, 0)
        # 导盲专门区 -> 橙黄色
        if blind_path_mask is not None:
            overlay[blind_path_mask == 255] = (0, 165, 255)
        # [斑马线图层已移除]
            
        hud_img = cv2.addWeighted(img_cv, 0.7, overlay, 0.3, 0)

        # ==========================================
        # 2. 绘制 YOLO 边界障碍框 (支持中文)
        # ==========================================
        # 映射表（防止 perception.py 传来的还是英文名）
        name_map = {
            "person": "行人",
            "car": "汽车",
            "bicycle": "自行车",
            "bus": "公交车",
            "truck": "卡车",
            "motorcycle": "摩托车",
        }

        for yb in yolo_boxes:
            x1, y1, x2, y2 = yb["coords"]
            raw_name = yb["name"]
            display_name = name_map.get(raw_name, raw_name)
            dist_m = yb.get("distance_m", 99.0)
            mask = yb.get("mask")

            # 只有在 5 米内的物体才进行重点标注 (或者根据用户需求显示所有)
            # 这里我们标注所有物体，但在 3 米内使用更醒目的颜色
            color = (0, 0, 255) if dist_m < 3.0 else (0, 165, 255) # 3米内深红，5米内橙色
            thickness = 3 if dist_m < 3.0 else 2

            # 如果有 Mask，优先渲染 Mask 轮廓
            if mask is not None:
                # 绘制半透明 Mask
                mask_bool = mask.astype(bool)
                hud_img[mask_bool] = (
                    hud_img[mask_bool] * 0.5 + np.array(color) * 0.5
                ).astype(np.uint8)
                # 绘制边界
                contours, _ = cv2.findContours(
                    mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
                )
                cv2.drawContours(hud_img, contours, -1, color, thickness)
            else:
                cv2.rectangle(hud_img, (x1, y1), (x2, y2), color, thickness)
            
            # 标注名称与距离
            label_text = f"{display_name} ({dist_m}m)"
            hud_img = self.draw_text_chinese(
                hud_img,
                label_text,
                (x1, y1 - 25),
                color,
                "small",
            )

        # ==========================================
        # 3. 绘制带有状态反馈的 HUD 文字
        # ==========================================
        # 如果是紧急停止，加一个醒目的背景或边框
        if instruction_code == "URGENT_STOP":
            cv2.rectangle(hud_img, (0, 0), (perception_data["W"], 130), (0, 0, 200), -1)
            hud_img = self.draw_text_chinese(hud_img, "！！！ 紧急停止 ！！！", (perception_data["W"]//2 - 150, 40), (255, 255, 255))
        
        hud_img = self.draw_text_chinese(hud_img, f"偏航角: {angle_degrees:.1f} 度", (20, 20), (255, 255, 255), "small")
        hud_img = self.draw_text_chinese(hud_img, f"关键指令: {instruction_code}", (20, 50), (0, 255, 255), "small")
        hud_img = self.draw_text_chinese(hud_img, f"语音播报: {instruction_text}", (20, 80), (0, 200, 255), "small")

        # ==========================================
        # ==========================================
        # 6. 后台合并 Matplotlib 三图横向显示 (极致简洁模式)
        # ==========================================
        plt.figure(figsize=(18, 6))

        # 1. 深度图 (Depth Map) - 反应障碍物远近
        plt.subplot(1, 3, 1)
        plt.title("1. Depth Perception (Depth-Anything-V2)")
        plt.imshow(depth_array, cmap="inferno")
        plt.axis("off")

        # 2. 原始语义分割 (Full Semantic Map) - 场景理解
        plt.subplot(1, 3, 2)
        plt.title("2. Semantic Segmentation (Mask2Former)")
        seg_map = perception_data["seg_map"]
        plt.imshow(seg_map, cmap="tab20")
        plt.axis("off")

        # 3. 最终增强现实 HUD (Integrated Navigator)
        plt.subplot(1, 3, 3)
        plt.title("3. Integrated Augmented Reality HUD")
        plt.imshow(cv2.cvtColor(hud_img, cv2.COLOR_BGR2RGB))
        plt.axis("off")

        plt.tight_layout()
        
        # 改为保存图片，不再弹出窗口导致系统阻塞
        save_path = "latest_hud_frame.png"
        plt.savefig(save_path)
        plt.close() # 必须关闭，否则内存泄漏
        print(f"🖼️ HUD 帧已保存至: {save_path}")
