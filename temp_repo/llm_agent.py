import ollama

class VoiceAssistant:
    def __init__(self, model_name="gemma3n"):
        self.model_name = model_name
        self.name_map = {
            "person": "行人", "car": "汽车", "bicycle": "自行车", 
            "bus": "公交车", "truck": "卡车", "motorcycle": "摩托车"
        }

    def generate_prompt(self, nav_state, yolo_boxes, scene_metadata):
        """ 融合场景环境、导航状态与 YOLO 距离信息，生成最终语音播报 """
        instruction_code = nav_state["instruction_code"]
        instruction = nav_state["instruction"]
        angle = nav_state.get("angle_degrees", 0.0)
        env_label = scene_metadata.get("current_env", "未知环境")
        
        # 提取视野内关键物体的距离信息
        objects_info = []
        for yb in yolo_boxes[:5]: 
            cn_name = self.name_map.get(yb["name"], yb["name"])
            dist = yb.get("distance_m", 99.0)
            pos = yb["position"]
            objects_info.append(f"{cn_name}({dist}米, {pos})")
        
        obj_str = "、".join(objects_info) if objects_info else "视野开阔"

        # 核心拦截：如果是 1 米内的紧急情况，直接返回原始硬连线指令
        if instruction_code == "URGENT_STOP":
            return instruction

        # 明确左右方向映射
        direction_hint = "左侧" if angle < 0 else "右侧" if angle > 0 else "正前方"

        prompt = f"""
        你是一位专业的智能导盲助手。请根据以下传感器数据，为视障用户提供一句简洁、温和、具备空间感的动作指令。
        
        【当前环境】: {env_label}
        【环境感知】: {obj_str}
        【建议方向】: {direction_hint} (偏航角: {angle:.1f} 度)
        【机器指令】: {instruction}
        
        【播报原则】:
        1. 必须包含关键障碍物的距离，尤其是 5 米内的。
        2. 重要：如果建议方向是“右侧”，严禁说成“左侧”。
        3. 5 米内没东西，直接播报“前方 5 米内路径清空，请直行”。
        4. 如果指令是 STRAIGHT (直行)，严禁建议绕行。
        5. 字数极简，控制在 20 字以内。
        
        请直接输出播报词:
        """
        
        print("🧠 正在请求大语言模型思考最佳语音提示词...")
        try:
            res = ollama.generate(model=self.model_name, prompt=prompt)
            final_speech = res["response"].strip()
            if "：" in final_speech:
                final_speech = final_speech.split("：")[-1]
            print(f"✅ 大语言模型智能重构: {final_speech}")
            return final_speech
        except Exception:
            return instruction
