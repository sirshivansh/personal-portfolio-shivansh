'use client';

import { useState, useEffect, useRef } from 'react';
import { TOTAL_FRAMES, getFrameUrl } from '@/lib/frame-manifest';

export interface PreloaderState {
  status: 'idle' | 'loading' | 'ready' | 'error';
  progress: number; // 0.0 to 1.0
  loadedCount: number;
  totalCount: number;
  images: Map<number, HTMLImageElement>;
  error?: string;
}

export function useFramePreloader() {
  const [state, setState] = useState<PreloaderState>({
    status: 'loading',
    progress: 0,
    loadedCount: 0,
    totalCount: TOTAL_FRAMES,
    images: new Map(),
  });

  const imagesMapRef = useRef<Map<number, HTMLImageElement>>(new Map());

  useEffect(() => {
    let isCancelled = false;
    let loadedCounter = 0;
    const total = TOTAL_FRAMES;

    const updateProgress = () => {
      if (isCancelled) return;
      loadedCounter++;
      const currentProgress = Math.min(1, loadedCounter / total);
      setState({
        status: loadedCounter >= total ? 'ready' : 'loading',
        progress: currentProgress,
        loadedCount: loadedCounter,
        totalCount: total,
        images: imagesMapRef.current,
      });
    };

    // Preload hero frames (0..25) first with higher priority, then remaining
    const loadIndices = Array.from({ length: total }, (_, i) => i);
    // Sort so initial frames load first
    loadIndices.sort((a, b) => {
      if (a < 25 && b >= 25) return -1;
      if (a >= 25 && b < 25) return 1;
      return a - b;
    });

    const CONCURRENCY = 6;
    let queueIndex = 0;

    const loadNext = () => {
      if (isCancelled || queueIndex >= loadIndices.length) return;
      const index = loadIndices[queueIndex++];
      const url = getFrameUrl(index);

      const img = new Image();
      img.src = url;

      img.onload = () => {
        if (!isCancelled) {
          imagesMapRef.current.set(index, img);
          updateProgress();
          loadNext();
        }
      };

      img.onerror = () => {
        if (!isCancelled) {
          // Retry or create empty fallback placeholder
          imagesMapRef.current.set(index, img);
          updateProgress();
          loadNext();
        }
      };
    };

    // Launch worker threads up to CONCURRENCY limit
    for (let i = 0; i < Math.min(CONCURRENCY, loadIndices.length); i++) {
      loadNext();
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  return state;
}
