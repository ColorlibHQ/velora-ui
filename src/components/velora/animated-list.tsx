"use client";

import React, { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const noopSubscribe = () => () => {};

interface AnimatedListProps {
  children: React.ReactNode;
  className?: string;
  /** ms between items appearing */
  delay?: number;
}

/**
 * Reveals children one by one, newest on top, then loops.
 * Wrap in a fixed-height container with a bottom mask for a feed effect.
 * The loop pauses while hovered or focused; under reduced motion all items
 * are shown at once.
 */
export function AnimatedList({
  children,
  className,
  delay = 2000,
}: AnimatedListProps) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  // useReducedMotion() already knows the preference on the first client
  // render, but the server can't — keep the animated markup until hydrated.
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const reducedMotion = useReducedMotion() === true && hydrated;
  const items = useMemo(() => React.Children.toArray(children), [children]);
  const paused = hovered || focused;

  useEffect(() => {
    if (reducedMotion || paused) return;
    const interval = setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      delay
    );
    return () => clearInterval(interval);
  }, [items.length, delay, reducedMotion, paused]);

  const visible = useMemo(
    () => (reducedMotion ? items : items.slice(0, index + 1)).slice().reverse(),
    [items, index, reducedMotion]
  );

  return (
    <div
      data-slot="animated-list"
      className={cn("flex flex-col gap-3", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
    >
      <AnimatePresence initial={false}>
        {visible.map((item) => (
          <motion.div
            key={(item as React.ReactElement).key}
            layout={!reducedMotion}
            initial={reducedMotion ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, originY: 0 }}
            exit={reducedMotion ? undefined : { scale: 0, opacity: 0 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 350, damping: 40 }
            }
            className="w-full"
          >
            {item}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
