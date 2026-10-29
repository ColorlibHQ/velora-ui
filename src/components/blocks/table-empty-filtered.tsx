"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchX, Inbox } from "lucide-react";

/**
 * The two empty states a table has, which are not the same state.
 *
 * "No orders yet" and "no orders match your filters" need different copy and different actions. The
 * first is an onboarding moment and should offer creation; the second is a dead end caused by the
 * user's own filters and should offer to clear them. Shipping one message for both is why users
 * click "Create your first order" on an account with 4,000 orders.
 *
 * The filtered state names the filters it is blaming, so the way out is obvious without reopening a
 * filter panel to discover what is set.
 */
export function TableEmptyFiltered() {
  const [filtered, setFiltered] = useState(true);

  return (
    <div className="space-y-3">
      <Button variant="outline" size="sm" onClick={() => setFiltered((prev) => !prev)}>
        {filtered ? "Show the never-had-data state" : "Show the filtered-to-nothing state"}
      </Button>

      <div className="rounded-lg border">
        <div className="border-b px-4 py-2">
          <p className="text-sm font-medium">Orders</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 p-10 text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
            {filtered ? (
              <SearchX className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Inbox className="h-5 w-5" aria-hidden="true" />
            )}
          </span>

          {filtered ? (
            <>
              <div className="space-y-1">
                <p className="text-sm font-medium">No orders match these filters</p>
                <p className="text-sm text-muted-foreground">
                  1,284 orders exist, but none are both of these:
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary">Status is Refunded</Badge>
                <Badge variant="secondary">Channel is In-store</Badge>
              </div>
              <Button variant="outline" size="sm">
                Clear filters
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-1">
                <p className="text-sm font-medium">No orders yet</p>
                <p className="text-sm text-muted-foreground">
                  Orders will appear here as soon as your first sale comes in.
                </p>
              </div>
              <Button size="sm">Create an order</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
