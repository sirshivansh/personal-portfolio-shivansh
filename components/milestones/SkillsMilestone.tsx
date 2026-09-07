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

  const categories = [
    { name: 'Languages', items: skillsData.languages, icon: Terminal, color: 'text-cyan-400' },
    { name: 'Frameworks & UI', items: skillsData.frameworks, icon: Globe, color: 'text-teal-400' },
    { name: 'Databases & Cloud', items: skillsData.databases, icon: Database, color: 'text-amber-400' },
    { name: 'Tools & DevOps', items: skillsData.tools, icon: Wrench, color: 'text-indigo-400' },
  ];

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none transition-opacity duration-300 z-10"
      style={{ opacity }}
    >
      <div className="max-w-5xl w-full pointer-events-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wider uppercase">
          <Cpu className="w-3.5 h-3.5" />
          <span>Technical Stack</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Skills, Tools & Expertise
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 pt-2 text-left">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${cat.color}`} />
                  <h3 className="text-sm font-semibold text-white">{cat.name}</h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 text-slate-200 border border-white/10 hover:border-cyan-500/40 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
