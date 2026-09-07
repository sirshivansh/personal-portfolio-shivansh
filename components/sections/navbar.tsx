'use client'

import { useState, useEffect } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { navLinks, resumeUrl } from '@/lib/data'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <nav className={`site-nav${scrolled ? ' nav-scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <a className="brand" href="#top" aria-label="Shivansh Mishra — home">
        <span className="brand-mark">SM</span>
        <span>Shivansh Mishra</span>
      </a>

      <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </a>
        ))}
        <a
          className="nav-resume"
          href={resumeUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => setMenuOpen(false)}
        >
          <Download size={14} /> Resume
        </a>
      </div>

      <button
        className="menu-button"
        type="button"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay to close menu when tapping outside */}
      {menuOpen && (
        <div
          className="menu-overlay"
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  )
}
