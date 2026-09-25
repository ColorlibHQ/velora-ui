"use client";

import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface CompareSliderProps {
  before: React.ReactNode;
  after: React.ReactNode;
  /** Starting divider position, 0–100 */
  initial?: number;
  /** Announced by the slider handle */
  label?: string;
  className?: string;
}

/**
 * Before/after wipe with a draggable divider. The handle is a real range
 * input, so it works with arrow keys and screen readers for free.
 */
export function CompareSlider({
  before,
  after,
  initial = 50,
  label = "Compare before and after",
  className,
}: CompareSliderProps) {
  const [position, setPosition] = useState(initial);
  const ref = useRef<HTMLDivElement>(null);

  const moveTo = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  };

  return (
    <div
      ref={ref}
      data-slot="compare-slider"
      onPointerMove={(event) => {
        if (event.buttons === 1) moveTo(event.clientX);
      }}
      className={cn(
        "relative aspect-video w-full touch-none overflow-hidden rounded-2xl border select-none has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-ring",
        className
      )}
    >
      <div className="absolute inset-0">{after}</div>
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {before}
      </div>

      <div
        aria-hidden
        style={{ left: `${position}%` }}
        className="absolute inset-y-0 w-px -translate-x-1/2 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.35)]"
      >
        <span className="absolute top-1/2 left-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-white/20 backdrop-blur-sm">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="white"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 4L2.5 8 6 12M10 4l3.5 4-3.5 4" />
          </svg>
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={position}
        aria-label={label}
        onChange={(event) => setPosition(Number(event.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
