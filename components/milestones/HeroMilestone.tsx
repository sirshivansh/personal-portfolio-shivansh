'use client';

import { personalInfo } from '@/lib/data';
import { ArrowRight, Download, Sparkles } from 'lucide-react';

interface MilestoneProps {
  progress: number; // 0 to 1 progress within this milestone
  isActive: boolean;
}

export function HeroMilestone({ progress, isActive }: MilestoneProps) {
  // Fade in at 0..0.2, stay visible, fade out at 0.8..1.0
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
      <div className="max-w-4xl space-y-6 pointer-events-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 text-cyan-400 text-sm font-mono tracking-wide">
          <Sparkles className="w-4 h-4 animate-pulse text-amber-400" />
          <span>Available for New Opportunities</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
          Hi, I'm <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-400 bg-clip-text text-transparent">{personalInfo.name}</span>
        </h1>

        <p className="text-xl sm:text-2xl text-slate-200 font-medium max-w-2xl mx-auto drop-shadow-md">
          {personalInfo.title}
        </p>

        <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto drop-shadow">
          {personalInfo.bio}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition-all shadow-lg hover:shadow-cyan-500/25 active:scale-95"
          >
            Explore Projects <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-panel hover:bg-white/10 text-white font-medium border border-white/20 transition-all active:scale-95"
          >
            Download Resume <Download className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 font-mono text-xs">
        <span className="animate-bounce">Scroll down to discover</span>
        <div className="w-5 h-8 rounded-full border-2 border-slate-400/50 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-cyan-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
