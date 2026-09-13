import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  X, 
  Layers, 
  Activity 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlurReveal } from './ui/blur-reveal';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDetails: string;
  metrics: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  highlights: string[];
}

const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const projects: Project[] = [
  {
    id: "hyperion-telemetry",
    title: "Hyperion Cloud Orchestrator",
    category: "Distributed Systems & Telemetry",
    description: "High-throughput telemetry dashboard with bidirectional websocket streams and live node health triggers.",
    fullDetails: "Architected an end-to-end telemetry platform providing real-time infrastructure visibility, sub-millisecond metrics aggregation, and automated failover triggers for containerized clusters.",
    metrics: "Sub-15ms telemetry latency",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    tags: ["React 19", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
    liveUrl: "https://github.com/jaydeep869",
    githubUrl: "https://github.com/jaydeep869",
    highlights: [
      "Built resilient bidirectional websocket streams for live server node health.",
      "Optimized time-series chart rendering for 50,000+ continuous data points.",
      "Engineered role-based access control and token authentication."
    ]
  },
  {
    id: "cinematic-parallax",
    title: "Cinematic Parallax Engine",
    category: "Creative Engineering & 3D Web",
    description: "Physical foreground cutout masking with GSAP ScrollTrigger and Lenis smooth momentum physics.",
    fullDetails: "An immersive multi-layer depth engine with physical foreground cutout masking, dynamic typography occlusion, and smooth GPU-accelerated scroll synchronization.",
    metrics: "Locked 60 FPS compositor",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
    tags: ["GSAP", "Lenis", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://github.com/jaydeep869",
    githubUrl: "https://github.com/jaydeep869",
    highlights: [
      "Engineered zero-lag scrub physics across high-refresh mobile displays.",
      "Foreground alpha silhouette masking physically occluding towering typography.",
      "Modular layer controller supporting arbitrary depth planes."
    ]
  },
  {
    id: "synthetix-design-system",
    title: "Synthetix Design System",
    category: "Component Architecture",
    description: "Production design token architecture with automated tree-shaking and strict ARIA compliance.",
    fullDetails: "Enterprise UI component suite with fluid dark-mode surfaces, strict TypeScript props contracts, and high-performance micro-interactions.",
    metrics: "100+ reusable tokens",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80",
    tags: ["TypeScript", "Tailwind CSS", "Radix UI", "React"],
    liveUrl: "https://github.com/jaydeep869",
    githubUrl: "https://github.com/jaydeep869",
    highlights: [
      "Fully typed component props with automatic autocomplete and prop validation.",
      "Zero layout shift design tokens calibrated across desktop and mobile.",
      "Comprehensive keyboard navigation and screen-reader accessibility."
    ]
  },
  {
    id: "nexus-cache-kv",
    title: "Nexus High-Speed KV Engine",
    category: "Systems & Database Engineering",
    description: "Low-latency distributed key-value store with LSM-tree storage engine and Raft consensus.",
    fullDetails: "Engineered an in-memory key-value cache and persistent write-ahead log system capable of processing millions of concurrent read/write queries with minimal p99 tail latency.",
    metrics: "1.2M ops/sec throughput",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
    tags: ["C++", "Python", "Distributed Systems", "Networking"],
    liveUrl: "https://github.com/jaydeep869",
    githubUrl: "https://github.com/jaydeep869",
    highlights: [
      "Implemented log-structured merge-tree (LSM) engine with fast binary search index.",
      "Raft leader election and log replication across multi-node topologies.",
      "Comprehensive memory profiling eliminating heap fragmentation."
    ]
  },
  {
    id: "aura-ai-assistant",
    title: "Aura Semantic Code Agent",
    category: "AI & Developer Tooling",
    description: "Context-aware developer CLI and AST analysis assistant for rapid refactoring and bug discovery.",
    fullDetails: "Integrated semantic embeddings and code graph parsing into an autonomous terminal tool that analyzes multi-repo codebases, flags anti-patterns, and proposes verifiable patches.",
    metrics: "Sub-80ms AST query time",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    tags: ["Python", "TypeScript", "Tree-sitter", "Vector DB"],
    liveUrl: "https://github.com/jaydeep869",
    githubUrl: "https://github.com/jaydeep869",
    highlights: [
      "Built AST symbol extraction pipelines using Tree-sitter parsers.",
      "Embedded code chunks into local vector indices for semantic search.",
      "Engineered automated patch generation and test harness evaluation."
    ]
  }
];

export const ProjectCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = projects.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProject) return; // Don't intercept when modal is open
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, selectedProject]);

  // Mouse & Touch Drag handling
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setDragOffset(delta);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragOffset > 60) {
      prevSlide();
    } else if (dragOffset < -60) {
      nextSlide();
    }
    setDragOffset(0);
  };

  return (
    <section 
      id="projects" 
      className="relative w-full min-h-[100svh] flex flex-col justify-center items-center py-16 sm:py-24 overflow-hidden select-none bg-black"
    >
      {/* Subtle Background Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] pointer-events-none rounded-full blur-[140px] opacity-20"
        style={{ background: 'radial-gradient(circle, #3c4e5a 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-8 flex flex-col items-center">
        
        {/* Header Section: Matches ExperienceSection typography exactly, centered */}
        <div className="w-full pb-8 sm:pb-12 text-center">
          <BlurReveal delay={0}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-none font-['Space_Grotesk',sans-serif]">
              FEATURED PROJECTS
            </h2>
          </BlurReveal>
        </div>

        {/* 3D Stacked Carousel Stage */}
        <div 
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative w-full h-[290px] sm:h-[320px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
          style={{ perspective: '1200px' }}
        >
          {projects.map((project, idx) => {
            // Compute relative offset in circular ring
            let diff = idx - activeIndex;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isCenter = diff === 0;
            const isLeft = diff === -1;
            const isRight = diff === 1;
            const isVisible = Math.abs(diff) <= 2;

            if (!isVisible) return null;

            // Responsive offset calculations
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
            const xStep = isMobile ? 130 : 250;

            let translateX = 0;
            let translateY = 0;
            let rotateZ = 0;
            let scale = 1;
            let zIndex = 30;
            let opacity = 1;

            if (isCenter) {
              translateX = dragOffset * 0.4;
              translateY = 0;
              rotateZ = dragOffset * 0.03;
              scale = 1;
              zIndex = 30;
              opacity = 1;
            } else if (isLeft) {
              translateX = -xStep + dragOffset * 0.25;
              translateY = 16;
              rotateZ = -7;
              scale = 0.88;
              zIndex = 20;
              opacity = 0.7;
            } else if (isRight) {
              translateX = xStep + dragOffset * 0.25;
              translateY = 16;
              rotateZ = 7;
              scale = 0.88;
              zIndex = 20;
              opacity = 0.7;
            } else if (diff === -2) {
              translateX = (isMobile ? -210 : -420) + dragOffset * 0.15;
              translateY = 28;
              rotateZ = -14;
              scale = 0.78;
              zIndex = 10;
              opacity = 0.4;
            } else if (diff === 2) {
              translateX = (isMobile ? 210 : 420) + dragOffset * 0.15;
              translateY = 28;
              rotateZ = 14;
              scale = 0.78;
              zIndex = 10;
              opacity = 0.4;
            }

            return (
              <div
                key={project.id}
                onClick={() => {
                  if (Math.abs(dragOffset) > 10) return;
                  if (isCenter) {
                    setSelectedProject(project);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                style={{
                  transform: `translate3d(${translateX}px, ${translateY}px, 0px) scale(${scale}) rotate(${rotateZ}deg)`,
                  zIndex,
                  opacity,
                  transition: isDragging ? 'none' : 'transform 0.55s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.5s ease',
                  willChange: 'transform, opacity',
                }}
                className={`absolute w-[280px] sm:w-[340px] md:w-[370px] h-[235px] sm:h-[265px] rounded-2xl p-3 sm:p-3.5 flex flex-col overflow-hidden border transition-shadow duration-300 cursor-pointer ${
                  isCenter 
                    ? 'bg-[#0f1722]/95 border-[#9ab4c4]/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(60,78,90,0.4)] ring-1 ring-white/20' 
                    : 'bg-[#0a1017]/85 border-white/10 hover:border-white/25 shadow-xl hover:opacity-90'
                }`}
              >
                {/* Image Preview - Clean & Uncluttered */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/60 border border-white/10 group shrink-0">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Card Title & GitHub Icon - Centered vertically in remaining space */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="flex items-center justify-center gap-2.5 sm:gap-3 px-2 sm:px-3">
                    <h3 className="text-base sm:text-lg font-bold text-white font-['Space_Grotesk',sans-serif] tracking-tight truncate min-w-0">
                      {project.title}
                    </h3>

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition flex items-center justify-center shrink-0 cursor-pointer"
                      aria-label={`GitHub repository for ${project.title}`}
                      title="View GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Controls: Arrows & Micro Indicators */}
        <div className="flex items-center justify-center gap-6 mt-6 sm:mt-8 z-30">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 text-slate-300 hover:text-white transition cursor-pointer shadow-lg active:scale-95"
            aria-label="Previous Project"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Indicator Pills */}
          <div className="flex items-center gap-2">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to project ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex 
                    ? 'w-8 bg-[#9ab4c4]' 
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="p-3 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 text-slate-300 hover:text-white transition cursor-pointer shadow-lg active:scale-95"
            aria-label="Next Project"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Smooth Animated Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Animated Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-xl"
            />

            {/* Animated Modal Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 18 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              className="relative w-full max-w-2xl max-h-[88vh] bg-[#0c131a] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
            >
              {/* Modal Header — macOS-style traffic lights + title */}
              <div className="flex items-center gap-4 py-3.5 border-b border-white/10 bg-black/50" style={{ paddingLeft: 20, paddingRight: 20 }}>
                {/* Close (Red) */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] hover:bg-[#ff3b30] transition cursor-pointer flex items-center justify-center group"
                  aria-label="Close Modal"
                >
                  <X className="w-2 h-2 text-[#4a0002] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-white font-['Space_Grotesk',sans-serif] tracking-tight truncate flex-1">
                  {selectedProject.title}
                </h3>

                {/* GitHub Icon Link */}
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition flex items-center justify-center shrink-0 cursor-pointer"
                  aria-label={`GitHub repository for ${selectedProject.title}`}
                  title="View on GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>

              {/* Modal Body — Experience-section typography */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-200">
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Description — matching Experience section font sizing */}
                <div>
                  <p className="text-sm sm:text-[15px] text-slate-300 leading-[1.7]">
                    {selectedProject.fullDetails}
                  </p>
                </div>

                {/* Highlights — matching Experience section bullets exactly */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#a89f9a] font-semibold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#9ab4c4]" />
                    <span>Technical Highlights</span>
                  </span>
                  <ul className="space-y-3.5 m-0 p-0 list-none pt-1">
                    {selectedProject.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3.5 text-sm sm:text-[15px] text-slate-200 leading-[1.7]">
                        <span className="text-[#6a90a6] text-base mt-0.5 select-none shrink-0 font-bold">▹</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#a89f9a] font-semibold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#9ab4c4]" />
                    <span>Technologies</span>
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((t, i) => (
                      <span key={i} className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectCarousel;
