import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  variant?: 'card' | 'list' | 'detail' | 'text';
  count?: number;
  className?: string;
}

export function SkeletonLoader({ variant = 'card', count = 1, className }: SkeletonLoaderProps) {
  const items = Array.from({ length: count });

  if (variant === 'text') {
    return (
      <div className={cn("space-y-2 animate-pulse", className)}>
        <div className="h-4 bg-slate-200 rounded-md w-3/4" />
        <div className="h-4 bg-slate-200 rounded-md w-full" />
        <div className="h-4 bg-slate-200 rounded-md w-5/6" />
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={cn("space-y-4 w-full animate-pulse", className)}>
        {items.map((_, idx) => (
          <div key={idx} className="flex gap-4 p-4 border border-slate-100 rounded-xl items-center bg-white">
            <div className="w-12 h-12 rounded-lg bg-slate-200 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 rounded-md w-1/3" />
              <div className="h-3 bg-slate-200 rounded-md w-2/3" />
            </div>
            <div className="w-16 h-8 rounded-lg bg-slate-200 shrink-0" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'detail') {
    return (
      <div className={cn("space-y-6 w-full animate-pulse", className)}>
        {/* Banner */}
        <div className="w-full h-64 md:h-80 bg-slate-200 rounded-2xl" />
        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-8 bg-slate-200 rounded-md w-1/2" />
            <div className="h-4 bg-slate-200 rounded-md w-full" />
            <div className="h-4 bg-slate-200 rounded-md w-5/6" />
            <div className="h-4 bg-slate-200 rounded-md w-4/5" />
            <div className="h-32 bg-slate-200 rounded-xl" />
          </div>
          <div className="space-y-4">
            <div className="h-40 bg-slate-200 rounded-2xl" />
            <div className="h-20 bg-slate-200 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  // Default: College Card Skeleton
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {items.map((_, idx) => (
        <div
          key={idx}
          className="border border-slate-100 rounded-2xl bg-white shadow-sm overflow-hidden flex flex-col h-[400px] animate-pulse"
        >
          {/* Top image placeholder */}
          <div className="w-full h-44 bg-slate-200" />
          
          {/* Card body placeholder */}
          <div className="p-5 flex-1 flex flex-col gap-4">
            <div className="space-y-2">
              <div className="h-3 bg-slate-200 rounded-md w-1/4" />
              <div className="h-5 bg-slate-200 rounded-md w-3/4" />
            </div>
            
            <div className="flex gap-4">
              <div className="h-4 bg-slate-200 rounded-md w-1/3" />
              <div className="h-4 bg-slate-200 rounded-md w-1/3" />
            </div>

            <hr className="border-slate-100" />

            <div className="flex justify-between items-center mt-auto">
              <div className="space-y-2 w-1/2">
                <div className="h-3 bg-slate-200 rounded-md w-2/3" />
                <div className="h-4 bg-slate-200 rounded-md w-3/4" />
              </div>
              <div className="w-24 h-10 rounded-xl bg-slate-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
