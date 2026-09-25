"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";

import { cn } from "@/lib/utils";

export interface StickyScrollItem {
  title: string;
  description: string;
  /** Rendered in the pinned panel while this item is active */
  content?: React.ReactNode;
}

interface StickyScrollProps {
  items: StickyScrollItem[];
  /** Scrollable element to track instead of the window */
  container?: React.RefObject<HTMLElement | null>;
  className?: string;
}

/**
 * Long-form copy that scrolls past a pinned panel; the panel swaps as each
 * section takes over. The classic "how it works" section. Heights use `cqh`,
 * which resolves against the viewport unless an ancestor is a size container
 * (e.g. a fixed-height scroll box with `@container-size`).
 */
export function StickyScroll({ items, container, className }: StickyScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const duration = reducedMotion ? 0 : 0.3;
  const { scrollYProgress } = useScroll({
    container,
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (!items.length) return;
    // Split the scrollable range into one band per item.
    const next = Math.min(
      items.length - 1,
      Math.floor(progress * items.length)
    );
    setActive(next);
  });

  if (!items.length) return null;

  return (
    <div
      ref={ref}
      data-slot="sticky-scroll"
      className={cn("relative flex gap-12", className)}
    >
      <div className="flex-1 py-[30cqh]">
        {items.map((item, i) => (
          <div key={item.title} className="flex min-h-[60cqh] flex-col justify-center">
            {/* Only the large title dims, and only to a level that keeps
                3:1 contrast; the description stays at full strength. */}
            <motion.h3
              animate={{ opacity: active === i ? 1 : 0.6 }}
              transition={{ duration }}
              className="text-2xl font-semibold"
            >
              {item.title}
            </motion.h3>
            <p className="mt-3 max-w-md text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="sticky top-[20cqh] hidden h-[60cqh] flex-1 lg:block">
        <div className="relative size-full overflow-hidden rounded-2xl border bg-gradient-to-br from-brand-from/10 to-brand-to/10">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={false}
              animate={{
                opacity: active === i ? 1 : 0,
                scale: active === i ? 1 : 0.97,
              }}
              transition={{ duration, ease: "easeOut" }}
              aria-hidden={active !== i}
              inert={active !== i}
              className="absolute inset-0 flex items-center justify-center p-8"
            >
              {item.content ?? (
                <span className="text-xl font-medium">{item.title}</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
