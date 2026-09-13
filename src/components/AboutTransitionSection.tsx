import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const AboutTransitionSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 35, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 30%',
            scrub: 0.6,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="relative w-full min-h-[100svh] h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-black"
    >
      <div className="w-full h-full min-h-[100svh] flex flex-col items-center justify-center px-6 sm:px-12 bg-black">
        <div ref={contentRef} className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center justify-center text-center select-none">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-white leading-tight">
            Hey, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">Jaydeep Pokhariya</span> here.
          </h2>

          <p className="mt-8 sm:mt-12 text-xl sm:text-2xl md:text-3xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto text-center px-4">
            I am a pre-final year student at <span className="text-white font-semibold">IIT BHU</span>, and an open source developer currently working on <span className="text-white font-semibold font-mono tracking-tight">darnit</span>.
          </p>

        </div>
      </div>
    </section>
  );
};

export default AboutTransitionSection;
