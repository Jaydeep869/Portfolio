import React, { useState, useEffect } from 'react';
import { ExternalLink, GitCommit, Flame } from 'lucide-react';
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

const LEVEL_COLORS = [
  'bg-[#161b22] border-white/[0.06]', // Level 0: Empty
  'bg-[#0e4429] border-[#0e4429]/40', // Level 1
  'bg-[#006d32] border-[#006d32]/50', // Level 2
  'bg-[#26a641] border-[#26a641]/60 shadow-[0_0_6px_rgba(38,166,65,0.25)]', // Level 3
  'bg-[#39d353] border-[#39d353]/70 shadow-[0_0_10px_rgba(57,211,83,0.45)]', // Level 4
];

export const GitHubContributionGraph: React.FC = () => {
  const [data, setData] = useState<ContributionsData>(initialData as ContributionsData);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    // Silently fetch fresh live data from GitHub contributions API in the background
    fetch('https://github-contributions-api.jogruber.de/v4/Jaydeep869?y=last')
      .then((res) => res.json())
      .then((json) => {
        if (json && json.contributions && json.contributions.length > 0) {
          setData(json);
        }
      })
      .catch(() => {
        // Fallback gracefully to bundled verified data
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

  // Determine which column starts each month
  const monthLabels: { weekIndex: number; name: string }[] = [];
  let lastMonth = '';

  contributions.forEach((day, index) => {
    const month = day.date.slice(0, 7);
    if (month !== lastMonth) {
      const weekIndex = Math.floor(index / 7);
      const dateObj = new Date(day.date + 'T12:00:00Z');
      const monthName = MONTH_NAMES[dateObj.getUTCMonth()];
      monthLabels.push({ weekIndex, name: monthName });
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
    <div className="w-full max-w-[1400px] mx-auto p-6 sm:p-10 rounded-3xl bg-[#090e15]/95 border border-white/15 backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.8)] flex flex-col">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39d353] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#39d353] shadow-[0_0_12px_#39d353]" />
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-['Space_Grotesk',sans-serif] flex items-center gap-3">
              <span>{totalContributions.toLocaleString()} Contributions</span>
              <span className="hidden sm:inline-flex text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-[#39d353]/10 text-[#39d353] border border-[#39d353]/30">
                Active Year
              </span>
            </h3>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-400 flex items-center gap-2">
            <span>@Jaydeep869</span>
            <span>•</span>
            <span className="text-emerald-400/90 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" /> High Activity
            </span>
            <span>•</span>
            <span>Live GitHub Matrix</span>
          </p>
        </div>

        {/* Profile Link */}
        <a
          href="https://github.com/Jaydeep869"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#39d353]/60 text-xs sm:text-sm font-mono text-slate-200 hover:text-white transition-all w-fit cursor-pointer group shadow-lg active:scale-95"
        >
          <GitCommit className="w-4 h-4 text-[#39d353]" />
          <span>View GitHub Profile</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#39d353] transition-colors" />
        </a>
      </div>

      {/* Main Grid Container (Big size on PC, smoothly scrollable on mobile) */}
      <div className="pt-8 pb-4 w-full overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10">
        <div className="min-w-[850px] lg:min-w-full flex flex-col">
          {/* Months Row */}
          <div className="flex text-[11px] font-mono text-slate-400 mb-2 pl-9">
            <div className="relative w-full h-5">
              {monthLabels.map((m, idx) => (
                <span
                  key={idx}
                  className="absolute"
                  style={{
                    left: `${(m.weekIndex / Math.max(weeks.length, 52)) * 100}%`,
                  }}
                >
                  {m.name}
                </span>
              ))}
            </div>
          </div>

          {/* Days & Weeks Grid */}
          <div className="flex gap-2.5">
            {/* Days of Week Label */}
            <div className="flex flex-col justify-between text-[10px] font-mono text-slate-500 py-0.5 select-none w-6 shrink-0">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {/* Weeks Columns */}
            <div className="flex-1 flex gap-1.5 sm:gap-2 justify-between">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1.5 sm:gap-2 flex-1">
                  {week.map((day) => {
                    const isHovered = hoveredDay?.date === day.date;
                    const levelClass = LEVEL_COLORS[Math.min(day.level, 4)] || LEVEL_COLORS[0];

                    return (
                      <div
                        key={day.date}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`aspect-square w-full rounded-[3.5px] border cursor-pointer transition-all duration-150 ${levelClass} ${
                          isHovered
                            ? 'scale-150 z-30 ring-2 ring-white shadow-[0_0_12px_rgba(57,211,83,0.8)]'
                            : 'hover:scale-125 hover:z-20'
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

      {/* Footer Info: Tooltip Display & Legend */}
      <div className="pt-6 mt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
        {/* Dynamic Tooltip Bar */}
        <div className="text-slate-300 min-h-[22px] flex items-center gap-2">
          {hoveredDay ? (
            <>
              <span className="w-2 h-2 rounded-full bg-[#39d353]" />
              <span className="font-semibold text-white">
                {hoveredDay.count} {hoveredDay.count === 1 ? 'contribution' : 'contributions'}
              </span>
              <span className="text-slate-500">on</span>
              <span className="text-slate-300">{formatDate(hoveredDay.date)}</span>
            </>
          ) : (
            <span className="text-slate-400">
              Hover over any square to view daily commit activity.
            </span>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-slate-400 shrink-0">
          <span>Less</span>
          <div className="flex items-center gap-1.5">
            {LEVEL_COLORS.map((colClass, idx) => (
              <span
                key={idx}
                className={`w-3.5 h-3.5 rounded-[3px] border ${colClass}`}
                title={`Level ${idx}`}
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
