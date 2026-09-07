'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { heroData } from '@/lib/data'
import { ScrollReveal } from '@/components/scroll-reveal'

export function Hero() {
  return (
    <section id="top" className="hero page-section">
      <div className="hero-content-grid">
        <div className="hero-copy">
          <ScrollReveal>
            <div className="eyebrow">
              <span className="status-dot" />
              {heroData.badge}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <p className="kicker">{heroData.kicker}</p>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <h1>
              {heroData.headline[0]}
              <br />
              <em>{heroData.headline[1]}</em>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <p className="hero-intro">{heroData.intro}</p>
          </ScrollReveal>

          <ScrollReveal delay={320}>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                Explore my work <ArrowUpRight size={17} />
              </a>
              <a className="text-link" href="#contact">
                Let&apos;s connect <span>↗</span>
              </a>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={200} className="hero-photo-wrapper">
          <div className="hero-photo">
            <Image
              src="/shivansh-photo.jpg"
              alt="Shivansh Mishra — Java developer and computer engineering student"
              width={320}
              height={400}
              priority
              className="hero-photo-img"
            />
            <div className="hero-photo-border" />
          </div>
        </ScrollReveal>
      </div>

      <div className="hero-meta">
        <span>{heroData.location}</span>
        <span className="meta-line" />
        <span>{heroData.status}</span>
      </div>

      <div className="scroll-hint">
        <span>Scroll to explore</span>
        <span className="scroll-line" />
      </div>
    </section>
  )
}
