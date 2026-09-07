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
      <div className="max-w-3xl w-full pointer-events-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wider uppercase">
          <Mail className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Let's Build Something Amazing Together
        </h2>

        <p className="text-slate-300 text-base max-w-xl mx-auto">
          Whether you have an exciting project idea, a position to discuss, or just want to connect — feel free to drop me an email!
        </p>

        <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6 max-w-xl mx-auto shadow-2xl">
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-bold text-lg hover:brightness-110 transition-all shadow-lg active:scale-98 group"
          >
            <Mail className="w-5 h-5" />
            <span>{personalInfo.email}</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <div className="flex items-center justify-center gap-4 pt-2">
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass-panel hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 text-sm font-medium transition-all"
              >
                <GithubIcon className="w-4 h-4" /> GitHub
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass-panel hover:bg-white/10 text-slate-200 hover:text-cyan-400 border border-white/10 text-sm font-medium transition-all"
              >
                <LinkedinIcon className="w-4 h-4" /> LinkedIn
              </a>
            )}
          </div>
        </div>

        <footer className="pt-8 text-xs font-mono text-slate-400 flex items-center justify-center gap-1.5">
          <span>Designed & Built with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
          <span>by {personalInfo.name}</span>
        </footer>
      </div>
    </div>
  );
}
