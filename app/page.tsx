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
    <div className="relative w-full min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black">
      {/* 1. Header Navigation */}
      <FrameNavbar currentFrame={lerpState.currentFrame} />

      {/* 2. Scroll Track — Sets scrollbar travel length (500vh) */}
      <div className="relative z-0 h-[500vh] w-full" aria-hidden="true" />

      {/* 3. Canvas Layer — Fixed WebGL / 2D Canvas background rendering frames */}
      <FrameScrollCanvas
        currentFrame={lerpState.currentFrame}
        images={images}
      />

      {/* 4. Overlay Content Layer — Milestone cards */}
      <div className="fixed inset-0 z-20 pointer-events-none">
        <FrameOverlayContent currentFrame={lerpState.currentFrame} />
      </div>
    </div>
  );
}
