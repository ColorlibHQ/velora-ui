"use client";

import { useMemo } from "react";

import { cn } from "@/lib/utils";

// Nine tints: each brand stop at three strengths, all theme-aware.
const TINTS = [85, 65, 45].flatMap((p) =>
  ["from", "via", "to"].map((v) => `color-mix(in oklab, var(--brand-${v}) ${p}%, transparent)`)
);

interface BackgroundBoxesProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of rows (capped at 40) */
  rows?: number;
  /** Number of columns (capped at 40) */
  cols?: number;
  /** Cell edge length in px, before the isometric tilt */
  cellSize?: number;
  /** How long a lit cell takes to fade back, in ms */
  fade?: number;
}

/**
 * An isometric grid of cells that light up in random brand tints under the
 * pointer and fade slowly back. Absolutely positioned — place inside a
 * `relative overflow-hidden` section. Content above it blocks the pointer, so
 * give text wrappers `pointer-events-none` to keep the grid reactive.
 */
export function BackgroundBoxes({
  rows = 32,
  cols = 32,
  cellSize = 48,
  fade = 1400,
  className,
  ...props
}: BackgroundBoxesProps) {
  const r = Math.min(rows, 40);
  const c = Math.min(cols, 40);

  // Cells never re-render: hover colour is pure CSS, and one delegated
  // listener picks a fresh tint for whichever cell the pointer enters.
  const cells = useMemo(
    () =>
      Array.from({ length: r * c }, (_, i) => (
        <div
          key={i}
          className="border-r border-b border-border transition-[background-color] duration-(--fade) ease-out hover:bg-(--tint) hover:duration-0"
        />
      )),
    [r, c]
  );

  return (
    <div
      aria-hidden
      data-slot="background-boxes"
      className={cn("absolute inset-0 overflow-hidden", className)}
      {...props}
    >
      <div
        className="absolute top-1/2 left-1/2 grid border-t border-l border-border"
        style={
          {
            gridTemplateColumns: `repeat(${c}, ${cellSize}px)`,
            gridAutoRows: cellSize,
            transform: "translate(-50%, -50%) scaleY(0.58) rotate(-45deg)",
            "--fade": `${fade}ms`,
          } as React.CSSProperties
        }
        onPointerOver={(e) => {
          const cell = e.target as HTMLElement;
          if (cell !== e.currentTarget) {
            cell.style.setProperty("--tint", TINTS[(Math.random() * TINTS.length) | 0]);
          }
        }}
      >
        {cells}
      </div>
    </div>
  );
}
