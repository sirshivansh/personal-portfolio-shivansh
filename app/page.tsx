'use client'

import { useState } from 'react'
import { ArrowUpRight, Code2, Download, Mail, Menu, Terminal, X } from 'lucide-react'
import { PortfolioScene } from '@/components/portfolio-scene'

const projects = [
  { title: 'Campus Connect', type: 'Full-stack platform', copy: 'A student collaboration platform for communities, events, and shared resources.', stack: 'Java · Spring Boot · MySQL' },
  { title: 'Smart Attendance System', type: 'Computer vision', copy: 'An intelligent attendance workflow designed to reduce manual effort and improve accuracy.', stack: 'Python · OpenCV · SQL' },
  { title: 'Java Utility Suite', type: 'Developer tools', copy: 'A collection of focused utilities built around clean APIs, practical automation, and readable code.', stack: 'Java · OOP · REST APIs' },
]

const skills = ['Java', 'Spring Boot', 'SQL', 'REST APIs', 'Python', 'Git', 'OOP', 'Data Structures']

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeProject, setActiveProject] = useState(0)

  return (
    <main className="portfolio-shell">
      <PortfolioScene />
      <div className="noise-layer" />
      <nav className="site-nav">
        <a className="brand" href="#top" aria-label="Shivansh Mishra home"><span className="brand-mark">SM</span><span>Shivansh Mishra</span></a>
        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a className="nav-resume" href="https://blobs.vusercontent.net/blob/Shivansh_Mishra_Java_Developer_Resume-8vhL0AVqxxrtipEn56VyWHVwPlWaId.pdf" target="_blank" rel="noreferrer"><Download size={14} /> Resume</a>
        </div>
        <button className="menu-button" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </nav>

      <section id="top" className="hero page-section">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> Available for opportunities</div>
          <p className="kicker">Java developer · computer engineering student</p>
          <h1>Building the logic<br /><em>behind better ideas.</em></h1>
          <p className="hero-intro">I&apos;m Shivansh — a developer who turns complex problems into dependable, thoughtful software. I care about strong fundamentals, useful products, and code that lasts.</p>
          <div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <ArrowUpRight size={17} /></a><a className="text-link" href="#contact">Let&apos;s connect <span>↗</span></a></div>
        </div>
        <div className="hero-meta"><span>Based in India</span><span className="meta-line" /><span>Open to build</span></div>
        <div className="scroll-hint"><span>Scroll to explore</span><span className="scroll-line" /></div>
      </section>

      <section id="work" className="work-section page-section section-wrap">
        <div className="section-heading"><p className="section-label">Selected work</p><h2>Projects with a<br /><span>purpose.</span></h2></div>
        <div className="project-layout">
          <div className="project-list">{projects.map((project, index) => <button className={`project-tab ${activeProject === index ? 'active' : ''}`} key={project.title} onClick={() => setActiveProject(index)}><span>0{index + 1}</span><strong>{project.title}</strong><ArrowUpRight size={16} /></button>)}</div>
          <article className="project-detail"><div className="project-icon"><Code2 size={26} /></div><p className="project-type">{projects[activeProject].type}</p><h3>{projects[activeProject].title}</h3><p>{projects[activeProject].copy}</p><div className="stack-label">Built with <strong>{projects[activeProject].stack}</strong></div><a className="text-link" href="#contact">Discuss a project <span>↗</span></a></article>
        </div>
      </section>

      <section id="about" className="about-section page-section section-wrap">
        <div className="section-heading"><p className="section-label">The developer</p><h2>Curious by nature.<br /><span>Precise by craft.</span></h2></div>
        <div className="about-grid"><div className="about-copy"><p>I&apos;m currently pursuing a Bachelor&apos;s degree in Computer Engineering, building my foundation across software development, problem solving, and systems thinking.</p><p>My home base is Java. I enjoy the discipline of object-oriented design, the clarity of well-structured APIs, and the moment an abstract idea finally becomes something useful.</p></div><div className="skills-panel"><p className="section-label">Core toolkit</p><div className="skill-cloud">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div></div>
        <div className="experience-strip"><div><span className="strip-label">Education</span><strong>Bachelor of Computer Engineering</strong><small>India · In progress</small></div><div><span className="strip-label">Focus</span><strong>Backend &amp; application development</strong><small>Java · Spring · SQL</small></div><div><span className="strip-label">Approach</span><strong>Learn. Build. Improve.</strong><small>One meaningful commit at a time</small></div></div>
      </section>

      <section id="contact" className="contact-section page-section section-wrap"><div className="contact-card"><div><p className="section-label">Have an idea?</p><h2>Let&apos;s make<br /><span>it real.</span></h2></div><div className="contact-side"><p>I&apos;m open to conversations about software, collaboration, and opportunities where I can keep learning while creating meaningful work.</p><a className="button button-primary" href="mailto:shivanshmishra@example.com">Start a conversation <Mail size={17} /></a></div></div></section>

      <footer className="site-footer"><span>© 2026 Shivansh Mishra</span><span className="footer-center"><Terminal size={14} /> Crafted with intent</span><div className="social-links"><a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub">GH</a><a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a><a href="mailto:shivanshmishra@example.com" aria-label="Email"><Mail size={17} /></a></div></footer>
    </main>
  )
}
