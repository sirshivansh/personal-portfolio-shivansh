'use client'

import { aboutData, coreSkills, experienceStrip } from '@/lib/data'
import { ScrollReveal } from '@/components/scroll-reveal'

export function About() {
  return (
    <section id="about" className="about-section page-section section-wrap">
      <ScrollReveal>
        <div className="section-heading">
          <p className="section-label">The developer</p>
          <h2>
            Curious by nature.
            <br />
            <span>Precise by craft.</span>
          </h2>
        </div>
      </ScrollReveal>

      <div className="about-grid">
        <ScrollReveal delay={100}>
          <div className="about-copy">
            {aboutData.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="skills-panel">
            <p className="section-label">Core toolkit</p>
            <div className="skill-cloud">
              {coreSkills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="experience-strip">
        {experienceStrip.map((item, i) => (
          <ScrollReveal key={item.label} delay={i * 100}>
            <div>
              <span className="strip-label">{item.label}</span>
              <strong>{item.title}</strong>
              <small>{item.subtitle}</small>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
