import { cn } from "@/lib/utils";

interface MeteorsProps {
  number?: number;
  className?: string;
}

/**
 * Falling meteor streaks. Values are derived from the index (not random)
 * so server and client markup always match.
 */
export function Meteors({ number = 12, className }: MeteorsProps) {
  const meteors = Array.from({ length: number }, (_, i) => ({
    left: `${(i * 37 + 11) % 100}%`,
    top: `${(i * 17) % 40}%`,
    delay: `${((i * 53) % 70) / 10}s`,
    duration: `${4 + ((i * 29) % 35) / 10}s`,
  }));

  return (
    <div
      aria-hidden
      data-slot="meteors"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {meteors.map((meteor, i) => (
        <span
          key={i}
          className={cn(
            "motion-safe:animate-meteor motion-reduce:hidden absolute size-0.5 rounded-full bg-foreground/70 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]",
            "before:absolute before:top-1/2 before:h-px before:w-[70px] before:-translate-y-1/2 before:bg-gradient-to-r before:from-foreground/60 before:to-transparent",
            className
          )}
          style={{
            left: meteor.left,
            top: meteor.top,
            animationDelay: meteor.delay,
            animationDuration: meteor.duration,
          }}
        />
      ))}
    </div>
  );
}
