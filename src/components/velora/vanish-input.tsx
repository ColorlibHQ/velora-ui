"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface VanishInputProps {
  /** Cycled through while the field is empty */
  placeholders: string[];
  /** Seconds each placeholder is held */
  interval?: number;
  /** Accessible name for the input */
  label?: string;
  onSubmit?: (value: string) => void;
  className?: string;
}

/**
 * Search or prompt field whose placeholder cycles while empty. Built on a real
 * `form` and `input`, so Enter, autofill and screen readers behave normally.
 * The cycling pauses on hover and focus, and stays on the first placeholder
 * under `prefers-reduced-motion`.
 */
export function VanishInput({
  placeholders,
  interval = 3,
  label = "Search",
  onSubmit,
  className,
}: VanishInputProps) {
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (placeholders.length < 2 || value || reducedMotion || hovered || focused)
      return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % placeholders.length),
      interval * 1000
    );
    return () => window.clearInterval(id);
  }, [placeholders.length, interval, value, reducedMotion, hovered, focused]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!value.trim()) return;
    onSubmit?.(value);
    setValue("");
    // Clearing disables the submit button, so keep focus in the field.
    inputRef.current?.focus();
  };

  return (
    <form
      onSubmit={handleSubmit}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setFocused(false);
        }
      }}
      data-slot="vanish-input"
      className={cn(
        "relative flex h-12 w-full max-w-lg items-center rounded-full border bg-background pr-1.5 pl-5 transition-shadow focus-within:ring-2 focus-within:ring-ring",
        className
      )}
    >
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-label={label}
        className="peer h-full flex-1 bg-transparent text-sm outline-none"
      />

      {/* Visual only — the input keeps its own accessible label. */}
      {!value && (
        <span
          aria-hidden
          className="pointer-events-none absolute left-5 flex h-full items-center overflow-hidden text-sm text-muted-foreground"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: reducedMotion ? 0 : 0.25 }}
              className="block"
            >
              {placeholders[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      )}

      <button
        type="submit"
        aria-label="Submit"
        disabled={!value.trim()}
        className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M3 8h9M8.5 4l4 4-4 4" />
        </svg>
      </button>
    </form>
  );
}
