"use client";

import * as React from "react";

/**
 * A document-unique id for SVG defs — gradients, filters, clip paths.
 *
 * SVG references resolve against the whole document: `fill="url(#revenueGradient)"`
 * finds the *first* element in the document with that id, not the one in the same
 * subtree. So a hand-written literal is only safe while nothing else on the page uses
 * the same string, and because the id never appears in the rendered output, a collision
 * does not error — the second chart silently paints with the first chart's gradient.
 *
 * That is the state the fleet is in: ids like `saas-stat-${index}`, `prod-grad-${index}`
 * and a bare `revenueGradient` work because each page renders each component once. The
 * moment a component appears twice — a blocks catalogue putting a dozen previews on one
 * page, or a widget reused in two grid rows — the duplicates mis-colour.
 *
 * `useId` gives a value unique per component instance, which is exactly the guarantee
 * needed, but React formats it with colons and a colon is not a valid SVG fragment
 * identifier. Stripping to `[A-Za-z0-9_-]` and prefixing keeps it legal and readable.
 *
 *     const gradient = useChartId("revenue");
 *     <linearGradient id={gradient} />
 *     <Area fill={`url(#${gradient})`} />
 */
export function useChartId(prefix = "chart"): string {
  const raw = React.useId();
  // Prefix first, so the id can never begin with a digit — also invalid.
  return React.useMemo(() => `${prefix}-${raw.replace(/[^A-Za-z0-9_-]/g, "")}`, [prefix, raw]);
}

/**
 * Several ids from one call, for a chart with more than one def.
 *
 * Derived from a single `useId` rather than calling the hook once per name, so the set
 * can be data-driven without breaking the rules of hooks.
 *
 *     const { revenue, profit } = useChartIds("area", ["revenue", "profit"]);
 */
export function useChartIds<T extends string>(
  prefix: string,
  names: readonly T[],
): Record<T, string> {
  const base = useChartId(prefix);
  // Keyed on the joined names rather than the array's identity, since callers normally
  // pass a fresh literal on every render.
  const key = names.join(" ");

  return React.useMemo(
    () => Object.fromEntries(names.map((name) => [name, `${base}-${name}`])) as Record<T, string>,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [base, key],
  );
}
