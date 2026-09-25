"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  useVelocity,
} from "motion/react";

import { cn } from "@/lib/utils";

interface ScrollVelocityProps {
  children: React.ReactNode;
  /** Base speed in percent of content width per second */
  baseVelocity?: number;
  className?: string;
}

/**
 * A marquee whose speed and direction respond to how fast you are scrolling.
 * Holds a steady drift when the page is still, pauses while hovered or
 * focused, and stays still under `prefers-reduced-motion`.
 */
export function ScrollVelocity({
  children,
  baseVelocity = 4,
  className,
}: ScrollVelocityProps) {
  const baseX = useMotionValue(0);
  const direction = useRef(1);
  const reducedMotion = useReducedMotion();
  const hovered = useRef(false);
  const focused = useRef(false);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const velocityFactor = useTransform(scrollVelocity, [-1200, 1200], [-4, 4], {
    clamp: false,
  });

  const root = useRef<HTMLDivElement>(null);

  // Own rAF loop (not useAnimationFrame) so nothing ticks under reduced
  // motion or while the marquee is offscreen.
  useEffect(() => {
    const el = root.current;
    if (reducedMotion !== false || !el) return;
    let frame = 0;
    let last = 0;
    let visible = false;

    const tick = (now: number) => {
      const delta = last ? now - last : 0;
      last = now;
      if (!hovered.current && !focused.current) {
        let moveBy = direction.current * baseVelocity * (delta / 1000);
        const factor = velocityFactor.get();
        // Scrolling backwards flips the marquee's direction.
        if (factor < 0) direction.current = -1;
        else if (factor > 0) direction.current = 1;
        moveBy += direction.current * moveBy * Math.abs(factor);
        // One copy is 25% of the four-copy track, so wrap there.
        baseX.set(((baseX.get() + moveBy) % 25) - 25);
      }
      frame = visible ? requestAnimationFrame(tick) : 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame) {
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion, baseVelocity, baseX, velocityFactor]);

  const x = useTransform(baseX, (value) => `${value}%`);

  return (
    <div
      ref={root}
      data-slot="scroll-velocity"
      onMouseEnter={() => (hovered.current = true)}
      onMouseLeave={() => (hovered.current = false)}
      onFocus={() => (focused.current = true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          focused.current = false;
        }
      }}
      className={cn("w-full overflow-hidden whitespace-nowrap", className)}
    >
      <motion.div style={{ x }} className="flex w-max gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            aria-hidden={i > 0 || undefined}
            inert={i > 0}
            className="shrink-0"
          >
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
