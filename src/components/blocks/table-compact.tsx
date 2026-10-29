"use client";

import { Badge } from "@/components/ui/badge";

const ROWS = [
  { id: "INV-2043", client: "Northwind Ltd", due: "Aug 12", amount: 4200, status: "Paid" },
  { id: "INV-2042", client: "Globex", due: "Aug 08", amount: 1850, status: "Pending" },
  { id: "INV-2041", client: "Initech", due: "Jul 30", amount: 9600, status: "Overdue" },
  { id: "INV-2040", client: "Umbrella Co", due: "Jul 28", amount: 2750, status: "Paid" },
];

const tone: Record<string, "success" | "warning" | "destructive"> = {
  Paid: "success",
  Pending: "warning",
  Overdue: "destructive",
};

/**
 * A read-only table for a dashboard panel.
 *
 * Deliberately not the DataTable: this has no sorting, filtering, selection or pagination, and
 * bringing in a table library for four rows would ship a great deal of machinery to render a
 * caption and a `<tbody>`. Reach for DataTable when the data needs operating on, not displaying.
 *
 * The numeric column is `text-end` and `tabular-nums`, so the digits line up in a column — the
 * one formatting detail that makes a figures table readable.
 */
export function TableCompact() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <caption className="sr-only">Recent invoices</caption>
        <thead>
          <tr className="border-b border-border text-xs text-muted-foreground">
            <th scope="col" className="px-2 py-2 text-start font-medium">Invoice</th>
            <th scope="col" className="px-2 py-2 text-start font-medium">Client</th>
            <th scope="col" className="px-2 py-2 text-start font-medium">Due</th>
            <th scope="col" className="px-2 py-2 text-end font-medium">Amount</th>
            <th scope="col" className="px-2 py-2 text-end font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.id} className="border-b border-border/60 last:border-0">
              <td className="px-2 py-2.5 font-mono text-xs">{row.id}</td>
              <td className="px-2 py-2.5 font-medium">{row.client}</td>
              <td className="px-2 py-2.5 text-muted-foreground">{row.due}</td>
              <td className="px-2 py-2.5 text-end tabular-nums">
                ${row.amount.toLocaleString("en-US")}
              </td>
              <td className="px-2 py-2.5 text-end">
                <Badge variant={tone[row.status]} className="text-[11px]">
                  {row.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
