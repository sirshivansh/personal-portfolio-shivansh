'use client';

import Image from 'next/image';
import { Navbar } from '@/components/sections/navbar';
import { Hero } from '@/components/sections/hero';
import { Projects } from '@/components/sections/projects';
import { Skills } from '@/components/sections/skills';
import { About } from '@/components/sections/about';
import { Education } from '@/components/sections/education';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';
import { getFrameUrl } from '@/lib/frame-manifest';

export function StandardFallback() {
  const staticHeroFrame = getFrameUrl(0);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Background static hero image */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <Image
          src={staticHeroFrame}
          alt="Portfolio Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Projects />
          <Skills />
          <About />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
