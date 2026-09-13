import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  FolderGit2, 
  X, 
  Layers, 
  Check, 
  Activity, 
  Maximize2 
} from 'lucide-react';

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
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
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
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
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
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
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
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
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
    liveUrl: "https://github.com",
    githubUrl: "https://github.com",
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
      className="relative w-full min-h-[100svh] flex flex-col justify-center items-center py-16 sm:py-24 overflow-hidden select-none"
    >
      {/* Subtle Background Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] pointer-events-none rounded-full blur-[140px] opacity-25"
        style={{ background: 'radial-gradient(circle, #3c4e5a 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-8 flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center space-y-2 mb-10 sm:mb-14">
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#9ab4c4] font-semibold">
            03 // Featured Works
          </span>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Selected Projects
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Interactive 3D stacked deck • Drag or click side cards to cycle • Tap center card for details
          </p>
        </div>

        {/* 3D Stacked Carousel Stage */}
        <div 
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative w-full h-[380px] sm:h-[430px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
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
            const isFarLeft = diff === -2;
            const isFarRight = diff === 2;
            const isVisible = Math.abs(diff) <= 2;

            if (!isVisible) return null;

            // Responsive offset calculations
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
            const xStep = isMobile ? 130 : 250;
            const farXStep = isMobile ? 220 : 420;

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
              translateY = 18;
              rotateZ = -8;
              scale = 0.88;
              zIndex = 20;
              opacity = 0.75;
            } else if (isRight) {
              translateX = xStep + dragOffset * 0.25;
              translateY = 18;
              rotateZ = 8;
              scale = 0.88;
              zIndex = 20;
              opacity = 0.75;
            } else if (isFarLeft) {
              translateX = -farXStep;
              translateY = 36;
              rotateZ = -14;
              scale = 0.76;
              zIndex = 10;
              opacity = 0.35;
            } else if (isFarRight) {
              translateX = farXStep;
              translateY = 36;
              rotateZ = 14;
              scale = 0.76;
              zIndex = 10;
              opacity = 0.35;
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
                className={`absolute w-[290px] sm:w-[350px] md:w-[380px] h-[340px] sm:h-[390px] rounded-2xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden border transition-shadow duration-300 ${
                  isCenter 
                    ? 'bg-[#0f1722]/95 border-[#9ab4c4]/60 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(60,78,90,0.4)] ring-1 ring-white/20' 
                    : 'bg-[#0a1017]/85 border-white/10 hover:border-white/25 shadow-xl hover:opacity-90'
                }`}
              >
                <div className="space-y-3 sm:space-y-4">
                  {/* Image Preview */}
                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black/60 border border-white/10 group">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                    
                    {/* Metrics Tag */}
                    <span className="absolute bottom-2.5 left-3 px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/75 backdrop-blur-md text-[#9ab4c4] border border-white/10">
                      {project.metrics}
                    </span>

                    {isCenter && (
                      <span className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white/80 hover:text-white border border-white/10 flex items-center justify-center">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  {/* Text Content */}
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      {project.category}
                    </span>
                    <h4 className="text-base sm:text-xl font-bold text-white mt-0.5 leading-snug line-clamp-1">
                      {project.title}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1.5 line-clamp-2 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {isCenter ? (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="text-xs font-mono font-medium text-[#9ab4c4] hover:text-white transition flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-500">Tap to view</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Controls & Pagination */}
        <div className="flex items-center gap-6 mt-8 sm:mt-10">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full bg-white/[0.06] hover:bg-white/[0.14] border border-white/15 text-slate-300 hover:text-white transition cursor-pointer shadow-lg active:scale-95"
            aria-label="Previous Slide"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
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
            aria-label="Next Slide"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Project Detail Modal Drawer */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div 
            onClick={() => setSelectedProject(null)}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          <div className="relative w-full max-w-2xl max-h-[88vh] bg-[#0c131a] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/50">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-[#9ab4c4]" />
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                  {selectedProject.category}
                </span>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-200">
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedProject.title}
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {selectedProject.fullDetails}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#9ab4c4]" />
                  <span>Technical Highlights</span>
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {selectedProject.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
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

              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-[#3c4e5a] hover:bg-[#4d6373] text-white text-xs font-medium transition flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-medium transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <span>Source Code</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectCarousel;
