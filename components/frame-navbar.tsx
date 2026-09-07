'use client';

import { useState, useEffect } from 'react';
import { personalInfo } from '@/lib/data';
import { MILESTONES } from '@/lib/milestones';
import { Download, Menu, X } from 'lucide-react';
import Image from 'next/image';

interface FrameNavbarProps {
  currentFrame: number;
}

export function FrameNavbar({ currentFrame }: FrameNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToMilestone = (startFrame: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = (startFrame / 119) * maxScroll;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg'
          : 'bg-gradient-to-b from-slate-950/70 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left Brand */}
        <button
          onClick={() => scrollToMilestone(0)}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-cyan-400/50 group-hover:scale-105 transition-transform shadow-md">
            <Image
              src="/shivansh-photo.jpg"
              alt={personalInfo.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="font-bold text-white text-sm tracking-tight group-hover:text-cyan-300 transition-colors drop-shadow">
              {personalInfo.name}
            </span>
            <span className="text-[10px] text-cyan-400 block font-mono">
              Java Developer
            </span>
          </div>
        </button>

        {/* Right Desktop Nav */}
        <div className="hidden md:flex items-center gap-3">
          <nav className="flex items-center gap-1 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800 shadow-md">
            {MILESTONES.map((m) => {
              const isActive = currentFrame >= m.startFrame && currentFrame < m.endFrame;
              return (
                <button
                  key={m.id}
                  onClick={() => scrollToMilestone(m.startFrame)}
                  className={`px-3.5 py-1.5 text-xs font-mono rounded-full transition-all ${
                    isActive
                      ? 'bg-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                      : 'text-slate-200 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  {m.title}
                </button>
              );
            })}
          </nav>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-950/80 hover:bg-slate-900 text-cyan-300 text-xs font-mono border border-slate-800 transition-all shadow-md"
          >
            <Download className="w-3.5 h-3.5" /> Resume
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-slate-950/80 text-slate-200 border border-slate-800"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 px-6 py-4 space-y-2 shadow-2xl">
          {MILESTONES.map((m) => {
            const isActive = currentFrame >= m.startFrame && currentFrame < m.endFrame;
            return (
              <button
                key={m.id}
                onClick={() => scrollToMilestone(m.startFrame)}
                className={`block w-full text-left py-2 px-3 text-xs font-mono rounded-lg ${
                  isActive
                    ? 'bg-cyan-400 text-slate-950 font-bold'
                    : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                {m.title}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
