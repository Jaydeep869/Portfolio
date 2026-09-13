import React, { useState, useMemo } from 'react';
import { 
  GitMerge, 
  ExternalLink, 
  Search, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { cn } from '../lib/utils';
import { BlurReveal } from './ui/blur-reveal';
import { allMergedPRs, type MergedPR } from '../data/mergedPRs';

const projectFilterOptions = [
  { key: 'all', label: 'All Projects' },
  { key: 'KubeVirt', label: 'KubeVirt (CNCF)' },
  { key: 'in-toto / Witness', label: 'in-toto / Witness (OpenSSF)' },
  { key: 'SBOMit', label: 'SBOMit' },
  { key: 'Minder', label: 'Minder' },
  { key: 'Darnit', label: 'Darnit' },
  { key: 'COPS', label: 'COPS' },
];

export const OpenSourceSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  // Filtered PR list
  const filteredPRs = useMemo(() => {
    return allMergedPRs.filter((pr: MergedPR) => {
      const matchesProject = selectedProject === 'all' || pr.project === selectedProject;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery = 
        q === '' ||
        pr.title.toLowerCase().includes(q) ||
        pr.repo.toLowerCase().includes(q) ||
        pr.number.toString().includes(q) ||
        pr.date.toLowerCase().includes(q);
      return matchesProject && matchesQuery;
    });
  }, [selectedProject, searchQuery]);

  // Reset to page 1 whenever filters change
  const handleProjectChange = (key: string) => {
    setSelectedProject(key);
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredPRs.length / pageSize) || 1;
  const paginatedPRs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPRs.slice(start, start + pageSize);
  }, [filteredPRs, currentPage, pageSize]);

  return (
    <section
      id="opensource"
      className="w-full min-h-screen flex flex-col justify-start items-center px-6 sm:px-10 lg:px-14 xl:px-18 pt-20 sm:pt-24 lg:pt-28 pb-28 bg-black select-none overflow-x-hidden"
    >
      <div className="max-w-[1650px] w-full mx-auto flex flex-col">
        {/* Section Header */}
        <div className="w-full pb-8 sm:pb-12 flex flex-col gap-2">
          <BlurReveal delay={0}>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-widest text-[#9ab4c4] uppercase">
              <GitMerge className="w-4 h-4 text-[#9ab4c4]" />
              <span>03.5 // Open Source & Upstream</span>
            </div>
          </BlurReveal>

          <BlurReveal delay={0.05}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-none font-['Space_Grotesk',sans-serif]">
              OPEN SOURCE
            </h2>
          </BlurReveal>

          <BlurReveal delay={0.1}>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl pt-1 font-sans">
              All merged upstream contributions, patches, and tooling across CNCF, OpenSSF, Linux Foundation, and developer tool ecosystems.
            </p>
          </BlurReveal>
        </div>

        {/* Top Edge-fading divider line on PC, #857b76 on phone */}
        <div className="hidden md:block w-screen relative left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none mb-8" />
        <div className="block md:hidden w-full h-[1.5px] bg-[#857b76]/60 mb-6" />

        {/* Controls Bar: Search, Project Filter Chips, and PR Counter */}
        <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
          {/* Left: Filter Toggle & Horizontal Chips */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Mobile / Small Screen Filter Button */}
            <div className="relative block sm:hidden">
              <button
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 border border-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <Filter className="w-3.5 h-3.5 text-[#9ab4c4]" />
                <span>Filter: {selectedProject === 'all' ? 'All' : selectedProject}</span>
              </button>

              {isFilterOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setIsFilterOpen(false)} />
                  <div className="absolute left-0 top-full mt-2 w-60 rounded-xl bg-[#0b0f14] border border-white/15 shadow-2xl p-2 z-40 space-y-1">
                    {projectFilterOptions.map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => handleProjectChange(opt.key)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-left cursor-pointer transition-colors",
                          selectedProject === opt.key
                            ? "bg-[#3c4e5a]/30 text-[#9ab4c4] font-semibold"
                            : "text-slate-300 hover:bg-white/5"
                        )}
                      >
                        <span>{opt.label}</span>
                        <span className="text-[11px] text-slate-500">
                          ({opt.key === 'all' ? allMergedPRs.length : allMergedPRs.filter(p => p.project === opt.key).length})
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Desktop / Tablet Filter Chips */}
            <div className="hidden sm:flex items-center gap-1.5 flex-wrap">
              {projectFilterOptions.map((opt) => {
                const isSelected = selectedProject === opt.key;
                const count = opt.key === 'all' 
                  ? allMergedPRs.length 
                  : allMergedPRs.filter(p => p.project === opt.key).length;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => handleProjectChange(opt.key)}
                    className={cn(
                      "px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer inline-flex items-center gap-1.5 border",
                      isSelected
                        ? "bg-[#3c4e5a]/30 border-[#3c4e5a] text-white font-medium"
                        : "bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <span>{opt.label}</span>
                    <span className={cn("text-[11px]", isSelected ? "text-[#9ab4c4]" : "text-slate-500")}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Clear Filters button */}
            {(selectedProject !== 'all' || searchQuery !== '') && (
              <button
                type="button"
                onClick={() => {
                  setSelectedProject('all');
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono text-slate-400 hover:text-white bg-white/5 border border-white/10 transition-colors cursor-pointer"
              >
                <span>Reset</span>
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Right: Search & Total Count */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search PRs, repo, keywords..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#9ab4c4]/60 font-mono transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="shrink-0 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-300">
              <span className="text-[#9ab4c4] font-semibold">{filteredPRs.length}</span> Merged
            </div>
          </div>
        </div>

        {/* --- DESKTOP TABLE VIEW (hidden on mobile, visible on md+) --- */}
        <div className="hidden md:block w-full">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 py-3.5 px-4 text-[11px] font-mono tracking-wider text-slate-400 uppercase border-b border-white/10">
            <div className="col-span-6 flex items-center gap-2">
              <GitMerge className="w-3.5 h-3.5 text-[#9ab4c4]" />
              <span>Pull Request</span>
            </div>
            <div className="col-span-3">Repository</div>
            <div className="col-span-1 text-center">Status</div>
            <div className="col-span-2 text-right">Merged Date</div>
          </div>

          {/* Table Rows */}
          {paginatedPRs.length > 0 ? (
            <div className="divide-y divide-white/[0.06]">
              {paginatedPRs.map((pr: MergedPR) => (
                <div
                  key={pr.id}
                  className="grid grid-cols-12 gap-4 py-4 px-4 items-center hover:bg-white/[0.02] transition-colors group"
                >
                  {/* Title & PR Number with Direct Clickable Link */}
                  <div className="col-span-6 flex items-start gap-3 min-w-0 pr-4">
                    <span className="text-[#9ab4c4] text-xs font-mono pt-0.5 select-none shrink-0">
                      #{pr.number}
                    </span>
                    <a
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-white group-hover:text-[#9ab4c4] transition-colors font-['Space_Grotesk',sans-serif] leading-snug line-clamp-2"
                      title={pr.title}
                    >
                      {pr.title}
                    </a>
                  </div>

                  {/* Repository */}
                  <div className="col-span-3 min-w-0">
                    <a
                      href={`https://github.com/${pr.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-slate-400 hover:text-white transition-colors truncate block"
                    >
                      {pr.repo}
                    </a>
                  </div>

                  {/* Status Badge: Minimalist 'merged' pill */}
                  <div className="col-span-1 flex justify-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono font-medium text-[#9ab4c4] bg-[#3c4e5a]/20 border border-[#3c4e5a]/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9ab4c4]" />
                      <span>merged</span>
                    </span>
                  </div>

                  {/* Date & Direct External Link Icon */}
                  <div className="col-span-2 flex items-center justify-end gap-3 text-right">
                    <span className="text-xs font-mono text-slate-400 tabular-nums">
                      {pr.date}
                    </span>
                    <a
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded text-slate-500 hover:text-white transition-colors"
                      title="Open PR on GitHub"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-slate-500 font-mono text-sm">
              No merged pull requests found matching your query.
            </div>
          )}
        </div>

        {/* --- MOBILE LIST VIEW (visible on mobile, hidden on md+) --- */}
        <div className="block md:hidden w-full divide-y divide-white/[0.08]">
          {paginatedPRs.length > 0 ? (
            paginatedPRs.map((pr: MergedPR) => (
              <div key={pr.id} className="py-4 space-y-2">
                {/* Title & PR number */}
                <div className="flex items-start justify-between gap-2">
                  <a
                    href={pr.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-white hover:text-[#9ab4c4] transition-colors font-['Space_Grotesk',sans-serif] leading-snug"
                  >
                    <span className="text-[#9ab4c4] font-mono mr-1.5 text-xs">#{pr.number}</span>
                    {pr.title}
                  </a>
                  <a
                    href={pr.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 p-1 text-slate-400 hover:text-white"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Repo, Merged Badge & Date */}
                <div className="flex items-center justify-between gap-2 text-xs font-mono pt-1">
                  <span className="text-slate-400 truncate max-w-[200px]">
                    {pr.repo}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-[#9ab4c4] bg-[#3c4e5a]/20 border border-[#3c4e5a]/40">
                      merged
                    </span>
                    <span className="text-slate-500 text-[11px] tabular-nums">
                      {pr.date}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-500 font-mono text-xs">
              No merged pull requests found matching your query.
            </div>
          )}
        </div>

        {/* Bottom Divider Line */}
        <div className="hidden md:block w-screen relative left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none mt-6" />
        <div className="block md:hidden w-full h-[1.5px] bg-[#857b76]/60 mt-4" />

        {/* Pagination & Footer Controls */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span>
              Showing <span className="text-white font-semibold">{paginatedPRs.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</span> to{' '}
              <span className="text-white font-semibold">{Math.min(currentPage * pageSize, filteredPRs.length)}</span> of{' '}
              <span className="text-white font-semibold">{filteredPRs.length}</span> merged PRs
            </span>
          </div>

          {/* Page Buttons */}
          <div className="flex items-center gap-2">
            {/* Page Size Selector */}
            <div className="flex items-center gap-1.5 mr-2">
              <span className="text-slate-500">Per page:</span>
              {[10, 20, 50].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    setPageSize(size);
                    setCurrentPage(1);
                  }}
                  className={cn(
                    "px-2 py-1 rounded text-xs transition-colors cursor-pointer",
                    pageSize === size
                      ? "bg-[#3c4e5a]/30 text-white font-semibold border border-[#3c4e5a]/50"
                      : "text-slate-500 hover:text-white"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Previous & Next */}
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className={cn(
                "p-1.5 rounded-lg border border-white/10 transition-colors cursor-pointer",
                currentPage <= 1
                  ? "text-slate-700 border-white/5 cursor-not-allowed"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              )}
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="px-2 text-slate-300">
              Page <span className="text-white font-semibold">{currentPage}</span> of {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className={cn(
                "p-1.5 rounded-lg border border-white/10 transition-colors cursor-pointer",
                currentPage >= totalPages
                  ? "text-slate-700 border-white/5 cursor-not-allowed"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              )}
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenSourceSection;
