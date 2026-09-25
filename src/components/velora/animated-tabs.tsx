"use client";

import { useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface Tab {
  title: React.ReactNode;
  value: string;
  content: React.ReactNode;
}

interface AnimatedTabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue"> {
  /** The tabs, in order */
  tabs: Tab[];
  /** Value of the tab selected on first render (defaults to the first tab) */
  defaultValue?: string;
  /** Controlled selected value */
  value?: string;
  /** Called with the new value when the selection changes */
  onValueChange?: (value: string) => void;
  /** How many inactive panels peek out behind the active one */
  peek?: number;
  /** Classes for the tab list */
  listClassName?: string;
  /** Classes for every panel card */
  panelClassName?: string;
}

/**
 * Tabs with a pill that glides to the selected tab and panels stacked like
 * cards: the next panels peek out behind the active one, scaled and offset.
 * Follows the WAI-ARIA tabs pattern with automatic activation.
 */
export function AnimatedTabs({
  tabs,
  defaultValue,
  value: valueProp,
  onValueChange,
  peek = 2,
  listClassName,
  panelClassName,
  className,
  ...props
}: AnimatedTabsProps) {
  const [inner, setInner] = useState(defaultValue ?? tabs[0]?.value);
  const value = valueProp ?? inner;
  const reduce = useReducedMotion();
  const id = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = Math.max(0, tabs.findIndex((t) => t.value === value));
  const spring = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 360, damping: 32 };

  const select = (index: number) => {
    const tab = tabs[index];
    if (!tab) return;
    if (valueProp === undefined) setInner(tab.value);
    onValueChange?.(tab.value);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const n = tabs.length;
    const next = {
      ArrowRight: (active + 1) % n,
      ArrowLeft: (active - 1 + n) % n,
      Home: 0,
      End: n - 1,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div {...props} data-slot="animated-tabs" className={cn("flex w-full flex-col gap-6", className)}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className={cn(
          "flex max-w-full gap-1 self-start overflow-x-auto rounded-full border bg-muted/50 p-1",
          listClassName
        )}
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.value}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => select(i)}
            className="relative shrink-0 cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-selected:text-foreground"
          >
            {i === active && (
              <motion.span
                layoutId={`${id}-pill`}
                transition={spring}
                aria-hidden
                className="absolute inset-0 rounded-full border bg-card shadow-sm"
              />
            )}
            <span className="relative">{tab.title}</span>
          </button>
        ))}
      </div>

      {/* Every panel shares one grid cell, so the stack is as tall as the
          tallest panel; room above it is left for the peeking cards. */}
      <div className="grid" style={{ paddingTop: Math.min(peek, tabs.length - 1) * 14 }}>
        {tabs.map((tab, i) => {
          const depth = (i - active + tabs.length) % tabs.length;
          const current = depth === 0;
          return (
            <motion.div
              key={tab.value}
              role="tabpanel"
              id={`${id}-panel-${i}`}
              aria-labelledby={`${id}-tab-${i}`}
              aria-hidden={!current || undefined}
              inert={!current || undefined}
              tabIndex={current ? 0 : undefined}
              initial={false}
              animate={{
                y: -depth * 14,
                scale: 1 - depth * 0.05,
                opacity: depth > peek ? 0 : 1,
              }}
              transition={spring}
              style={{ zIndex: tabs.length - depth, transformOrigin: "top center" }}
              className={cn(
                "col-start-1 row-start-1 overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-lg shadow-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                panelClassName
              )}
            >
              {tab.content}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
