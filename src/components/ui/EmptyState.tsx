import React from 'react';
import { Search } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon = <Search className="w-12 h-12 text-slate-400 stroke-[1.5px]" />,
  title,
  description,
  actionText,
  onAction
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 border border-slate-100 rounded-3xl bg-white/70 backdrop-blur-sm max-w-md mx-auto my-8 shadow-sm">
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-5 shrink-0 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2 leading-snug">{title}</h3>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed max-w-xs">{description}</p>
      {actionText && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}
