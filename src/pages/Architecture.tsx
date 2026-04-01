import { Eye, Database, Cloud, Shield, Network, Cpu, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

export function Architecture() {
  return (
    <main>
      {/* Header Section */}
      <section className="pt-32 pb-16 bg-surface-container-lowest border-b border-outline-variant">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-on-surface mb-6">系统架构与技术选型</h1>
            <p className="text-xl text-on-surface-variant leading-relaxed">
              VisionZone 采用了“感知-决策-执行-交互”的四层分布式架构，确保系统在处理海量图像数据的同时，依然能保持低延迟和高鲁棒性。
            </p>
          </div>
        </div>
      </section>

      {/* Architecture Diagram Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface-container rounded-3xl p-8 md:p-12 border border-outline-variant relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-tertiary to-secondary"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
              
              {/* Perception Layer */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
                    <Eye className="text-on-primary-container w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-on-surface">感知层</h2>
                </div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-surface p-6 rounded-xl border border-outline-variant shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-on-surface">Depth Anything V2</h3>
                    <Cloud className="text-primary w-5 h-5" />
                  </div>
                  <p className="text-sm text-on-surface-variant">构建亚像素级的深度图，单帧图像恢复场景相对远近，解决“那里有多远”。</p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-surface p-6 rounded-xl border border-outline-variant shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-on-surface">Mask2Former</h3>
                    <Shield className="text-tertiary w-5 h-5" />
                  </div>
                  <p className="text-sm text-on-surface-variant">通用分割框架，精准识别地板、人行道、草地、天空和建筑。</p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-surface p-6 rounded-xl border border-outline-variant shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-on-surface">YOLOv26-SEG</h3>
                    <Network className="text-secondary w-5 h-5" />
                  </div>
                  <p className="text-sm text-on-surface-variant">极速实例分割，专门负责识别具有威胁性的动态目标，提供像素级精确轮廓掩膜。</p>
                </motion.div>
              </div>

              {/* Pathfinding Layer */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center">
                    <Cpu className="text-on-secondary-container w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-on-surface">寻路层</h2>
                </div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-surface p-6 rounded-xl border border-primary/30 shadow-[0_0_30px_rgba(0,218,243,0.1)] relative"
                >
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-px bg-primary hidden lg:block"></div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-on-surface">安全掩膜提取</h3>
                    <Shield className="text-secondary w-5 h-5" />
                  </div>
                  <p className="text-sm text-on-surface-variant mb-4">自动识别场景中的“Free Space”（可通行区域），并将盲道作为高优先级权重叠加。</p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-surface p-6 rounded-xl border border-primary/30 shadow-[0_0_30px_rgba(0,218,243,0.1)] relative"
                >
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-px bg-primary hidden lg:block"></div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-on-surface">递归中轴算法</h3>
                    <Network className="text-secondary w-5 h-5" />
                  </div>
                  <p className="text-sm text-on-surface-variant mb-4">对可通行区域进行水平切片，计算每一层的重心，连成一条适应地形的“虚拟路径”。</p>
                </motion.div>
              </div>

              {/* Interaction Layer */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-tertiary-container flex items-center justify-center">
                    <MessageSquare className="text-on-tertiary-container w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold text-on-surface">交互层</h2>
                </div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-surface p-6 rounded-xl border border-outline-variant shadow-lg relative"
                >
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-px bg-tertiary hidden lg:block"></div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-on-surface">Gemma 3N / Llama 3</h3>
                    <Database className="text-tertiary w-5 h-5" />
                  </div>
                  <p className="text-sm text-on-surface-variant">通过端侧部署的 Ollama 引擎，将复杂的传感器参数转化为温柔、简洁的语音指令。</p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-surface p-6 rounded-xl border border-outline-variant shadow-lg relative"
                >
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-px bg-tertiary hidden lg:block"></div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-on-surface">Prompt Engineering</h3>
                    <MessageSquare className="text-primary w-5 h-5" />
                  </div>
                  <p className="text-sm text-on-surface-variant">将冷冰冰的数字重塑为具备人性化关怀的语音，确保极高隐私保护，数据不上传云端。</p>
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-24 bg-surface-container-lowest">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-on-surface mb-12">核心算法深度解析</h2>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                单目深度估计与距离标定
              </h3>
              <p className="text-on-surface-variant leading-relaxed mb-4">
                传统的单目视觉很难准确计算距离。VisionZone 引入了一个实验性逆深度标定公式，将 Depth Anything V2 输出的相对深度转化为物理距离。通过提取 YOLO 掩膜区域内的深度中位数，精准获知前方行人的具体步数。
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2">
                <Network className="w-5 h-5" />
                全景语义分割与环境自适应
              </h3>
              <p className="text-on-surface-variant leading-relaxed mb-4">
                系统通过分析 Mask2Former 的输出像素占比来自动切换模式：
              </p>
              <ul className="list-disc list-inside text-on-surface-variant space-y-2 ml-4">
                <li><strong className="text-on-surface">室内模式：</strong> 针对平滑地板的避障参数，避让家具、楼梯口。</li>
                <li><strong className="text-on-surface">室外模式：</strong> 重点加强对车辆和交通灯的识别，并启动“斑马线寻找”算法。</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-tertiary mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                动态物体避障：像素级“黑洞”策略
              </h3>
              <p className="text-on-surface-variant leading-relaxed mb-4">
                不再使用矩形框避障。利用 YOLO26-SEG 的 Mask 输出，我们将物体所在的确切像素从“安全掩膜”中剔除。即使用户在狭窄的小巷遇到形状不规则的电瓶车，系统也能利用像素级的缝隙计算出最优通路。
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
