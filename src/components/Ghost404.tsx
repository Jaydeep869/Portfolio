import React from 'react';
import { ArrowLeft, Mountain } from 'lucide-react';

interface Ghost404Props {
  onReturnHome?: () => void;
}

export const Ghost404: React.FC<Ghost404Props> = ({ onReturnHome }) => {
  const handleReturn = () => {
    if (onReturnHome) {
      onReturnHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#03060a] text-center relative overflow-hidden">
      {/* Background Radial Glow */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vmin] h-[90vmin] rounded-full bg-[radial-gradient(circle_at_center,rgba(60,78,90,0.25),transparent_70%)] blur-3xl"
      />

      <div className="relative z-10 max-w-md mx-auto space-y-6 flex flex-col items-center">
        
        {/* Floating Ghost Graphic with Bobbing CSS Keyframe */}
        <div className="relative animate-bounce duration-1000">
          <svg 
            width="120" 
            height="140" 
            viewBox="0 0 120 140" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_15px_30px_rgba(154,180,196,0.3)]"
          >
            {/* Ghost Body */}
            <path 
              d="M20 60C20 26.8629 46.8629 0 80 0C113.137 0 140 26.8629 140 60V120C140 125 135 130 130 125L115 110L100 125L85 110L70 125L55 110L40 125L25 110L20 115V60Z" 
              transform="translate(-20, 0)" 
              fill="#e2e8f0" 
            />
            {/* Eyes */}
            <circle cx="45" cy="50" r="6" fill="#0f172a" />
            <circle cx="75" cy="50" r="6" fill="#0f172a" />
            {/* Blush */}
            <ellipse cx="38" cy="62" rx="5" ry="3" fill="#cbd5e1" opacity="0.6" />
            <ellipse cx="82" cy="62" rx="5" ry="3" fill="#cbd5e1" opacity="0.6" />
          </svg>

          {/* Floating Shadow */}
          <div className="w-20 h-3 bg-black/50 rounded-full blur-sm mx-auto mt-4" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#9ab4c4] font-semibold">
            Error 404 // Lost Trail
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Page Vanished In The Fog
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm">
            The peak or coordinates you are looking for do not exist or have been moved down the mountain.
          </p>
        </div>

        <button
          onClick={handleReturn}
          className="px-5 py-2.5 rounded-xl bg-[#3c4e5a] hover:bg-[#4d6373] text-white text-xs font-mono font-semibold transition flex items-center gap-2 cursor-pointer shadow-lg shadow-black/50 active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Summit</span>
          <Mountain className="w-3.5 h-3.5 text-[#9ab4c4]" />
        </button>

      </div>
    </div>
  );
};

export default Ghost404;
