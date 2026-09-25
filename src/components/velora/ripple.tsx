import { cn } from "@/lib/utils";

interface RippleProps {
  /** Number of concentric rings */
  circles?: number;
  /** Diameter of the innermost ring, in px */
  baseSize?: number;
  className?: string;
}

/**
 * Concentric rings pulsing outward from the centre — a calm backdrop for
 * "connected" or "listening" states.
 */
export function Ripple({
  circles = 6,
  baseSize = 180,
  className,
}: RippleProps) {
  return (
    <div
      aria-hidden
      data-slot="ripple"
      className={cn(
        "pointer-events-none absolute inset-0 grid place-items-center overflow-hidden [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]",
        className
      )}
    >
      {Array.from({ length: circles }).map((_, i) => {
        const size = baseSize + i * 90;
        return (
          <span
            key={i}
            className="absolute rounded-full border border-brand/25 motion-safe:animate-ripple-ring"
            style={{
              width: size,
              height: size,
              animationDelay: `${i * 0.5}s`,
              opacity: 1 - i / circles,
            }}
          />
        );
      })}
    </div>
  );
}
