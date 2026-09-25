"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface NoiseBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Film-grain opacity, 0–1 (0 hides the grain) */
  grain?: number;
  /** Drift speed multiplier */
  speed?: number;
  /** Pause the drift while hovered (focus inside always pauses it) */
  pauseOnHover?: boolean;
}

// Static grain: SVG fractal noise, desaturated, tiled as a background image.
const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const BLOBS = [
  "-top-1/2 -left-[10%] bg-brand-from",
  "-top-1/4 -right-[15%] bg-brand-via",
  "-bottom-2/3 left-1/4 bg-brand-to",
];

/**
 * A soft brand-gradient wash — three blurred blobs drifting slowly — under a
 * static film-grain overlay. Wraps its children, which sit above both layers.
 */
export function NoiseBackground({
  grain = 0.35,
  speed = 1,
  pauseOnHover = true,
  className,
  children,
  ...props
}: NoiseBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current!;
    const blobs = [...root.firstElementChild!.children] as HTMLElement[];
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    let t = 0;
    let last = 0;
    let raf = 0;
    let seen = false;
    let hover = false;
    let focus = false;

    const frame = (now: number) => {
      t += (Math.min(now - last, 50) / 1000) * speed;
      last = now;
      blobs.forEach((b, i) => {
        const p = i * 2.4;
        const x = 22 * Math.sin(t * (0.21 + i * 0.05) + p);
        const y = 16 * Math.cos(t * (0.17 + i * 0.04) + p);
        b.style.transform = `translate(${x}%,${y}%) scale(${1 + 0.1 * Math.sin(t * 0.3 + p)})`;
      });
      raf = requestAnimationFrame(frame);
    };
    // Drift only on screen, in a visible tab, without reduced motion and
    // while nobody is hovering or focused inside; otherwise hold still.
    const sync = () => {
      cancelAnimationFrame(raf);
      if (!mq.matches && seen && !document.hidden && !focus && !(hover && pauseOnHover)) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };
    const on = (e: Event) => {
      if (e.type == "pointerenter") hover = true;
      else if (e.type == "pointerleave") hover = false;
      else focus = e.type == "focusin" || root.contains((e as FocusEvent).relatedTarget as Node);
      sync();
    };
    const events = ["pointerenter", "pointerleave", "focusin", "focusout"];

    const io = new IntersectionObserver(([e]) => {
      seen = e.isIntersecting;
      sync();
    });
    io.observe(root);
    events.forEach((n) => root.addEventListener(n, on));
    document.addEventListener("visibilitychange", sync);
    mq.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      events.forEach((n) => root.removeEventListener(n, on));
      document.removeEventListener("visibilitychange", sync);
      mq.removeEventListener("change", sync);
    };
  }, [speed, pauseOnHover]);

  return (
    <div
      ref={ref}
      data-slot="noise-background"
      className={cn("relative isolate overflow-hidden bg-background", className)}
      {...props}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-60 dark:opacity-50">
        {BLOBS.map((c) => (
          <div
            key={c}
            className={cn("absolute aspect-square w-[65%] min-w-64 rounded-full blur-3xl will-change-transform", c)}
          />
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 mix-blend-overlay"
        style={{ backgroundImage: NOISE, opacity: grain }}
      />
      {children}
    </div>
  );
}
