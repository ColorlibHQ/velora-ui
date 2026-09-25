"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** Optional image URL; falls back to the person's initials */
  src?: string;
}

interface AnimatedTestimonialsProps {
  testimonials: Testimonial[];
  /** Seconds between slides; 0 disables autoplay */
  interval?: number;
  className?: string;
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

/**
 * Testimonial carousel that crossfades portraits behind the quote.
 * Autoplay pauses on hover and focus, has a pause button, and is off under
 * `prefers-reduced-motion`; the controls still work.
 */
export function AnimatedTestimonials({
  testimonials,
  interval = 6,
  className,
}: AnimatedTestimonialsProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reducedMotion = useReducedMotion();
  const count = testimonials.length;
  const autoplay = Boolean(interval) && count > 1;

  useEffect(() => {
    if (!autoplay || reducedMotion || paused || hovered || focused) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % count),
      interval * 1000
    );
    return () => window.clearInterval(id);
  }, [autoplay, interval, count, reducedMotion, paused, hovered, focused]);

  if (!count) return null;
  const active = testimonials[index];
  const duration = reducedMotion ? 0 : 0.35;

  return (
    <div
      data-slot="animated-testimonials"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setFocused(false);
        }
      }}
      className={cn("flex flex-col gap-6 sm:flex-row sm:items-center", className)}
    >
      <div className="relative size-24 shrink-0 sm:size-32">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.92, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.92, rotate: 4 }}
            transition={{ duration, ease: "easeOut" }}
            className="absolute inset-0 overflow-hidden rounded-2xl border bg-muted"
          >
            {active.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={active.src}
                alt={active.name}
                className="size-full object-cover"
              />
            ) : (
              <span className="flex size-full items-center justify-center bg-gradient-to-br from-brand-from to-brand-to text-2xl font-semibold text-brand-foreground">
                {initials(active.name)}
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="min-w-0 flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration, ease: "easeOut" }}
          >
            <p className="text-lg leading-relaxed text-balance">
              &ldquo;{active.quote}&rdquo;
            </p>
            <footer className="mt-3 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{active.name}</span>
              {" — "}
              {active.role}
            </footer>
          </motion.blockquote>
        </AnimatePresence>

        {count > 1 && (
          <div className="mt-4 flex items-center">
            {autoplay && (
              // Hidden by CSS under reduced motion, where autoplay is off.
              <button
                type="button"
                onClick={() => setPaused((value) => !value)}
                aria-label={paused ? "Play testimonials" : "Pause testimonials"}
                className="mr-2 grid size-6 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:hidden"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="currentColor"
                  aria-hidden
                >
                  {paused ? (
                    <path d="M3 1.5v9l7.5-4.5z" />
                  ) : (
                    <path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" />
                  )}
                </svg>
              </button>
            )}
            {/* Each 24px button is the hit area; the pill inside is visual. */}
            {testimonials.map((testimonial, i) => (
              <button
                key={testimonial.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial from ${testimonial.name}`}
                aria-current={i === index}
                className="group grid h-6 min-w-6 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span
                  className={cn(
                    "h-1.5 rounded-full transition-all motion-reduce:transition-none",
                    i === index
                      ? "w-6 bg-brand"
                      : "w-1.5 bg-muted-foreground/30 group-hover:bg-muted-foreground/60"
                  )}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
