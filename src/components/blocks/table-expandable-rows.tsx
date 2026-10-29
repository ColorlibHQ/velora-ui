"use client";

import { Fragment, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

/**
 * Expandable rows, built as real table markup.
 *
 * The detail is a second `<tr>` with a `colSpan` cell, not a `<div>` after the table. Nesting a
 * div inside `<tbody>` is invalid HTML that browsers silently hoist out of the table, which
 * scrambles the layout in ways that look like a CSS bug.
 *
 * The trigger carries `aria-expanded` and `aria-controls` pointing at the detail row's id, so the
 * relationship is announced. The chevron rotation is `rtl:rotate-180` on top of the open rotation,
 * because a collapsed chevron should point along the reading direction.
 */
export function TableExpandableRows() {
  const orders = [
    {
      id: "ORD-7891",
      customer: "Ana Whitfield",
      total: "$1,248.00",
      status: "Paid",
      items: ["Platform licence × 1", "Additional seats × 12", "Onboarding × 1"],
    },
    {
      id: "ORD-7890",
      customer: "Marcus Oyelaran",
      total: "$842.50",
      status: "Pending",
      items: ["Platform licence × 1", "Additional seats × 4"],
    },
  ];

  const [open, setOpen] = useState<string[]>(["ORD-7891"]);

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th scope="col" className="w-10" />
            <th scope="col" className="px-4 py-2 text-start font-medium">Order</th>
            <th scope="col" className="px-4 py-2 text-start font-medium">Customer</th>
            <th scope="col" className="px-4 py-2 text-start font-medium">Status</th>
            <th scope="col" className="px-4 py-2 text-end font-medium">Total</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => {
            const expanded = open.includes(order.id);
            return (
              /* The key belongs on the Fragment, not on its children: React keys the element
                 returned by the map callback, so keying the <tr>s leaves the Fragment unkeyed. */
              <Fragment key={order.id}>
                <tr className="border-b">
                  <td className="ps-2">
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`detail-${order.id}`}
                      aria-label={`${expanded ? "Collapse" : "Expand"} ${order.id}`}
                      onClick={() =>
                        setOpen((previous) =>
                          expanded
                            ? previous.filter((id) => id !== order.id)
                            : [...previous, order.id],
                        )
                      }
                      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <ChevronRight
                        aria-hidden="true"
                        className={cn(
                          "h-4 w-4 transition-transform",
                          expanded ? "rotate-90" : "rtl:rotate-180",
                        )}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-2 font-mono text-xs">{order.id}</td>
                  <td className="px-4 py-2">{order.customer}</td>
                  <td className="px-4 py-2">
                    <Badge variant={order.status === "Paid" ? "success" : "secondary"}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-2 text-end tabular-nums">{order.total}</td>
                </tr>

                {expanded && (
                  /* A real <tr>, not a div after the table — a div inside <tbody> is invalid
                     and browsers hoist it out, breaking the layout in confusing ways. */
                  <tr id={`detail-${order.id}`} className="border-b bg-muted/30">
                    <td colSpan={5} className="px-4 py-3">
                      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Line items
                      </p>
                      <ul className="space-y-1">
                        {order.items.map((item) => (
                          <li key={item} className="text-xs text-muted-foreground">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
