'use client';

import { useEffect, useRef } from 'react';

interface FrameScrollCanvasProps {
  currentFrame: number;
  images: Map<number, HTMLImageElement>;
  className?: string;
}

export function FrameScrollCanvas({
  currentFrame,
  images,
  className = '',
}: FrameScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastDrawnFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const img = images.get(currentFrame);
      if (!img || !img.complete || img.naturalWidth === 0) {
        return;
      }

      // Check canvas dimensions vs window
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Cover ratio math
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;
      const canvasRatio = width / height;
      const imgRatio = imgW / imgH;

      let renderW = width;
      let renderH = height;
      let offsetX = 0;
      let offsetY = 0;

      if (imgRatio > canvasRatio) {
        renderW = height * imgRatio;
        offsetX = (width - renderW) / 2;
      } else {
        renderH = width / imgRatio;
        offsetY = (height - renderH) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
      ctx.restore();

      lastDrawnFrameRef.current = currentFrame;
    };

    animationFrameId = requestAnimationFrame(render);

    const handleResize = () => {
      render();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentFrame, images]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full object-cover pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
}
