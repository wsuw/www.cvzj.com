# VisionZone (CVZJ) - 智能导盲高精感知系统

> **把光影交给机器，把自由还给人类。**

VisionZone (CVZJ) 是一个开源的智能导盲系统，旨在利用最前沿的计算机视觉技术为视障人士提供高精度的环境感知能力。通过实时深度估计、语义分割和实例分割，结合大语言模型的自然交互能力，本项目致力于构建一个具备高度空间意识的“导航大脑”。

## 🌟 核心理念

- **感知平等 (Equality)**：消除生理条件对世界感知力的限制，通过算法弥补视觉缺失。
- **自主与尊严 (Autonomy)**：通过轻量化、隐形化的智能设备，让用户独立、自信地探索世界。
- **技术赋能 (Empowerment)**：利用 AI 技术解决视障人士出行中的真实痛点。

## 🛠️ 技术架构

系统的核心架构分为三个层面：

1.  **感知层 (Perception)**：
    *   **实时深度估计**：利用深度学习模型提取视觉空间的 3D 结构。
    *   **场景语义理解**：基于 SegFormer/YOLO 等模型识别道路、障碍物及各类复杂场景。
    *   **实例分割**：精准区分环境中的具体物体（如车辆、行人、路障等）。
2.  **寻路层 (Navigation)**：
    *   **物理路径规划**：基于 3D 几何特征计算可通行区域，规划避障轨迹。
    *   **状态机/逻辑控制**：处理不同环境下的导航逻辑（室内/室外/过马路等）。
3.  **交互层 (Interaction)**：
    *   **大语言模型 (LLM)**：驱动自然、人性化的语音导航指令（如集成 Gemma 3n）。
    *   **多模态播报**：将视觉数字化信息转化为易于理解的交互指令。

## 🚀 快速启动

### 环境准备

- Node.js (用于运行展示端)
- Python 3.10+ (用于运行核心算法)
- CUDA 兼容的 GPU (推荐)
- [Ollama](https://ollama.com/) (用于本地运行指令生成模型)

### 安装与运行

1.  **核心算法启动**：
    ```bash
    # 创建并激活环境
    conda create -n cvzj python=3.10
    conda activate cvzj
    
    # 安装依赖
    pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118
    pip install transformers ultralytics opencv-python matplotlib ollama pillow
    
    # 运行
    python main.py
    ```

2.  **Web 展示端启动**：
    ```bash
    npm install
    npm run dev
    ```

## 📂 项目结构

- `src/`: Web 展示前端源码（基于 React + Vite + Tailwind CSS）。
- `main.py`: 后端视觉处理与 AI 交互逻辑。
- `vite.config.ts`: 前端构建配置。

## 🤝 参与贡献

我们欢迎任何形式的贡献，包括算法优化、UI 改进或文档补全。本项目基于 **MIT License** 开源。

---
*VisionZone - 用技术重绘世界。*
