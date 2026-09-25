"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type ButtonState = "idle" | "loading" | "success" | "error";

interface StatefulButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  /** Click handler; return a Promise to show loading, then success or error */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => unknown;
  /** Milliseconds the success or error state stays before returning to idle */
  resetAfter?: number;
  /** Shown beside the check and announced when the promise resolves */
  successText?: string;
  /** Shown beside the cross and announced when the promise rejects */
  errorText?: string;
}

// Every layer shares one grid cell, so the widest label sets a stable width.
const layer =
  "relative col-start-1 row-start-1 flex items-center justify-center gap-2 transition-[opacity,scale,visibility] duration-200 motion-reduce:transition-none";
const hidden = "invisible scale-75 opacity-0";

/**
 * A button for async actions. When `onClick` returns a Promise the button
 * shrinks to a spinner, then shows a check (or a cross if it rejects) and
 * returns to idle after `resetAfter` ms. Its layout width never changes.
 * Recolour it with `[--surface:var(--color-brand)]`; style states with
 * `data-[state=success]:` and friends.
 */
export function StatefulButton({
  onClick,
  resetAfter = 2000,
  successText = "Done",
  errorText = "Failed",
  className,
  children,
  type = "button",
  ...props
}: StatefulButtonProps) {
  const [state, setState] = useState<ButtonState>("idle");
  const [height, setHeight] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const pending = useRef(false);
  const busy = state === "loading";

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // aria-disabled (not disabled) keeps focus on the button while pending.
    if (pending.current) return event.preventDefault();
    const result = onClick?.(event);
    if (!(result instanceof Promise)) return;
    pending.current = true;
    clearTimeout(timer.current);
    setHeight(event.currentTarget.offsetHeight);
    setState("loading");
    let next: ButtonState = "success";
    try {
      await result;
    } catch {
      next = "error";
    }
    pending.current = false;
    setState(next);
    timer.current = setTimeout(() => setState("idle"), resetAfter);
  };

  return (
    <>
      <button
        type={type}
        {...props}
        data-state={state}
        aria-busy={busy || undefined}
        aria-disabled={busy ? true : props["aria-disabled"]}
        onClick={handleClick}
        className={cn(
          "group/stateful-button relative inline-grid h-10 cursor-pointer rounded-full px-5 text-sm font-medium text-primary-foreground outline-none select-none [--surface:var(--color-primary)] disabled:cursor-not-allowed disabled:opacity-50 aria-busy:cursor-progress data-[state=error]:text-white data-[state=error]:[--surface:var(--color-destructive)]",
          className
        )}
      >
        {/* The visible pill: full width, or a circle while loading */}
        <span
          aria-hidden
          className="absolute inset-0 mx-auto rounded-[inherit] bg-(--surface) transition-[width,background-color] duration-300 ease-out group-hover/stateful-button:opacity-90 group-focus-visible/stateful-button:ring-2 group-focus-visible/stateful-button:ring-ring group-focus-visible/stateful-button:ring-offset-2 group-focus-visible/stateful-button:ring-offset-background motion-reduce:w-full! motion-reduce:transition-colors"
          style={{ width: busy && height ? height : "100%" }}
        />
        {/* Stays in the accessibility tree so the button's name never changes */}
        <span className={cn(layer, state !== "idle" && "scale-75 opacity-0")}>
          {children}
        </span>
        <span aria-hidden className={cn(layer, !busy && hidden)}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="size-4 motion-safe:animate-spin"
          >
            <circle cx="12" cy="12" r="9" opacity="0.3" />
            <path d="M21 12a9 9 0 0 0-9-9" />
          </svg>
        </span>
        <span aria-hidden className={cn(layer, state !== "success" && hidden)}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            {/* Draws itself in via the dash offset */}
            <path
              d="m5 12.5 4.5 4.5L19 7.5"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={state === "success" ? 0 : 1}
              className="transition-[stroke-dashoffset] delay-100 duration-300 motion-reduce:transition-none"
            />
          </svg>
          {successText}
        </span>
        <span aria-hidden className={cn(layer, state !== "error" && hidden)}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="size-4"
          >
            <path d="M7 7l10 10M17 7 7 17" />
          </svg>
          {errorText}
        </span>
      </button>
      <span role="status" className="sr-only">
        {state === "success" ? successText : state === "error" ? errorText : ""}
      </span>
    </>
  );
}
