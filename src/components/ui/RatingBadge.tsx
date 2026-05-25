import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingBadgeProps {
  rating: number;
  className?: string;
  showText?: boolean;
}

export function RatingBadge({ rating, className, showText = false }: RatingBadgeProps) {
  // Determine color theme based on rating thresholds
  const isExcellent = rating >= 4.5;
  const isGood = rating >= 3.8 && rating < 4.5;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-sm font-bold shrink-0 border",
        isExcellent && "bg-emerald-50 text-emerald-700 border-emerald-100",
        isGood && "bg-amber-50 text-amber-700 border-amber-100",
        !isExcellent && !isGood && "bg-slate-50 text-slate-700 border-slate-200",
        className
      )}
    >
      <Star className={cn("w-3.5 h-3.5 fill-current shrink-0", 
        isExcellent && "text-emerald-500",
        isGood && "text-amber-500",
        !isExcellent && !isGood && "text-slate-500"
      )} />
      <span>{rating.toFixed(1)}</span>
      {showText && (
        <span className="text-xs font-medium text-slate-500 border-l border-slate-300 pl-1.5 ml-0.5">
          {isExcellent ? 'Excellent' : isGood ? 'Very Good' : 'Decent'}
        </span>
      )}
    </div>
  );
}
