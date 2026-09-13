import React, { useState } from 'react';
import { AtmosphericBackground } from './AtmosphericBackground';
import { 
  ArrowUpRight, 
  Layers, 
  Cpu, 
  ExternalLink, 
  Mail,
  Sparkles,
  Check,
  Copy,
  Terminal,
  Send,
  Database,
  Briefcase,
  Calendar,
  MapPin,
  GitPullRequest,
  Star,
  GitFork
} from 'lucide-react';
import { socialLinks } from './SocialSidebars';

export const PortfolioContent: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');

  const emailAddress = "jaydeep@example.com"; // Replace with your actual email

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
    }, 3500);
  };

  // 1. Experience Timeline Data
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
      skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"]
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

  // 2. Open Source Contributions Data
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

  // 3. Featured Projects Data
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

  // 4. Tech Stack Categories
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
    <div className="relative z-30 bg-[#030407] text-slate-100 min-h-screen px-4 sm:px-8 md:px-12 lg:px-20 py-16 sm:py-24 overflow-hidden">
      {/* 21st.dev inspired Atmospheric Mountain Topography & Light Beams Background */}
      <AtmosphericBackground />

      <div className="relative z-10 max-w-5xl mx-auto space-y-28 sm:space-y-36">

        {/* ========================================================================= */}
        {/* PHASE 1: INTRODUCTION ABOUT MYSELF                                        */}
        {/* ========================================================================= */}
        <section id="about" className="scroll-mt-24 space-y-8">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-blue-400 font-bold">
            <Terminal className="w-4 h-4" />
            <span>01 // Introduction</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Hey, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">Jaydeep</span>.
                <br />
                I architect high-performance software and craft fluid web experiences.
              </h2>
              
              <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                <p>
                  I am a full stack developer driven by crafting digital products where engineering precision meets immersive visual taste. I specialize in building reactive, accessible web applications, scalable backend systems, and smooth, interactive motion interfaces.
                </p>
                <p className="text-slate-400">
                  Whether developing full-stack architectures, optimizing client-side performance pipelines, or contributing to open-source developer tooling, I love solving complex technical problems and building things people enjoy using.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-300 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Available for Full-time Roles & High-Impact Projects</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-xs text-blue-300 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>Open Source Contributor</span>
                </div>
              </div>
            </div>

            {/* Profile Highlight Card */}
            <div className="lg:col-span-4 glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold border-b border-white/10 pb-3 flex items-center justify-between">
                <span>Quick Snapshot</span>
                <span className="text-emerald-400 font-mono text-[11px]">● Active</span>
              </div>
              <div className="space-y-3.5 text-xs sm:text-sm">
                <div>
                  <span className="text-slate-500 block text-[11px] uppercase tracking-wider">Name</span>
                  <span className="font-semibold text-white">Jaydeep</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px] uppercase tracking-wider">Role</span>
                  <span className="font-semibold text-slate-200">Full Stack Engineer & Creative Dev</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px] uppercase tracking-wider">Core Arsenal</span>
                  <span className="font-semibold text-slate-200">TypeScript, React, Node.js, GSAP</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px] uppercase tracking-wider">Location</span>
                  <span className="font-semibold text-slate-200">India • Remote Worldwide</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHASE 2: EXPERIENCE                                                       */}
        {/* ========================================================================= */}
        <section id="experience" className="scroll-mt-24 space-y-10">
          <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-blue-400 font-bold">02 // Journey</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 text-white">
                Work Experience
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md">
              My engineering track record, roles held, and key technical achievements.
            </p>
          </div>

          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/30 transition-all duration-300 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>{exp.role}</span>
                    </h3>
                    <p className="text-sm font-medium text-slate-300 mt-0.5">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {exp.description}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Key Highlights:</span>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                    {exp.achievements.map((item, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2.5">
                        <span className="text-blue-400 text-base leading-none">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHASE 3: OPEN SOURCE EXPERIENCE                                           */}
        {/* ========================================================================= */}
        <section id="opensource" className="scroll-mt-24 space-y-10">
          <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-blue-400 font-bold">03 // Community</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 text-white">
                Open Source Contributions
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md">
              Giving back to the developer ecosystem through maintained libraries, bug fixes, and developer tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {openSourceProjects.map((oss, idx) => (
              <div
                key={idx}
                className="group glass-panel rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      <GitPullRequest className="w-3 h-3" />
                      <span>{oss.role}</span>
                    </span>
                    <a
                      href={oss.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="View on GitHub"
                      className="text-slate-500 group-hover:text-white transition"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white font-mono group-hover:text-blue-300 transition">
                      {oss.name}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mt-2">
                      {oss.description}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400" />
                      {oss.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-slate-500" />
                      {oss.forks}
                    </span>
                  </div>

                  <div className="flex gap-1">
                    {oss.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHASE 4: FEATURED PROJECTS                                                */}
        {/* ========================================================================= */}
        <section id="projects" className="scroll-mt-24 space-y-10">
          <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-blue-400 font-bold">04 // Creations</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 text-white">
                Featured Projects
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md">
              Flagship software applications, creative experiments, and enterprise architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project, idx) => (
              <div
                key={idx}
                className="group glass-panel rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-blue-500/40 hover:bg-white/[0.03] transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                      {project.metrics}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1 group-hover:text-blue-300 transition">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4 pt-6 mt-6 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono text-slate-300 bg-white/5 px-2 py-0.5 rounded border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-2 text-xs">
                    <a
                      href={project.liveUrl}
                      className="inline-flex items-center gap-1 text-slate-300 hover:text-white font-medium transition"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="text-slate-600">•</span>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-white transition"
                    >
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHASE 5: TECH STACK & ARSENAL                                             */}
        {/* ========================================================================= */}
        <section id="stack" className="scroll-mt-24 space-y-10">
          <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-blue-400 font-bold">05 // Arsenal</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 text-white">
                My Tech Stack
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md">
              Languages, frameworks, and tools I leverage daily to engineer robust software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techStack.map((category, i) => (
              <div
                key={i}
                className="glass-panel rounded-2xl p-6 sm:p-7 space-y-5 border border-white/5 hover:border-white/20 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shrink-0">
                    {category.icon}
                  </div>
                  <h3 className="text-base font-bold text-white">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* PHASE 6: CONTACT ME                                                       */}
        {/* ========================================================================= */}
        <section id="contact" className="scroll-mt-24 space-y-10">
          <div className="border-b border-white/10 pb-6">
            <span className="text-xs uppercase tracking-[0.25em] text-blue-400 font-bold">06 // Connect</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 text-white">
              Get In Touch
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Direct Info & Copy Button */}
            <div className="lg:col-span-5 space-y-6">
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Whether you have an opportunity, a technical question, or want to collaborate on open-source software, feel free to reach out. I'll get back to you promptly!
              </p>

              <div className="glass-panel rounded-xl p-4 flex items-center justify-between gap-3 border border-white/10">
                <div className="flex items-center gap-3 min-w-0">
                  <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-mono text-slate-200 truncate">
                    {emailAddress}
                  </span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium flex items-center gap-1.5 text-white transition active:scale-95 shrink-0 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-2 text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Timezone: IST (UTC+5:30) • Flexible for global teams</span>
                </div>
                <div>Available for remote contracts, engineering roles, and consulting.</div>
              </div>
            </div>

            {/* Right Column: Contact Message Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleFormSubmit} className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4 border border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-slate-400 font-medium">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Alex"
                      className="w-full bg-black/40 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-slate-400 font-medium">Your Email</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full bg-black/40 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-slate-400 font-medium">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    placeholder="Hi Jaydeep, I'd like to talk about..."
                    className="w-full bg-black/40 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formSent}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm flex items-center justify-center gap-2 transition cursor-pointer active:scale-95 disabled:opacity-60"
                >
                  {formSent ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Message Received!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 pt-12 pb-28 md:pb-16 flex flex-col md:flex-row items-center justify-between gap-8 text-sm text-slate-400">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-center md:text-left order-2 md:order-1">
            <span className="font-mono text-xs text-slate-300 font-semibold tracking-wider">
              JAYDEEP // PORTFOLIO
            </span>
            <span className="text-slate-600 hidden md:inline">•</span>
            <span className="text-xs text-slate-500">© 2026 Jaydeep. Crafted with React, GSAP & Lenis.</span>
          </div>

          <div className="flex flex-col items-center gap-4 order-1 md:order-2 md:hidden">
            <div className="flex items-center gap-4">
              {socialLinks.map(({ name, url, icon }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition"
                >
                  {icon}
                </a>
              ))}
            </div>
            <a
              href="mailto:jaydeeppokhariya2106@gmail.com"
              className="text-[11px] font-mono text-slate-400 hover:text-blue-400 transition-colors"
            >
              jaydeeppokhariya2106@gmail.com
            </a>
          </div>
        </footer>

      </div>
    </div>
  );
};
