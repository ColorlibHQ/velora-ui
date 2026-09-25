"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useInView, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const noopSubscribe = () => () => {};

interface TerminalProps {
  /** Lines to type. Prefix with "$ " to render a prompt-colored command. */
  lines: string[];
  title?: string;
  /** ms per character */
  speed?: number;
  className?: string;
}

/**
 * A terminal window that types its lines when scrolled into view.
 */
export function Terminal({
  lines,
  title = "bash",
  speed = 18,
  className,
}: TerminalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  // useReducedMotion() already knows the preference on the first client
  // render, but the server can't — keep the animated markup until hydrated.
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const reducedMotion = useReducedMotion() === true && hydrated;
  const [progress, setProgress] = useState({ line: 0, char: 0 });

  const done =
    reducedMotion ||
    (progress.line >= lines.length - 1 &&
      progress.char >= (lines[lines.length - 1]?.length ?? 0));

  useEffect(() => {
    if (!inView || reducedMotion || done) return;
    const current = lines[progress.line] ?? "";
    const timeout = setTimeout(
      () =>
        setProgress((p) =>
          p.char < current.length
            ? { ...p, char: p.char + 1 }
            : { line: p.line + 1, char: 0 }
        ),
      progress.char === 0 ? 260 : speed
    );
    return () => clearTimeout(timeout);
  }, [inView, reducedMotion, done, progress, lines, speed]);

  const visibleLines = reducedMotion
    ? lines
    : lines
        .slice(0, progress.line + 1)
        .map((l, i) => (i === progress.line ? l.slice(0, progress.char) : l));

  return (
    <div
      ref={ref}
      data-slot="terminal"
      className={cn(
        "relative w-full overflow-hidden rounded-xl border bg-neutral-950 font-mono text-sm shadow-xl",
        className
      )}
    >
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-red-500/80" />
          <span className="size-3 rounded-full bg-yellow-500/80" />
          <span className="size-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-neutral-500">{title}</span>
      </div>
      <div className="sr-only">
        {lines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
      <div aria-hidden className="min-h-32 space-y-1.5 p-4 text-neutral-300">
        {visibleLines.map((line, i) => {
          const isCommand = lines[i]?.startsWith("$ ");
          const isLast = i === visibleLines.length - 1;
          return (
            <p key={i} className="leading-relaxed">
              {isCommand ? (
                <>
                  <span className="text-emerald-400">$ </span>
                  <span className="text-neutral-100">{line.slice(2)}</span>
                </>
              ) : (
                <span className="text-neutral-400">{line}</span>
              )}
              {isLast && !done && (
                <span className="text-neutral-100 motion-safe:animate-pulse">▍</span>
              )}
            </p>
          );
        })}
      </div>
    </div>
  );
}
