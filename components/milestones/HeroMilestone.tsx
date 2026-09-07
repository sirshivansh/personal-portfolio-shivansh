'use client';

import { personalInfo } from '@/lib/data';
import { ArrowRight, Download, Sparkles } from 'lucide-react';

interface MilestoneProps {
  progress: number;
  isActive: boolean;
}

export function HeroMilestone({ progress, isActive }: MilestoneProps) {
  let opacity = 0;
  if (progress < 0.2) {
    opacity = progress / 0.2;
  } else if (progress <= 0.75) {
    opacity = 1;
  } else {
    opacity = (1 - progress) / 0.25;
  }
  opacity = Math.max(0, Math.min(1, opacity));

  if (!isActive && opacity <= 0.01) return null;

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none transition-opacity duration-300 z-10"
      style={{ opacity }}
    >
      <div className="max-w-3xl w-full bg-slate-950/85 backdrop-blur-2xl border border-slate-800/90 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wide">
          <Sparkles className="w-4 h-4 animate-pulse text-amber-400" />
          <span>Available for New Opportunities</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white drop-shadow-md">
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-amber-300 bg-clip-text text-transparent">
            {personalInfo.name}
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-200 font-medium max-w-xl mx-auto">
          {personalInfo.title}
        </p>

        <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
          {personalInfo.bio}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold transition-all shadow-lg shadow-cyan-500/20 active:scale-95 text-sm"
          >
            Explore Projects <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium border border-slate-700 transition-all active:scale-95 text-sm"
          >
            Download Resume <Download className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/90 backdrop-blur-md border border-slate-800 text-slate-300 text-xs font-mono shadow-lg">
          <span className="animate-pulse text-cyan-400">↓</span>
          <span>Scroll to discover</span>
        </div>
      </div>
    </div>
  );
}
