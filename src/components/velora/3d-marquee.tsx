"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

export type Marquee3DImage = string | { src: string; alt?: string };

interface Marquee3DProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image URLs, or { src, alt } objects (images without alt are decorative) */
  images: Marquee3DImage[];
  /** Number of columns on the tilted plane */
  columns?: number;
  /** Seconds for one full loop of a column */
  duration?: number;
  /** Fade the edges into the background */
  fade?: boolean;
  /** Pause scrolling while hovered */
  pauseOnHover?: boolean;
  /** Extra classes for every image tile */
  imageClassName?: string;
}

/**
 * A grid of images tilted in 3D whose columns scroll endlessly, alternating
 * up and down. Give it a height (default h-112) and place copy on top.
 * Scrolling pauses offscreen and on hover; under reduced motion the tilted
 * grid rests in place.
 */
export function Marquee3D({
  images,
  columns = 5,
  duration = 40,
  fade = true,
  pauseOnHover = true,
  imageClassName,
  className,
  style,
  ...props
}: Marquee3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const n = images.length;
  // Enough tiles per copy that one copy always spans the visible diagonal
  const perCopy = Math.ceil(columns * 1.6) + 1;

  // Pause the CSS animations while offscreen
  useEffect(() => {
    const el = ref.current!;
    const observer = new IntersectionObserver(([e]) =>
      el.toggleAttribute("data-offscreen", !e.isIntersecting)
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      {...props}
      ref={ref}
      data-slot="marquee-3d"
      style={{ "--duration": `${duration}s`, ...style } as React.CSSProperties}
      className={cn(
        "group/marquee3d relative h-112 w-full overflow-hidden [--gap:1rem] @container-size",
        fade &&
          "mask-intersect mask-[linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent),linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className
      )}
    >
      <div
        className="absolute top-1/2 left-1/2 grid w-[calc(118cqh+80cqw)] origin-top-left gap-(--gap)"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          // Rotate about the container's centre, a quarter of the way down the
          // plane, so a column's first copy covers the view at every offset.
          transform: "rotateX(55deg) rotateZ(-40deg) translate(-50%, -25%)",
        }}
      >
        {n > 0 &&
          Array.from({ length: columns }, (_, c) => (
            <div key={c} className="flex flex-col gap-(--gap)">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy > 0 || undefined}
                  inert={copy > 0 || undefined}
                  className={cn(
                    "flex flex-col gap-(--gap) motion-safe:animate-marquee-vertical group-data-offscreen/marquee3d:[animation-play-state:paused]",
                    c % 2 && "[animation-direction:reverse]",
                    pauseOnHover && "group-hover/marquee3d:[animation-play-state:paused]"
                  )}
                >
                  {Array.from({ length: perCopy }, (_, k) => {
                    const i = c + k * columns;
                    const image = images[i % n];
                    const { src, alt = "" } = typeof image === "string" ? { src: image } : image;
                    return (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={k}
                        src={src}
                        // Each image's alt is read once; repeats are decorative
                        alt={copy || i >= n ? "" : alt}
                        loading="lazy"
                        draggable={false}
                        className={cn(
                          "aspect-4/3 w-full rounded-xl bg-muted object-cover shadow-lg ring-1 ring-border",
                          imageClassName
                        )}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
