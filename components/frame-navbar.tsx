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
          ? 'bg-white/85 backdrop-blur-md border-b border-slate-200/80 py-3 shadow-sm'
          : 'bg-gradient-to-b from-white/90 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left Brand */}
        <button
          onClick={() => scrollToMilestone(0)}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-slate-300 group-hover:scale-105 transition-transform shadow-sm">
            <Image
              src="/shivansh-photo.jpg"
              alt={personalInfo.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="font-bold text-slate-900 text-sm tracking-tight group-hover:text-cyan-700 transition-colors">
              {personalInfo.name}
            </span>
            <span className="text-[10px] text-cyan-700 block font-mono font-medium">
              Java Developer
            </span>
          </div>
        </button>

        {/* Right Desktop Nav */}
        <div className="hidden md:flex items-center gap-3">
          <nav className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
            {MILESTONES.map((m) => {
              const isActive = currentFrame >= m.startFrame && currentFrame < m.endFrame;
              return (
                <button
                  key={m.id}
                  onClick={() => scrollToMilestone(m.startFrame)}
                  className={`px-3.5 py-1.5 text-xs font-mono rounded-full transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white font-bold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
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
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-medium transition-all shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" /> Resume
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-white text-slate-800 border border-slate-200 shadow-sm"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-6 py-4 space-y-2 shadow-xl">
          {MILESTONES.map((m) => {
            const isActive = currentFrame >= m.startFrame && currentFrame < m.endFrame;
            return (
              <button
                key={m.id}
                onClick={() => scrollToMilestone(m.startFrame)}
                className={`block w-full text-left py-2 px-3 text-xs font-mono rounded-lg ${
                  isActive
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
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
