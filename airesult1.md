# Implementation Plan: Immersive Scroll-Driven Frame Sequence Portfolio

**Project:** Shivansh Portfolio v2.0 (Apple-Style Frame Sequence)  
**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4  
**Author:** Principal Frontend Architect  
**Date:** 2024-07-26

---

## 1. Frame Loading & Preloading Engine

### 1.1 Asset Ingestion & Manifest Generation
**Action:** Unzip `shivanshphotoframes.zip` into `public/frames/`.
**Naming Convention:** Enforce strict zero-padding: `ezgif-frame-001.jpg` → `ezgif-frame-120.jpg`.
**Manifest Utility:** Create `lib/frame-manifest.ts` to generate the frame list programmatically (avoids hardcoding 120 imports).

```typescript
// lib/frame-manifest.ts
export const TOTAL_FRAMES = 120;
export const FRAME_PATH = '/frames/';
export const FRAME_EXT = '.jpg';

export function getFrameUrl(index: number): string {
  const clamped = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor(index) + 1));
  const padded = String(clamped).padStart(3, '0');
  return `${FRAME_PATH}ezgif-frame-${padded}${FRAME_EXT}`;
}

export const ALL_FRAME_URLS = Array.from({ length: TOTAL_FRAMES }, (_, i) => getFrameUrl(i));
```

### 1.2 `useFramePreloader` Hook (`hooks/useFramePreloader.ts`)
**Responsibility:** Asynchronous preloading, progress tracking, memory management, error resilience.

**Algorithm:**
1.  **Concurrency Control:** Use a `p-limit` style queue (max 4-6 concurrent connections) to avoid browser connection saturation.
2.  **Priority Loading:** Load "Hero Range" (0-25) first with `high` priority, rest `low`.
3.  **Cache Storage:** Store `HTMLImageElement` instances in a `Map<number, HTMLImageElement>`.
4.  **Progress Events:** Emit granular progress (`loaded / total`) via a `SetState` callback or `useReducer`.

**TypeScript Interface:**
```typescript
interface PreloaderState {
  status: 'idle' | 'loading' | 'ready' | 'error';
  progress: number; // 0.0 - 1.0
  loadedCount: number;
  totalCount: number;
  images: Map<number, HTMLImageElement>;
  error?: Error;
}
```

**Optimization:** Convert images to `ImageBitmap` via `createImageBitmap()` inside the worker/main thread for faster `drawImage` calls on Canvas (OffscreenCanvas support check).

### 1.3 Canvas Renderer Component (`components/frame-scroll-canvas.tsx`)
**Architecture:** Single `<canvas>` element, imperative API via `useImperativeHandle` or internal `requestAnimationFrame` loop.

**Cover Scaling Algorithm (Aspect Ratio Preservation):**
```typescript
function calculateDrawRect(
  imgW: number, imgH: number, 
  canvasW: number, canvasH: number
): { sx: number; sy: number; sWidth: number; sHeight: number; dx: number; dy: number; dWidth: number; dHeight: number } {
  const canvasRatio = canvasW / canvasH;
  const imgRatio = imgW / imgH;

  let sx = 0, sy = 0, sWidth = imgW, sHeight = imgH;
  let dx = 0, dy = 0, dWidth = canvasW, dHeight = canvasH;

  if (imgRatio > canvasRatio) {
    // Image wider: crop sides
    sWidth = imgH * canvasRatio;
    sx = (imgW - sWidth) / 2;
  } else {
    // Image taller: crop top/bottom
    sHeight = imgW / canvasRatio;
    sy = (imgH - sHeight) / 2;
  }
  return { sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight };
}
```

**DPR Handling:**
```typescript
const dpr = window.devicePixelRatio || 1;
canvas.width = cssWidth * dpr;
canvas.height = cssHeight * dpr;
ctx.scale(dpr, dpr); // Normalize drawing coordinates to CSS pixels
canvas.style.width = `${cssWidth}px`;
canvas.style.height = `${cssHeight}px`;
```

---

## 2. Scroll-Scrubbing & Physics Engine

### 2.1 Scroll Track Layout (`app/page.tsx` Structure)
```tsx
<main className="relative w-full overflow-x-hidden bg-black text-white">
  {/* 1. The Scroll Track - Creates the scrollbar length */}
  <div className="relative z-0 h-[500vh] w-full" aria-hidden="true" />

  {/* 2. The Pinned Canvas Viewport */}
  <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
    <FrameScrollCanvas ref={canvasRef} totalFrames={TOTAL_FRAMES} />
  </div>

  {/* 3. Overlay Content (Glassmorphism Cards) */}
  <div className="relative z-20 pointer-events-auto">
    <FrameOverlayContent />
  </div>
</main>
```
*Note: `h-[500vh]` provides ~6000px scroll travel on 1440p, mapping ~50px scroll per frame (smooth scrub). Adjust multiplier based on desired "weight".*

### 2.2 Smooth Lerp Controller (`hooks/useScrollLerp.ts`)
**Inputs:** `targetFrame` (derived from `window.scrollY`), `currentFrame` (state).
**Physics:** Critically Damped Spring or Simple Lerp (Lerp preferred for scroll scrub predictability).

```typescript
// Target frame calculation
const scrollProgress = scrollY / (trackHeight - window.innerHeight);
const targetFrame = clamp(scrollProgress * (TOTAL_FRAMES - 1), 0, TOTAL_FRAMES - 1);

// Lerp Loop (inside useAnimationFrame)
const LERP_FACTOR = 0.12; // Tune: 0.08 (heavy) - 0.2 (snappy)
currentFrameRef.current += (targetFrame - currentFrameRef.current) * LERP_FACTOR;
const renderIndex = Math.floor(currentFrameRef.current);
requestDraw(renderIndex);
```

**Performance Guard:** Only trigger `ctx.drawImage` if `renderIndex !== lastRenderedIndex`.

---

## 3. Storytelling & Text Overlay Milestones

### 3.1 Milestone Configuration (`lib/milestones.ts`)
Decouples content from rendering logic. Maps frame ranges to React Components.

```typescript
export interface Milestone {
  id: string;
  startFrame: number; // Inclusive
  endFrame: number;   // Exclusive
  component: React.FC<{ progress: number }>; // progress 0->1 within this milestone
  sticky?: boolean;   // Pin to viewport center?
}

export const MILESTONES: Milestone[] = [
  { id: 'hero', startFrame: 0, endFrame: 26, component: HeroMilestone },
  { id: 'about', startFrame: 26, endFrame: 56, component: AboutMilestone },
  { id: 'projects', startFrame: 56, endFrame: 86, component: ProjectsMilestone },
  { id: 'skills', startFrame: 86, endFrame: 106, component: SkillsMilestone },
  { id: 'contact', startFrame: 106, endFrame: 120, component: ContactMilestone },
];
```

### 3.2 `FrameOverlayContent` Rendering Logic
1.  Calculate `globalProgress` (0.0 - 1.0) from `currentFrame / (TOTAL_FRAMES - 1)`.
2.  Iterate `MILESTONES`.
3.  Calculate `localProgress = (globalProgress - start) / (end - start)`.
4.  Render component if `localProgress > -0.1 && localProgress < 1.1` (buffer for enter/exit animations).
5.  **Animation:** Pass `localProgress` (clamped 0-1) to components for internal `framer-motion` or CSS `@keyframes` driven by `style={{ '--progress': localProgress }}`.

### 3.3 Component Specifications
| Milestone | Frames | Key Visuals | Interactivity |
| :--- | :--- | :--- | :--- |
| **Hero** | 0-25 | Name/Title (Large Clamp Type), Subtle Parallax, "Scroll" Indicator (Animated SVG Path) | CTA Buttons (Link to Projects/Contact anchors) |
| **About** | 26-55 | Split layout: Text Left / Abstract Visual Right (Canvas continues BG). "Core Philosophy" cards fade in sequence. | Hover effects on Philosophy cards. |
| **Projects** | 56-85 | Horizontal Snap Carousel (CSS Scroll Snap) floating over Canvas. Project Cards: Thumbnail, Stack Badges, Links. | Keyboard Nav, Touch Swipe, "View Case Study" Modals. |
| **Skills** | 86-105 | Categorized Grid (Frontend/Backend/DB/Tools). Icons (Lucide) + Name. Staggered `fade-in-up` on scroll progress. | Filter by Category (Tabs). |
| **Contact** | 106-120 | Centered Card. `mailto:` link (Primary CTA). Social Icons (GitHub, LinkedIn, X). Resume Download Button. | Formspree/EmailJS integration optional. |

---

## 4. Responsive & Mobile Optimization

### 4.1 Adaptive Frame Resolution Strategy
**Problem:** 120 frames @ 1920x1080 = ~40-60MB. Mobile bandwidth/memory constrained.
**Solution:** **Responsive Image Sets via `srcset` logic in Preloader.**
1.  **Build Step (Script):** `scripts/generate-responsive-frames.mjs` (Sharp).
    *   Input: `public/frames/*.jpg` (Source High Res).
    *   Output: `public/frames/mobile/`, `public/frames/tablet/`, `public/frames/desktop/`.
2.  **Runtime Selection:** `useFramePreloader` detects `window.innerWidth` / `devicePixelRatio` on init and selects the appropriate manifest folder.

### 4.2 Touch & Mobile Scroll Behavior
*   **iOS Momentum Scrolling:** `sticky` positioning + `overflow: hidden` on body during load prevents rubber-band issues.
*   **Touch Scrubbing:** Passive event listeners. Map `touchmove` deltaY to `scrollTop` manually if native scroll feels laggy inside pinned container (rarely needed in modern Safari/Chrome).
*   **Intersection Observer Fallback:** For `prefers-reduced-motion` or low-end devices (detected via `navigator.deviceMemory < 4`), replace Canvas sequence with a single high-res Hero Image + Standard CSS Scroll sections.

### 4.3 Reduced Motion Fallback (`hooks/useReducedMotion.ts`)
```typescript
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  return reduced;
}
```
**Implementation:** In `page.tsx`, if `reduced` || `lowEndDevice`:
1.  Render `<StaticHeroImage src={getFrameUrl(0)} />`.
2.  Render `<StandardPortfolioSections data={data} />` (Re-use existing section components).
3.  Hide Canvas Track (`display: none`).

---

## 5. Code Structure & Proposed Changes

### 5.1 File Tree Diff
```text
├── public/
│   └── frames/
│       ├── ezgif-frame-001.jpg ... ezgif-frame-120.jpg      [NEW - Desktop Assets]
│       ├── mobile/                                           [NEW - Generated 750w]
│       ├── tablet/                                           [NEW - Generated 1200w]
│       └── desktop/                                          [NEW - Generated 1920w]
├── src/
│   ├── app/
│   │   ├── globals.css                                       [MODIFY - Design System & Layout Utils]
│   │   ├── layout.tsx                                        [MODIFY - Font Loading, Providers]
│   │   └── page.tsx                                          [MODIFY - Main Composition Root]
│   ├── components/
│   │   ├── frame-scroll-canvas.tsx                           [NEW - Core Canvas Engine]
│   │   ├── frame-overlay-content.tsx                         [NEW - Milestone Orchestrator]
│   │   ├── milestones/
│   │   │   ├── HeroMilestone.tsx                             [NEW]
│   │   │   ├── AboutMilestone.tsx                            [NEW]
│   │   │   ├── ProjectsMilestone.tsx                         [NEW]
│   │   │   ├── SkillsMilestone.tsx                           [NEW]
│   │   │   └── ContactMilestone.tsx                          [NEW]
│   │   ├── ui/                                               [PRESERVE/EXTEND - Button, Card, Badge]
│   │   └── loading-screen.tsx                                [NEW - Preload Progress UI]
│   ├── hooks/
│   │   ├── useFramePreloader.ts                              [NEW]
│   │   ├── useScrollLerp.ts                                  [NEW]
│   │   ├── useReducedMotion.ts                               [NEW]
│   │   └── useAnimationFrame.ts                              [NEW - RAF Wrapper]
│   ├── lib/
│   │   ├── data.ts                                           [PRESERVE - Portfolio Content Source]
│   │   ├── frame-manifest.ts                                 [NEW - Asset Paths]
│   │   └── milestones.ts                                     [NEW - Milestone Config]
│   └── scripts/
│       └── generate-responsive-frames.mjs                    [NEW - Build-time Sharp Script]
├── package.json                                              [MODIFY - Add Sharp, Framer-Motion?]
└── tsconfig.json                                             [VERIFY - Path Aliases]
```

### 5.2 Key Modifications Detail

#### `app/globals.css` (Tailwind v4 + CSS Variables)
```css
@theme {
  /* Color System */
  --color-bg-deep: #0a0a0a;
  --color-surface: rgba(255, 255, 255, 0.03);
  --color-border: rgba(255, 255, 255, 0.08);
  --color-text-primary: #fafafa;
  --color-text-muted: #a1a1aa;
  --color-accent: #00e5a0; /* Apple Green / Custom */
  
  /* Typography Fluid Clamp */
  --text-display: clamp(3rem, 8vw, 8rem);
  --text-title: clamp(1.5rem, 3vw, 3rem);
  --text-body: clamp(1rem, 1.2vw, 1.25rem);
  
  /* Glassmorphism */
  --glass-bg: rgba(255, 255, 255, 0.04);
  --glass-blur: blur(20px);
  --glass-border: 1px solid rgba(255, 255, 255, 0.06);
}

@layer utilities {
  .glass-panel {
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur);
    -webkit-backdrop-filter: var(--glass-blur);
    border: var(--glass-border);
    border-radius: 1.5rem;
  }
  
  .text-balance { text-wrap: balance; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  .scrollbar-hide::-webkit-scrollbar { display: none; }
}
```

#### `app/page.tsx` (Composition Root)
```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { TOTAL_FRAMES, ALL_FRAME_URLS } from '@/lib/frame-manifest';
import { useFramePreloader } from '@/hooks/useFramePreloader';
import { useScrollLerp } from '@/hooks/useScrollLerp';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import LoadingScreen from '@/components/loading-screen';

// Dynamic Import for Heavy Canvas (SSR Safe)
const FrameScrollCanvas = dynamic(() => import('@/components/frame-scroll-canvas').then(m => m.FrameScrollCanvas), { ssr: false });
const FrameOverlayContent = dynamic(() => import('@/components/frame-overlay-content').then(m => m.FrameOverlayContent), { ssr: false });
const StandardFallback = dynamic(() => import('@/components/standard-fallback').then(m => m.StandardFallback), { ssr: false });

export default function Home() {
  const { images, progress, status } = useFramePreloader(ALL_FRAME_URLS);
  const reducedMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);

  // Init Lerp Engine after Preload
  useScrollLerp({ 
    totalFrames: TOTAL_FRAMES, 
    canvasRef, 
    images, 
    enabled: !reducedMotion && status === 'ready' 
  });

  if (status === 'loading') return <LoadingScreen progress={progress} />;
  if (reducedMotion || status === 'error') return <StandardFallback />;

  // Fade in experience
  useEffect(() => { const t = setTimeout(() => setIsReady(true), 300); return () => clearTimeout(t); }, []);

  return (
    <main className="relative w-full min-h-screen bg-black text-white overflow-x-hidden" style={{ opacity: isReady ? 1 : 0, transition: 'opacity 0.8s ease-out' }}>
      {/* Scroll Track */}
      <div className="relative z-0 h-[500vh] w-full" aria-hidden="true" />
      
      {/* Canvas Layer */}
      <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
        <FrameScrollCanvas ref={canvasRef} totalFrames={TOTAL_FRAMES} className="w-full h-full" />
      </div>

      {/* Content Layer */}
      <div className="relative z-20 pointer-events-auto px-6 md:px-20 lg:px-32">
        <FrameOverlayContent />
      </div>
    </main>
  );
}
```

---

## 6. Verification & Performance Benchmarks

### 6.1 Preloading Verification Matrix
| Network Profile | Target Metric | Tool | Pass Criteria |
| :--- | :--- | :--- | :--- |
| **Fast 3G (1.6Mbps)** | Time to Interactive (TTI) | Lighthouse / WebPageTest | < 4.5s (Hero frames loaded) |
| **Slow 3G (400Kbps)** | Hero Visual Complete | Chrome DevTools Network | < 3s (First 25 frames) |
| **Offline / Cached** | Subsequent Load TTI | Service Worker (Future) | < 500ms |
| **Memory Usage** | JS Heap + Image Memory | DevTools Memory Tab | < 150MB Total (Desktop), < 80MB (Mobile) |

**Test Cases:**
1.  **Cold Cache:** Verify progress bar 0→100% smoothness.
2.  **Warm Cache:** Verify instant `ready` state (Service Worker / HTTP Cache).
3.  **Tab Backgrounding:** Verify `requestAnimationFrame` pauses, resumes correctly on focus.

### 6.2 Canvas Render Performance (60 FPS Target)
**Metric:** Frame Time < 16.67ms (Ideal < 10ms for headroom).
**Profiling:** Chrome DevTools **Performance Tab** (Record 10s scroll).
**Checks:**
*   `drawImage` call duration < 2ms.
*   Zero Layout Shifts (CLS = 0).
*   No Forced Reflows in Raf loop.
*   GPU Rasterization enabled (Canvas2D usually hardware accelerated).

**Stress Test:** Scroll rapidly (mouse wheel / trackpad flick) → Verify Lerp catches up without dropping frames or "white flashing" (missing frames). *Fix: Ensure `ImageBitmap` used, not raw `HTMLImageElement`.*

### 6.3 Responsive Breakpoint Verification
**Device Matrix (BrowserStack / Real Devices):**

| Viewport | Width | DPR | Test Scenario | Expected Behavior |
| :--- | :--- | :--- | :--- | :--- |
| **Mobile (iPhone SE/14)** | 375px | 2.0 / 3.0 | Vertical Scroll, Touch Drag | Canvas covers viewport; Overlays stack vertically; Text `clamp()` readable; Touch swipe scrubs frames. |
| **Tablet (iPad Pro)** | 768px | 2.0 | Landscape / Portrait Rotate | Canvas resizes w/o reload; Grid layouts (Skills/Projects) switch to 2-col. |
| **Laptop (MacBook Pro)** | 1440px | 2.0 | Trackpad Momentum Scroll | Smooth Lerp physics; Glassmorphism blur performant; High-res frames served. |
| **Desktop (4K Monitor)** | 2560px | 1.0 / 1.5 | Wide Aspect Ratio (21:9) | **Cover Scaling** works (no vertical letterboxing); Content max-width constrained (`max-w-7xl`); Canvas fills bleed area. |
| **Ultrawide** | 3440px | 1.0 | Extreme Width | Canvas covers; Content centered; No horizontal scrollbar. |

### 6.4 Accessibility & SEO Audit
*   **Semantic HTML:** `main`, `section`, `h1`-`h3` hierarchy preserved in Overlay Content.
*   **ARIA:** Canvas `aria-hidden="true"`, `role="img"`, `aria-label="Animated portfolio background sequence"`.
*   **Reduced Motion:** Verified fallback renders full content statically.
*   **Color Contrast:** Glassmorphism text vs BG > 4.5:1 (WCAG AA).
*   **SEO:** `next/head` metadata populated from `lib/data.ts` (Preserved). `loading="eager"` on Hero frame (Frame 1).

### 6.5 Deployment Checklist (Vercel/Static Export)
*   [ ] `next.config.js`: `images.remotePatterns` not needed (local public).
*   [ ] `output: 'standalone'` or `export` configured.
*   [ ] `public/frames/` total size < 100MB (Vercel 100MB file limit per file, total repo size limits). **Action:** Compress frames to WebP/AVIF via Sharp script if > 50MB total.
*   [ ] Headers: `Cache-Control: public, max-age=31536000, immutable` for `/frames/*`.

---

## 7. Risk Mitigation & Rollback Plan

| Risk | Likelihood | Impact | Mitigation |
| :--- | :--- | :--- | :--- |
| **Mobile OOM Crash (120 frames RAM)** | High | Critical | **Mandatory:** Responsive Frame Generation (Sec 4.1). Load only visible range +- 10 frames (Virtualized Loader). |
| **Jank on Low-End GPUs** | Medium | High | `will-change: transform` on canvas. `requestAnimationFrame` budget monitoring. Fallback to Static (Sec 4.3). |
| **Scroll Jacking UX Complaints** | Medium | Medium | Lerp factor tuning. Clear "Scroll" indicator. Native scrollbar visible. |
| **Image Distortion (Ultrawide)** | Low | Medium | Cover Algorithm Unit Tests (Sec 1.2). |
| **Build Time Increase (Sharp)** | Low | Low | Run responsive generation in CI/CD pipeline only, not local dev. |

---

**Approval:** _________________________ (Lead Dev) | _________________________ (PM) | Date: __________