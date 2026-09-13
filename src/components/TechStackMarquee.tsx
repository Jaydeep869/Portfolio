import React from 'react';
import { BlurReveal } from './ui/blur-reveal';
import { GitHubContributionGraph } from './GitHubContributionGraph';

export const TechStackMarquee: React.FC = () => {
  return (
    <section 
      id="stack" 
      className="relative w-full flex flex-col justify-start items-center px-6 sm:px-10 lg:px-14 xl:px-18 pt-20 sm:pt-24 pb-28 sm:pb-32 bg-black select-none overflow-x-hidden scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Subtle Ambient Background Glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] pointer-events-none rounded-full blur-[140px] opacity-15"
        style={{ background: 'radial-gradient(circle, #39d353 0%, transparent 70%)' }}
      />

      <div className="max-w-[1650px] w-full mx-auto flex flex-col">
        {/* Title Positioned on Left (Matching Experience Section) */}
        <div className="w-full pb-6 sm:pb-8 text-left">
          <BlurReveal delay={0}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-none font-['Space_Grotesk',sans-serif]">
              STACK & CONTRIBUTIONS
            </h2>
          </BlurReveal>
        </div>

        {/* Top Divider: Subtle edge-fading line on PC, visible line on phone */}
        <div className="hidden md:block w-screen relative left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none mb-10 sm:mb-12" />
        <div className="block md:hidden w-full h-[1.5px] bg-[#857b76]/60 mb-8" />

        {/* Slot reserved for custom stack component / buttons from user */}
        <div id="custom-tech-stack-slot" className="w-full">
          {/* User's custom stack component / buttons will be inserted here */}
        </div>

        {/* Real GitHub Contribution Graph */}
        <div className="w-full">
          <GitHubContributionGraph />
        </div>

        {/* Bottom Divider matching other sections */}
        <div className="hidden md:block w-screen relative left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none mt-16 sm:mt-20" />
        <div className="block md:hidden w-full h-[1.5px] bg-[#857b76]/60 mt-12" />
      </div>
    </section>
  );
};

export default TechStackMarquee;
