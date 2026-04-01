import { ArrowRight, Code, Terminal, Zap, Shield, Globe, Cpu, Eye, Navigation, MessageSquare, Github } from 'lucide-react';
import { motion } from 'motion/react';

export function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-primary-container),transparent_50%)] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-outline-variant mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-medium text-on-surface-variant tracking-wide uppercase">VisionZone (CVZJ) 开源项目</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-on-surface mb-6 leading-tight"
            >
              智能导盲 <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">高精感知系统</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-on-surface-variant mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              把光影交给机器，把自由还给人类。<br/>
              融合计算机视觉最尖端的实时深度估计、场景语义理解和实例分割技术，结合大语言模型，构建具备高度空间意识和自然交互能力的导航大脑。
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a href="https://github.com/wsuw/cvzj" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container transition-colors px-8 py-4 rounded-full label text-base font-bold flex items-center justify-center gap-2">
                GitHub 仓库
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="https://github.com/wsuw/cvzj#安装与运行指南" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-surface-container hover:bg-surface-variant text-on-surface transition-colors px-8 py-4 rounded-full label text-base font-bold flex items-center justify-center gap-2 border border-outline-variant">
                <Code className="w-5 h-5" />
                快速启动
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Code Preview Section */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-[#1e1e1e] border border-outline-variant overflow-hidden shadow-2xl"
          >
            <div className="flex items-center px-4 py-3 bg-[#2d2d2d] border-b border-[#404040]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <div className="mx-auto flex items-center gap-2 text-[#858585] text-xs font-mono">
                <Terminal className="w-3 h-3" />
                quickstart.sh
              </div>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="text-sm font-mono leading-relaxed">
                <code className="text-[#d4d4d4]">
                  <span className="text-[#6a9955]"># 1. 创建虚拟环境</span>{'\n'}
                  <span className="text-[#569cd6]">conda</span> create -n cvzj python=3.10{'\n'}
                  <span className="text-[#569cd6]">conda</span> activate cvzj{'\n\n'}
                  <span className="text-[#6a9955]"># 2. 安装核心依赖</span>{'\n'}
                  <span className="text-[#569cd6]">pip</span> install torch torchvision --index-url https://download.pytorch.org/whl/cu118{'\n'}
                  <span className="text-[#569cd6]">pip</span> install transformers ultralytics opencv-python matplotlib ollama pillow{'\n\n'}
                  <span className="text-[#6a9955]"># 3. 启动 Ollama 并拉取模型</span>{'\n'}
                  <span className="text-[#569cd6]">ollama</span> pull gemma3n{'\n\n'}
                  <span className="text-[#6a9955]"># 4. 快速启动系统</span>{'\n'}
                  <span className="text-[#569cd6]">python</span> main.py
                </code>
              </pre>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">核心理念与社会价值</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">为视障人士提供“赛博视觉皮层”，让每一位视障人士都能享受到技术进步带来的出行尊严与自由。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-surface p-8 rounded-2xl border border-outline-variant hover:border-primary/50 transition-all group"
            >
              <div className="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Eye className="text-on-primary-container w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">感知平等 (Equality)</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                对世界的感知力不应受限于生理条件。通过深度学习算法将复杂的 3D 视觉空间数字化，再通过语义化播报传递给用户，在算法层面弥补视觉缺失。
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-surface p-8 rounded-2xl border border-outline-variant hover:border-tertiary/50 transition-all group"
            >
              <div className="w-12 h-12 bg-tertiary-container rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="text-on-tertiary-container w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">自主与尊严 (Autonomy)</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                致力于小型化与隐形化，通过智能穿戴设备（如 AR 眼镜或肩挎式摄像头）实现低调导航，让用户重新获得独立探索世界的信心，不再成为人群焦点。
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-surface p-8 rounded-2xl border border-outline-variant hover:border-secondary/50 transition-all group"
            >
              <div className="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="text-on-secondary-container w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">算法无偏见 (Zero Judgment)</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                核心算法基于纯粹的几何物理规律。不会因为场景繁杂而疲惫，每一毫米的距离计算、每一类场景的划分，都是冷峻而忠实的。
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-t border-outline-variant">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex justify-center mb-4"><Eye className="w-8 h-8 text-primary" /></div>
              <div className="text-2xl font-bold text-on-surface mb-2">感知层</div>
              <div className="text-sm font-medium text-on-surface-variant uppercase tracking-wider">多模态视觉融合</div>
            </div>
            <div>
              <div className="flex justify-center mb-4"><Navigation className="w-8 h-8 text-tertiary" /></div>
              <div className="text-2xl font-bold text-on-surface mb-2">寻路层</div>
              <div className="text-sm font-medium text-on-surface-variant uppercase tracking-wider">物理路径规划</div>
            </div>
            <div>
              <div className="flex justify-center mb-4"><MessageSquare className="w-8 h-8 text-secondary" /></div>
              <div className="text-2xl font-bold text-on-surface mb-2">交互层</div>
              <div className="text-sm font-medium text-on-surface-variant uppercase tracking-wider">大语言模型驱动</div>
            </div>
            <div>
              <div className="flex justify-center mb-4"><Cpu className="w-8 h-8 text-primary" /></div>
              <div className="text-2xl font-bold text-on-surface mb-2">可视化</div>
              <div className="text-sm font-medium text-on-surface-variant uppercase tracking-wider">开发者 HUD 与 AR</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-surface to-surface-container-high relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-tertiary-container),transparent_70%)] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Github className="w-16 h-16 text-tertiary mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-on-surface mb-6">加入我们，用技术重绘世界</h2>
          <p className="text-xl text-on-surface-variant mb-10">本项目基于 MIT License 开源。欢迎全球的开发者、视觉专家和公益人士加入。</p>
          <a href="https://github.com/wsuw/cvzj" target="_blank" rel="noopener noreferrer" className="bg-on-surface text-surface hover:bg-surface-variant hover:text-on-surface transition-colors px-8 py-4 rounded-full label text-base font-bold inline-flex items-center justify-center gap-2">
            前往 GitHub 参与贡献
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </main>
  );
}
