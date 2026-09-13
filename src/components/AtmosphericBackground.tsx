import React from 'react';

export const AtmosphericBackground: React.FC = () => {
  return (
    <div 
      aria-hidden="true" 
      className="pointer-events-none absolute inset-0 overflow-hidden z-0"
    >
      {/* 1. Deep Midnight Base with seamless hero transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030407] via-[#050811] to-[#020306]" />

      {/* 2. Ambient Celestial Light Beams & Glows (21st.dev style) */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[120vw] max-w-[1400px] h-[550px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.15),transparent_70%)] blur-3xl" />
      <div className="absolute top-[28%] right-[5%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.08),transparent_65%)] blur-3xl" />
      <div className="absolute top-[60%] left-[5%] w-[700px] h-[700px] bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.07),transparent_65%)] blur-3xl" />

      {/* 3. Topographic Mountain Elevation Contours (SVG Pattern) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.07] stroke-blue-400 mix-blend-screen"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern id="topo-grid" width="300" height="300" patternUnits="userSpaceOnUse">
            <path
              d="M0 150 C50 120 100 180 150 150 C200 120 250 180 300 150 M0 75 C60 50 90 100 150 75 C210 50 240 100 300 75 M0 225 C40 200 110 250 150 225 C190 200 260 250 300 225 M75 0 C50 60 100 90 75 150 C50 210 100 240 75 300 M225 0 C200 60 250 90 225 150 C200 210 250 240 225 300"
              fill="none"
              strokeWidth="0.75"
              strokeDasharray="4 6"
            />
            <circle cx="150" cy="150" r="45" fill="none" strokeWidth="0.5" />
            <circle cx="150" cy="150" r="90" fill="none" strokeWidth="0.5" strokeDasharray="2 4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topo-grid)" />
      </svg>

      {/* 4. Subtle Micro-Dot Matrix Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 35%, black 40%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 35%, black 40%, transparent 95%)',
        }}
      />

      {/* 5. Smooth Vignette Borders */}
      <div className="absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#030407] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#030407] to-transparent pointer-events-none" />
    </div>
  );
};
