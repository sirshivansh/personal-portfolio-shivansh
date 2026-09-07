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
      <div className="absolute left-6 lg:left-16 top-1/2 -translate-y-1/2 max-w-md lg:max-w-xl w-full pointer-events-auto space-y-4">
        {/* Badge: Small, letter-spaced uppercase sans-serif with font-size: 0.75rem and letter-spacing: 0.1em */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950 text-cyan-300 border border-slate-800 font-sans font-semibold text-[0.75rem] tracking-[0.1em] uppercase shadow-lg">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-400" />
          <span>Available for New Opportunities</span>
        </div>

        {/* Playfair Display Headline at 700 weight, solid pure white (#ffffff), letter-spacing: -0.02em */}
        <div className="bg-slate-950/90 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-2xl">
          <h1 className="font-serif font-bold text-white text-4xl sm:text-5xl lg:text-6xl tracking-[-0.02em] leading-tight">
            Hi, I'm {personalInfo.name}
          </h1>
        </div>

        {/* Light Immersive Glass Box */}
        <div className="bg-white/85 backdrop-blur-xl border border-slate-200/90 p-5 sm:p-6 rounded-2xl shadow-xl space-y-3">
          <p className="text-base sm:text-lg text-slate-900 font-semibold">
            {personalInfo.title}
          </p>
          <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
            {personalInfo.bio}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white font-bold transition-all shadow-md active:scale-95 text-xs"
            >
              Explore Projects <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold border border-slate-300 transition-all active:scale-95 text-xs"
            >
              Resume <Download className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE CONTENT CONTAINER */}
      <div className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 max-w-xs w-full pointer-events-auto space-y-4 hidden md:block text-right">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-slate-200/90 text-slate-900 font-sans font-semibold text-[0.75rem] tracking-[0.1em] uppercase shadow-md ml-auto">
          <MapPin className="w-3.5 h-3.5 text-amber-500" />
          <span>{personalInfo.location}</span>
        </div>

        <div className="bg-white/85 backdrop-blur-xl border border-slate-200/90 p-5 rounded-2xl shadow-xl text-left space-y-2">
          <div className="flex items-center gap-2 text-cyan-700 text-xs font-mono font-semibold">
            <Code2 className="w-4 h-4" /> Core Expertise
          </div>
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            Java, Spring Boot, Object-Oriented Architecture, Systems Thinking & High-Performance Web Services.
          </p>
        </div>
      </div>

      {/* BOTTOM SCROLL HINT */}
      <div className="absolute bottom-6 left-6 lg:left-16 pointer-events-auto">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950 text-white border border-slate-800 font-sans font-semibold text-[0.75rem] tracking-[0.1em] uppercase shadow-lg">
          <span className="animate-pulse text-cyan-400">↓</span>
          <span>Scroll down to explore</span>
        </div>
      </div>
    </div>
  );
}
