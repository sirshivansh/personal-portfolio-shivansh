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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950 text-teal-300 border border-slate-800 font-sans font-semibold text-[0.75rem] tracking-[0.1em] uppercase shadow-lg">
          <User className="w-3.5 h-3.5" />
          <span>About Shivansh</span>
        </div>

        <div className="bg-slate-950/90 backdrop-blur-xl p-5 rounded-2xl border border-slate-800 shadow-2xl">
          <h2 className="font-serif font-bold text-white text-3xl sm:text-4xl tracking-[-0.02em]">
            Crafting Digital Experiences
          </h2>
        </div>

        <div className="bg-white/85 backdrop-blur-xl p-6 rounded-2xl border border-slate-200/90 space-y-3 shadow-xl text-slate-900">
          <h3 className="text-sm font-semibold text-cyan-700 flex items-center gap-2 font-mono">
            <Code2 className="w-4 h-4" /> Backstory & Engineering
          </h3>
          <p className="text-slate-700 text-xs font-medium leading-relaxed">
            {aboutInfo.paragraph1}
          </p>
          <p className="text-slate-700 text-xs font-medium leading-relaxed">
            {aboutInfo.paragraph2}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Core Philosophy */}
      <div className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 max-w-md lg:max-w-md w-full pointer-events-auto space-y-4 text-left hidden md:block">
        <div className="bg-white/85 backdrop-blur-xl p-6 rounded-2xl border border-slate-200/90 space-y-4 shadow-xl text-slate-900">
          <h3 className="text-sm font-semibold text-amber-600 flex items-center gap-2 font-mono">
            <Cpu className="w-4 h-4" /> Core Philosophy
          </h3>
          <div className="space-y-3">
            {aboutInfo.highlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <div className="p-1 rounded bg-slate-900 text-cyan-400 mt-0.5">
                  <Rocket className="w-3.5 h-3.5" />
                </div>
                <p className="text-slate-800 text-xs font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
