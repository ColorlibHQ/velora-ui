"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds before the animation starts */
  delay?: number;
  duration?: number;
  /** Direction the element enters from */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Distance travelled in px */
  offset?: number;
  /** Animate only the first time it enters the viewport */
  once?: boolean;
  /** Start animating immediately instead of waiting to scroll into view */
  inView?: boolean;
}

const axis = { up: "y", down: "y", left: "x", right: "x" } as const;
const sign = { up: 1, down: -1, left: 1, right: -1 } as const;

/**
 * Fades and un-blurs its children in as they scroll into view.
 *
 * Content starts invisible until JavaScript runs, so don't wrap your page's
 * largest above-the-fold element (usually the hero headline or intro): it
 * delays Largest Contentful Paint. Fade the badges, buttons and visuals
 * around it instead.
 */
export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.5,
  direction = "up",
  offset = 16,
  once = true,
}: BlurFadeProps) {
  const reducedMotion = useReducedMotion();

  const hidden =
    direction === "none"
      ? { opacity: 0, filter: "blur(6px)" }
      : {
          opacity: 0,
          filter: "blur(6px)",
          [axis[direction]]: sign[direction] * offset,
        };

  // Keep `initial` identical on server and client (the server can't know the
  // motion preference — branching it mismatches on hydration). Under reduced
  // motion the reveal still happens, just instantly.
  return (
    <motion.div
      data-slot="blur-fade"
      className={cn(className)}
      initial={hidden}
      whileInView={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0 }}
      viewport={{ once, margin: "0px 0px -10% 0px" }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : { delay, duration, ease: [0.21, 0.47, 0.32, 0.98] }
      }
    >
      {children}
    </motion.div>
  );
}
