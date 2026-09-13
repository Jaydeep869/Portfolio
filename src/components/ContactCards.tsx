import React, { useState } from 'react';
import { Mail, Check, Copy, ArrowUpRight, Send } from 'lucide-react';

export const ContactCards: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const emailAddress = "jaydeep@example.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 3000);
  };

  return (
    <section 
      id="contact" 
      className="relative w-full min-h-[100svh] flex flex-col justify-center items-center py-16 sm:py-24 px-4 sm:px-8 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] pointer-events-none rounded-full blur-[130px] opacity-20"
        style={{ background: 'radial-gradient(circle, #3c4e5a 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-5xl w-full mx-auto space-y-10 sm:space-y-12">
        <div className="space-y-2 text-center sm:text-left border-b border-white/10 pb-6">
          <span className="text-xs font-mono tracking-[0.25em] uppercase text-[#9ab4c4] font-semibold">
            05 // Reach Out
          </span>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Get In Touch
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            Direct channels to connect, discuss software engineering roles, or collaborate on projects.
          </p>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Quick Connect Cards (Serafim style) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Copy Email Card */}
          <div className="p-5 rounded-2xl bg-[#0c131a]/80 border border-white/10 hover:border-[#3c4e5a] transition-all duration-300 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-[#9ab4c4]" />
                <span className="text-xs font-mono uppercase tracking-wider font-semibold">Email</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/15 text-slate-200 text-xs font-mono transition flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-sm font-mono text-white font-medium">
              {emailAddress}
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Replies within 24 hours</span>
            </div>
          </div>

          {/* GitHub Card */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl bg-[#0c131a]/80 border border-white/10 hover:border-[#3c4e5a] transition-all duration-300 flex items-center justify-between group cursor-pointer block"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">GitHub</span>
              <p className="text-sm font-bold text-white group-hover:text-[#9ab4c4] transition">
                github.com/jaydeep
              </p>
              <p className="text-xs text-slate-400">Repositories, code contributions & tools</p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-white transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* LinkedIn Card */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl bg-[#0c131a]/80 border border-white/10 hover:border-[#3c4e5a] transition-all duration-300 flex items-center justify-between group cursor-pointer block"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">LinkedIn</span>
              <p className="text-sm font-bold text-white group-hover:text-[#9ab4c4] transition">
                linkedin.com/in/jaydeep
              </p>
              <p className="text-xs text-slate-400">Professional network & updates</p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-500 group-hover:text-white transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Right: Interactive Message Form */}
        <div className="lg:col-span-7">
          <form 
            onSubmit={handleFormSubmit}
            className="p-6 sm:p-8 rounded-2xl bg-[#0c131a]/80 border border-white/10 space-y-4"
          >
            <h4 className="text-base font-bold text-white">Send a Direct Note</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#9ab4c4] transition"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400">Your Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#9ab4c4] transition"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400">Message</label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi Jaydeep, I'd like to talk about..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-[#9ab4c4] transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={formSent}
              className="px-5 py-2.5 rounded-xl bg-[#3c4e5a] hover:bg-[#4d6373] text-white text-xs font-medium font-mono transition flex items-center justify-center gap-2 cursor-pointer active:scale-95 disabled:opacity-60"
            >
              {formSent ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Message Dispatched</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  </section>
);
};

export default ContactCards;
