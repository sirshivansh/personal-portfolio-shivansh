'use client';

import { projectsData } from '@/lib/data';
import { ExternalLink, Layers, ArrowUpRight } from 'lucide-react';
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
      {/* LEFT SIDE: Header & Projects 1 & 2 */}
      <div className="absolute left-6 lg:left-16 top-1/2 -translate-y-1/2 max-w-md lg:max-w-lg w-full pointer-events-auto space-y-4 text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-mono tracking-wider uppercase shadow-xl">
          <Layers className="w-3.5 h-3.5" />
          <span>Featured Work</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 tracking-tight drop-shadow-sm">
          Selected Projects
        </h2>

        {project1 && (
          <div className="bg-slate-950/85 backdrop-blur-xl p-5 rounded-2xl border border-slate-800 space-y-2 shadow-2xl hover:border-cyan-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                {project1.category}
              </span>
              {project1.githubUrl && (
                <a
                  href={project1.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white p-1"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
            </div>
            <h3 className="text-base font-bold text-white">{project1.title}</h3>
            <p className="text-slate-300 text-xs leading-relaxed">{project1.description}</p>
            <div className="flex flex-wrap gap-1 pt-1">
              {project1.tech.map((t, i) => (
                <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {project2 && (
          <div className="bg-slate-950/85 backdrop-blur-xl p-5 rounded-2xl border border-slate-800 space-y-2 shadow-2xl hover:border-cyan-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                {project2.category}
              </span>
            </div>
            <h3 className="text-base font-bold text-white">{project2.title}</h3>
            <p className="text-slate-300 text-xs leading-relaxed">{project2.description}</p>
            <div className="flex flex-wrap gap-1 pt-1">
              {project2.tech.map((t, i) => (
                <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT SIDE: Project 3 & GitHub Link */}
      <div className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 max-w-md lg:max-w-md w-full pointer-events-auto space-y-4 text-left hidden md:block">
        {project3 && (
          <div className="bg-slate-950/85 backdrop-blur-xl p-5 rounded-2xl border border-slate-800 space-y-2 shadow-2xl hover:border-cyan-500/50 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                {project3.category}
              </span>
            </div>
            <h3 className="text-base font-bold text-white">{project3.title}</h3>
            <p className="text-slate-300 text-xs leading-relaxed">{project3.description}</p>
            <div className="flex flex-wrap gap-1 pt-1">
              {project3.tech.map((t, i) => (
                <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="bg-slate-950/85 backdrop-blur-xl p-5 rounded-2xl border border-slate-800 space-y-3 shadow-2xl">
          <h4 className="text-xs font-mono text-cyan-300 uppercase tracking-wider">Explore All Repositories</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Check out open-source projects, Java algorithms, and utility scripts on my GitHub profile.
          </p>
          <a
            href="https://github.com/sirshivansh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan-300 hover:text-white transition-colors"
          >
            Visit GitHub Profile <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
