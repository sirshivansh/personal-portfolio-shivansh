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
      className="fixed inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none transition-opacity duration-300 z-10"
      style={{ opacity }}
    >
      <div className="max-w-4xl w-full pointer-events-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-teal-500/30 text-teal-400 text-xs font-mono tracking-wider uppercase">
          <User className="w-3.5 h-3.5" />
          <span>About Shivansh</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Crafting Digital Experiences with Precision
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-left">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-xl font-semibold text-cyan-400 flex items-center gap-2">
              <Code2 className="w-5 h-5" /> Backstory & Engineering
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {aboutInfo.paragraph1}
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              {aboutInfo.paragraph2}
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
            <h3 className="text-xl font-semibold text-amber-400 flex items-center gap-2">
              <Cpu className="w-5 h-5" /> Core Philosophy
            </h3>
            <div className="space-y-3">
              {aboutInfo.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="p-1 rounded-md bg-cyan-500/10 text-cyan-400 mt-0.5">
                    <Rocket className="w-4 h-4" />
                  </div>
                  <p className="text-slate-200 text-sm font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
