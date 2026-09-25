"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const noopSubscribe = () => () => {};

interface TypewriterProps extends React.HTMLAttributes<HTMLSpanElement> {
  words: string[];
  /** ms per typed character */
  typeSpeed?: number;
  /** ms per deleted character */
  deleteSpeed?: number;
  /** ms to hold a completed word */
  holdTime?: number;
  loop?: boolean;
  cursor?: boolean;
}

export function Typewriter({
  words,
  typeSpeed = 70,
  deleteSpeed = 40,
  holdTime = 1800,
  loop = true,
  cursor = true,
  className,
  ...props
}: TypewriterProps) {
  // useReducedMotion() already knows the preference on the first client
  // render, but the server can't — keep the animated markup until hydrated.
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const reducedMotion = useReducedMotion() === true && hydrated;
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  // Paused while hovered or focused (WCAG 2.2.2)
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reducedMotion || paused || words.length === 0) return;
    const word = words[wordIndex % words.length];

    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && text.length < word.length) {
      timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), typeSpeed);
    } else if (!deleting && text.length === word.length) {
      const isLast = wordIndex === words.length - 1;
      if (loop || !isLast) {
        timeout = setTimeout(() => setDeleting(true), holdTime);
      }
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(word.slice(0, text.length - 1)), deleteSpeed);
    } else if (deleting) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }, deleteSpeed);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, holdTime, loop, reducedMotion, paused]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  // Both spans share one grid cell: the invisible longest word reserves
  // the final size, so typing never shifts surrounding layout.
  return (
    <span
      data-slot="typewriter"
      className={cn("inline-grid text-left", className)}
      {...props}
      onMouseEnter={(e) => {
        setPaused(true);
        props.onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setPaused(false);
        props.onMouseLeave?.(e);
      }}
      onFocus={(e) => {
        setPaused(true);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setPaused(false);
        props.onBlur?.(e);
      }}
    >
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {longest}
        {cursor && <span className="font-light motion-reduce:hidden">|</span>}
      </span>
      <span aria-hidden className="col-start-1 row-start-1">
        {/* Reduced motion: the first word, static, without a cursor */}
        {reducedMotion ? words[0] : text}
        {cursor && (
          <span className="font-light motion-safe:animate-pulse motion-reduce:hidden">
            |
          </span>
        )}
      </span>
    </span>
  );
}
