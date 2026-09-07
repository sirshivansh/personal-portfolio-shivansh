'use client'

import { skills } from '@/lib/data'
import { ScrollReveal } from '@/components/scroll-reveal'

export function Skills() {
  const categories = Object.entries(skills)

  return (
    <section id="skills" className="skills-section page-section section-wrap">
      <ScrollReveal>
        <div className="section-heading">
          <p className="section-label">Technical skills</p>
          <h2>
            Tools I work
            <br />
            <span>with daily.</span>
          </h2>
        </div>
      </ScrollReveal>

      <div className="skills-grid">
        {categories.map(([category, items], i) => (
          <ScrollReveal key={category} delay={i * 80}>
            <div className="skill-category">
              <h3 className="skill-category-title">{category}</h3>
              <div className="skill-badges">
                {items.map((skill) => (
                  <span key={skill} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
