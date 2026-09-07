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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const img = images.get(currentFrame);

      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Fill canvas background with pure white (#ffffff) to seamlessly blend with photo background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      if (img && img.complete && img.naturalWidth > 0) {
        const imgW = img.naturalWidth;
        const imgH = img.naturalHeight;
        const canvasRatio = width / height;
        const imgRatio = imgW / imgH;

        // Proportional CONTAIN scaling algorithm (prevents any zooming/cropping into the face)
        // Max height constrained to 82% of viewport for optimal framing margin
        const maxScaleHeight = height * 0.82;
        const maxScaleWidth = width * 0.85;

        let renderW = width;
        let renderH = height;

        if (imgRatio > canvasRatio) {
          renderW = Math.min(width, maxScaleWidth);
          renderH = renderW / imgRatio;
        } else {
          renderH = Math.min(height, maxScaleHeight);
          renderW = renderH * imgRatio;
        }

        // Center horizontally and vertically
        const offsetX = (width - renderW) / 2;
        const offsetY = (height - renderH) / 2 + 10; // Slight top padding shift

        ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
      }

      ctx.restore();
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
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
}
