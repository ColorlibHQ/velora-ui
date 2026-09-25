"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface CardStackProps {
  /** Each entry becomes one card; the first is on top */
  items: { id: string | number; content: React.ReactNode }[];
  /** Seconds between automatic shuffles; 0 disables */
  interval?: number;
  /** Vertical offset per card, in px */
  offset?: number;
  className?: string;
}

/**
 * Deck of cards that shuffles the top card to the back. Good for rotating
 * quotes or tips in a fixed-height slot.
 */
export function CardStack({
  items,
  interval = 4,
  offset = 12,
  className,
}: CardStackProps) {
  // Rotation is a single counter, so card order stays derived from props —
  // no copy of `items` in state to keep in sync.
  const [shift, setShift] = useState(0);
  const reducedMotion = useReducedMotion();
  const count = items.length;
  // Held while hovered or focused so the top card can be read (WCAG 2.2.2).
  const paused = useRef(false);

  useEffect(() => {
    // Reduced motion: no auto-shuffle, the first card stays on top.
    if (!interval || count < 2 || reducedMotion !== false) return;
    const id = window.setInterval(() => {
      if (paused.current || document.hidden) return;
      setShift((value) => value + 1);
    }, interval * 1000);
    return () => window.clearInterval(id);
  }, [interval, count, reducedMotion]);

  const pause = () => {
    paused.current = true;
  };
  const resume = () => {
    paused.current = false;
  };

  return (
    <div
      data-slot="card-stack"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      className={cn("relative h-56 w-full max-w-sm", className)}
    >
      {items.map((card, i) => {
        // Where this card currently sits in the deck, 0 = on top.
        const depth = (i - (shift % count) + count) % count;
        return (
          <motion.div
            key={card.id}
            initial={false}
            animate={{
              top: depth * -offset,
              scale: 1 - depth * 0.05,
              zIndex: count - depth,
            }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 260, damping: 26 }
            }
            className="absolute inset-x-0 flex h-56 flex-col justify-between rounded-2xl border bg-card p-5 shadow-xl shadow-foreground/5"
          >
            {card.content}
          </motion.div>
        );
      })}
    </div>
  );
}
