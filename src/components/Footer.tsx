import { Eye, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-surface-container border-t border-outline-variant py-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="text-primary w-6 h-6" />
              <span className="font-headline font-bold text-lg text-on-surface">VisionZone (CVZJ)</span>
            </div>
            <p className="text-on-surface-variant text-sm max-w-sm mb-4">
              把光影交给机器，把自由还给人类。<br/>
              致力于为视障人士提供“赛博视觉皮层”的前沿 AI 开源项目。
            </p>
            <a href="https://github.com/wsuw/cvzj" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-on-surface hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
              <span>GitHub Repository</span>
            </a>
          </div>
          <div>
            <h4 className="font-headline font-semibold text-on-surface mb-4">核心技术</h4>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              <li><span className="hover:text-primary transition-colors cursor-pointer">多模态视觉融合</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">物理路径规划</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">大语言模型交互</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">开发者 HUD</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold text-on-surface mb-4">开源社区</h4>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              <li><a href="https://github.com/wsuw/cvzj" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">参与贡献</a></li>
              <li><a href="https://github.com/wsuw/cvzj/issues" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">提交 Issue</a></li>
              <li><a href="https://github.com/wsuw/cvzj/pulls" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Pull Requests</a></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">MIT License</span></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-outline-variant mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-on-surface-variant">
          <p>&copy; 2026 VisionZone (CVZJ) Lab. Created with ❤️</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>致力于用技术重绘世界。</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
