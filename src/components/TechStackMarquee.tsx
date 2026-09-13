import React from 'react';
import { BlurReveal } from './ui/blur-reveal';
import { GitHubContributionGraph } from './GitHubContributionGraph';

export const TechStackMarquee: React.FC = () => {
  return (
    <section 
      id="stack" 
      className="relative w-full min-h-[80svh] flex flex-col justify-start items-center px-6 sm:px-10 lg:px-14 xl:px-18 pt-24 sm:pt-32 pb-32 sm:pb-36 bg-black select-none overflow-x-hidden scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Subtle Ambient Background Glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] pointer-events-none rounded-full blur-[140px] opacity-15"
        style={{ background: 'radial-gradient(circle, #39d353 0%, transparent 70%)' }}
      />

      <div className="max-w-[1650px] w-full mx-auto flex flex-col">
        {/* Title Positioned on Left (Matching Experience Section) */}
        <div className="w-full pb-8 sm:pb-12 text-left">
          <BlurReveal delay={0}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-none font-['Syne',sans-serif]">
              STACK & CONTRIBUTIONS
            </h2>
          </BlurReveal>
        </div>

        {/* Top Divider: Subtle edge-fading line on PC, visible line on phone */}
        <div className="hidden md:block w-screen relative left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none mb-14 sm:mb-20" />
        <div className="block md:hidden w-full h-[1.5px] bg-[#857b76]/60 mb-12" />

        {/* Slot reserved for custom stack component / buttons from user */}
        <div id="custom-tech-stack-slot" className="w-full">
          {/* User's custom stack component / buttons will be inserted here */}
        </div>

        {/* Real GitHub Contribution Graph (Large size for PC) */}
        <div className="w-full mt-6 sm:mt-10">
          <GitHubContributionGraph />
        </div>

        {/* Bottom Divider matching other sections */}
        <div className="hidden md:block w-screen relative left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none mt-20 sm:mt-28" />
        <div className="block md:hidden w-full h-[1.5px] bg-[#857b76]/60 mt-16" />
      </div>
    </section>
  );
};

export default TechStackMarquee;
