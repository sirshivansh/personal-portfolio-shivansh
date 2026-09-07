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
      className="fixed inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none transition-opacity duration-300 z-10"
      style={{ opacity }}
    >
      <div className="max-w-3xl w-full bg-slate-950/85 backdrop-blur-2xl border border-slate-800/90 rounded-3xl p-8 sm:p-10 shadow-2xl pointer-events-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider uppercase">
          <Mail className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Let's Build Something Amazing Together
        </h2>

        <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
          Whether you have an exciting project idea, a position to discuss, or just want to connect — feel free to drop me an email!
        </p>

        <div className="bg-slate-900/90 p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-5 max-w-xl mx-auto shadow-xl">
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-base transition-all shadow-lg active:scale-98 group"
          >
            <Mail className="w-4 h-4" />
            <span>{personalInfo.email}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <div className="flex items-center justify-center gap-3 pt-1">
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 text-xs font-medium transition-all"
              >
                <GithubIcon className="w-4 h-4 text-cyan-400" /> GitHub
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-200 hover:text-cyan-300 border border-slate-800 text-xs font-medium transition-all"
              >
                <LinkedinIcon className="w-4 h-4 text-cyan-400" /> LinkedIn
              </a>
            )}
          </div>
        </div>

        <footer className="pt-2 text-[11px] font-mono text-slate-400 flex items-center justify-center gap-1.5">
          <span>Designed & Built with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
          <span>by {personalInfo.name}</span>
        </footer>
      </div>
    </div>
  );
}
