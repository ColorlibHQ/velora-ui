"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export interface LayoutGridItem {
  /** Tile title — the tile's accessible name and the expanded heading */
  title: string;
  /** Cover image URL */
  src: string;
  /** Short line under the title on the tile */
  subtitle?: string;
  /** Rich content shown once the tile is expanded */
  content: React.ReactNode;
  /** Grid placement for the tile, e.g. "md:col-span-2" */
  className?: string;
}

interface LayoutGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tiles, in reading order */
  items: LayoutGridItem[];
}

/**
 * Bento grid of image tiles. Clicking a tile morphs it into a panel that
 * fills the grid, with the other tiles dimmed behind it; Escape, Close or
 * a click outside collapses it and returns focus to the tile. The root is
 * the grid: set columns and row height with className (default 3 × 11rem).
 */
export function LayoutGrid({ items, className, ...props }: LayoutGridProps) {
  const id = useId();
  const [active, setActive] = useState<number | null>(null);
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);
  const panel = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const item = active === null ? null : items[active];

  useEffect(() => {
    if (active === null) return;
    const trigger = tiles.current[active];
    const el = panel.current;
    el?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    // Tiles are inert while open, so a click on one can only be the opening click
    const onClick = ({ target }: MouseEvent) =>
      ![el, ...tiles.current].some((node) => node?.contains(target as Node)) && setActive(null);
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      // Return focus to the tile unless a click outside already moved it elsewhere
      const focused = document.activeElement;
      if (!focused || focused === document.body || el?.contains(focused)) {
        trigger?.focus({ preventScroll: true });
      }
    };
  }, [active]);

  return (
    <MotionConfig
      transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 280, damping: 32 }}
    >
      <div
        {...props}
        data-slot="layout-grid"
        className={cn("relative grid w-full auto-rows-44 grid-cols-2 gap-3 md:grid-cols-3", className)}
      >
        {items.map((tile, i) => (
          <motion.button
            key={i}
            ref={(el) => {
              tiles.current[i] = el;
            }}
            type="button"
            layoutId={`${id}-${i}`}
            style={{ borderRadius: 16 }}
            aria-expanded={active === i}
            inert={active !== null || undefined}
            onClick={() => setActive(i)}
            className={cn(
              "group/tile relative flex flex-col justify-end overflow-hidden bg-muted p-4 text-left text-white transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none",
              active !== null && "opacity-40",
              tile.className
            )}
          >
            <motion.img
              layoutId={`${id}-${i}-img`}
              src={tile.src}
              alt=""
              loading="lazy"
              className="absolute inset-0 size-full object-cover transition-transform duration-500 motion-safe:group-hover/tile:scale-105"
            />
            <span aria-hidden className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
            <span className="relative font-semibold leading-tight">{tile.title}</span>
            {tile.subtitle && (
              <span className="relative mt-0.5 text-sm text-white/75">{tile.subtitle}</span>
            )}
          </motion.button>
        ))}

        <AnimatePresence>
          {item && (
            <motion.div
              key={active}
              ref={panel}
              layoutId={`${id}-${active}`}
              style={{ borderRadius: 20 }}
              role="region"
              aria-labelledby={`${id}-heading`}
              tabIndex={-1}
              className="absolute inset-2 z-10 grid overflow-hidden border bg-card text-card-foreground shadow-2xl outline-none sm:inset-6 max-md:grid-rows-[8rem_minmax(0,1fr)] md:grid-cols-[2fr_3fr] md:grid-rows-1"
            >
              <div className="relative overflow-hidden">
                <motion.img
                  layoutId={`${id}-${active}-img`}
                  src={item.src}
                  alt=""
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: reducedMotion ? 0 : 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0 } }}
                className="overflow-y-auto p-5 sm:p-7"
              >
                <h3 id={`${id}-heading`} className="pr-10 text-xl font-semibold tracking-tight">
                  {item.title}
                </h3>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {item.content}
                </div>
              </motion.div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setActive(null)}
                className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="size-4">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
