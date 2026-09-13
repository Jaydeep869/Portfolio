import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  GitMerge, 
  ExternalLink, 
} from 'lucide-react';
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

export const OpenSourceSection: React.FC = () => {
  // Exclude both fmcw PRs
  const initialPRs = useMemo(() => {
    return allMergedPRs.filter(p => !p.repo.toLowerCase().includes('fmcw'));
  }, []);

  const [prsList, setPrsList] = useState<MergedPR[]>(initialPRs);
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

  // Isolate wheel events to allow smooth internal scrolling without triggering outer page Lenis scroll
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <section
      id="opensource"
      className="w-full min-h-[100svh] flex flex-col justify-start items-center px-6 sm:px-10 lg:px-14 xl:px-18 pt-24 sm:pt-28 lg:pt-32 pb-28 bg-black select-none overflow-x-hidden scroll-mt-20 sm:scroll-mt-24"
    >
      {/* Full Width Container Identically Aligned to Experience Section */}
      <div className="max-w-[1650px] w-full mx-auto flex flex-col">
        {/* Title Positioned on Left (Matching Experience Section) */}
        <div className="w-full pb-8 sm:pb-12 text-left">
          <BlurReveal delay={0}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-none font-['Space_Grotesk',sans-serif]">
              OPEN SOURCE
            </h2>
          </BlurReveal>
        </div>

        {/* Top Divider: Subtle edge-fading line on PC, visible #857b76 line on phone */}
        <div className="hidden md:block w-screen relative left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none mb-8" />
        <div className="block md:hidden w-full h-[1.5px] bg-[#857b76]/60 mb-8" />

        {/* =========================================================================
            SEAMLESS FIXED HEADER & FOOTER TABLE (Square/Borderless, Hidden Scrollbar)
            ========================================================================= */}
        <div className="w-full bg-transparent">
          <div className="h-[680px] sm:h-[760px] lg:h-[820px] flex flex-col bg-black/40 overflow-hidden">
            {/* Table Header (flex-none) */}
            <div className="flex-none">
              <Table containerClassName="overflow-visible" className="w-full table-fixed border-separate border-spacing-0">
                <TableHeader className="sticky top-0 z-20 bg-black/95 backdrop-blur-md border-b border-white/10">
                  <TableRow className="border-b border-white/10 hover:bg-transparent">
                    <TableHead className="w-[78%] sm:w-[82%] py-5 px-6 sm:px-10 text-left font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Pull Request
                    </TableHead>
                    <TableHead className="w-[22%] sm:w-[18%] py-5 px-6 sm:px-10 text-right font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
              </Table>
            </div>

            {/* Scrollable Body: Scrollbar hidden completely, native scrolling fully functional */}
            <div 
              ref={scrollBodyRef}
              data-lenis-prevent="true"
              onWheel={handleWheel}
              className="flex-1 overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              <Table containerClassName="overflow-visible" className="w-full table-fixed border-separate border-spacing-0 [&_td]:border-white/[0.05] [&_tr:not(:last-child)_td]:border-b">
                <TableBody>
                  {prsList.map((pr) => (
                    <TableRow
                      key={pr.id}
                      className="hover:bg-white/[0.03] transition-colors border-b border-white/[0.05] group"
                    >
                      {/* Pull Request Title (Thin, Larger, Elegant Font) */}
                      <TableCell className="w-[78%] sm:w-[82%] py-7 sm:py-9 px-6 sm:px-10 font-normal align-middle">
                        <a
                          href={pr.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg sm:text-xl lg:text-[22px] font-light text-slate-100 group-hover:text-[#9ab4c4] transition-colors font-['Space_Grotesk',sans-serif] leading-snug tracking-tight block"
                          title={pr.title}
                        >
                          {pr.title}
                        </a>
                      </TableCell>

                      {/* Status (Interactive Merged Button) */}
                      <TableCell className="w-[22%] sm:w-[18%] py-7 sm:py-9 px-6 sm:px-10 text-right align-middle">
                        <div className="flex items-center justify-end">
                          <a
                            href={pr.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-purple-950/35 hover:bg-purple-900/60 active:scale-95 border border-purple-500/30 hover:border-purple-400/70 text-purple-200 hover:text-white transition-all duration-200 shadow-sm shadow-purple-950/40 hover:shadow-purple-900/50 group/btn shrink-0 cursor-pointer"
                            title="View merged pull request on GitHub"
                          >
                            <GitMerge className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400 group-hover/btn:text-purple-300 group-hover/btn:rotate-12 transition-transform duration-200" />
                            <span className="font-mono text-xs sm:text-[13px] font-medium tracking-wide">
                              merged
                            </span>
                            <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400/60 group-hover/btn:text-purple-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all duration-200" />
                          </a>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Table Footer (flex-none) */}
            <div className="flex-none">
              <Table containerClassName="overflow-visible" className="w-full table-fixed border-separate border-spacing-0">
                <TableFooter className="sticky bottom-0 z-20 bg-black/95 backdrop-blur-md border-t border-white/10">
                  <TableRow className="hover:bg-transparent">
                    <TableCell className="w-[78%] sm:w-[82%] py-5 px-6 sm:px-10 text-xs font-mono text-slate-400">
                      Total Merged Contributions
                    </TableCell>
                    <TableCell className="w-[22%] sm:w-[18%] text-right py-5 px-6 sm:px-10 text-xs font-mono text-[#9ab4c4] font-semibold">
                      {prsList.length} Merged Pull Requests
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
