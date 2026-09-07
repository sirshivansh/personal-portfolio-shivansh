# ⚡ Shivansh Mishra — Personal Portfolio v2.0

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js&style=flat-square)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&style=flat-square)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&style=flat-square)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?logo=tailwindcss&style=flat-square)](https://tailwindcss.com/)
[![Canvas HD](https://img.shields.io/badge/Canvas-720p_HD_1280x720-emerald?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

An interactive, Apple-style scroll-driven **HD frame-sequence animation portfolio** built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. Featuring high-definition HD image quality, side-aligned storytelling cards, Playfair Display typography, single-source-of-truth data centralization, and accessible reduced-motion fallback rendering.

---

## 📋 Table of Contents

- [✨ Key Features](#-key-features)
- [🏗️ Project Architecture & File Tree](#️-project-architecture--file-tree)
- [🎬 Scroll Milestone Mapping](#-scroll-milestone-mapping)
- [⚙️ Single Source of Truth (`lib/data.ts`)](#️-single-source-of-truth-libdatats)
- [🛠️ Tech Stack Matrix](#️-tech-stack-matrix)
- [🚀 Quick Start & Local Setup](#-quick-start--local-setup)
- [🎨 Design System & Customization](#-design-system--customization)
- [⚡ Performance, Accessibility & SEO](#-performance-seo--accessibility)
- [🌐 Deployment Guide](#-deployment-guide)
- [📄 License](#-license)

---

## ✨ Key Features

- **🖼️ High-Definition Canvas Animation Engine**: 152 high-definition HD frames (`1280x720`) extracted directly from uncompressed master frames, rendered on an HTML5 2D `<canvas>` with `imageSmoothingQuality = 'high'` and retina `devicePixelRatio` dynamic scaling.
- **💎 Clean & Crisp Visual Quality (~20.5 MB Payload)**: Frame sequence compressed at `quality=68` averaging ~138 KB per frame (~20.55 MB total set), delivering crisp facial details, sharp suit textures, and zero compression blurriness.
- **⚡ Smooth 60 FPS Scroll Scrubbing**: Physics-driven linear interpolation (`lerpFactor = 0.12`) via `requestAnimationFrame` maps vertical scroll progress smoothly across all 152 animation frames.
- **↔️ Unobstructed Center Viewport & Side-Aligned Storytelling**: Content cards are positioned on the far left and right flanks of the screen, leaving the central viewport wide open for the animated photo subject.
- **🪟 Light Immersive Glass UI System**: Translucent light glass panels (`bg-white/90 backdrop-blur-2xl border border-slate-200/90 shadow-2xl`) blend seamlessly into the white canvas background.
- **🔤 Playfair Display Serif Headlines**: Elegant Google Font typography (`Playfair_Display` 700 weight, `-0.02em` letter-spacing) paired with uppercase letter-spaced sans-serif badges (`0.75rem`, `0.1em` tracking).
- **⚙️ Data-Driven Architecture**: All portfolio text, projects, skills, education, and social links are managed from a single central file ([`lib/data.ts`](lib/data.ts)).
- **♿ Reduced Motion & Low-End Fallback**: Detects `prefers-reduced-motion: reduce` and renders a clean static single-page portfolio layout automatically.

---

## 🏗️ Project Architecture & File Tree

```
c:/Projects/Portfolio/
├── app/
│   ├── favicon.ico              # Favicon icon
│   ├── globals.css              # Design tokens, typography variables, and utility classes
│   ├── layout.tsx               # Root layout, Google Fonts (Inter, JetBrains Mono, Playfair Display), SEO metadata
│   └── page.tsx                 # Main composition root orchestrating canvas, overlays, and navbar
├── components/
│   ├── frame-navbar.tsx         # Translucent top navigation header with scroll detection
│   ├── frame-overlay-content.tsx# Milestone orchestrator synchronizing frame index to section cards
│   ├── frame-scroll-canvas.tsx  # HD Canvas rendering engine with cover scaling & high smoothing
│   ├── loading-screen.tsx       # Preloader UI with percentage counter & progress bar
│   ├── standard-fallback.tsx    # Static single-page fallback renderer for reduced motion
│   ├── milestones/
│   │   ├── HeroMilestone.tsx    # Welcome banner with intro copy & primary action CTAs
│   │   ├── AboutMilestone.tsx   # Engineering backstory & core philosophy highlights
│   │   ├── ProjectsMilestone.tsx# Selected project case studies with category badges
│   │   ├── SkillsMilestone.tsx  # Categorized technical skills grid (Languages, Frameworks, DBs, Tools)
│   │   └── ContactMilestone.tsx # Direct email CTA card, social links & copyright footer
│   ├── sections/                # Modular fallback section components used in standard mode
│   │   ├── navbar.tsx
│   │   ├── hero.tsx
│   │   ├── projects.tsx
│   │   ├── skills.tsx
│   │   ├── about.tsx
│   │   ├── education.tsx
│   │   ├── contact.tsx
│   │   └── footer.tsx
│   └── ui/
│       ├── button.tsx           # Reusable button component
│       └── icons.tsx            # Inline SVG icons for GitHub & LinkedIn
├── hooks/
│   ├── useFramePreloader.ts     # Concurrent batch image downloading engine with progress tracking
│   ├── useScrollLerp.ts         # Smooth linear interpolation scroll scrubbing hook
│   └── useReducedMotion.ts      # Accessibility motion preference detector
├── lib/
│   ├── data.ts                  # Centralized portfolio data (Single Source of Truth)
│   ├── frame-manifest.ts        # Programmatic 152-frame URL manifest generator
│   ├── milestones.ts           # Milestone frame range definitions [0..151]
│   └── utils.ts                 # Class merger utility (`clsx` + `tailwind-merge`)
├── public/
│   ├── frames/                  # 152 high-definition HD image frames (ezgif-frame-001.jpg .. 152.jpg, ~20.55 MB total)
│   ├── shivansh-photo.jpg       # Crisp profile photo asset
│   ├── resume.pdf               # Resume document
│   └── icon.svg                 # SVG brand icon
├── shivanshphotoframes.zip      # Original master frame archive (63.4 MB)
├── package.json                 # Dependencies and npm scripts
└── README.md                    # Project documentation
```

---

## 🎬 Scroll Milestone Mapping

The 500vh scrollable track maps scroll progress `[0.0 .. 1.0]` across 152 animation frames (`lib/milestones.ts`):

| Milestone | Frame Range | Left Flank Content | Right Flank Content |
| :--- | :--- | :--- | :--- |
| **Welcome (Hero)** | Frames `0 – 25` | Playfair Headline, Title, Bio, Action Buttons | Location Badge (`India`), Core Focus Pill |
| **About Me** | Frames `26 – 55` | Backstory & Engineering Card | Core Philosophy Highlights Card |
| **Featured Projects** | Frames `56 – 85` | Projects 1 & 2 Cards (`Campus Connect`, `Smart Attendance`) | Project 3 Card (`Java Utility Suite`), GitHub Link |
| **Skills & Toolkit** | Frames `86 – 105` | Languages & Frameworks Cards | Databases & Tools Cards |
| **Contact** | Frames `106 – 151` | Email CTA Card (`shivanshmishra@example.com`) | Social Links (GitHub, LinkedIn), Footer Note |

---

## ⚙️ Single Source of Truth (`lib/data.ts`)

All text, project lists, technical skills, and social handles are configured in [`lib/data.ts`](lib/data.ts). Updating portfolio content requires zero editing of layout components.

### 1. Personal Details & Social Handles

```typescript
export const siteConfig = {
  name: 'Shivansh Mishra',
  title: 'Shivansh Mishra — Java Developer & Computer Engineering Student',
  description: 'Portfolio of Shivansh Mishra, a Java developer specializing in backend engineering.',
  url: 'https://shivansh-mishra.vercel.app',
};

export const socialLinks = {
  github: 'https://github.com/sirshivansh',
  linkedin: 'https://linkedin.com/in/your-username',
  email: 'your.email@example.com',
};
```

### 2. Add or Edit Projects

```typescript
export const projects = [
  {
    title: 'Project Title',
    type: 'Full-stack platform',
    description: 'Overview of what was built and key engineering achievements.',
    stack: ['Java', 'Spring Boot', 'MySQL'],
    github: 'https://github.com/username/repo',
    demo: 'https://demo-url.com',
  },
];
```

### 3. Categorized Technical Stack

```typescript
export const skills = {
  'Languages': ['Java', 'Python', 'SQL', 'JavaScript', 'HTML', 'CSS'],
  'Frameworks & Libraries': ['Spring Boot', 'REST APIs', 'JDBC'],
  'Databases': ['MySQL', 'PostgreSQL'],
  'Tools & Platforms': ['Git', 'GitHub', 'VS Code', 'IntelliJ IDEA', 'Linux'],
};
```

---

## 🛠️ Tech Stack Matrix

| Category | Technology | Version | Purpose |
| --- | --- | --- | --- |
| **Framework** | Next.js (App Router) | 16.3.3 | React framework for server rendering, static export & routing |
| **UI Library** | React | 19.0.0 | Core UI component engine |
| **Language** | TypeScript | 5.7.3 | Static typing, interface definitions & IDE autocomplete |
| **Styling** | Tailwind CSS & Vanilla CSS | 4.3.3 | Utility-first styling & custom CSS custom properties |
| **Typography** | Playfair Display, Inter, JetBrains Mono | Google Fonts | High-contrast serif headlines, sans-serif UI, and code typography |
| **Graphics** | HTML5 2D Canvas | Native | High-performance HD frame-sequence rendering |
| **Image Processing** | Python Pillow | 12.2.0 | Frame extraction & high-fidelity quality optimization |
| **Analytics** | @vercel/analytics | 1.6.1 | Privacy-focused visitor analytics |

---

## 🚀 Quick Start & Local Setup

### Prerequisites

Ensure you have the following installed on your system:
- **Node.js**: v18.17.0 or later (v20+ recommended)
- **npm** (or **pnpm** / **yarn**)

### 1. Clone the Repository

```bash
git clone https://github.com/sirshivansh/personal-portfolio-shivansh.git
cd personal-portfolio-shivansh
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

### 4. Build for Production

```bash
npm run build
```

To test the production build locally:

```bash
npm run start
```

---

## 🎨 Design System & Customization

### Color Palette & Theme Tokens

- **Page Background**: Pure White (`#ffffff`)
- **Card Containers**: Light Immersive Glass (`rgba(255, 255, 255, 0.90)` / `backdrop-filter: blur(24px)`)
- **Primary Text**: Deep Slate (`#0f172a` / `hsl(222, 47%, 11%)`)
- **Secondary Text**: Muted Slate (`#475569` / `hsl(215, 16%, 47%)`)
- **Accent Primary**: Cyan Blue (`#06b6d4` / `hsl(188, 94%, 43%)`)
- **Accent Secondary**: Warm Amber (`#f59e0b` / `hsl(38, 92%, 50%)`)

### Adding Your Resume

Place your updated resume as `resume.pdf` in the `public/` directory:
```
public/resume.pdf
```
The "Resume" buttons in the navigation bar and hero section will automatically open/download this file.

---

## ⚡ Performance, SEO & Accessibility

- **Lighthouse Benchmarks**: Optimized for 95+ Performance, Accessibility, Best Practices, and SEO.
- **Hardware Acceleration**: Canvas rendering executes on the GPU using `requestAnimationFrame`.
- **Search Engine Optimization**: Custom Open Graph (`og:image`, `og:title`, `og:description`) tags and Twitter cards in `app/layout.tsx`.
- **Keyboard Navigation**: Interactive buttons and links include visible focus ring indicators.
- **Reduced Motion**: Full support for `prefers-reduced-motion: reduce` with instant static fallback.

---

## 🌐 Deployment Guide

### Deploying to Vercel (Recommended)

1. Push your changes to your GitHub repository.
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `personal-portfolio-shivansh` repository.
4. Click **Deploy** (Vercel automatically detects Next.js build settings).

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more details.

---

<p align="center">
  Crafted with ❤️ by <strong>Shivansh Mishra</strong>
</p>
