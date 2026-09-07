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
      className="fixed inset-0 pt-20 pb-12 flex items-center justify-between px-6 lg:px-14 pointer-events-none transition-opacity duration-300 z-10"
      style={{ opacity }}
    >
      {/* LEFT SIDE: Backstory Container */}
      <div className="pointer-events-auto max-w-sm sm:max-w-md lg:max-w-lg w-full bg-white/40 backdrop-blur-md border border-white/60 shadow-xl p-6 sm:p-7 rounded-3xl space-y-3.5 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 border border-teal-200 text-teal-800 font-sans font-semibold text-[0.75rem] tracking-[0.1em] uppercase shadow-sm">
          <User className="w-3.5 h-3.5 text-teal-600" />
          <span>About Shivansh</span>
        </div>

        <h2 className="font-serif font-bold text-slate-900 text-3xl sm:text-4xl tracking-[-0.02em] leading-tight">
          Crafting Digital Experiences
        </h2>

        <div className="space-y-2.5 pt-1 border-t border-slate-200/60">
          <h3 className="text-xs font-semibold text-cyan-800 flex items-center gap-2 font-mono uppercase tracking-wider">
            <Code2 className="w-3.5 h-3.5" /> Backstory & Engineering
          </h3>
          <p className="text-slate-700 font-medium text-xs sm:text-sm leading-relaxed">
            {aboutInfo.paragraph1}
          </p>
          <p className="text-slate-700 font-medium text-xs sm:text-sm leading-relaxed">
            {aboutInfo.paragraph2}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Philosophy Container */}
      <div className="pointer-events-auto max-w-xs sm:max-w-sm w-full bg-white/40 backdrop-blur-md border border-white/60 shadow-xl p-5 sm:p-6 rounded-3xl space-y-3 text-left hidden md:block">
        <h3 className="text-[0.75rem] font-sans font-semibold tracking-[0.1em] uppercase text-amber-800 flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-amber-600" /> Core Philosophy
        </h3>

        <div className="space-y-2.5">
          {aboutInfo.highlights.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <div className="p-1 rounded bg-white/70 text-cyan-700 border border-slate-200 mt-0.5 shadow-sm">
                <Rocket className="w-3 h-3" />
              </div>
              <p className="text-slate-800 text-xs font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
