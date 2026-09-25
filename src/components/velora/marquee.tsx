import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Reverse the scroll direction */
  reverse?: boolean;
  /** Pause the animation while hovered (it always pauses while focus is inside) */
  pauseOnHover?: boolean;
  /** Scroll vertically instead of horizontally */
  vertical?: boolean;
  /** Number of content copies (keep >=2 for a seamless loop) */
  repeat?: number;
  /** Fade the edges with a mask */
  fade?: boolean;
  children: React.ReactNode;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  fade = true,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      data-slot="marquee"
      className={cn(
        "group/marquee flex gap-(--gap) overflow-hidden [--duration:40s] [--gap:1rem] motion-reduce:[mask-image:none]",
        vertical ? "flex-col motion-reduce:overflow-y-auto" : "flex-row",
        fade &&
          (vertical
            ? "[mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]"
            : "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"),
        className
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0 || undefined}
          inert={i > 0 || undefined}
          className={cn(
            "flex shrink-0 justify-around gap-(--gap) group-focus-within/marquee:[animation-play-state:paused]",
            vertical
              ? "motion-safe:animate-marquee-vertical flex-col"
              : "motion-safe:animate-marquee flex-row motion-reduce:w-full motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center",
            i > 0 && "motion-reduce:hidden",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover/marquee:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
