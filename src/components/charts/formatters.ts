/**
 * Value formatters for chart tooltips and axes.
 *
 * These exist because the same handful of formatting decisions were being re-made
 * inline in every tooltip in every template, and inconsistently. One page decided a
 * value was money by testing `value > 999`; the next hard-coded which series names were
 * counts; a third divided by 1000 and appended "k" at one call site and not another. The
 * result was two charts on the same page disagreeing about how to render the same
 * number.
 *
 * No React, no "use client" — plain functions.
 */

/** What a tooltip knows about one series at one point. */
export interface SeriesPoint {
  name: string;
  value: number;
  color?: string;
  unit?: string;
}

/**
 * Formats one value. Receives the whole point, so a formatter can branch on the series
 * name or use the unit the data carries.
 */
export type ValueFormatter = (value: number, point?: SeriesPoint) => string;

const nf = (options?: Intl.NumberFormatOptions) => new Intl.NumberFormat("en-US", options);

/** `1234.5` → `$1,234.50`. Whole numbers keep no decimals: `1200` → `$1,200`. */
export const currency: ValueFormatter = (value) =>
  Number.isInteger(value)
    ? `$${nf().format(value)}`
    : `$${nf({ minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)}`;

/** `12.5` → `12.5%`. Already-scaled percentages, not fractions. */
export const percent: ValueFormatter = (value) => `${nf({ maximumFractionDigits: 1 }).format(value)}%`;

/** `1234` → `1,234`. */
export const count: ValueFormatter = (value) => nf().format(value);

/**
 * `42800` → `42.8k`, `1500000` → `1.5M`.
 *
 * For axis ticks and dense labels, where the full number would collide with its
 * neighbour. Deliberately not Intl's `notation: "compact"`, which renders `42.8K` with a
 * capital K and switches to `1.5M` only above different thresholds depending on locale.
 */
export const compact: ValueFormatter = (value) => {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (abs >= 1_000) return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  return String(value);
};

/** `42800` → `$42.8k`. Compact money, for axis ticks on revenue charts. */
export const compactCurrency: ValueFormatter = (value) => `$${compact(value)}`;

/**
 * Picks a formatter per series name.
 *
 * The idiom every multi-series tooltip in the fleet was hand-rolling: a chart plotting
 * revenue against order count needs money for one line and a plain integer for the
 * other, and the inline version of this was a nested ternary listing series names —
 * which silently formatted a renamed or newly-added series as money.
 *
 *     bySeries({ Orders: count, "Growth %": percent }, currency)
 *
 * An unlisted series falls back to `fallback`, so adding a series produces a plainly
 * wrong-looking number rather than a subtly wrong one.
 */
export function bySeries(
  formatters: Record<string, ValueFormatter>,
  fallback: ValueFormatter = count,
): ValueFormatter {
  return (value, point) => {
    const named = point?.name ? formatters[point.name] : undefined;
    return (named ?? fallback)(value, point);
  };
}

/** Appends a unit: `bySuffix(count, "users")` gives `1,204 users`. */
export function withSuffix(formatter: ValueFormatter, suffix: string): ValueFormatter {
  return (value, point) => `${formatter(value, point)} ${suffix}`;
}
