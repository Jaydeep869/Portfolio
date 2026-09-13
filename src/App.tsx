import { useState } from 'react';
import { Loader } from './components/Loader';
import { SocialSidebars } from './components/SocialSidebars';
import { ParallaxHero } from './components/ParallaxHero';
import { AboutTransitionSection } from './components/AboutTransitionSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectCarousel } from './components/ProjectCarousel';
import { TechStackMarquee } from './components/TechStackMarquee';
import { ContactCards } from './components/ContactCards';
import { Dock } from './components/ui/Dock';
import { Ghost404 } from './components/Ghost404';

export default function App() {
  const heroTitle = 'JAYDEEP';
  const [show404, setShow404] = useState(false);

  if (show404) {
    return <Ghost404 onReturnHome={() => setShow404(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#3c4e5a] selection:text-white pb-24">
      {/* Intro Hexagon Stroke Drawing Loader (jaydeep-pi.vercel.app style) */}
      <Loader />

      {/* Fixed Left & Right Vertical Social/Email Sidebars with baseline lines */}
      <SocialSidebars />

      {/* 1. Main Parallax Summit Hero */}
      <main id="hero" className="relative">
        <ParallaxHero title={heroTitle} />

        {/* 2. About Me Post-Scroll with #3c4e5a Radial Gradient */}
        <AboutTransitionSection />

        {/* 3. Centered Experience Section (Interactive Tabs & All-Internships Overview) */}
        <ExperienceSection />

        {/* 4. Featured Projects Horizontal Carousel (carousel-07 3D stacked deck) */}
        <ProjectCarousel />

        {/* 5. Automated Dual-Line Tech Stack Marquee (logo-marquee) */}
        <TechStackMarquee />

        {/* 6. Contact Row & Messaging */}
        <ContactCards />

        {/* Minimalist Studio Footer */}
        <footer className="relative z-20 border-t border-white/10 py-10 px-6 text-center text-xs text-slate-500 font-mono space-y-3">
          <p>© 2026 Jaydeep Pokhariya • IIT (BHU) Varanasi</p>
          <div className="flex items-center justify-center gap-4 text-[11px]">
            <span>Engineered with React 19, GSAP & Tailwind CSS</span>
            <span>•</span>
            <button
              onClick={() => setShow404(true)}
              className="text-slate-400 hover:text-white underline underline-offset-4 cursor-pointer transition"
            >
              Preview Ghost 404 Page
            </button>
          </div>
        </footer>
      </main>

      {/* macOS-style Floating Dock Navigation */}
      <Dock />

    </div>
  );
}
