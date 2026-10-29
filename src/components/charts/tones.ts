/**
 * The five chart colours, as one lookup.
 *
 * Every stat card in the fleet carried its own `{ color, bg, stroke }` triple in its
 * data — `text-chart-1`, `bg-chart-1/10`, `var(--chart-1)` — repeated per stat, per
 * page, in four files. Three fields that always varied together, so any one of them
 * could be edited alone and produce an icon tinted one colour with a trend line in
 * another.
 *
 * A `tone` number replaces the triple. The values here are **literal strings on
 * purpose**: Tailwind discovers classes by scanning source text, so a computed
 * `` `bg-chart-${n}/10` `` would never be emitted and the tint would silently be
 * missing from the stylesheet. Anything generating these has to spell them out.
 *
 * No React, no "use client" — a plain lookup, imported by both server and client code.
 */
export type ChartTone = 1 | 2 | 3 | 4 | 5;

export interface ChartToneStyles {
  /** Foreground class for an icon or emphasis text. */
  text: string;
  /** Tinted background class for the icon tile. */
  bg: string;
  /** Stroke/fill value for SVG — a CSS variable, not a class. */
  stroke: string;
}

export const CHART_TONES: Record<ChartTone, ChartToneStyles> = {
  1: { text: "text-chart-1", bg: "bg-chart-1/10", stroke: "var(--chart-1)" },
  2: { text: "text-chart-2", bg: "bg-chart-2/10", stroke: "var(--chart-2)" },
  3: { text: "text-chart-3", bg: "bg-chart-3/10", stroke: "var(--chart-3)" },
  4: { text: "text-chart-4", bg: "bg-chart-4/10", stroke: "var(--chart-4)" },
  5: { text: "text-chart-5", bg: "bg-chart-5/10", stroke: "var(--chart-5)" },
};

export const CHART_TONE_VALUES: readonly ChartTone[] = [1, 2, 3, 4, 5];

/** Cycles tones for a list of unknown length, so a sixth card reuses the first colour. */
export function toneForIndex(index: number): ChartTone {
  return CHART_TONE_VALUES[index % CHART_TONE_VALUES.length]!;
}
