"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * The loading state for a metric row, shaped like the content it replaces.
 *
 * The point is that the skeleton occupies the same box as the loaded card — same padding, same
 * three lines, same heights. A skeleton that is a different size causes the page to jump when data
 * arrives, which is worse than showing nothing.
 *
 * `aria-busy` on the container plus a single `sr-only` "Loading metrics" is the whole accessibility
 * story. The alternative — leaving four pulsing grey boxes unlabelled — announces nothing, so a
 * screen-reader user hears an empty region and assumes the page is broken.
 *
 * Toggle it to compare the two states directly; that comparison is the reason this ships as a block
 * rather than as a paragraph in the docs.
 */
export function StatLoadingSkeleton() {
  const [loading, setLoading] = useState(true);

  const loaded = [
    { label: "Revenue", value: "$48,295" },
    { label: "Orders", value: "1,284" },
    { label: "Customers", value: "412" },
    { label: "Churn", value: "2.1%" },
  ];

  return (
    <div className="space-y-3">
      <Button variant="outline" size="sm" onClick={() => setLoading((prev) => !prev)}>
        {loading ? "Show loaded state" : "Show loading state"}
      </Button>

      <div
        aria-busy={loading}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {loading && <span className="sr-only">Loading metrics</span>}

        {loaded.map((metric, index) => (
          <Card key={metric.label}>
            <CardContent className="space-y-2 p-4">
              {loading ? (
                <>
                  {/* Heights match the real text below: 20px label, 32px value, 16px trend. */}
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-4 w-20" />
                </>
              ) : (
                <>
                  <p className="flex h-5 items-center text-sm text-muted-foreground">
                    {metric.label}
                  </p>
                  <p className="flex h-8 items-center text-2xl font-bold tabular-nums">
                    {metric.value}
                  </p>
                  <p className="flex h-4 items-center text-xs text-muted-foreground">
                    +{(index + 1) * 3}.2% vs last month
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
