'use client';

import { aboutInfo } from '@/lib/data';
import { User, Code2, Cpu, Rocket } from 'lucide-react';

interface MilestoneProps {
  progress: number;
  isActive: boolean;
}

export function AboutMilestone({ progress, isActive }: MilestoneProps) {
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
      {/* LEFT SIDE: Backstory */}
      <div className="absolute left-6 lg:left-16 top-1/2 -translate-y-1/2 max-w-md lg:max-w-lg w-full pointer-events-auto space-y-4 text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-teal-500/40 text-teal-300 text-xs font-mono tracking-wider uppercase shadow-xl">
          <User className="w-3.5 h-3.5" />
          <span>About Shivansh</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 tracking-tight drop-shadow-sm">
          Crafting Digital Experiences
        </h2>

        <div className="bg-slate-950/85 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 space-y-3 shadow-2xl">
          <h3 className="text-sm font-semibold text-cyan-300 flex items-center gap-2 font-mono">
            <Code2 className="w-4 h-4" /> Backstory & Engineering
          </h3>
          <p className="text-slate-300 text-xs leading-relaxed">
            {aboutInfo.paragraph1}
          </p>
          <p className="text-slate-300 text-xs leading-relaxed">
            {aboutInfo.paragraph2}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Core Philosophy */}
      <div className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 max-w-md lg:max-w-md w-full pointer-events-auto space-y-4 text-left hidden md:block">
        <div className="bg-slate-950/85 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 space-y-4 shadow-2xl">
          <h3 className="text-sm font-semibold text-amber-400 flex items-center gap-2 font-mono">
            <Cpu className="w-4 h-4" /> Core Philosophy
          </h3>
          <div className="space-y-3">
            {aboutInfo.highlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <div className="p-1 rounded bg-cyan-500/10 text-cyan-300 mt-0.5">
                  <Rocket className="w-3.5 h-3.5" />
                </div>
                <p className="text-slate-200 text-xs font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
