"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { Card, CardContent } from "@/components/ui/card";

/**
 * Reads `prefers-reduced-motion` as a subscription rather than in an effect.
 *
 * The obvious version — `useEffect(() => { if (matches) setProgress(1) })` — calls setState
 * synchronously during an effect, which React's lint rule flags because it triggers a second render
 * pass before paint. Reading it through a store instead means the value is available *during*
 * render, so the animation simply never starts rather than being started and cancelled.
 *
 * The server snapshot is `false`, matching what the static export prerenders, so hydration agrees
 * and the flip happens on the commit after.
 */
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    useCallback((onChange: () => void) => {
      const query = window.matchMedia("(prefers-reduced-motion: reduce)");
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    }, []),
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/**
 * A count-up that skips the animation under `prefers-reduced-motion`.
 *
 * Numbers rolling upward are exactly the continuous motion the setting exists to suppress, so the
 * reduced case renders the final value with no interval at all.
 *
 * The interval is cleared on unmount — this block can be torn down mid-count when its lazy preview
 * scrolls out of range, and an uncleared timer then sets state on an unmounted component.
 */
export function StatLiveCounter() {
  const targets = [
    { label: "Active sessions", value: 1284, prefix: "" },
    { label: "Revenue today", value: 8420, prefix: "$" },
    { label: "Signups this hour", value: 37, prefix: "" },
  ];

  const reduced = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduced) return;

    const timer = setInterval(() => {
      setProgress((previous) => {
        const next = previous + 0.04;
        if (next >= 1) {
          clearInterval(timer);
          return 1;
        }
        return next;
      });
    }, 24);

    return () => clearInterval(timer);
  }, [reduced]);

  // Derived during render, so no effect has to write it.
  const shown = reduced ? 1 : progress;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {targets.map((target) => (
        <Card key={target.label}>
          <CardContent className="space-y-1 p-4">
            <p className="text-sm text-muted-foreground">{target.label}</p>
            <p className="text-2xl font-bold tabular-nums">
              {target.prefix}
              {Math.round(target.value * shown).toLocaleString("en-US")}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
