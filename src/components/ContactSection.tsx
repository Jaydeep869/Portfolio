import React from 'react';
import { socialLinks } from './SocialSidebars';

export const ContactSection: React.FC = () => {
  return (
    <section 
      id="contact" 
      className="relative w-full min-h-[100svh] h-[100svh] flex md:hidden flex-col items-center justify-center overflow-hidden bg-black px-6 border-t border-white/5"
    >
      <div className="relative z-10 w-full max-w-sm mx-auto text-center space-y-12 pb-16">
        <div className="space-y-4">
          <h2 className="text-4xl font-black tracking-tight text-white">
            Let's Connect
          </h2>
          <p className="text-slate-400 text-sm">
            Reach out via email or find me on my social profiles.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-6">
          <a
            href="mailto:jaydeeppokhariya2106@gmail.com"
            className="inline-block px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white font-mono text-xs sm:text-sm tracking-wide hover:bg-white/10 transition-all active:scale-95 shadow-xl w-full max-w-[280px] truncate"
          >
            jaydeeppokhariya2106@gmail.com
          </a>

          <div className="flex items-center justify-center gap-4 w-full">
            {socialLinks.map(({ name, url, icon }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-all active:scale-90 flex items-center justify-center"
              >
                <div className="[&>svg]:w-6 [&>svg]:h-6">
                  {icon}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
