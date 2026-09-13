import React, { useEffect, useState } from 'react';
import { 
  X, 
  Terminal, 
  Briefcase, 
  GitPullRequest, 
  Layers, 
  Cpu, 
  Mail, 
  ExternalLink, 
  ArrowUpRight, 
  Star, 
  GitFork, 
  Calendar, 
  MapPin, 
  Check, 
  Copy, 
  Send,
  Sparkles,
  Database,
  FolderGit2
} from 'lucide-react';

export type SectionType = 'about' | 'experience' | 'opensource' | 'projects' | 'stack' | 'contact';

interface SectionModalProps {
  section: SectionType;
  onClose: () => void;
  onSelectSection?: (section: SectionType) => void;
}

export const SectionModal: React.FC<SectionModalProps> = ({ section, onClose, onSelectSection }) => {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');

  const emailAddress = "jaydeep@example.com";

  // Navigation tab definitions
  const tabs: { id: SectionType; label: string; icon: React.ReactNode }[] = [
    { id: 'about', label: 'About', icon: <Terminal className="w-3.5 h-3.5" /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: 'opensource', label: 'Open Source', icon: <GitPullRequest className="w-3.5 h-3.5" /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-3.5 h-3.5" /> },
    { id: 'stack', label: 'Stack', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-3.5 h-3.5" /> },
  ];

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scrolling while modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail) return;
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setContactName('');
      setContactEmail('');
      setContactMsg('');
    }, 3000);
  };

  // Experience Data
  const experiences = [
    {
      role: "Full Stack Software Engineer",
      company: "[Company / Organization Name]",
      period: "2024 — Present",
      location: "Remote / Hybrid",
      description: "Leading development of core web platforms, architecting performant React frontends and scalable backend API services.",
      achievements: [
        "Engineered scalable microservices handling high-throughput client requests.",
        "Refactored legacy UI components into a reusable, accessible design token system.",
        "Optimized client-side rendering pipelines, reducing initial load latency by 35%."
      ],
      skills: ["React 19", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"]
    },
    {
      role: "Frontend / Creative Developer",
      company: "[Previous Company / Startup]",
      period: "2023 — 2024",
      location: "Remote",
      description: "Built dynamic web interfaces, interactive animations, and responsive digital products for global clients.",
      achievements: [
        "Implemented 60 FPS motion transitions using GSAP and modern CSS layouts.",
        "Collaborated closely with product designers to translate Figma prototypes into pixel-perfect code.",
        "Integrated third-party REST and GraphQL endpoints with strict TypeScript typing."
      ],
      skills: ["Next.js", "GSAP", "Tailwind CSS", "REST APIs", "Git"]
    }
  ];

  // Open Source Data
  const openSourceProjects = [
    {
      name: "awesome-react-components",
      role: "Creator & Maintainer",
      stars: "240+",
      forks: "45",
      description: "A curated collection of micro-animated, accessible React and Tailwind UI primitives designed for rapid prototyping.",
      tags: ["TypeScript", "React", "Open Source"],
      link: "https://github.com",
    },
    {
      name: "developer-toolkit-cli",
      role: "Contributor",
      stars: "1.2k",
      forks: "180",
      description: "Contributed performance optimizations and CLI workflow enhancements to streamline local developer setup.",
      tags: ["Node.js", "CLI", "Developer Tools"],
      link: "https://github.com",
    },
    {
      name: "gsap-scroll-helpers",
      role: "Author",
      stars: "115+",
      forks: "18",
      description: "Lightweight utility wrapper for synchronizing Lenis smooth scroll with GSAP ScrollTrigger timelines effortlessly.",
      tags: ["GSAP", "Lenis", "JavaScript"],
      link: "https://github.com",
    }
  ];

  // Featured Projects Data
  const featuredProjects = [
    {
      title: "Hyperion Cloud Orchestrator",
      category: "Full Stack Web Application",
      description: "A distributed monitoring and resource orchestration dashboard featuring real-time websocket telemetry, interactive data visualizers, and role-based access control.",
      tags: ["React 19", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
      metrics: "Sub-10ms latency",
      liveUrl: "#",
      githubUrl: "https://github.com",
    },
    {
      title: "Cinematic Parallax Studio",
      category: "Creative Engineering & 3D Web",
      description: "An immersive multi-layer depth engine built with GSAP ScrollTrigger and Lenis smooth momentum physics, featuring foreground masking and dynamic responsive typography.",
      tags: ["Vite", "GSAP", "Lenis", "Tailwind CSS", "TypeScript"],
      metrics: "60 FPS Native",
      liveUrl: "#",
      githubUrl: "https://github.com",
    },
    {
      title: "Synthetix AI Design System",
      category: "UI System Architecture",
      description: "Production-ready enterprise UI component suite with accessible ARIA tokens, fluid dark-mode surfaces, and automated zero-runtime bundle tree-shaking.",
      tags: ["TypeScript", "Tailwind", "Radix UI", "Storybook"],
      metrics: "120+ Components",
      liveUrl: "#",
      githubUrl: "https://github.com",
    }
  ];

  // Tech Stack Data
  const techStack = [
    {
      title: "Frontend & Creative Tech",
      icon: <Layers className="w-5 h-5 text-blue-400" />,
      items: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "GSAP & ScrollTrigger", "Lenis Scroll", "HTML5 Canvas", "Three.js / WebGL"]
    },
    {
      title: "Backend & Systems",
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      items: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB", "Redis", "REST APIs", "GraphQL"]
    },
    {
      title: "DevOps, Tools & Architecture",
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      items: ["Git & GitHub", "Docker", "Linux / Bash", "Vite", "CI/CD Pipelines", "System Design", "Web Performance"]
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-200">
      {/* Dark Blurred Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-xl transition-opacity" 
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0d14] border border-white/15 rounded-2xl shadow-2xl shadow-black overflow-hidden flex flex-col z-10">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/10 bg-black/50">
          {/* Section Switcher Tabs */}
          <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            {tabs.map((tab) => {
              const isActive = section === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectSection?.(tab.id)}
                  className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 cursor-pointer ${
                    isActive 
                      ? 'bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/20' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 ml-2 rounded-lg bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition cursor-pointer flex items-center gap-1.5 text-xs font-mono shrink-0"
            aria-label="Close modal"
          >
            <span className="hidden sm:inline">Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 md:p-10 space-y-8 text-slate-200 scrollbar-thin scrollbar-thumb-white/20">
          
          {/* ================================================================= */}
          {/* 1. ABOUT ME                                                       */}
          {/* ================================================================= */}
          {section === 'about' && (
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.25em] text-blue-400 font-bold flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  <span>01 // Introduction</span>
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">Jaydeep</span>.
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  Full stack software engineer and creative developer building interactive digital products where engineering precision meets cinematic aesthetics.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass-panel p-5 rounded-xl border border-white/10 space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">What Drives Me</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Crafting web experiences that feel fast, intuitive, and alive. I focus on clean state management, modular architecture, and 60 FPS motion.
                  </p>
                </div>
                <div className="glass-panel p-5 rounded-xl border border-white/10 space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Current Status</h4>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-emerald-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Available for Full-time Roles & High-Impact Contracts</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Based in India • Working smoothly across global remote timezones.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* 2. EXPERIENCE                                                     */}
          {/* ================================================================= */}
          {section === 'experience' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-[0.25em] text-blue-400 font-bold flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>02 // Journey</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Work Experience
                </h2>
              </div>

              <div className="space-y-5">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="glass-panel p-6 rounded-xl border border-white/10 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-white/5 pb-3">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-white">{exp.role}</h3>
                        <p className="text-xs text-blue-300 font-medium">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {exp.period}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {exp.location}</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{exp.description}</p>
                    <ul className="space-y-1 text-xs text-slate-400">
                      {exp.achievements.map((a, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-2">
                          <span className="text-blue-400">•</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {exp.skills.map((s, sIdx) => (
                        <span key={sIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">{s}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* 3. OPEN SOURCE                                                    */}
          {/* ================================================================= */}
          {section === 'opensource' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-[0.25em] text-blue-400 font-bold flex items-center gap-2">
                  <GitPullRequest className="w-4 h-4" />
                  <span>03 // Community</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Open Source Contributions
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {openSourceProjects.map((oss, idx) => (
                  <div key={idx} className="glass-panel p-5 rounded-xl border border-white/10 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">{oss.role}</span>
                        <a href={oss.link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition"><ArrowUpRight className="w-4 h-4" /></a>
                      </div>
                      <h4 className="text-base font-bold text-white font-mono">{oss.name}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{oss.description}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-3 border-t border-white/5">
                      <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400" /> {oss.stars}</span>
                      <span className="flex items-center gap-1"><GitFork className="w-3.5 h-3.5 text-slate-500" /> {oss.forks}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* 4. PROJECTS                                                       */}
          {/* ================================================================= */}
          {section === 'projects' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-[0.25em] text-blue-400 font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>04 // Creations</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Featured Projects
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {featuredProjects.map((project, idx) => (
                  <div key={idx} className="glass-panel p-6 rounded-xl border border-white/10 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">{project.metrics}</span>
                        <span className="text-[11px] uppercase tracking-wider text-slate-400">{project.category}</span>
                      </div>
                      <h4 className="text-lg font-bold text-white">{project.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{project.description}</p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-white/5">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((t, tIdx) => (
                          <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300">{t}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 text-xs pt-1">
                        <a href={project.liveUrl} className="inline-flex items-center gap-1 text-slate-200 hover:text-white font-medium transition">
                          <span>Live Demo</span> <ExternalLink className="w-3 h-3" />
                        </a>
                        <span className="text-slate-600">•</span>
                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition">
                          Source Code
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* 5. TECH STACK                                                     */}
          {/* ================================================================= */}
          {section === 'stack' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-[0.25em] text-blue-400 font-bold flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>05 // Arsenal</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  My Tech Stack
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {techStack.map((cat, i) => (
                  <div key={i} className="glass-panel p-5 rounded-xl border border-white/10 space-y-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10">{cat.icon}</div>
                      <h4 className="text-sm font-bold text-white">{cat.title}</h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((item, idx) => (
                        <span key={idx} className="text-xs font-mono px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-200">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* 6. CONTACT ME                                                     */}
          {/* ================================================================= */}
          {section === 'contact' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-[0.25em] text-blue-400 font-bold flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>06 // Connect</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Get In Touch
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
                <div className="sm:col-span-5 space-y-4">
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Have an opportunity, an idea, or want to collaborate? Send me a message or copy my email directly.
                  </p>
                  <div className="glass-panel p-3.5 rounded-xl border border-white/10 flex items-center justify-between gap-2">
                    <span className="text-xs font-mono text-slate-300 truncate">{emailAddress}</span>
                    <button onClick={handleCopyEmail} className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition flex items-center gap-1 cursor-pointer shrink-0">
                      {copied ? <><Check className="w-3 h-3 text-emerald-400" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy</>}
                    </button>
                  </div>
                </div>

                <div className="sm:col-span-7">
                  <form onSubmit={handleFormSubmit} className="glass-panel p-5 rounded-xl border border-white/10 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input 
                        type="text" 
                        required 
                        placeholder="Your Name" 
                        value={contactName} 
                        onChange={(e) => setContactName(e.target.value)}
                        className="bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-400"
                      />
                      <input 
                        type="email" 
                        required 
                        placeholder="Your Email" 
                        value={contactEmail} 
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-400"
                      />
                    </div>
                    <textarea 
                      rows={3} 
                      required 
                      placeholder="Your Message..." 
                      value={contactMsg} 
                      onChange={(e) => setContactMsg(e.target.value)}
                      className="w-full bg-black/50 border border-white/15 rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-400 resize-none"
                    />
                    <button type="submit" disabled={formSent} className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition cursor-pointer">
                      {formSent ? <><Check className="w-3.5 h-3.5 text-emerald-300" /> Received!</> : <><Send className="w-3.5 h-3.5" /> Send Message</>}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
