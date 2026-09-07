# ⚡ Shivansh Mishra — Personal Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?logo=next.js&style=flat-square)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&style=flat-square)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178C6?logo=typescript&style=flat-square)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0.0-06B6D4?logo=tailwindcss&style=flat-square)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.174-black?logo=three.js&style=flat-square)](https://threejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.style=flat-square)](LICENSE)

A high-performance, dark-themed personal developer portfolio built with **Next.js 16 (App Router)**, **React 19**, **Three.js**, and **Tailwind CSS v4**. Featuring a custom 3D WebGL background, modular section-based architecture, full data centralization, micro-animations, and comprehensive SEO optimization.

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🏗️ Project Architecture & Structure](#️-project-architecture--structure)
- [🛠️ Tech Stack](#️-tech-stack)
- [⚙️ Single Source of Truth (`lib/data.ts`)](#️-single-source-of-truth-libdatats)
- [🚀 Quick Start & Local Setup](#-quick-start--local-setup)
- [🎨 Design System & Customization](#-design-system--customization)
- [🌌 3D WebGL Background](#-3d-webgl-background)
- [⚡ Performance, SEO & Accessibility](#-performance-seo--accessibility)
- [🌐 Deployment](#-deployment)
- [📄 License](#-license)

---

## ✨ Features

- **🌌 Dynamic 3D Background**: Interactive WebGL scene powered by Three.js featuring animated wireframe icosahedrons, floating particle fields, and smooth camera rotations.
- **🧱 Data-Driven Architecture**: All portfolio data (projects, skills, education, hero details, social handles) is managed from a single configuration file (`lib/data.ts`).
- **🧩 Section Modularization**: Clean separation of concerns with individual components for Hero, Projects, Skills, About, Education, Contact, Navbar, and Footer.
- **✨ Scroll Animations**: Native `IntersectionObserver` scroll reveal wrapper supporting smooth fade-up transitions and automatic fallback for `prefers-reduced-motion`.
- **📱 Fully Responsive**: Custom breakpoints tuned for mobile (320px+), tablet (720px+), laptop (1024px+), and ultra-wide desktops.
- **🔍 Comprehensive SEO**: Built-in Open Graph images, Twitter Cards, semantic HTML5 structure, canonical URLs, and Google Search index readiness.
- **♿ Accessibility First**: Visible keyboard focus indicators (`:focus-visible`), ARIA landmarks, appropriate color contrast ratios, and semantic navigation tags.
- **⚡ Next.js 16 App Router**: Optimized image rendering with Next `Image`, dynamic imports, server components by default, and zero unnecessary client-side JS overhead.

---

## 🏗️ Project Architecture & Structure

```
c:/Projects/Portfolio/
├── app/
│   ├── favicon.ico              # Website icon
│   ├── globals.css              # Custom design system, variables, and responsive classes
│   ├── layout.tsx               # Root layout, metadata, SEO configurations, and fonts
│   └── page.tsx                 # Main page composing all modular sections
├── components/
│   ├── portfolio-scene.tsx      # Three.js WebGL canvas background
│   ├── scroll-reveal.tsx        # IntersectionObserver animation wrapper
│   ├── sections/
│   │   ├── navbar.tsx           # Sticky navigation header with blurred background
│   │   ├── hero.tsx             # Hero banner with profile photo, intro & CTAs
│   │   ├── projects.tsx         # Tabbed/grid project showcase with filter badges
│   │   ├── skills.tsx           # Categorized skills grid (Frontend, Backend, Tools)
│   │   ├── about.tsx            # Personal backstory, philosophy & core values
│   │   ├── education.tsx        # Academic history & achievements
│   │   ├── contact.tsx          # Direct contact links, email & social media
│   │   └── footer.tsx           # Brand footer with copyright & quick links
│   └── ui/
│       └── button.tsx           # Reusable button component
├── lib/
│   ├── data.ts                  # Centralized portfolio data (Single Source of Truth)
│   └── utils.ts                 # Class merger utility (`clsx` + `tailwind-merge`)
├── public/
│   ├── shivansh-photo.jpg       # Profile photo
│   ├── resume.pdf               # Resume document (place your PDF file here)
│   └── icon.svg                 # SVG favicon logo
├── next.config.mjs              # Next.js configuration
├── postcss.config.mjs           # PostCSS configuration
├── tsconfig.json                # TypeScript compiler configuration
├── package.json                 # Dependencies and npm scripts
└── README.md                    # Project documentation
```

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
| --- | --- | --- |
| **Framework** | Next.js 16 (App Router) | React framework for server rendering, static export & routing |
| **Language** | TypeScript 5.7 | Static typing, interface definitions, and IDE autocomplete |
| **UI Library** | React 19 | Core UI component building blocks |
| **3D Rendering** | Three.js / @react-three/fiber | Canvas WebGL background animations |
| **Styling** | Tailwind CSS v4 & Vanilla CSS | Utility-first styling & custom CSS custom properties |
| **Icons** | Lucide React & Custom Inline SVGs | Scalable vector icons for social media and navigation |
| **Fonts** | Inter & JetBrains Mono | Clean sans-serif UI typography and developer-style code font |
| **Analytics** | @vercel/analytics | Privacy-preserving traffic and visitor analytics |

---

## ⚙️ Single Source of Truth (`lib/data.ts`)

Updating content on the portfolio requires zero editing of layout HTML or React components. All text, project lists, technical skills, and social handles reside in `lib/data.ts`.

### 1. Update Personal Info & Social Links

```typescript
export const personalInfo = {
  name: "Shivansh Mishra",
  title: "Full Stack Web Developer & Software Engineer",
  email: "your.email@example.com",
  github: "https://github.com/sirshivansh",
  linkedin: "https://linkedin.com/in/your-profile",
  location: "India",
}
```

### 2. Add or Edit Projects

```typescript
export const projectsData = [
  {
    id: "project-slug",
    title: "Project Name",
    description: "Brief overview of what was built and key achievements.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/username/repo",
    live: "https://project-demo.com",
    category: "Full Stack",
    featured: true,
  },
]
```

### 3. Manage Skills & Technical Stack

```typescript
export const skillsData = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5/CSS3"],
  backend: ["Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB"],
  tools: ["Git", "GitHub", "Vercel", "VS Code", "Postman"],
}
```

---

## 🚀 Quick Start & Local Setup

### Prerequisites

Ensure you have the following installed on your machine:
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

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

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

### Color Palette

The portfolio features a dark aesthetic built on a charcoal black background `#0a0b10` with high-contrast accent tones:

- **Background**: Dark Charcoal (`#0a0b10` / `rgba(10, 11, 16, 0.95)`)
- **Primary Accent**: Cyan Blue (`#06b6d4` / `hsl(188, 94%, 43%)`)
- **Secondary Accent**: Warm Amber (`#f59e0b` / `hsl(38, 92%, 50%)`)
- **Card Surfaces**: Semi-transparent Glass (`rgba(255, 255, 255, 0.03)`) with `backdrop-filter: blur(12px)`
- **Borders**: Subdued slate (`rgba(255, 255, 255, 0.08)`)

Custom CSS variables are configured in `app/globals.css`.

### Adding your Resume

Place your updated resume as `resume.pdf` in the `public/` folder:
```
public/resume.pdf
```
The "Download Resume" buttons in the navigation bar and hero section will automatically point to this file.

### Custom Profile Image

Replace `public/shivansh-photo.jpg` with your own square or portrait image.

---

## 🌌 3D WebGL Background

The ambient 3D geometric scene in `components/portfolio-scene.tsx` is powered by Three.js and `@react-three/fiber`:

- Rendered within a fixed background `div` with low GPU overhead (`pointer-events: none`).
- Uses requestAnimationFrame loops for fluid rotation of icosahedron shapes and starfield particles.
- Automatically adjusts resolution and frame rates for mobile devices to prevent battery drain.

---

## ⚡ Performance, SEO & Accessibility

- **Lighthouse Scores**: Optimized for near-100 Performance, Accessibility, Best Practices, and SEO.
- **Search Engine Optimization**: Custom Open Graph (`og:image`, `og:title`, `og:description`) tags and Twitter cards built into `app/layout.tsx`.
- **Keyboard Navigation**: Interactive elements include visible focus outline rings (`outline-cyan-500`).
- **Reduced Motion**: All scroll animations respect user OS setting `prefers-reduced-motion: reduce`.

---

## 🌐 Deployment

### Deploying to Vercel (Recommended)

1. Push your changes to GitHub.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your `personal-portfolio-shivansh` repository.
4. Click **Deploy** (Vercel will auto-detect Next.js framework settings).

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more details.

---

<p center align="center">
  Crafted with ❤️ by <strong>Shivansh Mishra</strong>
</p>
