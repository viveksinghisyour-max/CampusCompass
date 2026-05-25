import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
          // Variants
          variant === 'primary' && "bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/10 active:scale-98 focus:ring-primary",
          variant === 'secondary' && "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary",
          variant === 'outline' && "border border-border bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 focus:ring-slate-400",
          variant === 'ghost' && "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
          variant === 'destructive' && "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive",
          // Sizes
          size === 'sm' && "h-9 px-4 text-xs",
          size === 'md' && "h-11 px-6 text-sm",
          size === 'lg' && "h-12 px-8 text-base",
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin shrink-0" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
