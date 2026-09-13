import React, { useState, useMemo, useEffect } from 'react';
import { 
  GitMerge, 
  ExternalLink, 
  Search, 
  X, 
  Filter,
  RefreshCw,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { BlurReveal } from './ui/blur-reveal';
import { allMergedPRs, type MergedPR } from '../data/mergedPRs';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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
  // Ensure both fmcw PRs are strictly excluded even from cache or live API
  const initialPRs = useMemo(() => {
    return allMergedPRs.filter(p => !p.repo.toLowerCase().includes('fmcw'));
  }, []);

  const [prsList, setPrsList] = useState<MergedPR[]>(initialPRs);
  const [isLiveSyncing, setIsLiveSyncing] = useState<boolean>(false);

  // Filter & Search states
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState<boolean>(false);

  // Automatically fetch live merged PRs from GitHub API on mount
  useEffect(() => {
    let isMounted = true;
    const fetchLivePRs = async () => {
      try {
        setIsLiveSyncing(true);
        const res = await fetch(
          'https://api.github.com/search/issues?q=author:Jaydeep869+type:pr+is:merged&sort=created&order=desc&per_page=100',
          { headers: { Accept: 'application/vnd.github.v3+json' } }
        );

        if (!res.ok) return;

        const data = await res.json();
        if (data && Array.isArray(data.items) && data.items.length > 0 && isMounted) {
          const fetchedPRs: MergedPR[] = data.items
            // Strictly exclude fmcw PRs as requested
            .filter((item: { repository_url?: string }) => !item.repository_url?.toLowerCase().includes('fmcw'))
            .map((item: {
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

          // Deduplicate and merge with cached list
          const map = new Map<string, MergedPR>();
          initialPRs.forEach((p) => map.set(`${p.repo}#${p.number}`, p));
          fetchedPRs.forEach((p) => map.set(`${p.repo}#${p.number}`, p));

          const mergedArray = Array.from(map.values()).sort((a, b) => {
            return new Date(b.isoDate || 0).getTime() - new Date(a.isoDate || 0).getTime();
          });

          setPrsList(mergedArray);
        }
      } catch (err) {
        console.warn('GitHub live sync error:', err);
      } finally {
        if (isMounted) setIsLiveSyncing(false);
      }
    };

    fetchLivePRs();
    return () => {
      isMounted = false;
    };
  }, [initialPRs]);

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

  return (
    <section
      id="opensource"
      className="w-full min-h-screen flex flex-col justify-start items-center px-6 sm:px-10 lg:px-14 xl:px-18 pt-28 sm:pt-32 lg:pt-36 pb-28 mt-8 sm:mt-12 bg-black select-none overflow-x-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      <div className="max-w-[1650px] w-full mx-auto flex flex-col">
        {/* Section Header */}
        <div className="w-full pb-8 sm:pb-12 flex flex-col gap-2">
          <BlurReveal delay={0}>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-widest text-[#9ab4c4] uppercase">
              <GitMerge className="w-4 h-4 text-purple-400" />
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
              Upstream pull requests and cloud-native contributions merged into CNCF, OpenSSF, and Linux Foundation repositories.
            </p>
          </BlurReveal>
        </div>

        {/* Top Divider Line: Edge-fading on PC, #857b76 on phone */}
        <div className="hidden md:block w-screen relative left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none mb-8" />
        <div className="block md:hidden w-full h-[1.5px] bg-[#857b76]/60 mb-8" />

        {/* Filter Toolbar: Search, Project Chips, and Total Merged Counter */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6">
          {/* Left: Filter dropdown on mobile, Horizontal chips on desktop */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Mobile Filter Button */}
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
                  <div className="absolute left-0 top-full mt-2 w-64 rounded-xl bg-[#0c1017] border border-white/15 shadow-2xl p-2 z-40 space-y-1">
                    {projectFilterOptions.map((opt) => {
                      const count = opt.key === 'all' 
                        ? prsList.length 
                        : prsList.filter(p => p.project === opt.key).length;
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => {
                            setSelectedProject(opt.key);
                            setIsFilterDropdownOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-left cursor-pointer transition-colors",
                            selectedProject === opt.key
                              ? "bg-[#3c4e5a]/40 text-[#9ab4c4] font-semibold"
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

            {/* Desktop Filter Chips */}
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
                    onClick={() => setSelectedProject(opt.key)}
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

            {/* Reset Button */}
            {(selectedProject !== 'all' || searchQuery !== '') && (
              <button
                type="button"
                onClick={() => {
                  setSelectedProject('all');
                  setSearchQuery('');
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-mono text-slate-400 hover:text-white bg-white/5 border border-white/10 transition-colors cursor-pointer"
              >
                <span>Reset</span>
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Right: Search Input & Merged Badge */}
          <div className="flex items-center gap-2.5">
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search PRs, repo, keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-[#9ab4c4] rounded-xl pl-9 pr-8 py-1.5 text-xs text-white placeholder:text-slate-500 font-mono transition-colors focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            <div className="shrink-0 px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/40 text-xs font-mono text-purple-300 font-medium flex items-center gap-1.5 shadow-sm shadow-purple-950/40">
              <GitMerge className="w-3.5 h-3.5 text-purple-400" />
              <span>{filteredPRs.length} Merged</span>
              {isLiveSyncing && <RefreshCw className="w-3 h-3 animate-spin text-slate-400 ml-1" />}
            </div>
          </div>
        </div>

        {/* =========================================================================
            FIXED HEADER & FOOTER TABLE WITH SCROLLABLE BODY (originui / shadcn)
            ========================================================================= */}
        <div className="w-full bg-background">
          <div className="h-[520px] sm:h-[580px] flex flex-col rounded-2xl border border-white/10 bg-[#0c1017]/80 backdrop-blur-xl overflow-hidden shadow-2xl">
            {/* Table header (flex-none) */}
            <div className="flex-none">
              <Table className="w-full border-separate border-spacing-0">
                <TableHeader className="sticky top-0 z-10 bg-[#0c1017]/95 backdrop-blur-md">
                  <TableRow className="border-b border-white/10 hover:bg-transparent">
                    <TableHead className="py-3.5 px-4 sm:px-6 text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold w-full sm:w-[52%]">
                      Pull Request
                    </TableHead>
                    <TableHead className="py-3.5 px-4 text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold w-[22%] hidden sm:table-cell">
                      Repository
                    </TableHead>
                    <TableHead className="py-3.5 px-4 text-center text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold w-[13%] hidden sm:table-cell">
                      Status
                    </TableHead>
                    <TableHead className="py-3.5 px-4 sm:px-6 text-right text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold w-[13%] hidden sm:table-cell">
                      Merged Date
                    </TableHead>
                  </TableRow>
                </TableHeader>
              </Table>
            </div>

            {/* Scrollable body (flex-1 overflow-y-auto) */}
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
              {filteredPRs.length > 0 ? (
                <Table className="w-full border-separate border-spacing-0 [&_td]:border-white/[0.06] [&_tr:not(:last-child)_td]:border-b">
                  <TableBody>
                    {filteredPRs.map((pr) => (
                      <TableRow
                        key={pr.id}
                        className="hover:bg-white/[0.03] transition-colors border-b border-white/[0.06] group"
                      >
                        {/* Pull Request: Title, PR Number, and Mobile-view details */}
                        <TableCell className="py-3.5 px-4 sm:px-6 font-medium w-full sm:w-[52%] align-middle">
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-start gap-2.5">
                              <span className="text-[#9ab4c4] text-xs font-mono font-semibold pt-0.5 select-none shrink-0 bg-[#3c4e5a]/25 border border-[#3c4e5a]/40 px-2 py-0.5 rounded">
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

                            {/* Mobile-only metadata row */}
                            <div className="flex sm:hidden items-center justify-between gap-2 text-xs font-mono pt-1">
                              <span className="text-slate-400 text-[11px] truncate max-w-[180px]">
                                {pr.repo}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[10px] font-mono font-semibold text-purple-300 bg-purple-950/50 border border-purple-500/40">
                                  <GitMerge className="w-2.5 h-2.5 text-purple-400" />
                                  <span>merged</span>
                                </span>
                                <span className="text-slate-500 text-[11px] tabular-nums">
                                  {pr.date}
                                </span>
                                <a
                                  href={pr.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1 text-slate-400 hover:text-white"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        {/* Repository (Desktop) */}
                        <TableCell className="py-3.5 px-4 font-mono text-xs text-slate-300 w-[22%] align-middle hidden sm:table-cell">
                          <a
                            href={`https://github.com/${pr.repo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/10 hover:border-white/25 hover:text-white transition-colors truncate max-w-[240px]"
                          >
                            <span>{pr.repo}</span>
                          </a>
                        </TableCell>

                        {/* Status (Desktop) */}
                        <TableCell className="py-3.5 px-4 text-center w-[13%] align-middle hidden sm:table-cell">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold text-purple-300 bg-purple-950/50 border border-purple-500/40 shadow-sm shadow-purple-950/40">
                            <GitMerge className="w-3 h-3 text-purple-400" />
                            <span>merged</span>
                          </span>
                        </TableCell>

                        {/* Merged Date & External Link (Desktop) */}
                        <TableCell className="py-3.5 px-4 sm:px-6 text-right font-mono text-xs text-slate-400 tabular-nums w-[13%] align-middle hidden sm:table-cell">
                          <div className="flex items-center justify-end gap-2.5">
                            <span>{pr.date}</span>
                            <a
                              href={pr.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded text-slate-500 hover:text-white transition-colors"
                              title="View PR on GitHub"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center text-center space-y-2 text-slate-500 font-mono text-xs p-6">
                  <GitMerge className="w-8 h-8 text-slate-600" />
                  <p>No merged pull requests found matching your filter.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProject('all');
                      setSearchQuery('');
                    }}
                    className="text-xs text-purple-400 hover:underline pt-1 cursor-pointer"
                  >
                    Clear search and filter
                  </button>
                </div>
              )}
            </div>

            {/* Table footer (flex-none) */}
            <div className="flex-none">
              <Table className="w-full border-separate border-spacing-0">
                <TableFooter className="sticky bottom-0 bg-[#0c1017]/95 backdrop-blur-md border-t border-white/10">
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={2} className="py-3 px-4 sm:px-6 text-xs font-mono text-slate-400">
                      Total Merged Contributions
                    </TableCell>
                    <TableCell colSpan={2} className="text-right py-3 px-4 sm:px-6 text-xs font-mono text-[#9ab4c4] font-semibold">
                      {filteredPRs.length} Merged Pull Requests
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-slate-500 font-mono">
            Table with fixed header & footer, scrollable body
          </p>
        </div>
      </div>
    </section>
  );
};

export default OpenSourceSection;
