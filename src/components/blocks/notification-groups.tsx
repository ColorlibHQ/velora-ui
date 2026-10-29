"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, MessageSquare, Package } from "lucide-react";

/**
 * A notification list where read and unread are distinguishable without colour.
 *
 * Unread rows get a filled dot and a semibold title; read rows get neither. Tinting the row
 * background is the usual approach and it fails in two ways at once — it is invisible to some
 * colour-blind users, and it disappears entirely in dark mode where the tint has nowhere to go.
 *
 * "Mark all read" is a single action that mutates every row, so it lives in a `role="status"` region
 * alongside the unread count: after pressing it, a screen-reader user hears the count reach zero and
 * knows it worked. Otherwise the only feedback is visual.
 *
 * The dot is `aria-hidden` and the state is carried in an `sr-only` "Unread" instead, because a
 * decorative dot announced as "bullet" conveys nothing.
 */
export function NotificationGroups() {
  const [items, setItems] = useState([
    {
      id: 1,
      Icon: Package,
      title: "Order ORD-7891 shipped",
      body: "Tracking number added by the fulfilment service.",
      when: "9 minutes ago",
      unread: true,
      tone: "text-chart-1",
    },
    {
      id: 2,
      Icon: AlertTriangle,
      title: "Refund rate above threshold",
      body: "EU store crossed 4% for the second day running.",
      when: "2 hours ago",
      unread: true,
      tone: "text-warning",
    },
    {
      id: 3,
      Icon: MessageSquare,
      title: "Priya mentioned you",
      body: "“…matches the support tickets exactly.”",
      when: "Yesterday",
      unread: false,
      tone: "text-chart-3",
    },
    {
      id: 4,
      Icon: CheckCircle2,
      title: "Monthly close completed",
      body: "June ledger locked with no adjustments.",
      when: "3 days ago",
      unread: false,
      tone: "text-success",
    },
  ]);

  const unread = items.filter((item) => item.unread).length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <p role="status" className="text-sm text-muted-foreground tabular-nums">
          {unread} unread
        </p>
        <Button
          variant="ghost"
          size="sm"
          disabled={unread === 0}
          onClick={() => setItems((prev) => prev.map((item) => ({ ...item, unread: false })))}
        >
          Mark all read
        </Button>
      </div>

      <ul className="divide-y rounded-lg border">
        {items.map((item) => (
          <li key={item.id} className="flex gap-3 p-3">
            <span className={cn("mt-0.5 shrink-0", item.tone)}>
              <item.Icon className="h-4 w-4" aria-hidden="true" />
            </span>

            <div className="min-w-0 flex-1 space-y-0.5">
              <div className="flex items-start gap-2">
                <p
                  className={cn(
                    "min-w-0 flex-1 text-sm",
                    item.unread ? "font-semibold" : "font-normal",
                  )}
                >
                  {item.title}
                  {item.unread && <span className="sr-only"> — unread</span>}
                </p>
                {item.unread && (
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary"
                  />
                )}
              </div>
              <p className="text-xs text-muted-foreground">{item.body}</p>
              <p className="text-[11px] text-muted-foreground/70">{item.when}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
