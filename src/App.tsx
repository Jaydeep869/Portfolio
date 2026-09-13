import { ContactSection } from './components/ContactSection';
import { Loader } from './components/Loader';
import { SocialSidebars } from './components/SocialSidebars';
import { ParallaxHero } from './components/ParallaxHero';
import { AboutTransitionSection } from './components/AboutTransitionSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectCarousel } from './components/ProjectCarousel';
import { Dock } from './components/ui/Dock';

export default function App() {
  const heroTitle = 'JAYDEEP';

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#3c4e5a] selection:text-white pb-24 md:pb-0">
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
        
        {/* Mobile Contact / Connect Page */}
        <ContactSection />

        {/* Minimalist Studio Footer */}
        <footer className="relative z-20 border-t border-white/10 py-8 px-6 text-center text-xs text-slate-500 font-mono bg-black">
          <p>© 2026 Jaydeep Pokhariya</p>
        </footer>
      </main>

      {/* macOS-style Floating Dock Navigation */}
      <Dock />

    </div>
  );
}
