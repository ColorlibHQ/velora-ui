"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

/**
 * A scheduled-downtime notice, in the reader's own timezone — without a hydration mismatch.
 *
 * The mismatch is the whole lesson here. A banner giving only "02:00 UTC" makes every reader do
 * timezone arithmetic and half will get it wrong, so it should show local time. But
 * `toLocaleString()` resolves against the *machine's* timezone, and this app is statically exported:
 * the string is baked at build time in the build machine's zone, then React re-renders it in the
 * visitor's zone. Different text in the same node is a hydration error, and it is the kind that
 * only appears for users in another country.
 *
 * So UTC — which is the same everywhere — is what gets prerendered, and the local rendering is
 * gated on mount. The `useSyncExternalStore` idiom returns the server snapshot `false` and the
 * client snapshot `true`, which flips on the first client render *after* hydration has matched.
 * `suppressHydrationWarning` would silence the warning while leaving the wrong time on screen.
 *
 * The instants are fixed literals, not offsets from `Date.now()`: content derived from build time
 * makes every rebuild produce a different static export, turning a no-op into a diff.
 *
 * `role="status"`, not `role="alert"` — this is scheduled and informational. `alert` interrupts a
 * screen reader mid-sentence and is for things needing attention right now.
 */
export function MaintenanceWindow() {
  const start = new Date("2026-08-14T02:00:00Z");
  const end = new Date("2026-08-14T04:30:00Z");

  const mounted = useSyncExternalStore(
    useCallback(() => () => {}, []),
    () => true,
    () => false,
  );

  const format = (date: Date) =>
    date.toLocaleString(undefined, {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      // Pinned to UTC until mounted, so server and first client render agree exactly.
      timeZone: mounted ? undefined : "UTC",
    });

  return (
    <div
      role="status"
      className="flex flex-wrap items-start gap-3 rounded-lg border border-warning/40 bg-warning/10 p-4"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-warning/20 text-warning">
        <Clock className="h-4 w-4" aria-hidden="true" />
      </span>

      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-sm font-medium">Scheduled maintenance</p>
        <p className="text-sm text-muted-foreground">
          Reporting will be read-only from{" "}
          <time dateTime={start.toISOString()} className="font-medium text-foreground">
            {format(start)}
          </time>{" "}
          to{" "}
          <time dateTime={end.toISOString()} className="font-medium text-foreground">
            {format(end)}
          </time>{" "}
          {mounted ? "your time" : "UTC"} (02:00&ndash;04:30 UTC). Dashboards stay available.
        </p>
      </div>

      <Button variant="outline" size="sm">
        Add to calendar
      </Button>
    </div>
  );
}
