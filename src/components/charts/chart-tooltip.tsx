"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { count, type SeriesPoint, type ValueFormatter } from "./formatters";

/**
 * The tooltip every chart in the fleet was declaring for itself.
 *
 * There were thirteen of these across one template — five `ChartTooltip`s, three
 * `PieTooltip`s, a `ComboTooltip`, two `CustomTooltip`s, a `ScatterTooltip` and a
 * `TreemapTooltip` — alongside seven separate `TooltipPayloadEntry` interfaces
 * describing the same three fields. The container markup was character-for-character
 * identical in all of them. Only the value formatting differed, and it differed
 * *arbitrarily*: one decided a number was money by testing `value > 999`, another
 * hard-coded which series names were counts.
 *
 * Reducing them showed the thirteen were really three shapes, which is what `variant`
 * is:
 *
 *   series   an optional label row, then one coloured row per series — `Name: value`.
 *            Nine of the thirteen.
 *   summary  the series name as the heading, its value muted beneath. Pie slices and
 *            the traffic breakdown — a single datum with no axis label.
 *   metric   the label muted above, the value emphasised beneath. Treemap cells, where
 *            the number is the point and the name is context.
 *
 * The markup is preserved exactly, so adopting this produces no visual diff.
 *
 * ## Passing it to Recharts
 *
 *     <Tooltip content={<ChartTooltip format={currency} />} />
 *
 * Recharts renders `content` with `cloneElement(content, props)`
 * (recharts/lib/component/Tooltip.js), and React's cloneElement *merges* — so `active`,
 * `payload` and `label` arrive from Recharts while `format` and `variant` survive from
 * the call site. That is load-bearing for every call site, so a test pins it rather
 * than trusting it.
 */
export interface ChartTooltipProps {
  /** Supplied by Recharts. */
  active?: boolean;
  /** Supplied by Recharts. Typed loosely because each chart type shapes it differently. */
  payload?: readonly (SeriesPoint & { payload?: Record<string, unknown> })[];
  /** Supplied by Recharts — the axis category, where there is one. */
  label?: string;
  /**
   * How to render each value. Defaults to a thousands-separated integer.
   *
   * Use `bySeries` when a chart mixes units; the formatter receives the whole point, so
   * it can branch on the series name.
   */
  format?: ValueFormatter;
  /** Suppress the label row even when Recharts supplies a label. */
  hideLabel?: boolean;
  variant?: "series" | "summary" | "metric";
  className?: string;
}

/** Shared shell, so the three variants cannot drift apart visually. */
function Shell({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-popover px-3 py-2 shadow-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ChartTooltip({
  active,
  payload,
  label,
  format = count,
  hideLabel = false,
  variant = "series",
  className,
}: ChartTooltipProps) {
  // Recharts mounts the content element and then feeds it props, so an inactive or
  // empty tooltip is the normal case rather than an error.
  if (!active || !payload?.length) return null;

  const first = payload[0];

  if (variant === "summary") {
    return (
      <Shell className={className}>
        <p className="text-sm font-semibold">{first.name}</p>
        <p className="text-xs text-muted-foreground">{format(first.value, first)}</p>
      </Shell>
    );
  }

  if (variant === "metric") {
    return (
      <Shell className={className}>
        <p className="text-xs font-medium text-muted-foreground">{first.name}</p>
        <p className="text-sm font-semibold">{format(first.value, first)}</p>
      </Shell>
    );
  }

  return (
    <Shell className={className}>
      {!hideLabel && label !== undefined && (
        <p className="mb-1 text-xs font-medium text-muted-foreground">{label}</p>
      )}
      {payload.map((entry, index) => (
        <p
          // Series names are unique within a chart, but Recharts can emit a point with
          // no name, so the index is the tiebreak rather than the key.
          key={entry.name ?? index}
          className="text-sm font-semibold"
          style={{ color: entry.color }}
        >
          {entry.name}: {format(entry.value, entry)}
        </p>
      ))}
    </Shell>
  );
}
