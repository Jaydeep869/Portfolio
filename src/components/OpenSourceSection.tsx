import React, { useState, useMemo, useEffect } from 'react';
import { 
  GitMerge, 
  ExternalLink, 
  Search, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  Layers,
  Table as TableIcon,
  Activity,
  RefreshCw,
  GitPullRequest
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
  { key: 'Other', label: 'Other' },
];

export const OpenSourceSection: React.FC = () => {
  // PR list state (initialized with offline/cached list, dynamically updated from GitHub)
  const [prsList, setPrsList] = useState<MergedPR[]>(allMergedPRs);
  const [isLiveSyncing, setIsLiveSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Pre-loaded');

  // Filter & Search states
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'table' | 'timeline'>('table');

  // Automatically fetch all live merged PRs from GitHub on mount
  useEffect(() => {
    let isMounted = true;
    const fetchLivePRs = async () => {
      try {
        setIsLiveSyncing(true);
        // Query GitHub API for all merged PRs by author
        const res = await fetch(
          'https://api.github.com/search/issues?q=author:Jaydeep869+type:pr+is:merged&sort=created&order=desc&per_page=100',
          { headers: { Accept: 'application/vnd.github.v3+json' } }
        );

        if (!res.ok) {
          throw new Error(`GitHub API returned status ${res.status}`);
        }

        const data = await res.json();
        if (data && Array.isArray(data.items) && data.items.length > 0 && isMounted) {
          // Parse fetched items into MergedPR format
          const fetchedPRs: MergedPR[] = data.items.map((item: {
            number: number;
            title: string;
            repository_url: string;
            html_url: string;
            closed_at?: string;
            created_at?: string;
            pull_request?: { merged_at?: string };
          }) => {
            const repo = item.repository_url.replace('https://api.github.com/repos/', '');
            let project = 'Other';
            const repoLower = repo.toLowerCase();
            if (repoLower.includes('kubevirt')) project = 'KubeVirt';
            else if (repoLower.includes('witness')) project = 'in-toto / Witness';
            else if (repoLower.includes('sbomit')) project = 'SBOMit';
            else if (repoLower.includes('minder')) project = 'Minder';
            else if (repoLower.includes('darnit')) project = 'Darnit';
            else if (repoLower.includes('cops')) project = 'COPS';

            const dateStr = item.pull_request?.merged_at || item.closed_at || item.created_at || '';
            let formattedDate = dateStr.slice(0, 10);
            try {
              const d = new Date(dateStr);
              formattedDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            } catch {
              // fallback
            }

            return {
              id: `${repo}-${item.number}`,
              number: item.number,
              title: item.title,
              repo,
              project,
              url: item.html_url,
              date: formattedDate,
              isoDate: dateStr,
            };
          });

          // Merge fetched PRs with cached allMergedPRs to ensure 100% complete coverage
          const map = new Map<string, MergedPR>();
          // Put cached first
          allMergedPRs.forEach((p) => map.set(`${p.repo}#${p.number}`, p));
          // Overwrite/enrich with live data from GitHub
          fetchedPRs.forEach((p) => map.set(`${p.repo}#${p.number}`, p));

          const mergedArray = Array.from(map.values()).sort((a, b) => {
            return new Date(b.isoDate || 0).getTime() - new Date(a.isoDate || 0).getTime();
          });

          setPrsList(mergedArray);
          setLastSyncTime('Live GitHub API');
        }
      } catch (err) {
        // Fallback gracefully to bundled dataset
        console.warn('GitHub live fetch skipped or rate-limited, using cached dataset:', err);
      } finally {
        if (isMounted) setIsLiveSyncing(false);
      }
    };

    fetchLivePRs();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filtered PR list
  const filteredPRs = useMemo(() => {
    return prsList.filter((pr: MergedPR) => {
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
  }, [prsList, selectedProject, searchQuery]);

  // Reset to page 1 whenever filters change
  const handleProjectChange = (key: string) => {
    setSelectedProject(key);
    setCurrentPage(1);
    setIsFilterDropdownOpen(false);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  // Pagination calculation
  const totalPages = pageSize === -1 ? 1 : Math.ceil(filteredPRs.length / pageSize) || 1;
  const paginatedPRs = useMemo(() => {
    if (pageSize === -1) return filteredPRs;
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
              <GitMerge className="w-4 h-4 text-purple-400" />
              <span>03.5 // Open Source Ecosystem & Upstream Work</span>
            </div>
          </BlurReveal>

          <BlurReveal delay={0.05}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-none font-['Space_Grotesk',sans-serif]">
              OPEN SOURCE
            </h2>
          </BlurReveal>

          <BlurReveal delay={0.1}>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl pt-1 font-sans">
              All merged upstream contributions, cloud-native virtualization fixes, and security tooling across CNCF, OpenSSF, Linux Foundation, and developer ecosystems.
            </p>
          </BlurReveal>
        </div>

        {/* Divider Line: Edge-fading on PC, subtle #857b76 line on phones */}
        <div className="hidden md:block w-screen relative left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none mb-8" />
        <div className="block md:hidden w-full h-[1.5px] bg-[#857b76]/60 mb-6" />

        {/* =========================================================================
            MAIN 21st.dev HYBRID CONTAINER (Data-Table & Audit-Log Polished Interface)
            ========================================================================= */}
        <div className="w-full rounded-2xl sm:rounded-3xl bg-[#0a0f16]/90 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col">
          {/* Top Controls Toolbar */}
          <div className="p-4 sm:p-6 lg:p-7 border-b border-white/10 flex flex-col gap-4 bg-gradient-to-b from-white/[0.02] to-transparent">
            {/* Row 1: Search, View Switcher & Live Sync Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search PR title, repository, #number..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-[#9ab4c4] rounded-xl pl-10 pr-9 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 font-mono transition-colors focus:outline-none focus:ring-1 focus:ring-[#9ab4c4]/40"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => handleSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Status Badges & View Switcher */}
              <div className="flex items-center gap-2.5 flex-wrap self-end sm:self-auto">
                {/* Live Sync Status Indicator */}
                <div 
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-400"
                  title={lastSyncTime}
                >
                  <span className={cn(
                    "w-2 h-2 rounded-full",
                    isLiveSyncing ? "bg-amber-400 animate-ping" : "bg-emerald-400 shadow-sm shadow-emerald-400"
                  )} />
                  <span className="text-slate-300">GitHub Sync</span>
                  {isLiveSyncing && <RefreshCw className="w-3 h-3 animate-spin text-slate-400 ml-0.5" />}
                </div>

                {/* Total Merged Counter Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/40 text-purple-300 text-xs font-mono font-semibold shadow-sm shadow-purple-950/40">
                  <GitMerge className="w-3.5 h-3.5 text-purple-400" />
                  <span>{filteredPRs.length} Merged</span>
                </div>

                {/* View Mode Toggle Buttons (Table vs Timeline) */}
                <div className="hidden sm:inline-flex items-center p-0.5 rounded-xl bg-white/[0.03] border border-white/10">
                  <button
                    type="button"
                    onClick={() => setViewMode('table')}
                    className={cn(
                      "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer",
                      viewMode === 'table'
                        ? "bg-[#3c4e5a]/40 text-white font-medium border border-[#3c4e5a]/60 shadow-sm"
                        : "text-slate-400 hover:text-white"
                    )}
                    title="Data Table View"
                  >
                    <TableIcon className="w-3.5 h-3.5" />
                    <span>Table</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode('timeline')}
                    className={cn(
                      "flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer",
                      viewMode === 'timeline'
                        ? "bg-[#3c4e5a]/40 text-white font-medium border border-[#3c4e5a]/60 shadow-sm"
                        : "text-slate-400 hover:text-white"
                    )}
                    title="Audit Log Timeline View"
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span>Timeline</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Row 2: Filter Tabs Bar */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              {/* Mobile Filter Dropdown */}
              <div className="relative block sm:hidden">
                <button
                  type="button"
                  onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 border border-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <Filter className="w-3.5 h-3.5 text-[#9ab4c4]" />
                  <span>Filter: {selectedProject === 'all' ? 'All Projects' : selectedProject}</span>
                </button>

                {isFilterDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setIsFilterDropdownOpen(false)} />
                    <div className="absolute left-0 top-full mt-2 w-64 rounded-xl bg-[#0d131d] border border-white/15 shadow-2xl p-2 z-40 space-y-1">
                      <div className="px-3 py-1.5 text-[11px] font-mono text-slate-400 uppercase tracking-wider border-b border-white/10 mb-1 flex items-center justify-between">
                        <span>Select Ecosystem</span>
                        <Layers className="w-3 h-3 text-slate-500" />
                      </div>
                      {projectFilterOptions.map((opt) => {
                        const count = opt.key === 'all' 
                          ? prsList.length 
                          : prsList.filter(p => p.project === opt.key).length;
                        return (
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
                            <span className="text-[11px] text-slate-500">({count})</span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              {/* Desktop / Tablet Filter Pills */}
              <div className="hidden sm:flex items-center gap-1.5 flex-wrap">
                {projectFilterOptions.map((opt) => {
                  const isSelected = selectedProject === opt.key;
                  const count = opt.key === 'all' 
                    ? prsList.length 
                    : prsList.filter(p => p.project === opt.key).length;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => handleProjectChange(opt.key)}
                      className={cn(
                        "px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer inline-flex items-center gap-1.5 border",
                        isSelected
                          ? "bg-[#3c4e5a]/40 border-[#9ab4c4]/60 text-white font-semibold shadow-sm"
                          : "bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <span>{opt.label}</span>
                      <span className={cn(
                        "text-[11px] px-1.5 py-0.2 rounded font-semibold",
                        isSelected ? "bg-white/15 text-white" : "bg-white/5 text-slate-500"
                      )}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Clear Filters Button */}
              {(selectedProject !== 'all' || searchQuery !== '') && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProject('all');
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-mono text-slate-400 hover:text-white bg-white/5 border border-white/10 hover:border-white/20 transition-colors cursor-pointer ml-auto sm:ml-0"
                >
                  <span>Reset filters</span>
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* =========================================================================
              VIEW CONTENT: TABLE OR AUDIT-LOG TIMELINE
              ========================================================================= */}
          {paginatedPRs.length > 0 ? (
            viewMode === 'table' ? (
              /* --- 1. DATA TABLE VIEW --- */
              <div className="w-full overflow-x-auto no-scrollbar">
                {/* Table Header (Desktop) */}
                <div className="hidden md:grid grid-cols-12 gap-4 py-3.5 px-6 text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold bg-white/[0.02] border-b border-white/10">
                  <div className="col-span-6 flex items-center gap-2">
                    <GitPullRequest className="w-3.5 h-3.5 text-[#9ab4c4]" />
                    <span>Pull Request</span>
                  </div>
                  <div className="col-span-3">Repository</div>
                  <div className="col-span-1 text-center">Status</div>
                  <div className="col-span-2 text-right">Merged Date</div>
                </div>

                {/* Table Rows (Desktop) */}
                <div className="hidden md:block divide-y divide-white/[0.06]">
                  {paginatedPRs.map((pr) => (
                    <div
                      key={pr.id}
                      className="grid grid-cols-12 gap-4 py-4 px-6 items-center hover:bg-white/[0.03] transition-colors group"
                    >
                      {/* Title & PR Number */}
                      <div className="col-span-6 flex items-start gap-3 min-w-0 pr-4">
                        <span className="text-[#9ab4c4] text-xs font-mono font-semibold pt-0.5 select-none shrink-0 bg-[#3c4e5a]/25 border border-[#3c4e5a]/40 px-2 py-0.5 rounded">
                          #{pr.number}
                        </span>
                        <a
                          href={pr.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[14px] font-medium text-white group-hover:text-[#9ab4c4] transition-colors font-['Space_Grotesk',sans-serif] leading-snug line-clamp-2"
                          title={pr.title}
                        >
                          {pr.title}
                        </a>
                      </div>

                      {/* Repository Badge */}
                      <div className="col-span-3 min-w-0">
                        <a
                          href={`https://github.com/${pr.repo}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-slate-300 hover:text-white transition-colors truncate inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10 hover:border-white/25"
                        >
                          <span>{pr.repo}</span>
                        </a>
                      </div>

                      {/* Merged Status Pill */}
                      <div className="col-span-1 flex justify-center">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-semibold text-purple-300 bg-purple-950/50 border border-purple-500/40 shadow-sm shadow-purple-950/40">
                          <GitMerge className="w-3 h-3 text-purple-400" />
                          <span>merged</span>
                        </span>
                      </div>

                      {/* Date & Direct External Link Button */}
                      <div className="col-span-2 flex items-center justify-end gap-3 text-right">
                        <span className="text-xs font-mono text-slate-400 tabular-nums">
                          {pr.date}
                        </span>
                        <a
                          href={pr.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                          title="View on GitHub"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mobile Table/Card Rows */}
                <div className="block md:hidden divide-y divide-white/[0.08] px-4">
                  {paginatedPRs.map((pr) => (
                    <div key={pr.id} className="py-4 space-y-2.5">
                      <div className="flex items-start justify-between gap-3">
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
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>

                      <div className="flex items-center justify-between gap-2 text-xs font-mono pt-1">
                        <span className="text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded truncate max-w-[200px]">
                          {pr.repo}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono text-purple-300 bg-purple-950/50 border border-purple-500/40">
                            <GitMerge className="w-2.5 h-2.5 text-purple-400" />
                            <span>merged</span>
                          </span>
                          <span className="text-slate-400 text-[11px] tabular-nums">
                            {pr.date}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* --- 2. AUDIT LOG TIMELINE VIEW (Vertical Connected Spine) --- */
              <div className="relative p-6 sm:p-8">
                {/* Connected Spine Line */}
                <div className="absolute left-[35px] sm:left-[43px] top-10 bottom-10 w-[1.5px] bg-gradient-to-b from-purple-500/50 via-white/15 to-transparent pointer-events-none" />

                <div className="space-y-6 sm:space-y-7">
                  {paginatedPRs.map((pr) => (
                    <div key={pr.id} className="relative flex items-start gap-4 sm:gap-5 group">
                      {/* Timeline Node Icon */}
                      <div className="shrink-0 relative z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0d131d] border border-white/15 flex items-center justify-center shadow-lg group-hover:border-purple-500/60 group-hover:scale-105 transition-all">
                        <GitMerge className="w-4 h-4 text-purple-400" />
                      </div>

                      {/* Event Card Content */}
                      <div className="flex-1 min-w-0 bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/15 rounded-xl p-4 sm:p-5 transition-all">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                          <div className="flex items-center gap-2 flex-wrap min-w-0">
                            <a
                              href={pr.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm sm:text-base font-bold text-white group-hover:text-[#9ab4c4] transition-colors font-['Space_Grotesk',sans-serif] tracking-tight"
                            >
                              {pr.title}
                            </a>
                            <span className="text-xs font-mono text-[#9ab4c4] bg-[#3c4e5a]/30 px-2 py-0.5 rounded border border-[#3c4e5a]/50">
                              #{pr.number}
                            </span>
                          </div>

                          <span className="text-xs font-mono text-slate-400 tabular-nums shrink-0">
                            {pr.date}
                          </span>
                        </div>

                        {/* Metadata Pills */}
                        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap mt-3 pt-2.5 border-t border-white/5">
                          <a
                            href={`https://github.com/${pr.repo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:text-white"
                          >
                            <span>{pr.repo}</span>
                          </a>

                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-950/50 border border-purple-500/40 text-xs font-mono font-semibold text-purple-300">
                            <GitMerge className="w-3 h-3 text-purple-400" />
                            <span>merged</span>
                          </span>

                          <div className="flex-1" />

                          <a
                            href={pr.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-mono text-[#9ab4c4] hover:text-white transition-colors"
                          >
                            <span>View PR</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ) : (
            /* Empty State */
            <div className="w-full py-20 flex flex-col items-center justify-center text-center space-y-3 px-4">
              <GitMerge className="w-10 h-10 text-slate-600" />
              <h4 className="text-base sm:text-lg font-bold text-white font-['Space_Grotesk',sans-serif]">
                No merged pull requests found
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm font-mono">
                No contributions matched your filter or search query.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedProject('all');
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                className="px-4 py-2 rounded-xl bg-[#3c4e5a]/40 border border-[#3c4e5a] text-white text-xs font-mono font-medium hover:bg-[#3c4e5a]/60 transition-colors cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* =========================================================================
              PAGINATION & FOOTER CONTROLS
              ========================================================================= */}
          <div className="p-4 sm:p-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.01] text-xs font-mono text-slate-400">
            {/* Total count */}
            <div className="flex items-center gap-2">
              <span>
                Showing <span className="text-white font-semibold">{paginatedPRs.length > 0 ? (pageSize === -1 ? 1 : (currentPage - 1) * pageSize + 1) : 0}</span> to{' '}
                <span className="text-white font-semibold">{pageSize === -1 ? filteredPRs.length : Math.min(currentPage * pageSize, filteredPRs.length)}</span> of{' '}
                <span className="text-white font-semibold">{filteredPRs.length}</span> merged pull requests
              </span>
            </div>

            {/* Pagination Buttons & Page Size */}
            <div className="flex items-center gap-3 flex-wrap justify-center">
              {/* Items Per Page */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500">Per page:</span>
                {[10, 25, 50, -1].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setPageSize(size);
                      setCurrentPage(1);
                    }}
                    className={cn(
                      "px-2 py-0.5 rounded text-xs transition-colors cursor-pointer",
                      pageSize === size
                        ? "bg-[#3c4e5a]/40 text-white font-semibold border border-[#3c4e5a]/60"
                        : "text-slate-500 hover:text-white"
                    )}
                  >
                    {size === -1 ? 'All' : size}
                  </button>
                ))}
              </div>

              {/* Prev / Next Controls */}
              {pageSize !== -1 && (
                <div className="flex items-center gap-1.5">
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
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenSourceSection;
