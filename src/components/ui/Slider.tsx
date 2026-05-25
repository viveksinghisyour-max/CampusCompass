'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  className?: string;
}

export function Slider({ min, max, step = 10000, value, onChange, className }: SliderProps) {
  const [minVal, setMinVal] = useState(value[0]);
  const [maxVal, setMaxVal] = useState(value[1]);
  
  const minValRef = useRef(value[0]);
  const maxValRef = useRef(value[1]);
  const rangeRef = useRef<HTMLDivElement>(null);

  // Convert value to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Sync state with parent values
  useEffect(() => {
    setMinVal(value[0]);
    maxValRef.current = value[1];
  }, [value[0]]);

  useEffect(() => {
    setMaxVal(value[1]);
    maxValRef.current = value[1];
  }, [value[1]]);

  // Set width of the range to show active selection track
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (rangeRef.current) {
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (rangeRef.current) {
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  return (
    <div className={cn("w-full py-4 flex flex-col gap-3", className)}>
      <div className="relative w-full h-2">
        {/* Underlay Track */}
        <div className="absolute inset-y-0 w-full bg-slate-200 rounded-full h-1.5" />
        
        {/* Active Selection Track */}
        <div ref={rangeRef} className="absolute inset-y-0 bg-primary rounded-full h-1.5" />

        {/* Left Thumb Input */}
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          step={step}
          onChange={(e) => {
            const val = Math.min(Number(e.target.value), maxVal - step);
            setMinVal(val);
            minValRef.current = val;
            onChange([val, maxVal]);
          }}
          className="absolute w-full h-0 pointer-events-none appearance-none outline-none z-[3] cursor-pointer slider-thumb-only"
        />

        {/* Right Thumb Input */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          step={step}
          onChange={(e) => {
            const val = Math.max(Number(e.target.value), minVal + step);
            setMaxVal(val);
            maxValRef.current = val;
            onChange([minVal, val]);
          }}
          className="absolute w-full h-0 pointer-events-none appearance-none outline-none z-[4] cursor-pointer slider-thumb-only"
        />
      </div>

      <style jsx global>{`
        .slider-thumb-only::-webkit-slider-thumb {
          pointer-events: auto;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 3px solid #ffffff;
          background-color: var(--color-primary, #3b82f6);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          -webkit-appearance: none;
          transition: transform 0.1s ease;
        }
        .slider-thumb-only::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .slider-thumb-only::-webkit-slider-thumb:active {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
}
