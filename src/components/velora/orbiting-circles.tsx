import { cn } from "@/lib/utils";

interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Seconds per revolution */
  duration?: number;
  /** Orbit radius in px */
  radius?: number;
  reverse?: boolean;
  /** Show the orbit ring */
  path?: boolean;
  /** Diameter of each orbiting item in px */
  iconSize?: number;
  speed?: number;
}

/**
 * Evenly distributes children around a circular orbit and rotates them.
 * Place inside a `relative` container; stack multiple instances with
 * different radii for multi-ring layouts.
 */
export function OrbitingCircles({
  className,
  children,
  duration = 20,
  radius = 160,
  reverse = false,
  path = true,
  iconSize = 32,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const items = Array.isArray(children) ? children : [children];
  const calculatedDuration = duration / speed;

  return (
    <>
      {path && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div
            className="rounded-full border border-dashed border-border"
            style={{ width: radius * 2, height: radius * 2 }}
          />
        </div>
      )}
      {items.map((child, i) => {
        const angle = (360 / items.length) * i;
        return (
          <div
            key={i}
            data-slot="orbiting-circle"
            style={
              {
                "--duration": calculatedDuration,
                "--radius": radius,
                "--angle": angle,
                // Resting position on the ring; the orbit animation overrides it
                transform: `rotate(${angle}deg) translateY(${-radius}px) rotate(${-angle}deg)`,
              } as React.CSSProperties
            }
            className={cn(
              "motion-safe:animate-orbit absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full",
              reverse && "[animation-direction:reverse]",
              className
            )}
            {...props}
          >
            <div
              className="flex items-center justify-center"
              style={{ width: iconSize, height: iconSize }}
            >
              {child}
            </div>
          </div>
        );
      })}
    </>
  );
}
