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
      className="fixed inset-0 pointer-events-none transition-opacity duration-300 z-10"
      style={{ opacity }}
    >
      {/* LEFT SIDE: Unified Light Glass Container */}
      <div className="absolute left-6 lg:left-16 top-1/2 -translate-y-1/2 max-w-md lg:max-w-md w-full pointer-events-auto">
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/90 shadow-2xl p-7 sm:p-8 rounded-3xl space-y-4 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 font-sans font-semibold text-[0.75rem] tracking-[0.1em] uppercase">
            <Cpu className="w-3.5 h-3.5 text-cyan-600" />
            <span>Technical Stack</span>
          </div>

          <h2 className="font-serif font-bold text-slate-900 text-3xl sm:text-4xl tracking-[-0.02em] leading-tight">
            Skills & Toolkit
          </h2>

          <div className="space-y-3 pt-1 border-t border-slate-200/80">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-700" />
              <h3 className="text-xs font-semibold text-slate-900 font-mono">Languages</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skillsData.languages.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-teal-700" />
              <h3 className="text-xs font-semibold text-slate-900 font-mono">Frameworks & APIs</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skillsData.frameworks.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Unified Light Glass Container */}
      <div className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 max-w-md w-full pointer-events-auto hidden md:block">
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/90 shadow-2xl p-6 sm:p-7 rounded-3xl space-y-4 text-left">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-600" />
              <h3 className="text-xs font-semibold text-slate-900 font-mono">Databases</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skillsData.databases.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-200/80">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-indigo-700" />
              <h3 className="text-xs font-semibold text-slate-900 font-mono">Tools & Platforms</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skillsData.tools.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200 font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
