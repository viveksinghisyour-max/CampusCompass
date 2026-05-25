'use client';

import React from 'react';
import { create } from 'zustand';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (message: string, type?: 'success' | 'error' | 'info', duration?: number) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (message, type = 'success', duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({ toasts: [...state.toasts, { id, message, type, duration }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, duration);
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
}));

export const toast = {
  success: (msg: string, dur?: number) => useToastStore.getState().addToast(msg, 'success', dur),
  error: (msg: string, dur?: number) => useToastStore.getState().addToast(msg, 'error', dur),
  info: (msg: string, dur?: number) => useToastStore.getState().addToast(msg, 'info', dur)
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
            className={cn(
              "flex items-start gap-3 p-4 rounded-xl border shadow-xl pointer-events-auto bg-white backdrop-blur-md",
              item.type === 'success' && "border-green-100 bg-white/95 text-slate-800 shadow-green-500/5",
              item.type === 'error' && "border-red-100 bg-white/95 text-slate-800 shadow-red-500/5",
              item.type === 'info' && "border-blue-100 bg-white/95 text-slate-800 shadow-blue-500/5"
            )}
          >
            {item.type === 'success' && <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />}
            {item.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />}
            {item.type === 'info' && <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />}

            <div className="flex-1 text-sm font-medium pr-2 leading-relaxed">
              {item.message}
            </div>

            <button
              onClick={() => removeToast(item.id)}
              className="text-slate-400 hover:text-slate-600 transition-colors shrink-0 p-0.5 rounded-md hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
