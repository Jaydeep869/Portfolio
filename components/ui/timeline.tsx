import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export interface TimelineProps {
  data: TimelineEntry[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ data, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const update = () => {
      if (ref.current) setHeight(ref.current.getBoundingClientRect().height);
    };
    update();
    window.addEventListener("resize", update);
    const t = setTimeout(update, 300);
    return () => { window.removeEventListener("resize", update); clearTimeout(t); };
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 15%", "end 80%"],
  });
  const lineH = useTransform(scrollYProgress, [0, 1], [0, height]);
  const lineO = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      <div ref={ref} className="relative">
        {/* Spine: 1px line at x=24px */}
        <div
          className="absolute top-0 bottom-0 w-px bg-white/10 pointer-events-none"
          style={{ left: 24 }}
        >
          <motion.div
            style={{ height: lineH, opacity: lineO }}
            className="absolute top-0 inset-x-0 w-full rounded-full bg-gradient-to-b from-[#9ab4c4]/80 to-transparent"
          />
        </div>

        <div className="space-y-0">
          {data.map((item, i) => (
            <div key={i} className="relative" style={{ paddingLeft: 60 }}>
              {/* Dot: 8px circle centred on x=24 */}
              <div
                className="absolute top-8 w-2 h-2 rounded-full bg-[#9ab4c4]/60 ring-2 ring-[#1a2126] group-hover:bg-[#9ab4c4]"
                style={{ left: 20 }}
              />
              <div className="pb-8">
                {item.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
