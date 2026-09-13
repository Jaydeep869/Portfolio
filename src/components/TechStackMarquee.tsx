import React from 'react';
import { ExternalLink } from 'lucide-react';
import { BlurReveal } from './ui/blur-reveal';
import { CommitsGrid } from './ui/CommitsGrid';

export const TechStackMarquee: React.FC = () => {
  return (
    <section 
      id="stack" 
      className="relative w-full min-h-[80svh] flex flex-col justify-start items-center px-6 sm:px-10 lg:px-14 xl:px-18 pt-24 sm:pt-32 pb-32 sm:pb-36 bg-black select-none overflow-x-hidden scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Subtle Ambient Background Glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] pointer-events-none rounded-full blur-[140px] opacity-15"
        style={{ background: 'radial-gradient(circle, #39d353 0%, transparent 70%)' }}
      />

      <div className="max-w-[1650px] w-full mx-auto flex flex-col">
        {/* Title Positioned on Left (Matching Experience Section) */}
        <div className="w-full pb-8 sm:pb-12 text-left">
          <BlurReveal delay={0}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-none font-['Space_Grotesk',sans-serif]">
              STACK & CONTRIBUTIONS
            </h2>
          </BlurReveal>
        </div>

        {/* Top Divider: Subtle edge-fading line on PC, visible line on phone */}
        <div className="hidden md:block w-screen relative left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none mb-14 sm:mb-20" />
        <div className="block md:hidden w-full h-[1.5px] bg-[#857b76]/60 mb-12" />

        {/* Slot reserved for custom buttons / component from user */}
        <div id="custom-tech-stack-slot" className="w-full">
          {/* User's custom stack component / buttons will be inserted here */}
        </div>

        {/* GitHub Contribution Graph Section using CommitsGrid */}
        <div className="w-full mt-8 sm:mt-12 flex flex-col items-center">
          <div className="w-full max-w-xl flex flex-col gap-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#39d353] shadow-[0_0_10px_#39d353] animate-pulse" />
                <span className="text-sm sm:text-base font-bold text-white font-mono">
                  @Jaydeep869
                </span>
              </div>
              <a
                href="https://github.com/Jaydeep869"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#39d353]/50 text-xs font-mono text-slate-300 hover:text-white transition-all cursor-pointer group"
              >
                <span>GitHub Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#39d353] transition-colors" />
              </a>
            </div>

            {/* CommitsGrid component displaying Jaydeep869 */}
            <div className="w-full flex justify-center overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden">
              <CommitsGrid text="Jaydeep869" />
            </div>
          </div>
        </div>

        {/* Bottom Divider matching other sections */}
        <div className="hidden md:block w-screen relative left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none mt-20 sm:mt-28" />
        <div className="block md:hidden w-full h-[1.5px] bg-[#857b76]/60 mt-16" />
      </div>
    </section>
  );
};

export default TechStackMarquee;
