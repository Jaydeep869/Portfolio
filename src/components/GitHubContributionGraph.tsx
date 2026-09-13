import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import initialData from '../data/contributions.json';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ContributionsData {
  total: {
    lastYear: number;
  };
  contributions: ContributionDay[];
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS: (string | null)[] = [null, 'Mon', null, 'Wed', null, 'Fri', null];

const LEVEL_COLORS = [
  'bg-[#161b22] border-white/[0.04]', // Level 0
  'bg-[#0e4429] border-[#0e4429]',    // Level 1
  'bg-[#006d32] border-[#006d32]',    // Level 2
  'bg-[#26a641] border-[#26a641]',    // Level 3
  'bg-[#39d353] border-[#39d353] shadow-[0_0_8px_rgba(57,211,83,0.4)]', // Level 4
];

const GithubLogo = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const GitHubContributionGraph: React.FC = () => {
  const [data, setData] = useState<ContributionsData>(initialData as ContributionsData);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    fetch('https://github-contributions-api.jogruber.de/v4/Jaydeep869?y=last')
      .then((res) => res.json())
      .then((json) => {
        if (json && json.contributions && json.contributions.length > 0) {
          setData(json);
        }
      })
      .catch(() => {
        // Fallback gracefully to local data
      });
  }, []);

  const totalContributions = data?.total?.lastYear ?? 1145;
  const contributions = data?.contributions ?? [];

  // Group into weeks of 7 days
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  contributions.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  // Determine which column index starts each month
  const monthMap: { [weekIdx: number]: string } = {};
  let lastMonth = '';

  contributions.forEach((day, index) => {
    const month = day.date.slice(0, 7);
    if (month !== lastMonth) {
      const weekIndex = Math.floor(index / 7);
      const dateObj = new Date(day.date + 'T12:00:00Z');
      monthMap[weekIndex] = MONTH_NAMES[dateObj.getUTCMonth()];
      lastMonth = month;
    }
  });

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T12:00:00Z');
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="w-full max-w-[1450px] mx-auto p-6 sm:p-8 rounded-xl bg-[#0c131a]/90 border border-white/10 hover:border-white/15 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.65)] transition-all duration-300 flex flex-col">
      {/* Header Info: Clean Typography without circular dot animation, Tactile GitHub Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-['Space_Grotesk',sans-serif] tracking-tight">
            {totalContributions.toLocaleString()} Contributions
          </h3>
          <p className="text-xs font-mono text-slate-400 mt-0.5">
            in the last year
          </p>
        </div>

        {/* Improved Tactile GitHub Link Button */}
        <a
          href="https://github.com/Jaydeep869"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-[#39d353]/60 text-xs font-mono font-medium text-slate-200 hover:text-white transition-all duration-200 cursor-pointer group shadow-sm hover:shadow-[0_0_16px_rgba(57,211,83,0.25)] active:scale-95 shrink-0"
        >
          <GithubLogo />
          <span>GitHub</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#39d353] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </a>
      </div>

      {/* Main Grid: Pixel-Perfect Day/Month Alignment, Normal Scale on Hover */}
      <div className="pt-6 pb-2 w-full overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-white/15 [&::-webkit-scrollbar-thumb]:rounded">
        <div className="min-w-[840px] lg:min-w-full flex flex-col">
          {/* Months Header - Perfectly synchronized with the 53 week columns */}
          <div className="flex gap-2.5 mb-2.5">
            {/* Spacer matching days column width exactly */}
            <div className="w-6 sm:w-7 shrink-0" />

            {/* Month labels pinned to exact week columns */}
            <div className="flex-1 flex gap-1 sm:gap-1.5">
              {weeks.map((_, wIdx) => (
                <div key={wIdx} className="flex-1 relative h-4 select-none">
                  {monthMap[wIdx] && (
                    <span className="absolute left-0 top-0 text-[11px] font-mono text-slate-400 whitespace-nowrap">
                      {monthMap[wIdx]}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Days Column & Weeks Grid with Exact 1:1 Row Mapping */}
          <div className="flex gap-2.5">
            {/* Days Column: Mon, Wed, Fri aligned pixel-for-pixel to row 1, 3, 5 */}
            <div className="flex flex-col gap-1 sm:gap-1.5 w-6 sm:w-7 shrink-0 select-none">
              {DAY_LABELS.map((label, idx) => (
                <div
                  key={idx}
                  className="aspect-square w-full flex items-center justify-end text-[10px] font-mono text-slate-500 pr-1 leading-none"
                >
                  {label ?? ''}
                </div>
              ))}
            </div>

            {/* 53 Week Columns */}
            <div className="flex-1 flex gap-1 sm:gap-1.5 justify-between">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1 sm:gap-1.5 flex-1">
                  {week.map((day) => {
                    const isHovered = hoveredDay?.date === day.date;
                    const levelClass = LEVEL_COLORS[Math.min(day.level, 4)] || LEVEL_COLORS[0];

                    return (
                      <div
                        key={day.date}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`aspect-square w-full rounded-[2.5px] border cursor-pointer transition-colors duration-100 ${levelClass} ${
                          isHovered
                            ? 'ring-1 ring-white brightness-125 z-10'
                            : 'hover:brightness-110'
                        }`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer: Dynamic Tooltip Info (No placeholder text) & Legend */}
      <div className="pt-5 mt-2 border-t border-white/10 flex items-center justify-between gap-4 text-xs font-mono min-h-[36px]">
        {/* Active hover info only, no filler text */}
        <div className="text-slate-300">
          {hoveredDay && (
            <span className="flex items-center gap-2 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#39d353]" />
              <span className="text-emerald-400 font-medium">
                {hoveredDay.count} {hoveredDay.count === 1 ? 'contribution' : 'contributions'}
              </span>
              <span className="text-slate-500">on</span>
              <span className="text-slate-300">{formatDate(hoveredDay.date)}</span>
            </span>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
          <span>Less</span>
          <div className="flex items-center gap-1">
            {LEVEL_COLORS.map((colClass, idx) => (
              <span
                key={idx}
                className={`w-3 h-3 rounded-[2px] border ${colClass}`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default GitHubContributionGraph;
