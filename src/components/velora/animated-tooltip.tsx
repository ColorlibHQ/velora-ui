"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface TooltipItem {
  name: string;
  role?: string;
}

interface AnimatedTooltipProps {
  items: TooltipItem[];
  className?: string;
}

const gradients = [
  "from-violet-500 to-fuchsia-500",
  "from-cyan-500 to-blue-500",
  "from-amber-500 to-orange-600",
  "from-emerald-500 to-teal-600",
  "from-pink-500 to-rose-500",
  "from-indigo-500 to-purple-600",
];

/**
 * Avatar row with springy name tooltips on hover and keyboard focus.
 */
export function AnimatedTooltip({ items, className }: AnimatedTooltipProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  return (
    <div data-slot="animated-tooltip" className={cn("flex -space-x-3", className)}>
      {items.map((item, i) => {
        const initials = item.name
          .split(" ")
          .map((w) => w[0])
          .slice(0, 2)
          .join("");
        return (
          <div
            key={item.name}
            className="group/tooltip relative"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <AnimatePresence>
              {hovered === i && (
                <motion.div
                  aria-hidden
                  initial={{ opacity: 0, y: 12, scale: 0.6 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.6 }}
                  transition={
                    reducedMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 260, damping: 14 }
                  }
                  className="pointer-events-none absolute -top-14 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center whitespace-nowrap rounded-lg border bg-popover px-3 py-1.5 shadow-xl"
                >
                  <span className="text-xs font-semibold text-popover-foreground">
                    {item.name}
                  </span>
                  {item.role && (
                    <span className="text-[10px] text-muted-foreground">
                      {item.role}
                    </span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            <span
              tabIndex={0}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setHovered(null);
              }}
              className={cn(
                "relative flex size-11 cursor-default items-center justify-center rounded-full bg-gradient-to-br text-xs font-semibold text-white ring-2 ring-background transition-transform duration-200 group-hover/tooltip:z-30 group-hover/tooltip:scale-110 focus-visible:z-30 focus-visible:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none",
                gradients[i % gradients.length]
              )}
            >
              <span aria-hidden>{initials}</span>
              <span className="sr-only">
                {item.role ? `${item.name}, ${item.role}` : item.name}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}
