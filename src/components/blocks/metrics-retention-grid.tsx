"use client";

const COHORTS = [
  { cohort: "Apr", size: 420, values: [100, 62, 48, 41, 38] },
  { cohort: "May", size: 512, values: [100, 66, 52, 44, null] },
  { cohort: "Jun", size: 480, values: [100, 61, 47, null, null] },
  { cohort: "Jul", size: 604, values: [100, 68, null, null, null] },
];

/**
 * Cohort retention as a real table.
 *
 * A `<table>`, not a grid of divs, because this *is* tabular data — cohorts down, periods across
 * — so row and column headers come for free and a screen reader announces "May, month 2, 52%"
 * from one cell. Any div version needs an aria-label per cell to approach that and still loses
 * keyboard navigation.
 *
 * Triangular, because a cohort cannot have data for a month that has not happened. Those cells
 * are empty rather than 0%: a zero is a fact about retention, and printing one where there is
 * simply no data yet is a lie the reader cannot detect.
 *
 * Every populated cell prints its number. A heatmap that relies on shade alone is unreadable to
 * anyone with reduced colour vision, and unreadable in print.
 */
export function MetricsRetentionGrid() {
  const periods = Math.max(...COHORTS.map((row) => row.values.length));

  /*
   * The tint is capped at 85%, and that cap is load-bearing.
   *
   * --primary resolves to #007938. Undiluted, it takes near-white text to 5.35:1 but --foreground
   * to only 3.49:1; at a 62% tint the two swap, and near-white drops to 2.59:1. Between those
   * points there is a narrow band where NEITHER colour clears 4.5:1, so a continuous scale with a
   * light/dark threshold cannot be made compliant by moving the threshold — it has to avoid the
   * band. Holding the scale at or below 85% keeps every cell light enough for dark text, which is
   * then correct for the whole range.
   *
   * color-mix keeps this on the theme token, so it follows light and dark without a second
   * palette — and a continuous scale cannot be expressed as utility classes anyway.
   */
  const shade = (value: number) =>
    `color-mix(in oklch, var(--primary) ${Math.round((0.1 + (value / 100) * 0.75) * 100)}%, transparent)`;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-0.5 text-xs">
        <caption className="sr-only">
          Retention by cohort. Rows are the month a cohort joined, columns are months since, and
          each cell is the percentage still active.
        </caption>
        <thead>
          <tr>
            <th scope="col" className="px-2 py-1 text-start font-medium text-muted-foreground">Cohort</th>
            <th scope="col" className="px-2 py-1 text-end font-medium text-muted-foreground">Size</th>
            {Array.from({ length: periods }, (_, index) => (
              <th key={index} scope="col" className="px-1 py-1 text-center font-medium text-muted-foreground">
                M{index}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COHORTS.map((row) => (
            <tr key={row.cohort}>
              <th scope="row" className="whitespace-nowrap px-2 py-1 text-start font-normal">
                {row.cohort}
              </th>
              <td className="px-2 py-1 text-end tabular-nums text-muted-foreground">{row.size}</td>
              {Array.from({ length: periods }, (_, index) => {
                const value = row.values[index];
                if (value === null || value === undefined) {
                  return (
                    <td key={index} className="px-1 py-1 text-center text-muted-foreground/30">
                      <span aria-hidden="true">–</span>
                      <span className="sr-only">No data</span>
                    </td>
                  );
                }
                /* One text colour for every cell — see the cap in `shade` above for why. */
                return (
                  <td
                    key={index}
                    className="rounded px-1 py-1 text-center font-medium tabular-nums text-foreground"
                    style={{ backgroundColor: shade(value) }}
                  >
                    {value}%
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
