'use client';

import { useState, useEffect } from 'react';
import { useFramePreloader } from '@/hooks/useFramePreloader';
import { useScrollLerp } from '@/hooks/useScrollLerp';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { FrameScrollCanvas } from '@/components/frame-scroll-canvas';
import { FrameOverlayContent } from '@/components/frame-overlay-content';
import { FrameNavbar } from '@/components/frame-navbar';
import { LoadingScreen } from '@/components/loading-screen';
import { StandardFallback } from '@/components/standard-fallback';

export default function Home() {
  const { status, progress, loadedCount, totalCount, images } = useFramePreloader();
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const lerpState = useScrollLerp({
    enabled: status === 'ready' && !reducedMotion,
    lerpFactor: 0.12,
  });

  if (!mounted || status === 'loading') {
    return (
      <LoadingScreen
        progress={progress}
        loadedCount={loadedCount}
        totalCount={totalCount}
      />
    );
  }

  if (reducedMotion || status === 'error') {
    return <StandardFallback />;
  }

  return (
    <div className="relative w-full min-h-screen bg-white text-slate-900 selection:bg-cyan-500 selection:text-slate-950">
      {/* 1. Floating Dark Header Navigation */}
      <FrameNavbar currentFrame={lerpState.currentFrame} />

      {/* 2. Scroll Track — Sets scrollbar travel length (500vh) */}
      <div className="relative z-0 h-[500vh] w-full" aria-hidden="true" />

      {/* 3. Canvas Layer — Proportional CONTAIN canvas background blending into white page */}
      <FrameScrollCanvas
        currentFrame={lerpState.currentFrame}
        images={images}
      />

      {/* 4. Overlay Content Layer — Dark Glass Milestone cards for 100% text readability */}
      <div className="fixed inset-0 z-20 pointer-events-none">
        <FrameOverlayContent currentFrame={lerpState.currentFrame} />
      </div>
    </div>
  );
}
