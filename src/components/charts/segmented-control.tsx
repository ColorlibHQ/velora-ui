"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * The pill-strip toggle used for status filters and chart tabs.
 *
 * The most duplicated markup in the template: eleven copies of the same
 * `rounded-lg bg-muted p-0.5` strip with the same active/inactive class pair, spread
 * across the status filters on seven list pages and the series tabs on four charts. Same
 * element, same classes, sometimes written with `cn()` and sometimes with a template
 * literal.
 *
 * The rewrite is not purely mechanical, because the copies were not accessible. They
 * were plain `<button>`s with nothing tying them together, so a screen reader announced
 * eleven unrelated buttons with no indication that one of them was current, and no way
 * to tell how many options there were. This renders a `radiogroup`: the group is
 * labelled, each option reports `aria-checked`, and arrow keys move between them, which
 * is what a segmented control is.
 *
 * Generic over the value so `onChange` hands back the caller's own union rather than a
 * string they have to re-narrow.
 */
export interface SegmentedOption<T extends string> {
  value: T;
  label: React.ReactNode;
}

export interface SegmentedControlProps<T extends string> {
  options: readonly SegmentedOption<T>[];
  /**
   * The selected option, or null for none.
   *
   * `null` is a real state, not an oversight: the analytics period filter can be
   * cleared, and the inline versions of this control expressed that simply by having no
   * option match. A radiogroup with nothing checked is valid, so the only thing that
   * needs care is which option is tabbable.
   */
  value: T | null;
  onChange: (value: T) => void;
  /**
   * Accessible name for the group.
   *
   * Required rather than optional: a bare set of buttons is what this replaces, and an
   * unlabelled radiogroup is only marginally better than that.
   */
  label: string;
  className?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: SegmentedControlProps<T>) {
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const selectedIndex = options.findIndex((option) => option.value === value);
  // With nothing selected there is no active option to carry the tab stop, so the first
  // one takes it — otherwise the whole group becomes unreachable by keyboard.
  const tabbableIndex = selectedIndex === -1 ? 0 : selectedIndex;

  /**
   * Arrow-key navigation, wrapping at both ends.
   *
   * Expected of a radiogroup, and it also moves focus — selecting without moving focus
   * leaves the ring behind on the previously-active option, which reads as broken.
   */
  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const delta =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -1
          : 0;
    if (delta === 0) return;

    event.preventDefault();
    const next = (index + delta + options.length) % options.length;
    onChange(options[next]!.value);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn("flex w-fit items-center gap-1 rounded-lg bg-muted p-0.5", className)}
    >
      {options.map((option, index) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            ref={(node) => {
              refs.current[index] = node;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            // Only the active option is tabbable, so the group is one tab stop rather
            // than one per option — the behaviour a radiogroup implies.
            tabIndex={index === tabbableIndex ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              active
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
