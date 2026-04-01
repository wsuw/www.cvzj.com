import { CheckCircle2, Circle, Clock, ArrowRight, Github } from 'lucide-react';
import { motion } from 'motion/react';

export function Roadmap() {
  return (
    <main>
      {/* Header Section */}
      <section className="pt-32 pb-16 bg-surface-container-lowest border-b border-outline-variant">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-on-surface mb-6">未来路线图：从感知到认知</h1>
            <p className="text-xl text-on-surface-variant leading-relaxed">
              VisionZone 的旅程才刚刚开始。我们的路线图规划了从基础感知到完全自主导航的演进路径。
            </p>
          </div>
        </div>
      </section>

      {/* Roadmap Timeline Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="relative border-l-2 border-outline-variant ml-4 md:ml-0">
            
            {/* V1 - Completed */}
            <div className="mb-16 relative pl-8 md:pl-12">
              <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center ring-4 ring-surface">
                <CheckCircle2 className="w-3 h-3 text-on-primary" />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold text-on-surface">V1 阶段</h2>
                <span className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-xs font-bold uppercase tracking-wider">已完成</span>
              </div>
              
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-surface p-6 rounded-2xl border border-outline-variant shadow-sm"
                >
                  <h3 className="text-lg font-bold text-on-surface mb-2">多模态视觉融合与大模型交互</h3>
                  <p className="text-on-surface-variant text-sm mb-4">集成了 Depth Anything V2, Mask2Former, YOLOv26-SEG，并结合 Gemma 3N 实现了具备高度空间意识和自然交互能力的导航大脑。</p>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 rounded bg-surface-variant text-on-surface-variant">感知</span>
                    <span className="text-xs px-2 py-1 rounded bg-surface-variant text-on-surface-variant">交互</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* V2 - In Progress */}
            <div className="mb-16 relative pl-8 md:pl-12">
              <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-tertiary flex items-center justify-center ring-4 ring-surface">
                <Clock className="w-3 h-3 text-on-tertiary" />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold text-on-surface">V2 阶段 (2026 Q3)</h2>
                <span className="px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-container text-xs font-bold uppercase tracking-wider">进行中</span>
              </div>
              
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-surface p-6 rounded-2xl border border-tertiary/30 shadow-[0_0_20px_rgba(205,189,255,0.05)] relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-tertiary"></div>
                  <h3 className="text-lg font-bold text-on-surface mb-2">引入多模态大模型</h3>
                  <p className="text-on-surface-variant text-sm mb-4">引入 LLaVA / Gemma-Vision 等多模态大模型，实现对场景的复杂细节理解（例如：“前面那个路标写着超市”。）</p>
                  <div className="w-full bg-surface-variant rounded-full h-2 mb-4">
                    <div className="bg-tertiary h-2 rounded-full w-[60%]"></div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 rounded bg-surface-variant text-on-surface-variant">认知</span>
                    <span className="text-xs px-2 py-1 rounded bg-surface-variant text-on-surface-variant">AI</span>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-surface p-6 rounded-2xl border border-tertiary/30 shadow-[0_0_20px_rgba(205,189,255,0.05)] relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-tertiary"></div>
                  <h3 className="text-lg font-bold text-on-surface mb-2">6-DoF 空间定位</h3>
                  <p className="text-on-surface-variant text-sm mb-4">结合 IMU 传感器实现六自由度（6-DoF）的空间定位，解决上下坡识别难题。</p>
                  <div className="w-full bg-surface-variant rounded-full h-2 mb-4">
                    <div className="bg-tertiary h-2 rounded-full w-[30%]"></div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 rounded bg-surface-variant text-on-surface-variant">传感器融合</span>
                    <span className="text-xs px-2 py-1 rounded bg-surface-variant text-on-surface-variant">定位</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* V3 - Planned */}
            <div className="mb-16 relative pl-8 md:pl-12">
              <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-surface-variant border-2 border-outline-variant flex items-center justify-center ring-4 ring-surface">
                <Circle className="w-3 h-3 text-on-surface-variant" />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold text-on-surface">V3 阶段 (2027)</h2>
                <span className="px-3 py-1 rounded-full bg-surface-variant text-on-surface-variant text-xs font-bold uppercase tracking-wider">规划中</span>
              </div>
              
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-surface p-6 rounded-2xl border border-outline-variant shadow-sm opacity-75 hover:opacity-100 transition-opacity"
                >
                  <h3 className="text-lg font-bold text-on-surface mb-2">协同导航</h3>
                  <p className="text-on-surface-variant text-sm mb-4">实现多个设备间的信息共享，预警盲区外的车辆。</p>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 rounded bg-surface-variant text-on-surface-variant">V2X</span>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-surface p-6 rounded-2xl border border-outline-variant shadow-sm opacity-75 hover:opacity-100 transition-opacity"
                >
                  <h3 className="text-lg font-bold text-on-surface mb-2">低功耗芯片移植</h3>
                  <p className="text-on-surface-variant text-sm mb-4">针对边缘计算平台（如 Jetson Orin）进行 FP16/INT8 量化压缩。</p>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 rounded bg-surface-variant text-on-surface-variant">边缘计算</span>
                    <span className="text-xs px-2 py-1 rounded bg-surface-variant text-on-surface-variant">性能优化</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* V Alpha - Planned */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-secondary flex items-center justify-center ring-4 ring-surface">
                <Circle className="w-3 h-3 text-on-secondary" />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold text-on-surface">Vα 阶段 (终极形态)</h2>
                <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-wider">终极目标</span>
              </div>
              
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-surface p-6 rounded-2xl border border-secondary/30 shadow-[0_0_20px_rgba(168,200,255,0.05)] relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-secondary"></div>
                  <h3 className="text-lg font-bold text-on-surface mb-2">完全自主导航</h3>
                  <p className="text-on-surface-variant text-sm mb-4">实现全天候、全场景、零干预的完全自主导航，真正成为视障人士的“数字生命”伴侣。</p>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 rounded bg-surface-variant text-on-surface-variant">AGI</span>
                    <span className="text-xs px-2 py-1 rounded bg-surface-variant text-on-surface-variant">数字生命</span>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Suggestion CTA */}
      <section className="py-16 bg-surface-container-lowest">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-on-surface mb-4">参与开源建设</h2>
          <p className="text-on-surface-variant mb-8">如果你擅长算法、硬件，或者只是想出一份力，欢迎把这个项目介绍给需要的人。</p>
          <a href="https://github.com/wsuw/cvzj" target="_blank" rel="noopener noreferrer" className="bg-surface-container hover:bg-surface-variant text-on-surface transition-colors px-6 py-3 rounded-full label text-sm font-bold inline-flex items-center justify-center gap-2 border border-outline-variant">
            <Github className="w-4 h-4" />
            前往 GitHub
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
