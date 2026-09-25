"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

interface PointerHighlightProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The phrase to frame */
  children: React.ReactNode;
  /** Classes for the drawn outline (border colour, width, radius, fill) */
  rectangleClassName?: string;
  /** Classes for the pointer icon (colour, size) */
  pointerClassName?: string;
  /** Play only the first time the phrase enters the viewport */
  once?: boolean;
}

/**
 * Frames an inline phrase when it scrolls into view: an outline draws out
 * from the top-left corner, then a small pointer glides in to rest on its
 * bottom-right corner, like a selection someone just made. The phrase
 * becomes an inline-block, so keep it short enough not to wrap.
 */
export function PointerHighlight({
  children,
  rectangleClassName,
  pointerClassName,
  once = true,
  className,
  ...props
}: PointerHighlightProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, amount: 0.6 });
  const reducedMotion = useReducedMotion();
  const instant = { duration: 0 };

  return (
    <span
      ref={ref}
      data-slot="pointer-highlight"
      className={cn("relative inline-block", className)}
      {...props}
    >
      {children}
      {/* Reduced motion: the !important classes beat motion's inline styles,
          so the finished frame shows from the first paint. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-x-[0.2em] -inset-y-[0.06em]"
      >
        <motion.span
          initial={{ width: "0%", height: "0%", opacity: 0 }}
          animate={
            inView
              ? { width: "100%", height: "100%", opacity: 1 }
              : { width: "0%", height: "0%", opacity: 0 }
          }
          transition={
            reducedMotion
              ? instant
              : { duration: 0.7, ease: EASE, opacity: { duration: 0.1 } }
          }
          className={cn(
            "absolute top-0 left-0 block border-2 border-primary bg-primary/5 motion-reduce:size-full! motion-reduce:opacity-100!",
            rectangleClassName
          )}
        />
        <motion.svg
          viewBox="0 0 20 20"
          initial={{ opacity: 0, x: 18, y: 18 }}
          animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 18, y: 18 }}
          transition={
            reducedMotion ? instant : { duration: 0.5, ease: EASE, delay: inView ? 0.55 : 0 }
          }
          className={cn(
            "absolute top-full left-full -mt-1 -ml-1 size-[clamp(1rem,0.45em,1.75rem)] text-primary drop-shadow-sm motion-reduce:transform-none! motion-reduce:opacity-100!",
            pointerClassName
          )}
        >
          <path
            d="M2.5 2.5 17 8.4l-6.4 2.2L8.4 17Z"
            fill="currentColor"
            stroke="var(--background)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </motion.svg>
      </span>
    </span>
  );
}
