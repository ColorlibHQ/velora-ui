"use client";

import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface LensProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The content to magnify, usually an `<img>` that fills the box */
  children: React.ReactNode;
  /** How many times the lens magnifies */
  zoomFactor?: number;
  /** Lens radius in px */
  radius?: number;
  /** Pin the lens open at this spot (percentages of width and height) and ignore the pointer — handy for touch screens and product callouts */
  staticPosition?: { x: number; y: number };
}

/**
 * A circular magnifier that follows the pointer over an image (or any
 * content). Keyboard users can focus it, move the lens with the arrow keys
 * (Shift for bigger steps) and hide it with Escape. The magnified copy is
 * aria-hidden and inert.
 */
export function Lens({
  children,
  zoomFactor = 2,
  radius = 80,
  staticPosition,
  className,
  style,
  ...props
}: LensProps) {
  const ref = useRef<HTMLDivElement>(null);
  const start = staticPosition ?? { x: 50, y: 50 };
  // Position lives in CSS variables, so pointer moves never re-render.
  const pos = useRef(start);
  const [shown, setShown] = useState(false);
  const visible = shown || !!staticPosition;

  const moveTo = (x: number, y: number) => {
    pos.current = { x: Math.min(100, Math.max(0, x)), y: Math.min(100, Math.max(0, y)) };
    ref.current?.style.setProperty("--x", `${pos.current.x}%`);
    ref.current?.style.setProperty("--y", `${pos.current.y}%`);
    setShown(true);
  };

  const track = (event: React.PointerEvent<HTMLDivElement>) => {
    if (staticPosition) return;
    const rect = event.currentTarget.getBoundingClientRect();
    moveTo(
      ((event.clientX - rect.left) / rect.width) * 100,
      ((event.clientY - rect.top) / rect.height) * 100
    );
  };

  const keys: Record<string, [number, number]> = {
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
  };

  return (
    <div
      ref={ref}
      tabIndex={0}
      data-slot="lens"
      onPointerMove={track}
      onPointerDown={track}
      onPointerLeave={(event) => event.pointerType === "mouse" && setShown(false)}
      onFocus={(event) => event.target.matches(":focus-visible") && setShown(true)}
      onBlur={() => setShown(false)}
      onKeyDown={(event) => {
        if (event.key === "Escape") setShown(false);
        const step = keys[event.key];
        if (!step || staticPosition) return;
        event.preventDefault();
        const size = event.shiftKey ? 12 : 4;
        moveTo(pos.current.x + step[0] * size, pos.current.y + step[1] * size);
      }}
      className={cn(
        "relative overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        !staticPosition && "cursor-crosshair",
        className
      )}
      style={
        {
          "--x": `${start.x}%`,
          "--y": `${start.y}%`,
          "--r": `${radius}px`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
      <div
        aria-hidden
        inert
        className={cn(
          "pointer-events-none absolute inset-0 bg-background transition-[opacity,clip-path,transform-origin] duration-150 ease-out motion-reduce:transition-none",
          !visible && "opacity-0"
        )}
        style={{
          transform: `scale(${zoomFactor})`,
          transformOrigin: "var(--x) var(--y)",
          clipPath: `circle(calc(var(--r) / ${zoomFactor}) at var(--x) var(--y))`,
        }}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute top-(--y) left-(--x) size-[calc(var(--r)*2)] -translate-1/2 rounded-full border-2 border-white/80 shadow-[0_10px_40px_-8px_rgb(0_0_0/0.45)] ring-1 ring-black/10 transition-[opacity,scale,top,left] duration-150 ease-out motion-reduce:transition-none",
          !visible && "scale-90 opacity-0"
        )}
      />
    </div>
  );
}
