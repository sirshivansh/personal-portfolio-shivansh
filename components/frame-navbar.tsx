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
    const targetScroll = (startFrame / 119) * maxScroll;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-black/60 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button
          onClick={() => scrollToMilestone(0)}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-cyan-500/50 group-hover:scale-105 transition-transform">
            <Image
              src="/shivansh-photo.jpg"
              alt={personalInfo.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
              {personalInfo.name}
            </span>
            <span className="text-xs text-slate-400 block font-mono">
              Portfolio
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-white/10">
          {MILESTONES.map((m) => {
            const isActive = currentFrame >= m.startFrame && currentFrame < m.endFrame;
            return (
              <button
                key={m.id}
                onClick={() => scrollToMilestone(m.startFrame)}
                className={`px-3.5 py-1.5 text-xs font-mono rounded-full transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {m.title}
              </button>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass-panel hover:bg-white/10 text-white text-xs font-mono border border-white/15 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" /> Resume
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl glass-panel text-slate-200"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-6 py-4 space-y-3 bg-black/90 backdrop-blur-xl">
          {MILESTONES.map((m) => {
            const isActive = currentFrame >= m.startFrame && currentFrame < m.endFrame;
            return (
              <button
                key={m.id}
                onClick={() => scrollToMilestone(m.startFrame)}
                className={`block w-full text-left py-2 px-3 text-sm font-mono rounded-lg ${
                  isActive ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-300'
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
