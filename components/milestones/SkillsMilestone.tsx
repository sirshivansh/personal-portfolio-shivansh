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
      {/* LEFT SIDE: Languages & Frameworks */}
      <div className="absolute left-6 lg:left-16 top-1/2 -translate-y-1/2 max-w-md lg:max-w-md w-full pointer-events-auto space-y-4 text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 text-cyan-300 text-xs font-mono tracking-wider uppercase shadow-xl">
          <Cpu className="w-3.5 h-3.5" />
          <span>Technical Stack</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 tracking-tight drop-shadow-sm">
          Skills & Toolkit
        </h2>

        <div className="bg-slate-950/85 backdrop-blur-xl p-5 rounded-2xl border border-slate-800 space-y-3 shadow-2xl">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-300" />
            <h3 className="text-xs font-semibold text-white font-mono">Languages</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skillsData.languages.map((skill, sIdx) => (
              <span
                key={sIdx}
                className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 text-slate-200 border border-slate-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-slate-950/85 backdrop-blur-xl p-5 rounded-2xl border border-slate-800 space-y-3 shadow-2xl">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-teal-300" />
            <h3 className="text-xs font-semibold text-white font-mono">Frameworks & APIs</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skillsData.frameworks.map((skill, sIdx) => (
              <span
                key={sIdx}
                className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 text-slate-200 border border-slate-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Databases & Tools */}
      <div className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 max-w-md lg:max-w-md w-full pointer-events-auto space-y-4 text-left hidden md:block">
        <div className="bg-slate-950/85 backdrop-blur-xl p-5 rounded-2xl border border-slate-800 space-y-3 shadow-2xl">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-semibold text-white font-mono">Databases</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skillsData.databases.map((skill, sIdx) => (
              <span
                key={sIdx}
                className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 text-slate-200 border border-slate-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-slate-950/85 backdrop-blur-xl p-5 rounded-2xl border border-slate-800 space-y-3 shadow-2xl">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-indigo-300" />
            <h3 className="text-xs font-semibold text-white font-mono">Tools & Platforms</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {skillsData.tools.map((skill, sIdx) => (
              <span
                key={sIdx}
                className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 text-slate-200 border border-slate-800"
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
