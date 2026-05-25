import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onChange, label, disabled, id, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;

    return (
      <div className="flex items-center gap-3 select-none">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            ref={ref}
            id={checkboxId}
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange(e.target.checked)}
            className="sr-only"
            {...props}
          />
          <div
            onClick={() => !disabled && onChange(!checked)}
            className={cn(
              "w-5 h-5 rounded-md border border-slate-300 bg-white flex items-center justify-center cursor-pointer transition-all duration-150 focus-within:ring-2 focus-within:ring-primary/20",
              checked && "border-primary bg-primary text-white shadow-md shadow-primary/15",
              disabled && "bg-slate-100 border-slate-200 cursor-not-allowed opacity-50",
              className
            )}
          >
            {checked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
          </div>
        </div>
        {label && (
          <label
            htmlFor={checkboxId}
            className={cn(
              "text-sm font-medium text-slate-600 cursor-pointer",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
