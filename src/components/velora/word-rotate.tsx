"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  /** Seconds each word is held */
  interval?: number;
  className?: string;
}

/**
 * Swaps a single word on a vertical roll. Lighter than Flip Words — no blur,
 * no spring — for headlines that need the effect to stay quiet.
 */
export function WordRotate({
  words,
  interval = 2.5,
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  // Held while hovered or focused so the word can be read (WCAG 2.2.2).
  const paused = useRef(false);

  useEffect(() => {
    // Reduced motion: no rotation at all, the first word stays put.
    if (words.length < 2 || reducedMotion !== false) return;
    const id = window.setInterval(() => {
      if (paused.current || document.hidden) return;
      setIndex((i) => (i + 1) % words.length);
    }, interval * 1000);
    return () => window.clearInterval(id);
  }, [words.length, interval, reducedMotion]);

  const pause = () => {
    paused.current = true;
  };
  const resume = () => {
    paused.current = false;
  };

  return (
    <span
      data-slot="word-rotate"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      className="inline-grid overflow-hidden align-bottom"
    >
      <span className="sr-only">{words.join(", ")}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          aria-hidden
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{
            duration: reducedMotion ? 0 : 0.32,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={cn("col-start-1 row-start-1", className)}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
