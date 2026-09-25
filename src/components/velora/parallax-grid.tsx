"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { cn } from "@/lib/utils";

interface ParallaxGridProps {
  /** Each child becomes one tile; columns drift at different speeds */
  children: React.ReactNode[];
  /** Maximum vertical drift in px */
  depth?: number;
  className?: string;
}

/**
 * Image or card grid whose columns drift at different rates as the page
 * scrolls, giving a gallery a sense of depth. Under `prefers-reduced-motion`
 * a CSS override pins every tile in place.
 */
export function ParallaxGrid({
  children,
  depth = 90,
  className,
}: ParallaxGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Three columns: outer ones lead, the middle one lags.
  const fast = useTransform(scrollYProgress, [0, 1], [depth, -depth]);
  const slow = useTransform(scrollYProgress, [0, 1], [depth * 0.4, -depth * 0.4]);
  const lagging = useTransform(scrollYProgress, [0, 1], [-depth * 0.3, depth * 0.3]);
  const tracks = [fast, lagging, slow];

  return (
    <div
      ref={ref}
      data-slot="parallax-grid"
      className={cn("grid grid-cols-2 gap-4 md:grid-cols-3", className)}
    >
      {children.map((child, i) => (
        <motion.div
          key={i}
          style={{ y: tracks[i % 3] }}
          className="will-change-transform motion-reduce:transform-none!"
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
