import React, { useState, useRef } from 'react';
import { 
  Mountain, 
  User, 
  Briefcase, 
  GitPullRequest,
  FolderGit2, 
  Cpu, 
  Mail 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DockItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: DockItem[] = [
  { label: 'Summit', href: '#hero', icon: <Mountain className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { label: 'About', href: '#about', icon: <User className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { label: 'Experience', href: '#experience', icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { label: 'Open Source', href: '#opensource', icon: <GitPullRequest className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { label: 'Projects', href: '#projects', icon: <FolderGit2 className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { label: 'Tech Stack', href: '#stack', icon: <Cpu className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { label: 'Contact', href: '#contact', icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" /> },
];

export const Dock: React.FC<{ className?: string }> = ({ className }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: string | Element, opts?: { duration?: number }) => void } }).__lenis;

    if (lenis && !isMobile) {
      lenis.scrollTo(href, { duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={cn("fixed bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none", className)}>
      <nav 
        ref={dockRef}
        onMouseLeave={() => setHoveredIdx(null)}
        className="pointer-events-auto flex items-end gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-[#0a1017]/90 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/90 transition-all duration-300"
      >
        {navItems.map((item, idx) => {
          let scale = 1;
          if (hoveredIdx !== null) {
            const distance = Math.abs(hoveredIdx - idx);
            if (distance === 0) scale = 1.35;
            else if (distance === 1) scale = 1.18;
            else if (distance === 2) scale = 1.06;
          }

          return (
            <div key={item.label} className="relative flex flex-col items-center group">
              <span 
                className="absolute -top-9 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium tracking-wide bg-[#15212d] text-slate-200 border border-white/10 shadow-lg pointer-events-none transition-all duration-200 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 whitespace-nowrap"
              >
                {item.label}
              </span>

              <a
                href={item.href}
                onClick={(e) => handleItemClick(e, item.href)}
                onMouseEnter={() => setHoveredIdx(idx)}
                style={{
                  transform: `scale(${scale}) translateY(${scale > 1 ? (1 - scale) * 8 : 0}px)`,
                  transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.2s ease',
                }}
                className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white/[0.06] hover:bg-[#3c4e5a]/50 text-slate-300 hover:text-white border border-white/10 hover:border-[#9ab4c4]/40 active:scale-95 cursor-pointer will-change-transform"
                aria-label={item.label}
              >
                {item.icon}
              </a>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Dock;
