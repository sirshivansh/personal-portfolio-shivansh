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
      className="fixed inset-0 pt-16 md:pt-20 pb-6 md:pb-12 flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-14 pointer-events-none transition-opacity duration-300 z-10 gap-3 md:gap-0"
      style={{ opacity }}
    >
      {/* MOBILE TOP HALF: TRANSPARENT AREA REVEALING THE INTERACTIVE 3D FRAME CANVAS */}
      <div className="md:hidden w-full h-[38vh] pointer-events-none" />

      {/* MOBILE BOTTOM HALF / DESKTOP LEFT CONTAINER: DESCRIPTION */}
      <div className="pointer-events-auto max-w-sm sm:max-w-md lg:max-w-lg w-full bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl shadow-slate-900/5 p-5 sm:p-8 rounded-3xl space-y-3 sm:space-y-4 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 font-sans font-semibold text-[0.7rem] sm:text-[0.75rem] tracking-[0.1em] uppercase shadow-sm">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-500" />
          <span>Available for Opportunities</span>
        </div>

        <h1 className="font-serif font-bold text-slate-900 text-2xl sm:text-4xl lg:text-5xl leading-snug tracking-normal">
          Hi, I'm {personalInfo.name}
        </h1>

        <p className="text-xs sm:text-base text-slate-800 font-semibold leading-normal">
          {personalInfo.title}
        </p>

        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
          {personalInfo.bio}
        </p>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 sm:pt-2">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-md shadow-cyan-500/20 active:scale-95 text-xs"
          >
            Explore Projects <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold border border-slate-300 transition-all active:scale-95 text-xs shadow-sm"
          >
            Resume <Download className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* RIGHT SIDE CONTAINER (DESKTOP ONLY) */}
      <div className="pointer-events-auto max-w-xs w-full bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-xl shadow-slate-900/5 p-6 rounded-3xl space-y-4 text-left hidden md:block">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 font-sans font-semibold text-[0.75rem] tracking-[0.1em] uppercase shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-amber-600" />
          <span>{personalInfo.location}</span>
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-200/80">
          <div className="flex items-center gap-2 text-cyan-800 text-xs font-mono font-semibold">
            <Code2 className="w-4 h-4" /> Core Focus
          </div>
          <p className="text-xs text-slate-600 font-normal leading-relaxed">
            Java, MySQL, Object-Oriented Architecture, Systems Thinking & High-Performance Backend Systems.
          </p>
        </div>
      </div>

      {/* BOTTOM SCROLL HINT */}
      <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 lg:left-14 pointer-events-auto hidden sm:block">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-slate-700 font-sans font-semibold text-[0.7rem] tracking-[0.1em] uppercase shadow-md">
          <span className="animate-pulse text-cyan-600">↓</span>
          <span>Scroll down to explore</span>
        </div>
      </div>
    </div>
  );
}

