'use client';

import { projectsData } from '@/lib/data';
import { Layers, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from '@/components/ui/icons';

interface MilestoneProps {
  progress: number;
  isActive: boolean;
}

export function ProjectsMilestone({ progress, isActive }: MilestoneProps) {
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

  const project1 = projectsData[0];
  const project2 = projectsData[1];
  const project3 = projectsData[2];

  return (
    <div
      className="fixed inset-0 pointer-events-none transition-opacity duration-300 z-10"
      style={{ opacity }}
    >
      {/* LEFT SIDE: Unified Light Glass Container */}
      <div className="absolute left-6 lg:left-16 top-1/2 -translate-y-1/2 max-w-md lg:max-w-lg w-full pointer-events-auto">
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/90 shadow-2xl p-6 sm:p-7 rounded-3xl space-y-4 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-sans font-semibold text-[0.75rem] tracking-[0.1em] uppercase">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>Featured Work</span>
          </div>

          <h2 className="font-serif font-bold text-slate-900 text-3xl sm:text-4xl tracking-[-0.02em] leading-tight">
            Selected Projects
          </h2>

          <div className="space-y-3 pt-1">
            {project1 && (
              <div className="bg-slate-50/90 p-4 rounded-2xl border border-slate-200/80 space-y-2 hover:border-cyan-400 transition-colors shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 font-semibold border border-cyan-200">
                    {project1.category}
                  </span>
                  {project1.githubUrl && (
                    <a
                      href={project1.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-700 hover:text-cyan-600 p-1"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <h3 className="text-sm font-bold text-slate-900">{project1.title}</h3>
                <p className="text-slate-600 text-xs font-medium leading-relaxed">{project1.description}</p>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {project1.tech.map((t, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-800 border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project2 && (
              <div className="bg-slate-50/90 p-4 rounded-2xl border border-slate-200/80 space-y-2 hover:border-cyan-400 transition-colors shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 font-semibold border border-cyan-200">
                    {project2.category}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{project2.title}</h3>
                <p className="text-slate-600 text-xs font-medium leading-relaxed">{project2.description}</p>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {project2.tech.map((t, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-800 border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Unified Light Glass Container */}
      <div className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 max-w-md w-full pointer-events-auto hidden md:block">
        <div className="bg-white/90 backdrop-blur-2xl border border-slate-200/90 shadow-2xl p-6 rounded-3xl space-y-4 text-left">
          {project3 && (
            <div className="bg-slate-50/90 p-4 rounded-2xl border border-slate-200/80 space-y-2 hover:border-cyan-400 transition-colors shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 font-semibold border border-cyan-200">
                  {project3.category}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">{project3.title}</h3>
              <p className="text-slate-600 text-xs font-medium leading-relaxed">{project3.description}</p>
              <div className="flex flex-wrap gap-1 pt-0.5">
                {project3.tech.map((t, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-800 border border-slate-200">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-slate-200/80 space-y-2">
            <h4 className="text-[0.75rem] font-sans font-semibold tracking-[0.1em] uppercase text-cyan-800">
              Explore All Repositories
            </h4>
            <p className="text-xs text-slate-600 font-medium leading-relaxed">
              Check out open-source projects, Java algorithms, and utility scripts on my GitHub profile.
            </p>
            <a
              href="https://github.com/sirshivansh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-cyan-700 hover:text-slate-950 font-bold transition-colors pt-1"
            >
              Visit GitHub Profile <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
