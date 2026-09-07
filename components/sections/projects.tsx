'use client'

import { useState } from 'react'
import { ArrowUpRight, Code2, ExternalLink } from 'lucide-react'

function GithubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}
import { projects } from '@/lib/data'
import { ScrollReveal } from '@/components/scroll-reveal'

export function Projects() {
  const [activeProject, setActiveProject] = useState(0)

  return (
    <section id="work" className="work-section page-section section-wrap">
      <ScrollReveal>
        <div className="section-heading">
          <p className="section-label">Selected work</p>
          <h2>
            Projects with a
            <br />
            <span>purpose.</span>
          </h2>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={150}>
        <div className="project-layout">
          <div className="project-list">
            {projects.map((project, index) => (
              <button
                className={`project-tab ${activeProject === index ? 'active' : ''}`}
                key={project.title}
                onClick={() => setActiveProject(index)}
                aria-pressed={activeProject === index}
              >
                <span>0{index + 1}</span>
                <strong>{project.title}</strong>
                <ArrowUpRight size={16} />
              </button>
            ))}
          </div>

          <article className="project-detail">
            <div className="project-icon">
              <Code2 size={26} />
            </div>
            <p className="project-type">{projects[activeProject].type}</p>
            <h3>{projects[activeProject].title}</h3>
            <p>{projects[activeProject].description}</p>

            <div className="project-stack">
              {projects[activeProject].stack.map((tech) => (
                <span key={tech} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>

            <div className="project-links">
              {projects[activeProject].github && (
                <a
                  className="project-link"
                  href={projects[activeProject].github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${projects[activeProject].title} on GitHub`}
                >
                  <GithubIcon size={15} /> Source
                </a>
              )}
              {projects[activeProject].demo && (
                <a
                  className="project-link"
                  href={projects[activeProject].demo}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`View ${projects[activeProject].title} live demo`}
                >
                  <ExternalLink size={15} /> Demo
                </a>
              )}
              <a className="text-link" href="#contact">
                Discuss a project <span>↗</span>
              </a>
            </div>
          </article>
        </div>
      </ScrollReveal>
    </section>
  )
}
