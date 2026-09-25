"use client";

import { useEffect, useId, useState, type RefObject } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface AnimatedBeamProps {
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  /** Vertical bend of the beam in px (positive bends up) */
  curvature?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  className?: string;
}

/**
 * Animated gradient beam connecting two elements inside a shared
 * `relative` container. Pass refs to the container and both endpoints.
 */
export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 5,
  delay = 0,
  pathWidth = 2,
  pathOpacity = 0.15,
  gradientStartColor = "#8b5cf6",
  gradientStopColor = "#22d3ee",
  className,
}: AnimatedBeamProps) {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [size, setSize] = useState({ width: 0, height: 0 });
  const reducedMotion = useReducedMotion();

  const gradientCoordinates = reverse
    ? { x1: ["90%", "-10%"], x2: ["100%", "0%"] }
    : { x1: ["10%", "110%"], x2: ["0%", "100%"] };

  useEffect(() => {
    const update = () => {
      const container = containerRef.current;
      const from = fromRef.current;
      const to = toRef.current;
      if (!container || !from || !to) return;

      const containerRect = container.getBoundingClientRect();
      const rectA = from.getBoundingClientRect();
      const rectB = to.getBoundingClientRect();

      const startX = rectA.left - containerRect.left + rectA.width / 2;
      const startY = rectA.top - containerRect.top + rectA.height / 2;
      const endX = rectB.left - containerRect.left + rectB.width / 2;
      const endY = rectB.top - containerRect.top + rectB.height / 2;

      setSize({ width: containerRect.width, height: containerRect.height });
      setPathD(
        `M ${startX},${startY} Q ${(startX + endX) / 2},${
          (startY + endY) / 2 - curvature
        } ${endX},${endY}`
      );
    };

    // ResizeObserver fires once on observe, which also draws the initial path
    const observer = new ResizeObserver(update);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [containerRef, fromRef, toRef, curvature]);

  return (
    <svg
      aria-hidden
      data-slot="animated-beam"
      fill="none"
      width={size.width}
      height={size.height}
      viewBox={`0 0 ${size.width} ${size.height}`}
      className={cn(
        "pointer-events-none absolute top-0 left-0 transform-gpu",
        className
      )}
    >
      <path
        d={pathD}
        stroke="currentColor"
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
        className="text-border"
      />
      <path
        d={pathD}
        stroke={`url(#${id})`}
        strokeWidth={pathWidth}
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
          animate={
            reducedMotion
              ? // Still beam spanning the whole path
                {
                  x1: reverse ? "100%" : "0%",
                  x2: reverse ? "0%" : "100%",
                  y1: "0%",
                  y2: "0%",
                }
              : {
                  x1: gradientCoordinates.x1,
                  x2: gradientCoordinates.x2,
                  y1: ["0%", "0%"],
                  y2: ["0%", "0%"],
                }
          }
          transition={
            reducedMotion
              ? { duration: 0 }
              : {
                  delay,
                  duration,
                  ease: [0.16, 1, 0.3, 1],
                  repeat: Infinity,
                }
          }
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}
