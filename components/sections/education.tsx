'use client'

import { GraduationCap } from 'lucide-react'
import { education } from '@/lib/data'
import { ScrollReveal } from '@/components/scroll-reveal'

export function Education() {
  return (
    <section id="education" className="education-section page-section section-wrap">
      <ScrollReveal>
        <div className="section-heading">
          <p className="section-label">Education</p>
          <h2>
            Academic
            <br />
            <span>foundation.</span>
          </h2>
        </div>
      </ScrollReveal>

      <div className="education-grid">
        {education.map((item, i) => (
          <ScrollReveal key={i} delay={i * 100}>
            <div className="education-card">
              <div className="education-icon">
                <GraduationCap size={24} />
              </div>
              <div className="education-info">
                <h3 className="education-degree">{item.degree}</h3>
                {item.institution && (
                  <p className="education-institution">{item.institution}</p>
                )}
                <div className="education-meta">
                  <span>{item.location}</span>
                  <span className="meta-dot">·</span>
                  <span>{item.period}</span>
                </div>
                {item.description && (
                  <p className="education-description">{item.description}</p>
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
