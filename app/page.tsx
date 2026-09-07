'use client'

import { PortfolioScene } from '@/components/portfolio-scene'
import { Navbar } from '@/components/sections/navbar'
import { Hero } from '@/components/sections/hero'
import { Projects } from '@/components/sections/projects'
import { Skills } from '@/components/sections/skills'
import { About } from '@/components/sections/about'
import { Education } from '@/components/sections/education'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/sections/footer'

export default function Page() {
  return (
    <main className="portfolio-shell">
      <PortfolioScene />
      <div className="noise-layer" />

      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <About />
      <Education />
      <Contact />
      <Footer />
    </main>
  )
}
