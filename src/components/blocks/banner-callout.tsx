"use client";

import { Info, X } from "lucide-react";

/**
 * A note that is not an error and should not look like one.
 *
 * Informational callouts get reached for and then styled with the destructive palette, which
 * trains people to ignore the destructive palette. This one is tinted with the primary colour
 * and carries `role="status"` rather than `role="alert"` — alert interrupts a screen reader
 * mid-sentence, which is not proportionate to "scheduled maintenance on Sunday".
 */
export function BannerCallout() {
  return (
    <div
      role="status"
      className="flex items-start gap-3 rounded-lg border border-primary/25 bg-primary/5 p-4"
    >
      <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">Scheduled maintenance on Sunday</p>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Exports and scheduled reports will be paused between 02:00 and 04:00 UTC. Nothing else
          is affected.
        </p>
      </div>
      <button
        type="button"
        aria-label="Dismiss this notice"
        className="shrink-0 rounded p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}
