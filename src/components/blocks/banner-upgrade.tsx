"use client";

import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * A limit reached, with the action next to it.
 *
 * The bar is the argument: "you have used 9,400 of 10,000" is far more persuasive than "upgrade
 * for more". The action sits inside the banner rather than sending the reader off to find it,
 * and the numbers are stated in text as well as drawn, so the case survives being read aloud.
 */
export function BannerUpgrade() {
  const used = 9_400;
  const limit = 10_000;
  const pct = Math.round((used / limit) * 100);

  return (
    <div className="rounded-lg border border-warning/30 bg-warning/5 p-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <Zap className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden="true" />
          <div className="min-w-0">
            <p className="text-sm font-medium">
              {pct}% of your monthly API calls used
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {used.toLocaleString("en-US")} of {limit.toLocaleString("en-US")} calls. Requests
              are rejected once the limit is reached.
            </p>
          </div>
        </div>
        <Button size="sm" className="shrink-0">
          Upgrade plan
        </Button>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-warning/15">
        <div className="h-full rounded-full bg-warning" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
