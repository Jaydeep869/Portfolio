import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  GitMerge, 
  ExternalLink, 
  Search, 
  X, 
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
  { key: 'all', label: 'All' },
  { key: 'KubeVirt', label: 'KubeVirt' },
  { key: 'in-toto / Witness', label: 'in-toto' },
  { key: 'SBOMit', label: 'SBOMit' },
  { key: 'Minder', label: 'Minder' },
  { key: 'Darnit', label: 'Darnit' },
  { key: 'COPS', label: 'COPS' },
];

export const OpenSourceSection: React.FC = () => {
  // Ensure both fmcw PRs are strictly excluded
  const initialPRs = useMemo(() => {
    return allMergedPRs.filter(p => !p.repo.toLowerCase().includes('fmcw'));
  }, []);

  const [prsList, setPrsList] = useState<MergedPR[]>(initialPRs);

  // Filter & Search states
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const scrollBodyRef = useRef<HTMLDivElement>(null);

  // Automatically fetch live merged PRs from GitHub API on mount
  useEffect(() => {
    let isMounted = true;
    const fetchLivePRs = async () => {
      try {
        const res = await fetch(
          'https://api.github.com/search/issues?q=author:Jaydeep869+type:pr+is:merged&sort=created&order=desc&per_page=100',
          { headers: { Accept: 'application/vnd.github.v3+json' } }
        );

        if (!res.ok) return;

        const data = await res.json();
        if (data && Array.isArray(data.items) && data.items.length > 0 && isMounted) {
          const fetchedPRs: MergedPR[] = data.items
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
      }
    };

    fetchLivePRs();
    return () => {
      isMounted = false;
    };
  }, [initialPRs]);

  // Isolate wheel event inside table to prevent outer page Lenis scroll
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

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
      className="w-full min-h-screen flex flex-col justify-start items-center px-4 sm:px-8 lg:px-12 pt-28 sm:pt-32 lg:pt-36 pb-28 mt-8 sm:mt-12 bg-black select-none overflow-x-hidden scroll-mt-24 sm:scroll-mt-28"
    >
      {/* Centered Main Section Container */}
      <div className="w-full max-w-5xl lg:max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Title: Perfectly Centered in the middle */}
        <div className="w-full pb-8 sm:pb-12 text-center">
          <BlurReveal delay={0}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-none font-['Space_Grotesk',sans-serif]">
              OPEN SOURCE
            </h2>
          </BlurReveal>
        </div>

        {/* Top Centered Divider Line */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent mb-8" />

        {/* Clean, Polished Top Controls Bar */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5">
          {/* Left: Filter Tabs with Counts */}
          <div className="flex items-center gap-1.5 flex-wrap">
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
                      ? "bg-[#3c4e5a]/50 border-[#9ab4c4]/60 text-white font-semibold shadow-sm"
                      : "bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <span>{opt.label}</span>
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded font-semibold",
                    isSelected ? "bg-white/20 text-white" : "bg-white/5 text-slate-500"
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}

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

          {/* Right: Clean, Well-Padded Search Box */}
          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search PRs or repos..."
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

            <div className="shrink-0 px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/40 text-xs font-mono text-purple-300 font-medium flex items-center gap-1.5">
              <GitMerge className="w-3.5 h-3.5 text-purple-400" />
              <span>{filteredPRs.length}</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            FIXED HEADER & FOOTER TABLE (originui / shadcn pattern with 100% column alignment)
            ========================================================================= */}
        <div className="w-full bg-background">
          <div className="h-[600px] sm:h-[680px] flex flex-col rounded-2xl border border-white/10 bg-[#0c1017]/90 backdrop-blur-xl overflow-hidden shadow-2xl">
            {/* Table Header (flex-none) */}
            <div className="flex-none">
              <Table className="w-full table-fixed border-separate border-spacing-0">
                <TableHeader className="sticky top-0 z-10 bg-[#0c1017]/95 backdrop-blur-md">
                  <TableRow className="border-b border-white/10 hover:bg-transparent">
                    <TableHead className="w-[50%] py-4 px-4 sm:px-6 text-left font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Pull Request
                    </TableHead>
                    <TableHead className="w-[24%] py-4 px-4 text-left font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold hidden sm:table-cell">
                      Repository
                    </TableHead>
                    <TableHead className="w-[13%] py-4 px-4 text-center font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Status
                    </TableHead>
                    <TableHead className="w-[13%] py-4 px-4 sm:px-6 text-right font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Merged Date
                    </TableHead>
                  </TableRow>
                </TableHeader>
              </Table>
            </div>

            {/* Scrollable Body (flex-1 overflow-y-auto, data-lenis-prevent enabled) */}
            <div 
              ref={scrollBodyRef}
              data-lenis-prevent="true"
              onWheel={handleWheel}
              className="flex-1 overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent"
            >
              {filteredPRs.length > 0 ? (
                <Table className="w-full table-fixed border-separate border-spacing-0 [&_td]:border-border [&_tr:not(:last-child)_td]:border-b">
                  <TableBody>
                    {filteredPRs.map((pr) => (
                      <TableRow
                        key={pr.id}
                        className="hover:bg-white/[0.03] transition-colors border-b border-white/[0.06] group"
                      >
                        {/* Pull Request: Title + Number */}
                        <TableCell className="w-[50%] py-4 px-4 sm:px-6 font-medium align-middle">
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-start gap-2.5 min-w-0">
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

                            {/* Mobile-only secondary line */}
                            <div className="flex sm:hidden items-center justify-between gap-2 text-xs font-mono pt-1 text-slate-400">
                              <span className="truncate max-w-[180px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[11px]">
                                {pr.repo}
                              </span>
                            </div>
                          </div>
                        </TableCell>

                        {/* Repository (Desktop) */}
                        <TableCell className="w-[24%] py-4 px-4 font-mono text-xs text-slate-300 align-middle hidden sm:table-cell">
                          <a
                            href={`https://github.com/${pr.repo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 hover:border-white/20 hover:text-white transition-colors truncate max-w-full"
                          >
                            <span className="truncate">{pr.repo}</span>
                          </a>
                        </TableCell>

                        {/* Status: Merged pill */}
                        <TableCell className="w-[13%] py-4 px-4 text-center align-middle">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium text-purple-300 bg-purple-950/60 border border-purple-500/40">
                            <GitMerge className="w-3 h-3 text-purple-400" />
                            <span>merged</span>
                          </span>
                        </TableCell>

                        {/* Merged Date & External Link */}
                        <TableCell className="w-[13%] py-4 px-4 sm:px-6 text-right font-mono text-xs text-slate-400 tabular-nums align-middle">
                          <div className="flex items-center justify-end gap-2">
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
                <div className="h-full min-h-[360px] flex flex-col items-center justify-center text-center space-y-2 text-slate-500 font-mono text-xs p-6">
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

            {/* Table Footer (flex-none) */}
            <div className="flex-none">
              <Table className="w-full table-fixed border-separate border-spacing-0">
                <TableFooter className="sticky bottom-0 bg-[#0c1017]/95 backdrop-blur-md border-t border-white/10">
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={2} className="w-[74%] py-3.5 px-4 sm:px-6 text-xs font-mono text-slate-400">
                      Total Merged Contributions
                    </TableCell>
                    <TableCell colSpan={2} className="w-[26%] text-right py-3.5 px-4 sm:px-6 text-xs font-mono text-[#9ab4c4] font-semibold">
                      {filteredPRs.length} Merged Pull Requests
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenSourceSection;
