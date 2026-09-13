import React from 'react';
import { BlurReveal } from './ui/blur-reveal';

export const TechStackMarquee: React.FC = () => {
  return (
    <section 
      id="stack" 
      className="relative w-full min-h-[40svh] flex flex-col justify-start items-center px-6 sm:px-10 lg:px-14 xl:px-18 pt-24 sm:pt-32 pb-32 sm:pb-36 bg-black select-none overflow-x-hidden scroll-mt-20 sm:scroll-mt-24"
    >
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

        {/* Clean canvas ready to build */}
      </div>
    </section>
  );
};

export default TechStackMarquee;
