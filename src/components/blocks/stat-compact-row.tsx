"use client";

/**
 * Six metrics on one line.
 *
 * For a page whose charts need the vertical space. No cards, no icons and no sparklines — the
 * dividers do the separating, so the row costs about a third of the height of a card grid.
 *
 * `divide-x` plus `rtl:divide-x-reverse` because a divided row is one of the few places a
 * logical property does not exist: Tailwind's divide utilities are physical, and without the
 * reverse the dividers land on the wrong side of each cell under RTL.
 */
export function StatCompactRow() {
  const metrics = [
    { label: "MRR", value: "$62.4K" },
    { label: "New trials", value: "184" },
    { label: "Conversion", value: "6.2%" },
    { label: "Active seats", value: "3,912" },
    { label: "NPS", value: "48" },
    { label: "Tickets open", value: "27" },
  ];

  return (
    <div className="grid grid-cols-2 divide-border rounded-lg border border-border sm:grid-cols-3 sm:divide-x sm:rtl:divide-x-reverse lg:grid-cols-6">
      {metrics.map((metric) => (
        <div key={metric.label} className="px-4 py-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            {metric.label}
          </p>
          <p className="mt-1 text-lg font-semibold tabular-nums">{metric.value}</p>
        </div>
      ))}
    </div>
  );
}
