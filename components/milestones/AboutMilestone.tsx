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
      {/* LEFT SIDE: Unified Light Glass Container */}
      <div className="absolute left-6 lg:left-16 top-1/2 -translate-y-1/2 max-w-md lg:max-w-lg w-full pointer-events-auto">
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/90 shadow-2xl p-7 sm:p-8 rounded-3xl space-y-4 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 font-sans font-semibold text-[0.75rem] tracking-[0.1em] uppercase">
            <User className="w-3.5 h-3.5 text-teal-600" />
            <span>About Shivansh</span>
          </div>

          <h2 className="font-serif font-bold text-slate-900 text-3xl sm:text-4xl tracking-[-0.02em] leading-tight">
            Crafting Digital Experiences
          </h2>

          <div className="space-y-3 pt-1 border-t border-slate-200/80">
            <h3 className="text-xs font-semibold text-cyan-800 flex items-center gap-2 font-mono uppercase tracking-wider">
              <Code2 className="w-4 h-4" /> Backstory & Engineering
            </h3>
            <p className="text-slate-600 font-medium text-xs sm:text-sm leading-relaxed">
              {aboutInfo.paragraph1}
            </p>
            <p className="text-slate-600 font-medium text-xs sm:text-sm leading-relaxed">
              {aboutInfo.paragraph2}
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Unified Light Glass Container */}
      <div className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 max-w-md w-full pointer-events-auto hidden md:block">
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/90 shadow-2xl p-6 sm:p-7 rounded-3xl space-y-4 text-left">
          <h3 className="text-[0.75rem] font-sans font-semibold tracking-[0.1em] uppercase text-amber-800 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-amber-600" /> Core Philosophy
          </h3>

          <div className="space-y-3">
            {aboutInfo.highlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <div className="p-1 rounded bg-cyan-50 text-cyan-700 border border-cyan-200 mt-0.5">
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
