"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface FlipWordsProps {
  words: string[];
  /** ms each word stays on screen */
  duration?: number;
  className?: string;
}

/**
 * Cycles through words with a blur-flip transition.
 */
export function FlipWords({ words, duration = 2600, className }: FlipWordsProps) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  // Paused while hovered or focused (WCAG 2.2.2)
  const [paused, setPaused] = useState(false);

  // Reduced motion: no cycling, words[0] stays on screen
  useEffect(() => {
    if (reducedMotion || paused) return;
    const interval = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      duration
    );
    return () => clearInterval(interval);
  }, [words.length, duration, reducedMotion, paused]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  // The invisible longest word reserves the cell size so flipping
  // between words never shifts surrounding layout.
  return (
    <span
      data-slot="flip-words"
      className={cn("inline-grid text-left align-bottom", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {longest}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
          transition={{ type: "spring", stiffness: 240, damping: 26 }}
          aria-hidden
          className="col-start-1 row-start-1 inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
