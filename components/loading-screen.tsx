'use client';

import { Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  progress: number; // 0 to 1
  loadedCount: number;
  totalCount: number;
}

export function LoadingScreen({ progress, loadedCount, totalCount }: LoadingScreenProps) {
  const percentage = Math.min(100, Math.round(progress * 100));

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white p-6">
      <div className="w-full max-w-sm space-y-6 text-center">
        <div className="inline-flex items-center justify-center p-4 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 animate-pulse">
          <Sparkles className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Loading Experience
          </h2>
          <p className="text-xs font-mono text-slate-400">
            Preloading interactive frame assets ({loadedCount} / {totalCount})
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-amber-400 transition-all duration-150 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-xs font-mono text-slate-400">
            <span>Progress</span>
            <span className="text-cyan-400 font-bold">{percentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
