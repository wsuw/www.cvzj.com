import { Eye, ArrowRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur border-b border-outline-variant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Eye className="text-primary w-8 h-8" />
            <span className="font-headline font-bold text-xl tracking-tight text-on-surface">VisionZone</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-on-surface-variant hover:text-primary transition-colors label text-sm font-medium">项目首页</Link>
            <Link to="/architecture" className="text-on-surface-variant hover:text-primary transition-colors label text-sm font-medium">系统架构</Link>
            <Link to="/roadmap" className="text-on-surface-variant hover:text-primary transition-colors label text-sm font-medium">路线图</Link>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/wsuw/cvzj" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 text-on-surface hover:text-primary transition-colors label text-sm font-medium">
              <Github className="w-5 h-5" />
              GitHub
            </a>
            <a href="https://github.com/wsuw/cvzj" target="_blank" rel="noopener noreferrer" className="bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container transition-colors px-4 py-2 rounded-full label text-sm font-semibold flex items-center gap-2">
              参与贡献
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
