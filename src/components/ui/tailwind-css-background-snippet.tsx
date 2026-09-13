import React from "react";
import { cn } from "@/lib/utils";

interface HeroProps {
  className?: string;
  children?: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({ className, children }) => {
  return (
    <div className={cn("w-full relative min-h-[100svh] flex flex-col items-center justify-center bg-black", className)}>
      {/* Pure Black Background */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 bg-black"
      />
      {/* Content wrapper */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default Hero;
