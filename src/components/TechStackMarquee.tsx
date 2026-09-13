import React from 'react';
import { ExternalLink } from 'lucide-react';
import { BlurReveal } from './ui/blur-reveal';

interface TechItem {
  name: string;
  category: string;
  icon: React.ReactNode;
  color: string;
}

const frontendTech: TechItem[] = [
  {
    name: "React 19",
    category: "UI Engine",
    color: "#61DAFB",
    icon: (
      <svg className="w-6 h-6" viewBox="-11.5 -10.23174 23 20.46348" fill="#61DAFB">
        <circle cx="0" cy="0" r="2.05" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: "TypeScript",
    category: "Typed Logic",
    color: "#3178C6",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#3178C6"/>
        <path d="M12.5 10.5h-7v2.2h2.2v7h2.6v-7h2.2v-2.2zm4.7 4.2c-1.3-.2-2.1-.6-2.1-1.4 0-.8.7-1.3 1.9-1.3 1 0 1.9.4 2.4.9l1.3-1.6c-.9-.8-2.2-1.3-3.7-1.3-2.6 0-4.3 1.4-4.3 3.5 0 2.1 1.6 2.9 3.5 3.3 1.5.3 2.1.7 2.1 1.5 0 .9-.8 1.4-2.1 1.4-1.3 0-2.4-.5-3.1-1.3l-1.3 1.7c1.1 1.1 2.7 1.7 4.4 1.7 2.8 0 4.6-1.5 4.6-3.7-.1-2.2-1.7-3-3.6-3.4z" fill="#ffffff"/>
      </svg>
    ),
  },
  {
    name: "Next.js 15",
    category: "Fullstack Framework",
    color: "#ffffff",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 180 180" fill="none">
        <mask id="next-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
          <circle cx="90" cy="90" r="90" fill="black" />
        </mask>
        <g mask="url(#next-mask)">
          <circle cx="90" cy="90" r="90" fill="#000000" stroke="#333333" strokeWidth="6" />
          <path d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z" fill="#ffffff" />
          <rect x="115" y="54" width="12" height="72" fill="#ffffff" />
        </g>
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    color: "#38BDF8",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#38BDF8">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/>
      </svg>
    ),
  },
  {
    name: "GSAP 3",
    category: "Creative Motion",
    color: "#88CE02",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="20" fill="#0b0f14" stroke="#88CE02" strokeWidth="6"/>
        <text x="50" y="65" fill="#88CE02" fontSize="38" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">G</text>
      </svg>
    ),
  },
  {
    name: "Three.js",
    category: "WebGL / 3D",
    color: "#ffffff",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.7">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "Vite",
    category: "Build Engine",
    color: "#BD34FE",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path d="M21.5 4.5l-9.2 16.8c-.3.5-1 .6-1.4.1L2.5 7.9c-.4-.5-.1-1.2.6-1.3l17.4-2.5c.6-.1 1.2.4 1 1z" fill="#BD34FE"/>
        <path d="M13.2 2.8l-7 1.2c-.5.1-.7.7-.4 1.1l7.8 11.2c.4.6 1.4.3 1.4-.4l.8-12.2c0-.5-.5-.9-.9-.8z" fill="#FFD62E"/>
      </svg>
    ),
  },
  {
    name: "HTML5 Canvas",
    category: "Graphics",
    color: "#E34F26",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#E34F26" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8.5" cy="8.5" r="1.5" fill="#E34F26" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
  },
  {
    name: "Lenis",
    category: "Momentum Physics",
    color: "#9ab4c4",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#9ab4c4" strokeWidth="2">
        <path d="M12 3v18M6 8l6-5 6 5M6 16l6 5 6-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  }
];

const backendTech: TechItem[] = [
  {
    name: "Node.js",
    category: "Runtime",
    color: "#5FA04E",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l9 5.2v10.4L12 22l-9-5.2V7.2L12 2z" />
      </svg>
    ),
  },
  {
    name: "Express.js",
    category: "Backend",
    color: "#ffffff",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
      </svg>
    ),
  },
  {
    name: "Go (Golang)",
    category: "Systems",
    color: "#00ADD8",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.97 14.28c0 .24.18.42.42.42h2.24c.24 0 .42-.18.42-.42v-2.24c0-.24-.18-.42-.42-.42H2.39c-.24 0-.42.18-.42.42v2.24zm0-5.71c0 .24.18.42.42.42h2.24c.24 0 .42-.18.42-.42V6.33c0-.24-.18-.42-.42-.42H2.39c-.24 0-.42.18-.42.42v2.24zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
      </svg>
    ),
  },
  {
    name: "Python",
    category: "ML & Scripting",
    color: "#3776AB",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.91 2C6.98 2 7.3 4.14 7.3 4.14L7.31 6.35H12v.63H5.2S2 6.62 2 11.55c0 4.93 2.79 4.75 2.79 4.75h1.66V13.9s-.09-2.88 2.84-2.88h4.88s2.73.04 2.73-2.65V4.65s.38-2.65-4.99-2.65zm-2.73 1.54a.88.88 0 1 1 0 1.76.88.88 0 0 1 0-1.76zM12.09 22c4.93 0 4.61-2.14 4.61-2.14l-.01-2.21H12v-.63h6.8s3.2.36 3.2-4.57c0-4.93-2.79-4.75-2.79-4.75h-1.66v2.4s.09 2.88-2.84 2.88H9.83s-2.73-.04-2.73 2.65v3.72s-.38 2.65 4.99 2.65zm2.73-1.54a.88.88 0 1 1 0-1.76.88.88 0 0 1 0 1.76z" />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    category: "Relational DB",
    color: "#4169E1",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
      </svg>
    ),
  },
  {
    name: "MongoDB",
    category: "NoSQL DB",
    color: "#47A248",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
  },
  {
    name: "Docker",
    category: "Containerization",
    color: "#2496ED",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.98 11.08h1.94v1.94h-1.94zm-2.91 0h1.94v1.94h-1.94zm-2.91 0h1.94v1.94H8.16zm-2.91 0h1.94v1.94H5.25zm5.82-2.91h1.94v1.94h-1.94zm-2.91 0h1.94v1.94H8.16zm5.82 0h1.94v1.94h-1.94zm-8.73 0h1.94v1.94H5.25zm8.73-2.91h1.94v1.94h-1.94zM22.5 12.5c-.32-.23-1.07-.33-1.83-.06-.17-.79-.69-1.44-1.33-1.87l-.52-.35-.35.52c-.38.56-.47 1.34-.33 2.05-.59.33-1.41.43-2.31.32l-.4-.05-.18.36c-.53 1.05-1.43 1.83-2.51 2.22H1.5v.75C1.5 19.53 4.47 22.5 8.1 22.5c5.34 0 9.77-3.4 11.03-8.24 1.11.16 2.37-.15 3.12-1.04l.25-.32-.25-.4z" />
      </svg>
    ),
  },
  {
    name: "Git & GitHub",
    category: "Version Control",
    color: "#F05032",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
      </svg>
    ),
  },
  {
    name: "Firebase",
    category: "BaaS & Auth",
    color: "#FFCA28",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.06 14.19L6.15 1.09a.74.74 0 0 1 1.34-.3l3.05 5.86-6.48 7.54zm15.88 0l-1.57-9.92a.74.74 0 0 0-1.29-.39L3.48 18.06l7.8 4.38a1.5 1.5 0 0 0 1.44 0l7.22-4.06-2-4.19zM12.92 9.07l-2.07-4a.75.75 0 0 0-1.33.02L7.6 9.07l5.32 0z" />
      </svg>
    ),
  },
  {
    name: "FastAPI",
    category: "ML Inference APIs",
    color: "#05998B",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
  }
];

export const TechStackMarquee: React.FC = () => {
  return (
    <section 
      id="stack" 
      className="relative w-full min-h-[100svh] flex flex-col justify-start items-center px-6 sm:px-10 lg:px-14 xl:px-18 pt-24 sm:pt-32 pb-32 sm:pb-36 bg-black select-none overflow-x-hidden scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Subtle Background Glow */}
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
        <div className="hidden md:block w-screen relative left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none mb-12 sm:mb-16" />
        <div className="block md:hidden w-full h-[1.5px] bg-[#857b76]/60 mb-10" />

        {/* Categories Stack with Generous Spacing and Breathing Room */}
        <div className="w-full space-y-12 sm:space-y-16">
          {/* Frontend & Creative Engineering */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#9ab4c4] font-semibold">
                Frontend & Creative Engineering
              </h3>
              <div className="flex-1 h-[1px] bg-white/10" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
              {frontendTech.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-3.5 px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl bg-[#0c131a]/85 border border-white/10 hover:border-[#9ab4c4]/60 hover:bg-[#121c27] transition-all duration-300 group shadow-md hover:shadow-[0_0_20px_rgba(60,78,90,0.35)]"
                >
                  <div className="shrink-0 transition-transform duration-300 group-hover:scale-110">
                    {tech.icon}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-white font-mono leading-tight truncate">
                      {tech.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
                      {tech.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Backend, Systems, DB & Cloud */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#9ab4c4] font-semibold">
                Backend, Systems, DB & Cloud
              </h3>
              <div className="flex-1 h-[1px] bg-white/10" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
              {backendTech.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-3.5 px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl bg-[#0c131a]/85 border border-white/10 hover:border-[#9ab4c4]/60 hover:bg-[#121c27] transition-all duration-300 group shadow-md hover:shadow-[0_0_20px_rgba(60,78,90,0.35)]"
                >
                  <div className="shrink-0 transition-transform duration-300 group-hover:scale-110">
                    {tech.icon}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-white font-mono leading-tight truncate">
                      {tech.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
                      {tech.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* GitHub Contribution Graph Section with Authentic Green & Generous Gap */}
        <div className="w-full mt-20 sm:mt-24">
          <div className="p-6 sm:p-10 rounded-3xl bg-[#0a1017]/90 border border-white/15 backdrop-blur-2xl shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-white/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#39d353] shadow-[0_0_10px_#39d353] animate-pulse" />
                  <h3 className="text-lg sm:text-2xl font-bold text-white font-['Space_Grotesk',sans-serif]">
                    GitHub Contributions
                  </h3>
                </div>
                <p className="text-xs sm:text-sm font-mono text-slate-400">
                  @Jaydeep869 · Annual Open Source & Engineering Activity
                </p>
              </div>
              <a
                href="https://github.com/Jaydeep869"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#39d353]/50 text-xs sm:text-sm font-mono text-slate-300 hover:text-white transition-all w-fit cursor-pointer group"
              >
                <span>View GitHub Profile</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#39d353] transition-colors" />
              </a>
            </div>

            {/* GitHub Activity SVG Graph with Vibrant GitHub Green (#39d353) */}
            <div className="pt-8 sm:pt-10 pb-4 flex flex-col items-center justify-center overflow-x-auto [&::-webkit-scrollbar]:hidden">
              <img
                src="https://ghchart.rshah.org/39d353/Jaydeep869"
                alt="Jaydeep869 GitHub Contributions"
                className="w-full max-w-4xl min-w-[650px] opacity-95 hover:opacity-100 transition-opacity filter drop-shadow-[0_0_20px_rgba(57,211,83,0.18)]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackMarquee;
