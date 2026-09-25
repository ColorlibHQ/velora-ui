"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface HyperTextProps {
  children: string;
  /** Milliseconds between scramble frames */
  frame?: number;
  /** Scramble on hover instead of on mount */
  onHover?: boolean;
  className?: string;
}

/**
 * Scrambles through random letters and resolves into the real text, one
 * character at a time. Renders the final text on the server.
 */
export function HyperText({
  children,
  frame = 40,
  onHover = false,
  className,
}: HyperTextProps) {
  // The scrambled frame, tagged with the text it was built from; null (or a
  // stale tag after `children` changes) means "show the real text".
  const [scrambled, setScrambled] = useState<{ of: string; text: string } | null>(
    null
  );
  const timer = useRef<number | undefined>(undefined);

  const scramble = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    window.clearInterval(timer.current);
    let tick = 0;
    timer.current = window.setInterval(() => {
      tick += 1;
      setScrambled({
        of: children,
        text: children
          .split("")
          .map((char, i) => {
            if (char === " ") return char;
            // Each character locks in once the wave has passed it.
            if (i < tick / 2) return children[i];
            return ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
          })
          .join(""),
      });
      if (tick / 2 >= children.length) {
        window.clearInterval(timer.current);
        setScrambled(null);
      }
    }, frame);
  };

  useEffect(() => {
    if (!onHover) scramble();
    return () => window.clearInterval(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, onHover]);

  return (
    <span
      data-slot="hyper-text"
      onMouseEnter={onHover ? scramble : undefined}
      className={cn("font-mono tabular-nums", className)}
    >
      <span className="sr-only">{children}</span>
      <span aria-hidden>
        {scrambled?.of === children ? scrambled.text : children}
      </span>
    </span>
  );
}
