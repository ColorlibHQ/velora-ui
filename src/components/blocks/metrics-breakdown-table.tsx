"use client";

import { cn } from "@/lib/utils";

/**
 * A contribution table where the bar is drawn *inside* the cell.
 *
 * The share bar is an absolutely positioned layer behind the number rather than a separate column,
 * so the table stays readable at narrow widths where a dedicated chart column would be squeezed to
 * nothing. `-z-10` on the bar keeps it under the text without needing a stacking context on every
 * cell.
 *
 * Shares are computed from the values, and the total row is computed from the same array — so the
 * percentages sum to 100 and the total matches the rows by construction. Typing a total is how a
 * demo table ends up with columns that do not add up.
 *
 * The header uses `scope="col"` and the label column `scope="row"`, which is what lets a screen
 * reader announce "Organic, revenue, $184,200" instead of reading three unrelated cells.
 */
export function MetricsBreakdownTable() {
  const rows = [
    { channel: "Organic search", revenue: 184200, orders: 2140 },
    { channel: "Paid search", revenue: 96800, orders: 1180 },
    { channel: "Email", revenue: 48300, orders: 720 },
    { channel: "Social", revenue: 21400, orders: 410 },
    { channel: "Direct", revenue: 18900, orders: 260 },
  ];

  const total = rows.reduce((sum, row) => sum + row.revenue, 0);
  const totalOrders = rows.reduce((sum, row) => sum + row.orders, 0);
  const money = (value: number) => `$${value.toLocaleString("en-US")}`;

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <caption className="sr-only">Revenue and orders by acquisition channel</caption>
        <thead>
          <tr className="border-b bg-muted/50">
            <th scope="col" className="px-4 py-2 text-start font-medium">
              Channel
            </th>
            <th scope="col" className="px-4 py-2 text-end font-medium">
              Revenue
            </th>
            <th scope="col" className="px-4 py-2 text-end font-medium">
              Share
            </th>
            <th scope="col" className="px-4 py-2 text-end font-medium">
              Orders
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => {
            const share = (row.revenue / total) * 100;
            return (
              <tr key={row.channel} className="border-b last:border-0">
                <th scope="row" className="px-4 py-2 text-start font-normal">
                  {row.channel}
                </th>
                <td className="px-4 py-2 text-end tabular-nums">{money(row.revenue)}</td>
                <td className="relative px-4 py-2 text-end tabular-nums">
                  {/* The bar sits behind the number rather than in its own column, so it
                      survives a narrow viewport. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-1 -z-10 rounded bg-primary/15 end-0"
                    style={{ width: `${share}%` }}
                  />
                  {share.toFixed(1)}%
                </td>
                <td className="px-4 py-2 text-end tabular-nums">
                  {row.orders.toLocaleString("en-US")}
                </td>
              </tr>
            );
          })}
        </tbody>

        <tfoot>
          <tr className={cn("border-t-2 font-semibold")}>
            <th scope="row" className="px-4 py-2 text-start">
              Total
            </th>
            <td className="px-4 py-2 text-end tabular-nums">{money(total)}</td>
            <td className="px-4 py-2 text-end tabular-nums">100.0%</td>
            <td className="px-4 py-2 text-end tabular-nums">
              {totalOrders.toLocaleString("en-US")}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
