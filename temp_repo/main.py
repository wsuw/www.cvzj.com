import time
import warnings

# ✅ 引入子系统模块
from perception import PerceptionSystem
from navigation import Navigator
from llm_agent import VoiceAssistant
from visualization import HUDVisualizer

warnings.filterwarnings("ignore")


def main():
    print("=" * 50)
    print(" 🚀 智能导盲高精感知系统 (Testing v2.1) 启动... ")
    print("=" * 50)

    # 1. 系统初始化
    perception = PerceptionSystem()
    navigator = Navigator()
    assistant = VoiceAssistant(model_name="gemma3n")
    visualizer = HUDVisualizer()

    # 获取测试图片
    image_path = "D:/Python Projects/cvzj/images/image4.png"
    print(f"\n📸 开始分析当前帧画面: {image_path}")
    start_infer = time.time()

    # 2. 环境感知 (Depth + Seg + YOLO)
    perception_data = perception.analyze_frame(image_path)
    if not perception_data:
        print("❌ 画面读取失败。")
        return

    # 3. 避障与路径计算
    nav_state = navigator.compute_path(perception_data)

    # 4. 辅助语音生成 (单步执行)
    current_tts_text = assistant.generate_prompt(
        nav_state, perception_data["yolo_boxes"], perception_data["scene_metadata"]
    )

    # 5. 输出指令
    print(
        f"📡 实时指令: [{nav_state['instruction_code']}] | 偏角: {nav_state['angle_degrees']:.1f}°"
    )

    # 6. 可视化 HUD (保存至文件)
    nav_state["instruction"] = current_tts_text
    visualizer.render(perception_data, nav_state)

    print(f"⏱️ 帧耗时: {int((time.time() - start_infer) * 1000)}ms\n" + "-" * 30)
    print("\n🏁 处理完毕。")


if __name__ == "__main__":
    main()
