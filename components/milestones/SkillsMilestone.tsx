'use client';

import { skillsData } from '@/lib/data';
import { Cpu, Terminal, Database, Wrench, Globe } from 'lucide-react';

interface MilestoneProps {
  progress: number;
  isActive: boolean;
}

export function SkillsMilestone({ progress, isActive }: MilestoneProps) {
  let opacity = 0;
  if (progress < 0.15) {
    opacity = progress / 0.15;
  } else if (progress <= 0.8) {
    opacity = 1;
  } else {
    opacity = (1 - progress) / 0.2;
  }
  opacity = Math.max(0, Math.min(1, opacity));

  if (!isActive && opacity <= 0.01) return null;

  return (
    <div
      className="fixed inset-0 pt-20 pb-12 flex items-center justify-between px-6 lg:px-14 pointer-events-none transition-opacity duration-300 z-10"
      style={{ opacity }}
    >
      {/* LEFT SIDE: Skills Container */}
      <div className="pointer-events-auto max-w-sm sm:max-w-md lg:max-w-md w-full bg-white/40 backdrop-blur-md border border-white/60 shadow-xl p-6 sm:p-7 rounded-3xl space-y-3.5 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-cyan-200 text-cyan-800 font-sans font-semibold text-[0.75rem] tracking-[0.1em] uppercase shadow-sm">
          <Cpu className="w-3.5 h-3.5 text-cyan-600" />
          <span>Technical Stack</span>
        </div>

        <h2 className="font-serif font-bold text-slate-900 text-3xl sm:text-4xl tracking-[-0.02em] leading-tight">
          Skills & Toolkit
        </h2>

        <div className="space-y-2.5 pt-1 border-t border-slate-200/60">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-700" />
            <h3 className="text-xs font-semibold text-slate-900 font-mono">Languages</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skillsData.languages.map((skill, sIdx) => (
              <span
                key={sIdx}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/80 text-slate-800 border border-slate-200 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2.5 pt-1">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-teal-700" />
            <h3 className="text-xs font-semibold text-slate-900 font-mono">Frameworks & APIs</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skillsData.frameworks.map((skill, sIdx) => (
              <span
                key={sIdx}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/80 text-slate-800 border border-slate-200 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Databases & Tools */}
      <div className="pointer-events-auto max-w-xs sm:max-w-sm w-full bg-white/40 backdrop-blur-md border border-white/60 shadow-xl p-5 sm:p-6 rounded-3xl space-y-3.5 text-left hidden md:block">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-amber-600" />
            <h3 className="text-xs font-semibold text-slate-900 font-mono">Databases</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skillsData.databases.map((skill, sIdx) => (
              <span
                key={sIdx}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/80 text-slate-800 border border-slate-200 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2.5 pt-2 border-t border-slate-200/60">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-indigo-700" />
            <h3 className="text-xs font-semibold text-slate-900 font-mono">Tools & Platforms</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skillsData.tools.map((skill, sIdx) => (
              <span
                key={sIdx}
                className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/80 text-slate-800 border border-slate-200 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
