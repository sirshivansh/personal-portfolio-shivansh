'use client';

import { projectsData } from '@/lib/data';
import { ExternalLink, Layers } from 'lucide-react';
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

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none transition-opacity duration-300 z-10"
      style={{ opacity }}
    >
      <div className="max-w-5xl w-full pointer-events-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-500/30 text-amber-400 text-xs font-mono tracking-wider uppercase">
          <Layers className="w-3.5 h-3.5" />
          <span>Featured Work</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
          Selected Projects & Case Studies
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-left">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                        title="View Code"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-cyan-400 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-1.5">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
