import React, { useState, useRef, useCallback } from 'react';
import { 
  Home, 
  User, 
  Briefcase, 
  Code2 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DockItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: DockItem[] = [
  { label: 'Summit', href: '#hero', icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { label: 'About', href: '#about', icon: <User className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { label: 'Experience', href: '#experience', icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" /> },
  { label: 'Projects', href: '#projects', icon: <Code2 className="w-4 h-4 sm:w-5 sm:h-5" /> },
];

export const Dock: React.FC<{ className?: string }> = ({ className }) => {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMouseX(e.clientX);
  }, []);

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Clear the hover/magnification state immediately on click/tap
    // This fixes the issue on mobile where tapping an item leaves it "stuck" in the hover state
    setMouseX(null);

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

  const getScale = (idx: number): number => {
    if (mouseX === null) return 1;
    const el = itemRefs.current[idx];
    if (!el) return 1;
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const dist = Math.abs(mouseX - center);
    const maxDist = 28;
    if (dist > maxDist) return 1;
    // Only the hovered item scales
    return 1.3;
  };

  return (
    <div className={cn("fixed bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none", className)}>
      <nav 
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMouseX(null)}
        className="pointer-events-auto flex items-end gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-[#0a1017]/90 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/90"
      >
        {navItems.map((item, idx) => {
          const scale = getScale(idx);
          const isActive = scale > 1.1;

          return (
            <div key={item.label} className="relative flex flex-col items-center group">
              <span 
                className="absolute -top-11 px-3 py-1.5 rounded-lg text-xs font-['Space_Grotesk',sans-serif] font-bold tracking-tight bg-black/80 backdrop-blur-md text-white border border-white/15 shadow-xl pointer-events-none whitespace-nowrap"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: `translateY(${isActive ? 0 : 4}px)`,
                  transition: 'opacity 0.15s ease, transform 0.15s ease',
                }}
              >
                {item.label}
              </span>

              <a
                ref={(el) => { itemRefs.current[idx] = el; }}
                href={item.href}
                onClick={(e) => handleItemClick(e, item.href)}
                style={{
                  transform: `scale(${scale}) translateY(${scale > 1 ? (1 - scale) * 10 : 0}px)`,
                  transition: 'transform 0.18s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: isActive ? '0 0 12px rgba(154, 180, 196, 0.25)' : 'none',
                }}
                className={cn(
                  "flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-xl border active:scale-95 cursor-pointer will-change-transform",
                  isActive
                    ? "bg-[#3c4e5a]/60 text-white border-[#9ab4c4]/40"
                    : "bg-white/[0.06] text-slate-300 hover:text-white border-white/10 hover:border-white/20"
                )}
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
