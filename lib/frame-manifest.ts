// Frame Manifest — Filtered to include only comfortable, non-zoomed frames
export const TOTAL_FRAMES = 60; // Max frame count excluding close-up zoom frames
export const FRAME_PATH = '/frames/';
export const FRAME_PREFIX = 'ezgif-frame-';
export const FRAME_EXT = '.jpg';

export function getFrameUrl(index: number): string {
  // Map index [0..59] to non-zoomed frames [1..60]
  const clamped = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor(index) + 1));
  const padded = String(clamped).padStart(3, '0');
  return `${FRAME_PATH}${FRAME_PREFIX}${padded}${FRAME_EXT}`;
}

export const ALL_FRAME_URLS: string[] = Array.from({ length: TOTAL_FRAMES }, (_, i) => getFrameUrl(i));
