import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  GitPullRequest, 
  Layers, 
  Briefcase, 
  Sparkles,
  ArrowDown,
  ArrowUpRight,
  Mail,
  FolderGit2
} from 'lucide-react';
import type { SectionType } from './SectionModal';

interface ZoomParallaxProps {
  onSelectSection: (section: SectionType) => void;
}

export const ZoomParallax: React.FC<ZoomParallaxProps> = ({ onSelectSection }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const layers = container.querySelectorAll<HTMLElement>('[data-zoom-layer]');
    if (!layers.length) return;

    // Calibrated zoom scale targets for 3D depth flight
    const targetScales = [3.5, 5, 6, 5, 6, 7.5, 8.5];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    layers.forEach((layer, idx) => {
      const scale = targetScales[idx % targetScales.length];
      tl.to(
        layer,
        {
          scale: scale,
          ease: 'none',
        },
        0
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === container) st.kill();
      });
      gsap.killTweensOf(layers);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[260vh] w-full bg-[#050505]">
      {/* Sticky Viewport Container */}
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Ambient atmospheric glows */}
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vmin] h-[110vmin] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_65%)] blur-3xl"
        />
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute top-1/3 left-1/3 w-[60vmin] h-[60vmin] rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent_60%)] blur-2xl"
        />

        {/* Section Heading Banner at Top */}
        <div className="absolute top-14 sm:top-18 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none px-4 w-full max-w-xl">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] uppercase text-blue-400 font-bold mb-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>Interactive 3D Portfolio Hub</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
            Explore Jaydeep's World
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Scroll to zoom through space • Tap or click any card to inspect full details
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 3D PARALLAX ZOOM LAYERS (Interactive Section Portals)                      */}
        {/* ========================================================================= */}

        {/* LAYER 0 (CENTER): ABOUT ME PORTAL */}
        <div
          data-zoom-layer="0"
          className="absolute top-0 flex h-full w-full items-center justify-center will-change-transform z-20 pointer-events-none"
        >
          <div 
            onClick={() => onSelectSection('about')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectSection('about'); }}
            className="pointer-events-auto cursor-pointer group relative w-[86vw] max-w-[340px] sm:max-w-[420px] p-6 sm:p-8 rounded-2xl glass-panel border border-blue-500/40 hover:border-blue-400 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/25 bg-[#090b12]/95 backdrop-blur-2xl text-center space-y-4 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-[11px] text-blue-300 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>01 // ABOUT ME</span>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-mono text-blue-400 group-hover:text-blue-300 transition">
                <span>Open</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight group-hover:text-blue-200 transition">
              Crafting The Future of The Web
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              I'm <span className="text-white font-semibold">Jaydeep</span>. I bridge architectural software engineering with cinematic visual design.
            </p>

            <div className="pt-1 flex items-center justify-center gap-2 text-[10px] font-mono text-slate-400">
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Architecture</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">60 FPS Motion</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Creative Dev</span>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-300 group-hover:bg-blue-600 group-hover:text-white text-xs font-medium transition">
                <span>View Full Bio & Story</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>

        {/* LAYER 1 (TOP-LEFT): WORK EXPERIENCE PORTAL */}
        <div
          data-zoom-layer="1"
          className="absolute top-0 flex h-full w-full items-center justify-center will-change-transform [&>div]:!-top-[28vh] [&>div]:!-left-[16vw] sm:[&>div]:!-left-[20vw] pointer-events-none"
        >
          <div 
            onClick={() => onSelectSection('experience')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectSection('experience'); }}
            className="pointer-events-auto cursor-pointer group relative w-[75vw] max-w-[260px] sm:max-w-[300px] p-5 rounded-xl glass-panel border border-white/15 hover:border-blue-400/60 shadow-xl hover:shadow-blue-500/20 bg-[#090b14]/90 backdrop-blur-xl space-y-2 transition-all duration-300 hover:scale-[1.03]"
          >
            <div className="flex items-center justify-between text-blue-400">
              <div className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4" />
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider">02 // Experience</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-white transition" />
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-blue-200 transition">Work Experience</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Leading full stack web platforms, engineering performant client-side state, and building scalable API services.
            </p>
            <div className="pt-1 text-[11px] font-mono text-blue-400 group-hover:text-blue-300 flex items-center gap-1">
              <span>Inspect Roles & Achievements</span>
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* LAYER 2 (MID-LEFT): OPEN SOURCE CONTRIBUTIONS PORTAL */}
        <div
          data-zoom-layer="2"
          className="absolute top-0 flex h-full w-full items-center justify-center will-change-transform [&>div]:!-top-[4vh] [&>div]:!-left-[28vw] sm:[&>div]:!-left-[32vw] pointer-events-none"
        >
          <div 
            onClick={() => onSelectSection('opensource')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectSection('opensource'); }}
            className="pointer-events-auto cursor-pointer group relative w-[75vw] max-w-[260px] sm:max-w-[290px] p-5 rounded-xl glass-panel border border-emerald-500/25 hover:border-emerald-400/60 shadow-xl hover:shadow-emerald-500/20 bg-[#090b14]/90 backdrop-blur-xl space-y-2 transition-all duration-300 hover:scale-[1.03]"
          >
            <div className="flex items-center justify-between text-emerald-400">
              <div className="flex items-center gap-1.5">
                <GitPullRequest className="w-4 h-4" />
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider">03 // Open Source</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-white transition" />
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-200 transition">OSS Contributions</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Curated UI primitives, CLI developer tools, and GSAP scroll sync utility wrappers.
            </p>
            <div className="pt-1 text-[11px] font-mono text-emerald-400 group-hover:text-emerald-300 flex items-center gap-1">
              <span>View Repos & Stars</span>
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* LAYER 3 (MID-RIGHT): FEATURED PROJECTS PORTAL */}
        <div
          data-zoom-layer="3"
          className="absolute top-0 flex h-full w-full items-center justify-center will-change-transform [&>div]:!-top-[6vh] [&>div]:!left-[28vw] sm:[&>div]:!left-[32vw] pointer-events-none"
        >
          <div 
            onClick={() => onSelectSection('projects')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectSection('projects'); }}
            className="pointer-events-auto cursor-pointer group relative w-[75vw] max-w-[260px] sm:max-w-[300px] p-5 rounded-xl glass-panel border border-indigo-500/25 hover:border-indigo-400/60 shadow-xl hover:shadow-indigo-500/20 bg-[#090b14]/90 backdrop-blur-xl space-y-2 transition-all duration-300 hover:scale-[1.03]"
          >
            <div className="flex items-center justify-between text-indigo-400">
              <div className="flex items-center gap-1.5">
                <FolderGit2 className="w-4 h-4" />
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider">04 // Projects</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-white transition" />
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-200 transition">Featured Projects</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Hyperion Cloud Orchestrator, Parallax 3D Studio, and Synthetix Design System.
            </p>
            <div className="pt-1 text-[11px] font-mono text-indigo-400 group-hover:text-indigo-300 flex items-center gap-1">
              <span>Explore Projects & Demos</span>
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* LAYER 4 (BOTTOM-RIGHT): TECH STACK & ARSENAL PORTAL */}
        <div
          data-zoom-layer="4"
          className="absolute top-0 flex h-full w-full items-center justify-center will-change-transform [&>div]:!top-[26vh] [&>div]:!left-[18vw] sm:[&>div]:!left-[22vw] pointer-events-none"
        >
          <div 
            onClick={() => onSelectSection('stack')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectSection('stack'); }}
            className="pointer-events-auto cursor-pointer group relative w-[75vw] max-w-[260px] sm:max-w-[290px] p-5 rounded-xl glass-panel border border-purple-500/25 hover:border-purple-400/60 shadow-xl hover:shadow-purple-500/20 bg-[#090b14]/90 backdrop-blur-xl space-y-2 transition-all duration-300 hover:scale-[1.03]"
          >
            <div className="flex items-center justify-between text-purple-400">
              <div className="flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider">05 // Arsenal</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-white transition" />
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-purple-200 transition">Tech Stack</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              React 19, TypeScript, Next.js, Node.js, PostgreSQL, Docker, GSAP & Tailwind.
            </p>
            <div className="pt-1 text-[11px] font-mono text-purple-400 group-hover:text-purple-300 flex items-center gap-1">
              <span>View Full Arsenal</span>
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* LAYER 5 (BOTTOM-LEFT): CONTACT & CONNECT PORTAL */}
        <div
          data-zoom-layer="5"
          className="absolute top-0 flex h-full w-full items-center justify-center will-change-transform [&>div]:!top-[26vh] [&>div]:!-left-[18vw] sm:[&>div]:!-left-[22vw] pointer-events-none"
        >
          <div 
            onClick={() => onSelectSection('contact')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectSection('contact'); }}
            className="pointer-events-auto cursor-pointer group relative w-[75vw] max-w-[260px] sm:max-w-[290px] p-5 rounded-xl glass-panel border border-cyan-500/25 hover:border-cyan-400/60 shadow-xl hover:shadow-cyan-500/20 bg-[#090b14]/90 backdrop-blur-xl space-y-2 transition-all duration-300 hover:scale-[1.03]"
          >
            <div className="flex items-center justify-between text-cyan-400">
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4" />
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider">06 // Connect</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-white transition" />
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-200 transition">Get In Touch</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Have an idea, project inquiry, or contract proposal? Drop a direct message.
            </p>
            <div className="pt-1 text-[11px] font-mono text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1">
              <span>Open Contact Form</span>
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* LAYER 6 (TOP-RIGHT): GLOBAL COLLABORATION & HIRING PORTAL */}
        <div
          data-zoom-layer="6"
          className="absolute top-0 flex h-full w-full items-center justify-center will-change-transform [&>div]:!-top-[28vh] [&>div]:!left-[16vw] sm:[&>div]:!left-[20vw] pointer-events-none"
        >
          <div 
            onClick={() => onSelectSection('contact')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectSection('contact'); }}
            className="pointer-events-auto cursor-pointer group relative w-[75vw] max-w-[260px] sm:max-w-[290px] p-5 rounded-xl glass-panel border border-amber-500/25 hover:border-amber-400/60 shadow-xl hover:shadow-amber-500/20 bg-[#090b14]/90 backdrop-blur-xl space-y-2 transition-all duration-300 hover:scale-[1.03]"
          >
            <div className="flex items-center justify-between text-amber-400">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider">Status</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-white transition" />
            </div>
            <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-200 transition">Open for Work</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Available for full-time software engineering roles and high-impact remote contracts.
            </p>
            <div className="pt-1 text-[11px] font-mono text-amber-400 group-hover:text-amber-300 flex items-center gap-1">
              <span>Hire / Collaborate</span>
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Bottom subtle scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex items-center gap-2 text-[11px] font-mono text-slate-500 uppercase tracking-widest">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-blue-400" />
          <span>Scroll to travel in 3D • Click cards to explore</span>
        </div>

      </div>
    </div>
  );
};
