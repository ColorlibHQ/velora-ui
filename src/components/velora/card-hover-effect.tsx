"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface HoverCardItem {
  /** Card heading */
  title: string;
  /** One or two sentences under the title */
  description: string;
  /** Link target; the whole card is the link */
  href: string;
  /** Optional leading icon, e.g. a lucide-react element */
  icon?: React.ReactNode;
}

interface HoverCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The link cards, in order */
  items: HoverCardItem[];
  /** Column count once the container is wide enough (container queries) */
  columns?: 1 | 2 | 3 | 4;
}

const COLUMNS = {
  1: "",
  2: "@lg:grid-cols-2",
  3: "@lg:grid-cols-2 @3xl:grid-cols-3",
  4: "@lg:grid-cols-2 @3xl:grid-cols-4",
};

/**
 * Grid of link cards with a soft brand highlight that glides to whichever
 * card is hovered or focused. Columns respond to the container's width, not
 * the viewport's, so it fits sidebars and full-width sections alike.
 */
export function HoverCards({
  items,
  columns = 3,
  className,
  onMouseLeave,
  onBlur,
  ...props
}: HoverCardsProps) {
  const id = useId();
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  return (
    <div
      data-slot="hover-cards"
      className={cn("@container w-full", className)}
      onMouseLeave={(event) => {
        onMouseLeave?.(event);
        setActive(null);
      }}
      onBlur={(event) => {
        onBlur?.(event);
        if (!event.currentTarget.contains(event.relatedTarget)) setActive(null);
      }}
      {...props}
    >
      <ul className={cn("grid", COLUMNS[columns])}>
        {items.map((item, index) => (
          <li key={item.href + item.title} className="relative p-2">
            <AnimatePresence>
              {active === index && (
                <motion.span
                  aria-hidden
                  layoutId={`hover-cards-${id}`}
                  className="absolute inset-0 block rounded-[1.5rem] bg-linear-to-br from-brand-from/20 via-brand-via/10 to-brand-to/20 shadow-lg shadow-brand/10 ring-1 ring-brand/25"
                  initial={reducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: reducedMotion ? 0 : 0.2 } }}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : { type: "spring", bounce: 0.18, duration: 0.45 }
                  }
                />
              )}
            </AnimatePresence>
            <a
              href={item.href}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              className="group/hover-card relative z-10 flex h-full flex-col gap-4 rounded-2xl border bg-card/60 p-6 shadow-xs transition-colors hover:border-brand/25 focus-visible:border-brand/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex items-start justify-between gap-4">
                {item.icon ? (
                  <span
                    aria-hidden
                    className="flex size-10 items-center justify-center rounded-xl border bg-muted text-muted-foreground transition-colors group-hover/hover-card:text-primary group-focus-visible/hover-card:text-primary [&_svg]:size-5"
                  >
                    {item.icon}
                  </span>
                ) : (
                  <span className="font-semibold tracking-tight">{item.title}</span>
                )}
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4 shrink-0 text-muted-foreground/60 transition group-hover/hover-card:text-foreground group-focus-visible/hover-card:text-foreground motion-safe:group-hover/hover-card:translate-x-0.5 motion-safe:group-hover/hover-card:-translate-y-0.5"
                >
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </span>
              <span className="space-y-1.5">
                {item.icon && (
                  <span className="block font-semibold tracking-tight">{item.title}</span>
                )}
                <span className="block text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
