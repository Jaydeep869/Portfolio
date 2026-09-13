import React from 'react';
import { motion } from 'framer-motion';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/Jaydeep869',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/jaydeep-pokhariya-682246320',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/Jaydeep869',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    ),
  },
  {
    name: 'CodeForces',
    url: 'https://codeforces.com/profile/Jaydeep2106',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="12" y1="2" x2="12" y2="22" />
      </svg>
    ),
  },
];

export const SocialSidebars: React.FC = () => {
  return (
    <>
      {/* Left Social Links Sidebar with Vertical Line */}
      <motion.div
        className="fixed bottom-0 left-6 xl:left-10 z-30 hidden md:flex flex-col items-center gap-5 select-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <ul className="flex flex-col items-center gap-4 m-0 p-0 list-none">
          {socialLinks.map(({ name, url, icon }) => (
            <li key={name}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="block p-2 text-slate-400 hover:text-[#9ab4c4] hover:scale-110 hover:-translate-y-1 transition-all duration-200"
              >
                {icon}
              </a>
            </li>
          ))}
        </ul>
        {/* Vertical Line extending to bottom */}
        <div className="w-[1px] h-24 bg-white/20 mt-1" />
      </motion.div>

      {/* Right Email Sidebar with Vertical Line */}
      <motion.div
        className="fixed bottom-0 right-6 xl:right-10 z-30 hidden md:flex flex-col items-center select-none"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <a
          href="mailto:jaydeeppokhariya2106@gmail.com"
          className="font-mono text-xs tracking-widest text-slate-400 hover:text-[#9ab4c4] hover:-translate-y-1 transition-all duration-200 [writing-mode:vertical-rl] py-2 px-1"
        >
          jaydeeppokhariya2106@gmail.com
        </a>
        {/* Vertical Line extending to bottom */}
        <div className="w-[1px] h-24 bg-white/20 mt-4" />
      </motion.div>
    </>
  );
};

export default SocialSidebars;
