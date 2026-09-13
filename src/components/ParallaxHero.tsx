import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

interface ParallaxHeroProps {
  title?: string;
}

export const ParallaxHero: React.FC<ParallaxHeroProps> = ({
  title = "JAYDEEP",
}) => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector<HTMLElement>('[data-parallax-layers]');

    if (triggerElement) {
      const isMobile = window.innerWidth < 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: true, // Direct 1:1 instantaneous scrub eliminates trailing float/extra lag in either direction
        },
      });

      // Calibrated layer percentages matching official specs with responsive mobile balance
      const layers = isMobile
        ? [
            { layer: "1", yPercent: 40 },
            { layer: "2", yPercent: 28 },
            { layer: "3", yPercent: 18 },
            { layer: "4", yPercent: 6 },
          ]
        : [
            { layer: "1", yPercent: 70 },
            { layer: "2", yPercent: 55 },
            { layer: "3", yPercent: 40 },
            { layer: "4", yPercent: 10 },
          ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: "none",
          },
          idx === 0 ? undefined : "<"
        );
      });
    }

    // Fade out scroll indicator on first scroll
    if (scrollIndicatorRef.current && parallaxRef.current) {
      gsap.to(scrollIndicatorRef.current, {
        opacity: 0,
        y: 15,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: 'top top',
          end: '10% top',
          scrub: true,
        },
      });
    }

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      syncTouch: false, // Disables synthetic touch hijacking so mobile runs native 60-120Hz compositor scrolling
    });

    lenis.on('scroll', ScrollTrigger.update);
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (triggerElement) gsap.killTweensOf(triggerElement);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="parallax" ref={parallaxRef}>
      <section className="parallax__header">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow" />

          {/* Parallax Layers */}
          <div data-parallax-layers className="parallax__layers">
            {/* Layer 1: Sky & Sun (with PC eye-friendly brightness toning) */}
            <div data-parallax-layer="1" className="parallax__sky-wrapper">
              <img
                src="/assets/parallax/sky.webp"
                loading="eager"
                alt="Sky with sun and celestial atmosphere"
                className="parallax__layer-img parallax__sky-img select-none"
              />
              {/* Eye-friendly softening overlay to prevent harsh sun glare on PC monitors */}
              <div className="parallax__sun-softener" />
            </div>

            {/* Layer 2: Mountain Ridge */}
            <img
              src="/assets/parallax/mountains.webp"
              loading="eager"
              alt="Mountain range"
              data-parallax-layer="2"
              className="parallax__layer-img select-none"
            />

            {/* Layer 3: Bold Typography positioned physically behind the person */}
            <div data-parallax-layer="3" className="parallax__layer-title" style={{ zIndex: 3 }}>
              <h2 className="parallax__title">
                {title}
              </h2>
            </div>

            {/* Layer 4: Foreground Subject Cutout (Person on ridge) - strictly in front of Title */}
            <img
              src="/assets/parallax/foreground.webp"
              loading="eager"
              alt="Observer silhouette on cliff"
              data-parallax-layer="4"
              className="parallax__layer-img select-none"
              style={{ zIndex: 10 }}
            />
          </div>

          {/* Vignette fade into subsequent portfolio sections */}
          <div className="parallax__fade" />

          {/* Ambient vignette gradient */}
          <div className="parallax__ambient-vignette" />

          {/* Subtle Floating Scroll Prompt */}
          <div
            ref={scrollIndicatorRef}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1.5 pointer-events-none text-slate-400"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-slate-400/90">
              Scroll
            </span>
            <div className="w-5 h-8 rounded-full border border-slate-500/30 flex items-start justify-center p-1 backdrop-blur-sm bg-black/30">
              <div className="w-1 h-2 bg-slate-300 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
