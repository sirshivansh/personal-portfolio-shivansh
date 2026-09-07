'use client';

import { personalInfo } from '@/lib/data';
import { ArrowRight, Download, Sparkles, MapPin, Code2 } from 'lucide-react';

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
      className="fixed inset-0 pointer-events-none transition-opacity duration-300 z-10"
      style={{ opacity }}
    >
      {/* LEFT SIDE CONTENT CONTAINER */}
      <div className="absolute left-6 lg:left-16 top-1/2 -translate-y-1/2 max-w-md lg:max-w-xl w-full pointer-events-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-mono shadow-xl">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-400" />
          <span>Available for New Opportunities</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 drop-shadow-sm">
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-amber-600 bg-clip-text text-transparent">
            {personalInfo.name}
          </span>
        </h1>

        <div className="bg-slate-950/85 backdrop-blur-xl border border-slate-800 p-5 sm:p-6 rounded-2xl shadow-2xl space-y-3">
          <p className="text-base sm:text-lg text-cyan-300 font-medium">
            {personalInfo.title}
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {personalInfo.bio}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold transition-all shadow-lg shadow-cyan-500/20 active:scale-95 text-xs"
            >
              Explore Projects <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium border border-slate-700 transition-all active:scale-95 text-xs"
            >
              Resume <Download className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE CONTENT CONTAINER */}
      <div className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 max-w-xs w-full pointer-events-auto space-y-4 hidden md:block text-right">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-800 text-slate-200 text-xs font-mono shadow-xl ml-auto">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>{personalInfo.location}</span>
        </div>

        <div className="bg-slate-950/85 backdrop-blur-xl border border-slate-800 p-5 rounded-2xl shadow-2xl text-left space-y-2">
          <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono font-semibold">
            <Code2 className="w-4 h-4" /> Core Expertise
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Java, Spring Boot, Object-Oriented Architecture, Systems Thinking & High-Performance Web Services.
          </p>
        </div>
      </div>

      {/* BOTTOM SCROLL HINT */}
      <div className="absolute bottom-6 left-6 lg:left-16 pointer-events-auto">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-800 text-slate-300 text-xs font-mono shadow-lg">
          <span className="animate-pulse text-cyan-400">↓</span>
          <span>Scroll down to explore</span>
        </div>
      </div>
    </div>
  );
}
