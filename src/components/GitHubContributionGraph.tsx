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

const MONTH_NAMES = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

const LEVEL_COLORS = [
  { fill: '#161b22', stroke: '#21262d' }, // Level 0: Empty
  { fill: '#0e4429', stroke: '#004822' }, // Level 1
  { fill: '#006d32', stroke: '#006d32' }, // Level 2
  { fill: '#26a641', stroke: '#26a641' }, // Level 3
  { fill: '#39d353', stroke: '#39d353' }, // Level 4
];

const GithubLogo = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
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
        // Fallback gracefully
      });
  }, []);

  const totalContributions = data?.total?.lastYear ?? 1145;
  const contributions = data?.contributions ?? [];

  // Group into weeks of 7 days (Sunday = index 0)
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

  // Precompute month labels
  const monthLabels: { weekIndex: number; name: string; x: number }[] = [];
  let lastMonth = '';

  contributions.forEach((day, index) => {
    const month = day.date.slice(0, 7);
    if (month !== lastMonth) {
      const weekIndex = Math.floor(index / 7);
      const dateObj = new Date(day.date + 'T12:00:00Z');
      const monthName = MONTH_NAMES[dateObj.getUTCMonth()];
      monthLabels.push({
        weekIndex,
        name: monthName,
        x: 32 + weekIndex * 13,
      });
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
    <div className="w-full max-w-[1350px] mx-auto p-5 sm:p-7 rounded-xl bg-[#0c131a]/95 border border-white/10 hover:border-white/15 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-all duration-300 flex flex-col">
      {/* Header Info: Consistent Space Grotesk + Mono Fonts, Tactile GitHub Button */}
      <div className="flex items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
        <div className="flex items-baseline gap-2.5">
          <h3 className="text-xl sm:text-2xl font-bold text-white font-['Space_Grotesk',sans-serif] tracking-tight tabular-nums">
            {totalContributions.toLocaleString()} Contributions
          </h3>
          <span className="text-xs font-mono text-slate-400">
            in the last year
          </span>
        </div>

        {/* Tactile GitHub Link Button */}
        <a
          href="https://github.com/Jaydeep869"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-[#39d353]/60 text-xs font-mono font-medium text-slate-200 hover:text-white transition-all duration-150 cursor-pointer group shadow-sm hover:shadow-[0_0_15px_rgba(57,211,83,0.2)] active:scale-95 shrink-0"
        >
          <GithubLogo />
          <span>GitHub</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#39d353] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </a>
      </div>

      {/* Main Grid: Mathematically Locked SVG Vector Layout (Zero Misalignment, Perfect Row/Month Alignment) */}
      <div className="pt-4 pb-1 w-full overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-white/15 [&::-webkit-scrollbar-thumb]:rounded">
        <div className="min-w-[680px] w-full">
          <svg
            viewBox="0 0 730 115"
            className="w-full h-auto overflow-visible select-none"
            style={{ shapeRendering: 'geometricPrecision' }}
          >
            {/* Month Labels */}
            {monthLabels.map((m, idx) => (
              <text
                key={idx}
                x={m.x}
                y="11"
                fill="#8b949e"
                fontSize="9"
                fontFamily="'Space Grotesk', -apple-system, sans-serif"
                fontWeight="500"
              >
                {m.name}
              </text>
            ))}

            {/* Day Labels - Pixel-Perfect Y Coordinates Matching Day 1, 3, 5 Rows */}
            <text
              x="2"
              y="41"
              fill="#6e7681"
              fontSize="9"
              fontFamily="'Space Grotesk', -apple-system, sans-serif"
              fontWeight="500"
            >
              Mon
            </text>
            <text
              x="2"
              y="67"
              fill="#6e7681"
              fontSize="9"
              fontFamily="'Space Grotesk', -apple-system, sans-serif"
              fontWeight="500"
            >
              Wed
            </text>
            <text
              x="2"
              y="93"
              fill="#6e7681"
              fontSize="9"
              fontFamily="'Space Grotesk', -apple-system, sans-serif"
              fontWeight="500"
            >
              Fri
            </text>

            {/* Contribution Rectangles */}
            {weeks.map((week, wIdx) => {
              const colX = 32 + wIdx * 13;
              return (
                <g key={wIdx}>
                  {week.map((day, dIdx) => {
                    const rowY = 20 + dIdx * 13;
                    const isHovered = hoveredDay?.date === day.date;
                    const color = LEVEL_COLORS[Math.min(day.level, 4)] || LEVEL_COLORS[0];

                    return (
                      <rect
                        key={day.date}
                        x={colX}
                        y={rowY}
                        width="10.5"
                        height="10.5"
                        rx="2.5"
                        ry="2.5"
                        fill={color.fill}
                        stroke={isHovered ? '#ffffff' : color.stroke}
                        strokeWidth={isHovered ? 1.5 : 0.5}
                        className="cursor-pointer transition-all duration-75"
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Footer: Dynamic Tooltip Info & Legend (Tight, Proportional, No Giant Empty Void) */}
      <div className="pt-3.5 mt-2 border-t border-white/[0.08] flex items-center justify-between gap-4 text-xs font-mono min-h-[28px]">
        {/* Active hover info only */}
        <div className="text-slate-300">
          {hoveredDay ? (
            <span className="flex items-center gap-2 text-xs">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: LEVEL_COLORS[Math.min(hoveredDay.level, 4)].fill }}
              />
              <span className="text-white font-medium">
                {hoveredDay.count} {hoveredDay.count === 1 ? 'contribution' : 'contributions'}
              </span>
              <span className="text-slate-500">on</span>
              <span className="text-slate-300">{formatDate(hoveredDay.date)}</span>
            </span>
          ) : (
            <span className="text-slate-500 text-[11px]">
              {totalContributions.toLocaleString()} verified contributions in the last year
            </span>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 shrink-0">
          <span>Less</span>
          <div className="flex items-center gap-1">
            {LEVEL_COLORS.map((col, idx) => (
              <span
                key={idx}
                className="w-2.5 h-2.5 rounded-[2px]"
                style={{ backgroundColor: col.fill, border: `0.5px solid ${col.stroke}` }}
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
