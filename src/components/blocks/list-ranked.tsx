"use client";

const ROWS = [
  { label: "/pricing", value: 18420 },
  { label: "/docs/getting-started", value: 14210 },
  { label: "/blog/whats-new", value: 11890 },
  { label: "/changelog", value: 8340 },
  { label: "/integrations", value: 6120 },
];

/**
 * Top pages, top products, top anything.
 *
 * The bar is a background on the row rather than a separate element, so the label sits *on* its
 * own share and the list reads as one column instead of two. Widths are relative to the largest
 * value, not to the total: with a long tail, share-of-total makes every bar after the second one
 * invisible.
 */
export function ListRanked() {
  const max = Math.max(...ROWS.map((row) => row.value));

  return (
    <ol className="space-y-1">
      {ROWS.map((row, index) => (
        <li key={row.label} className="relative overflow-hidden rounded-md">
          <div
            className="absolute inset-y-0 start-0 bg-primary/10"
            style={{ width: `${(row.value / max) * 100}%` }}
            aria-hidden="true"
          />
          <div className="relative flex items-center gap-3 px-3 py-2 text-sm">
            <span className="w-4 shrink-0 text-xs tabular-nums text-muted-foreground">
              {index + 1}
            </span>
            <span className="min-w-0 flex-1 truncate font-medium">{row.label}</span>
            <span className="shrink-0 tabular-nums text-muted-foreground">
              {row.value.toLocaleString("en-US")}
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}
