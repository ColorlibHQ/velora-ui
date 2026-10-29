"use client";

import { CreditCard, Settings, ShoppingCart, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { icon: ShoppingCart, title: "New order ORD-7891", detail: "Emma Wilson · $299.00", when: "2m", unread: true },
  { icon: CreditCard, title: "Payment received", detail: "INV-2043 · $4,200.00", when: "18m", unread: true },
  { icon: Users, title: "New customer signed up", detail: "Northwind Ltd", when: "1h", unread: false },
  { icon: Settings, title: "Nightly backup finished", detail: "No errors", when: "6h", unread: false },
];

/**
 * Unread state, type icon and a relative time.
 *
 * Unread is carried by three things — a tinted row, a bolder title and a dot — because tint
 * alone fails for anyone with reduced colour vision, and the dot alone is eight pixels. The
 * count of unread items belongs in the *heading* rather than only in a badge, which is what
 * makes it reachable when the list is announced.
 */
export function FeedNotifications() {
  const unread = ITEMS.filter((item) => item.unread).length;

  return (
    <div>
      <h4 className="mb-2 text-sm font-semibold">
        Notifications
        {unread > 0 && (
          <span className="ms-2 rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
            {unread} unread
          </span>
        )}
      </h4>

      <ul className="divide-y divide-border">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <li
              key={item.title}
              className={cn(
                "flex items-start gap-3 px-2 py-2.5",
                item.unread && "-mx-2 rounded-md bg-primary/5",
              )}
            >
              <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-muted">
                <Icon className="size-3.5 text-muted-foreground" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className={cn("truncate text-sm", item.unread ? "font-semibold" : "font-medium")}>
                  {item.title}
                </p>
                <p className="truncate text-xs text-muted-foreground">{item.detail}</p>
              </div>
              <span className="shrink-0 text-[11px] text-muted-foreground">{item.when}</span>
              {item.unread && (
                <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
