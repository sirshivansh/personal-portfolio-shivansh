'use client';

import { personalInfo, socialLinks } from '@/lib/data';
import { Mail, ArrowUpRight, Heart } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/icons';

interface MilestoneProps {
  progress: number;
  isActive: boolean;
}

export function ContactMilestone({ progress, isActive }: MilestoneProps) {
  let opacity = 0;
  if (progress < 0.15) {
    opacity = progress / 0.15;
  } else {
    opacity = 1;
  }
  opacity = Math.max(0, Math.min(1, opacity));

  if (!isActive && opacity <= 0.01) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none transition-opacity duration-300 z-10"
      style={{ opacity }}
    >
      {/* LEFT SIDE: Headline & Email CTA */}
      <div className="absolute left-6 lg:left-16 top-1/2 -translate-y-1/2 max-w-md lg:max-w-lg w-full pointer-events-auto space-y-4 text-left">
        {/* Badge: Small, letter-spaced uppercase sans-serif with font-size: 0.75rem and letter-spacing: 0.1em */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950 text-cyan-300 border border-slate-800 font-sans font-semibold text-[0.75rem] tracking-[0.1em] uppercase shadow-lg">
          <Mail className="w-3.5 h-3.5 text-cyan-400" />
          <span>Get in Touch</span>
        </div>

        {/* Playfair Display / Serif Header at 700 weight, solid pure white (#ffffff), letter-spacing: -0.02em inside dark header container */}
        <div className="bg-slate-950/90 backdrop-blur-xl p-6 rounded-2xl border border-slate-800 shadow-2xl">
          <h2 className="font-serif font-bold text-white text-3xl sm:text-4xl tracking-[-0.02em] leading-tight">
            Let's Build Something Together
          </h2>
        </div>

        {/* Light Immersive Glass Box for Email CTA */}
        <div className="bg-white/85 backdrop-blur-xl p-6 rounded-2xl border border-slate-200/90 shadow-xl space-y-4">
          <p className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed">
            Whether you have an exciting project idea, a position to discuss, or just want to connect — feel free to drop me an email!
          </p>

          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center justify-center gap-2.5 w-full py-3.5 px-5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm transition-all shadow-md active:scale-98 group"
          >
            <Mail className="w-4 h-4" />
            <span className="truncate">{personalInfo.email}</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* RIGHT SIDE: Social Links & Footer in Light Immersive Glass */}
      <div className="absolute right-6 lg:right-16 top-1/2 -translate-y-1/2 max-w-xs w-full pointer-events-auto space-y-4 text-left hidden md:block">
        <div className="bg-white/85 backdrop-blur-xl p-5 rounded-2xl border border-slate-200/90 shadow-xl space-y-3">
          <h3 className="text-[0.75rem] font-sans font-semibold tracking-[0.1em] uppercase text-cyan-600">
            Connect Online
          </h3>

          <div className="space-y-2">
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 text-xs font-medium transition-all shadow-sm"
              >
                <GithubIcon className="w-4 h-4 text-cyan-400" /> GitHub Profile
              </a>
            )}
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 text-xs font-medium transition-all shadow-sm"
              >
                <LinkedinIcon className="w-4 h-4 text-cyan-400" /> LinkedIn Profile
              </a>
            )}
          </div>
        </div>

        <div className="bg-white/85 backdrop-blur-xl p-4 rounded-2xl border border-slate-200/90 text-[11px] font-mono text-slate-600 flex items-center justify-center gap-1.5 shadow-md">
          <span>Built with</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500 animate-pulse" />
          <span>by {personalInfo.name}</span>
        </div>
      </div>
    </div>
  );
}
