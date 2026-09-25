import { cn } from "@/lib/utils";

interface FlickeringGridProps {
  /** Square size in px */
  squareSize?: number;
  /** Gap between squares in px */
  gap?: number;
  /** Number of columns and rows to render */
  columns?: number;
  rows?: number;
  className?: string;
}

/**
 * Grid of squares that fade in and out on staggered timers. Rendered as a
 * plain DOM grid with CSS animation delays — no canvas, no dependency.
 */
export function FlickeringGrid({
  squareSize = 4,
  gap = 6,
  columns = 40,
  rows = 20,
  className,
}: FlickeringGridProps) {
  const cells = columns * rows;

  return (
    <div
      aria-hidden
      data-slot="flickering-grid"
      style={{
        gridTemplateColumns: `repeat(${columns}, ${squareSize}px)`,
        gap,
      }}
      className={cn(
        "pointer-events-none absolute inset-0 grid h-full w-full justify-center overflow-hidden",
        className
      )}
    >
      {Array.from({ length: cells }).map((_, i) => (
        <span
          key={i}
          // Static under reduced motion: rest halfway between the two flicker levels.
          className="rounded-[1px] bg-current motion-safe:animate-flicker motion-reduce:opacity-[calc((var(--flicker-max,0.45)_+_var(--flicker-min,0.08))/2)]"
          style={{
            width: squareSize,
            height: squareSize,
            // Deterministic pseudo-random delay: stable between server and client.
            animationDelay: `${((i * 37) % 100) / 25}s`,
            animationDuration: `${2 + ((i * 13) % 5) * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
}
