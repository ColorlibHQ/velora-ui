import { cn } from "@/lib/utils";

interface RetroGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Perspective angle of the grid plane */
  angle?: number;
  cellSize?: number;
  opacity?: number;
}

/**
 * Scrolling perspective grid backdrop. Place inside a
 * `relative overflow-hidden` section.
 */
export function RetroGrid({
  className,
  angle = 55,
  cellSize = 56,
  opacity = 0.4,
  ...props
}: RetroGridProps) {
  return (
    <div
      aria-hidden
      data-slot="retro-grid"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden [perspective:240px]",
        className
      )}
      style={{ opacity }}
      {...props}
    >
      <div
        className="absolute inset-0"
        style={{ transform: `rotateX(${angle}deg)` }}
      >
        <div
          className="motion-safe:animate-retro-grid [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] absolute h-[300vh] w-[600vw] [background-image:linear-gradient(to_right,var(--grid-line)_1px,transparent_0),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_0)] [background-repeat:repeat]"
          style={
            {
              backgroundSize: `${cellSize}px ${cellSize}px`,
              "--grid-line":
                "color-mix(in oklab, var(--border) 90%, transparent)",
            } as React.CSSProperties
          }
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
    </div>
  );
}
