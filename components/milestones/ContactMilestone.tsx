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
      {/* LEFT SIDE: Headline & Email CTA */}
      <div className="absolute left-6 lg:left-16 top-1/2 -translate-y-1/2 max-w-md lg:max-w-lg w-full pointer-events-auto space-y-4 text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-mono tracking-wider uppercase shadow-xl">
          <Mail className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 tracking-tight drop-shadow-sm">
          Let's Build Something Together
        </h2>

        <div className="bg-slate-950/85 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 space-y-4 shadow-2xl">
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Whether you have an exciting project idea, a position to discuss, or just want to connect — feel free to drop me an email!
          </p>

          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm transition-all shadow-lg active:scale-98 group"
          >
            <Mail className="w-4 h-4" />
            <span className="truncate">{personalInfo.email}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* RIGHT SIDE: Social Links & Footer */}
      <div className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 max-w-xs w-full pointer-events-auto space-y-4 text-left hidden md:block">
        <div className="bg-slate-950/85 backdrop-blur-xl p-5 rounded-2xl border border-slate-800 space-y-3 shadow-2xl">
          <h3 className="text-xs font-mono text-cyan-300 uppercase tracking-wider">Connect Online</h3>

          <div className="space-y-2">
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 text-xs font-medium transition-all"
              >
                <GithubIcon className="w-4 h-4 text-cyan-400" /> GitHub Profile
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-cyan-300 border border-slate-800 text-xs font-medium transition-all"
              >
                <LinkedinIcon className="w-4 h-4 text-cyan-400" /> LinkedIn Profile
              </a>
            )}
          </div>
        </div>

        <div className="bg-slate-950/85 backdrop-blur-xl p-4 rounded-2xl border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-center gap-1.5 shadow-xl">
          <span>Built with</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
          <span>by {personalInfo.name}</span>
        </div>
      </div>
    </div>
  );
}
