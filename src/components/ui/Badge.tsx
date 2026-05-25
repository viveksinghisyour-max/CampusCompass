import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'info';
}

export function Badge({ className, variant = 'secondary', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide transition-colors shrink-0",
        variant === 'primary' && "bg-primary/10 text-primary border border-primary/20",
        variant === 'secondary' && "bg-secondary text-secondary-foreground border border-transparent",
        variant === 'outline' && "border border-border text-slate-600 bg-white",
        variant === 'success' && "bg-green-50 text-green-700 border border-green-200/55",
        variant === 'warning' && "bg-amber-50 text-amber-700 border border-amber-200/55",
        variant === 'info' && "bg-blue-50 text-blue-700 border border-blue-200/55",
        className
      )}
      {...props}
    />
  );
}
