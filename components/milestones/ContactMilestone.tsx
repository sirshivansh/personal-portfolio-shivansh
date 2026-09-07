'use client';

import { personalInfo, socialLinks } from '@/lib/data';
import { Mail, ArrowUpRight, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons';

interface MilestoneProps {
  progress: number;
  isActive: boolean;
}

export function ContactMilestone({ progress, isActive }: MilestoneProps) {
  let opacity = 0;
  if (progress < 0.15) {
    opacity = progress / 0.15;
  } else {
    opacity = 1;
  }
  opacity = Math.max(0, Math.min(1, opacity));

  if (!isActive && opacity <= 0.01) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none transition-opacity duration-300 z-10"
      style={{ opacity }}
    >
      {/* LEFT SIDE: Unified Light Glass Container */}
      <div className="absolute left-6 lg:left-16 top-1/2 -translate-y-1/2 max-w-md lg:max-w-lg w-full pointer-events-auto">
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/90 shadow-2xl p-7 sm:p-8 rounded-3xl space-y-5 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 font-sans font-semibold text-[0.75rem] tracking-[0.1em] uppercase">
            <Mail className="w-3.5 h-3.5 text-cyan-600" />
            <span>Get in Touch</span>
          </div>

          <h2 className="font-serif font-bold text-slate-900 text-3xl sm:text-4xl tracking-[-0.02em] leading-tight">
            Let's Build Something Together
          </h2>

          <p className="text-slate-600 font-medium text-xs sm:text-sm leading-relaxed">
            Whether you have an exciting project idea, a position to discuss, or just want to connect — feel free to drop me an email!
          </p>

          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-cyan-500/20 active:scale-98 group"
          >
            <Mail className="w-4 h-4" />
            <span className="truncate">{personalInfo.email}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* RIGHT SIDE: Unified Light Glass Container */}
      <div className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 max-w-xs w-full pointer-events-auto hidden md:block">
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/90 shadow-2xl p-6 rounded-3xl space-y-4 text-left">
          <h3 className="text-[0.75rem] font-sans font-semibold tracking-[0.1em] uppercase text-slate-700">
            Connect Online
          </h3>

          <div className="space-y-2.5">
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 text-xs font-semibold transition-all shadow-sm group"
              >
                <GithubIcon className="w-4 h-4 text-slate-900 group-hover:text-cyan-600 transition-colors" />
                <span>GitHub Profile</span>
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 border border-slate-200 text-xs font-semibold transition-all shadow-sm group"
              >
                <LinkedinIcon className="w-4 h-4 text-slate-900 group-hover:text-cyan-600 transition-colors" />
                <span>LinkedIn Profile</span>
              </a>
            )}
          </div>

          <div className="pt-2 border-t border-slate-200/80 text-[11px] font-mono text-slate-500 flex items-center justify-center gap-1.5">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
            <span>by {personalInfo.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
