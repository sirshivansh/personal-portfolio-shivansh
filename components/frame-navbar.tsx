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
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToMilestone = (startFrame: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = (startFrame / 59) * maxScroll;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-40 px-4 transition-all duration-300">
      <div className="max-w-5xl mx-auto bg-slate-950/90 backdrop-blur-xl border border-slate-800 shadow-2xl rounded-full px-5 py-2.5 flex items-center justify-between">
        <button
          onClick={() => scrollToMilestone(0)}
          className="flex items-center gap-2.5 text-left focus:outline-none group"
        >
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-cyan-500/50 group-hover:scale-105 transition-transform">
            <Image
              src="/shivansh-photo.jpg"
              alt={personalInfo.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="font-bold text-white text-sm tracking-tight group-hover:text-cyan-400 transition-colors">
              {personalInfo.name}
            </span>
            <span className="text-[10px] text-slate-400 block font-mono">
              Portfolio
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 px-3 py-1 rounded-full border border-slate-800">
          {MILESTONES.map((m) => {
            const isActive = currentFrame >= m.startFrame && currentFrame < m.endFrame;
            return (
              <button
                key={m.id}
                onClick={() => scrollToMilestone(m.startFrame)}
                className={`px-3 py-1.5 text-xs font-mono rounded-full transition-all ${
                  isActive
                    ? 'bg-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {m.title}
              </button>
            );
          })}
        </nav>

        {/* Resume Link */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-cyan-300 text-xs font-mono border border-slate-700 transition-all"
          >
            <Download className="w-3.5 h-3.5" /> Resume
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 rounded-lg bg-slate-900 text-slate-200 border border-slate-800"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-sm mx-auto bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 space-y-2 shadow-2xl">
          {MILESTONES.map((m) => {
            const isActive = currentFrame >= m.startFrame && currentFrame < m.endFrame;
            return (
              <button
                key={m.id}
                onClick={() => scrollToMilestone(m.startFrame)}
                className={`block w-full text-left py-2 px-3 text-xs font-mono rounded-lg ${
                  isActive ? 'bg-cyan-400 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-900'
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
