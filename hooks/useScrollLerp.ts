'use client';

import { useState, useEffect, useRef } from 'react';
import { TOTAL_FRAMES } from '@/lib/frame-manifest';

interface UseScrollLerpOptions {
  enabled: boolean;
  lerpFactor?: number;
}

export function useScrollLerp({ enabled, lerpFactor = 0.12 }: UseScrollLerpOptions) {
  const [frameState, setFrameState] = useState({
    currentFrame: 0,
    targetFrame: 0,
    progress: 0,
  });

  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const rawProgress = Math.min(1, Math.max(0, scrollY / maxScroll));
      const target = rawProgress * (TOTAL_FRAMES - 1);
      targetFrameRef.current = target;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const updateLerp = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * lerpFactor;
      } else {
        currentFrameRef.current = target;
      }

      const clampedFrame = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, currentFrameRef.current)
      );
      const progress = clampedFrame / (TOTAL_FRAMES - 1);

      setFrameState({
        currentFrame: Math.round(clampedFrame),
        targetFrame: Math.round(target),
        progress,
      });

      rafIdRef.current = requestAnimationFrame(updateLerp);
    };

    rafIdRef.current = requestAnimationFrame(updateLerp);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [enabled, lerpFactor]);

  return frameState;
}
