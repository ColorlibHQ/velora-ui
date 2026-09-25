"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

import { cn } from "@/lib/utils";

interface WobbleCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"> {
  /** Furthest the card shifts toward the pointer, in px */
  strength?: number;
  /** How much further the content moves than the card (parallax), as a multiple */
  depth?: number;
  /** Show the film-grain texture */
  grain?: boolean;
  /** Classes for the inner content wrapper (padding lives here) */
  contentClassName?: string;
}

const NOISE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const SPRING = { stiffness: 180, damping: 20, mass: 0.6 };

/**
 * A large coloured card that drifts a few pixels toward the pointer while its
 * content drifts a little further, then springs back on leave. Colour it with
 * `className` (defaults to the brand colour); keyboard focus inside gives it a
 * gentle lift.
 */
export function WobbleCard({
  strength = 10,
  depth = 0.6,
  grain = true,
  contentClassName,
  className,
  children,
  ...props
}: WobbleCardProps) {
  const reducedMotion = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, SPRING);
  const y = useSpring(py, SPRING);
  const cx = useTransform(x, (v) => v * depth);
  const cy = useTransform(y, (v) => v * depth);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || e.pointerType == "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2 * strength);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2 * strength);
  };
  const leave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      {...props}
      data-slot="wobble-card"
      onPointerMove={(e) => {
        move(e);
        props.onPointerMove?.(e);
      }}
      onPointerLeave={(e) => {
        leave();
        props.onPointerLeave?.(e);
      }}
      style={{ x, y, ...props.style }}
      className={cn(
        "relative isolate overflow-hidden rounded-3xl bg-brand text-brand-foreground shadow-sm",
        "has-[:focus-visible]:shadow-xl motion-safe:transition-[translate,box-shadow] motion-safe:duration-300 motion-safe:has-[:focus-visible]:-translate-y-1",
        className
      )}
    >
      <motion.div style={{ x: cx, y: cy }} className={cn("relative h-full p-8 sm:p-10", contentClassName)}>
        {children}
      </motion.div>
      {grain && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
          style={{ backgroundImage: NOISE }}
        />
      )}
    </motion.div>
  );
}
