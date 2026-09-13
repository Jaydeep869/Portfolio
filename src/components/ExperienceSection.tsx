import React from 'react';
import { cn } from '../lib/utils';
import { ExternalLink } from 'lucide-react';
import { BlurReveal } from './ui/blur-reveal';

interface ExperienceItemData {
  company: string;
  tagline: string;
  period: string;
  position: string;
  location: string;
  industry: string;
  website?: string;
  websiteUrl?: string;
  image: string;
  description: string[];
}

const experiences: ExperienceItemData[] = [
  {
    company: 'OpenSSF',
    tagline: 'Linux Foundation',
    period: 'Jun 2026 — Aug 2026',
    position: 'LFX Mentee',
    location: 'Remote · New York, USA',
    industry: 'Supply Chain Security',
    website: 'openssf.org',
    websiteUrl: 'https://openssf.org',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1760&auto=format&fit=crop',
    description: [
      'Architected reusable library capabilities to prototype SBOMit natively inside Trivy and Syft workflows, with improved npm, Yarn, and pnpm package dependency resolution.',
      'Strengthened software supply chain visibility with SBOMit, combining static dependency inventories with runtime provenance captured from in-toto Witness attestations.',
      'Contributed critical upstream fixes to go-witness: resolved child-process tracing cleanup, handled Archivista nil-client panics, and patched cross-architecture Linux ptrace syscall tracing.',
      'Built native Trivy cataloger integration for automated SPDX SBOM generation with Protobom parsing and attestation-derived metadata enrichment.',
    ],
  },
  {
    company: 'HUVO AI',
    tagline: 'Conversational AI & Voice Agents',
    period: 'Oct 2025 — Dec 2025',
    position: 'AI Engineering Intern',
    location: 'Remote · Bengaluru, India',
    industry: 'Voice AI & LLM Systems',
    website: 'huvo.ai',
    websiteUrl: 'https://huvo.ai',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1760&auto=format&fit=crop',
    description: [
      'Architected idempotent billing infrastructure and subscription webhooks with Azure Functions and PostgreSQL to handle distributed async payment state transitions.',
      'Built low-latency Pipecat conversational voice-booking workflows with 3 custom LLM tool definitions orchestrated across 5 adaptive conversation states.',
      'Authored and tuned production LLM prompts generating strictly validated JSON schemas across 4 core business analytics domains.',
    ],
  },
  {
    company: 'Beckkon Technologies',
    tagline: 'Scalable Enterprise Web Architectures',
    period: 'May 2026 — Jul 2026',
    position: 'Software Developer Intern',
    location: 'Onsite · IIT BHU, Varanasi',
    industry: 'Full-Stack & Cloud Systems',
    website: 'beckkon.com',
    websiteUrl: 'https://beckkon.com',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1760&auto=format&fit=crop',
    description: [
      'Developed high-throughput Go REST microservices with connection pooling and query optimization for real-time data access.',
      'Built responsive React enterprise operational dashboards integrated with Express APIs and MongoDB for real-time monitoring and data management.',
      'Implemented end-to-end authentication, rigorous API payload validation, and modular backend libraries following production engineering standards.',
    ],
  },
  {
    company: 'IIT (BHU), Varanasi',
    tagline: 'Dept. of Mining Engineering Research',
    period: 'Mar 2026 — Jun 2026',
    position: 'Research Assistant',
    location: 'Onsite · IIT BHU, Varanasi',
    industry: 'Applied ML & Geotechnical Safety',
    website: 'iitbhu.ac.in',
    websiteUrl: 'https://iitbhu.ac.in',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1760&auto=format&fit=crop',
    description: [
      'Developed BlastWatcher platform featuring 9 REST APIs, Firebase Authentication, and FastAPI-based ML inference pipelines for automated blast vibration analysis.',
      'Structured predictive data workflows across 4 MongoDB collections with strict role-based access control (RBAC) and audit logging.',
      'Integrated log-linear Peak Particle Velocity (PPV) regression models to predict ground vibration safety limits from blasting records.',
    ],
  },
];

/* =========================================================================
   1. DESKTOP EXPERIENCE ROW (PC): 3-Column layout with subtle fading lines
   ========================================================================= */
const DesktopExperienceRow: React.FC<{ item: ExperienceItemData }> = ({ item }) => {
  return (
    <div className="relative group transition-colors duration-300 py-12 lg:py-16 xl:py-20">
      {/* Complete Horizontal Width Hover Image */}
      <img
        src={item.image}
        alt={item.company}
        loading="lazy"
        className="w-screen absolute top-0 left-1/2 -translate-x-1/2 h-full object-cover opacity-0 group-hover:opacity-15 transition-opacity duration-500 ease-out pointer-events-none"
      />

      {/* Complete Horizontal Width Dark Overlay */}
      <div className="w-screen absolute top-0 left-1/2 -translate-x-1/2 h-full bg-gradient-to-r from-black via-black/85 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* 3-Column Layout with Widened Horizontal Spans on PC */}
      <div className="grid grid-cols-12 gap-8 lg:gap-12 xl:gap-16 relative z-10 w-full items-start">
        {/* Column 1 (col-span-4 xl:col-span-3.5): Company Name, Tagline & Period */}
        <div className="col-span-4 xl:col-span-3.5 space-y-2 font-sans">
          <BlurReveal delay={0.1}>
            <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-white tracking-tight leading-snug font-['Space_Grotesk',sans-serif] group-hover:text-white transition-colors">
              {item.company}
            </h3>
          </BlurReveal>
          <p className="text-sm sm:text-base text-slate-400 font-medium">
            {item.tagline}
          </p>
          <p className="text-xs sm:text-sm font-mono text-[#9ab4c4] pt-1 tabular-nums">
            {item.period}
          </p>
        </div>

        {/* Column 2 (col-span-3 xl:col-span-3): Role, Location, Domain, Website */}
        <div className="col-span-3 xl:col-span-3 space-y-2.5 font-sans pt-0">
          <div>
            <h4 className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-tight leading-snug font-['Space_Grotesk',sans-serif]">
              {item.position}
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {item.location}
            </p>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-mono">
              {item.industry}
            </p>
          </div>

          {item.website && (
            <div className="pt-1">
              <a
                href={item.websiteUrl || `https://${item.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-slate-400 hover:text-[#9ab4c4] transition-colors"
              >
                <span>{item.website}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>
          )}
        </div>

        {/* Column 3 (col-span-5 xl:col-span-5.5): Points with Clear Typography */}
        <div className="col-span-5 xl:col-span-5.5 font-sans pt-0">
          <ul className="space-y-4 m-0 p-0 list-none">
            {item.description.map((point, i) => (
              <li key={i} className="flex items-start gap-3.5 text-[15px] sm:text-base lg:text-[17px] text-slate-200 leading-[1.7] group-hover:text-white transition-colors">
                <span className="text-[#6a90a6] text-base mt-0.5 select-none shrink-0 font-bold">▹</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   2. MOBILE EXPERIENCE ROW: All internship details open directly on phones
   ========================================================================= */
const MobileExperienceRow: React.FC<{ item: ExperienceItemData }> = ({ item }) => {
  return (
    <div className="w-full py-5 space-y-3 font-sans">
      {/* Header: Company, Tagline & Period */}
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-white font-['Space_Grotesk',sans-serif] tracking-tight">
          {item.company}
        </h3>
        <p className="text-xs text-slate-400 font-medium">
          {item.tagline}
        </p>
        <p className="text-[11px] font-mono text-[#a89f9a]">
          {item.period}
        </p>
      </div>

      {/* Role, Location, Domain & Website */}
      <div className="space-y-1 pt-1">
        <h4 className="text-sm font-bold text-white font-['Space_Grotesk',sans-serif]">
          {item.position}
        </h4>
        <p className="text-xs text-slate-400">
          {item.location} · <span className="font-mono text-[#b8ada8]">{item.industry}</span>
        </p>
        {item.website && (
          <div className="pt-0.5">
            <a
              href={item.websiteUrl || `https://${item.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-[#857b76] hover:text-white transition-colors"
            >
              <span>{item.website}</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>
        )}
      </div>

      {/* Bullet Points */}
      <ul className="space-y-2.5 m-0 p-0 list-none pt-1">
        {item.description.map((point, i) => (
          <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
            <span className="text-[#857b76] text-sm mt-0.5 select-none shrink-0 font-bold">▹</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* =========================================================================
   3. MAIN EXPERIENCE SECTION COMPONENT
   ========================================================================= */
export const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      className={cn(
        'w-full min-h-[100svh] flex flex-col justify-start items-center px-6 sm:px-10 lg:px-14 xl:px-18 pt-20 sm:pt-24 lg:pt-28 pb-32 sm:pb-28 bg-black select-none overflow-x-hidden'
      )}
    >
      {/* Expanded Horizontal Width on PC to Fill Space Nicely Between Sidebars */}
      <div className="max-w-[1650px] w-full mx-auto flex flex-col">
        {/* Title positioned symmetrically from the top for Dock navigation */}
        <div className="w-full pb-8 sm:pb-12">
          <BlurReveal delay={0}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-none font-['Space_Grotesk',sans-serif]">
              EXPERIENCE
            </h2>
          </BlurReveal>
        </div>

        {/* Top Divider: Subtle edge-fading line on PC, visible #857b76 line on phone */}
        <div className="hidden md:block w-screen relative left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
        <div className="block md:hidden w-full h-[1.5px] bg-[#857b76]/60" />

        {/* --- DESKTOP VIEW (hidden on mobile, visible on md+) --- */}
        <div className="hidden md:block w-full">
          {experiences.map((item, idx) => (
            <React.Fragment key={item.company}>
              <DesktopExperienceRow item={item} />
              {/* Subtle edge-fading line between items on PC */}
              {idx < experiences.length - 1 && (
                <div className="w-screen relative left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* --- MOBILE VIEW (visible on mobile, hidden on md+) --- */}
        <div className="block md:hidden w-full">
          {experiences.map((item, idx) => (
            <React.Fragment key={item.company}>
              <MobileExperienceRow item={item} />
              {/* Visible #857b76 line between internships on phones */}
              {idx < experiences.length - 1 && (
                <div className="w-full h-[1.5px] bg-[#857b76]/60 my-2" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Bottom Divider */}
        <div className="hidden md:block w-screen relative left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
        <div className="block md:hidden w-full h-[1.5px] bg-[#857b76]/60 mt-8 mb-4" />
      </div>
    </section>
  );
};

export default ExperienceSection;
