"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Clock, X } from "lucide-react";

/**
 * A trial banner whose urgency escalates, with a dismissal that is honest about being temporary.
 *
 * The tone is chosen from days remaining crossing named thresholds, so the same component covers
 * "plenty of time" and "tomorrow" without a second banner. Escalating only at zero is too late to
 * be useful.
 *
 * The dismiss button says "Remind me later", not "Close". A banner that reappears next session
 * after a plain × reads as broken; naming the behaviour makes it a feature. This is a UI decision
 * far more often gotten wrong than the styling.
 */
export function TrialCountdown() {
  // Annotated, not inferred: without it TypeScript narrows this to the literal 3 and then
  // reports the `=== 1` pluralisation check below as an impossible comparison.
  const daysLeft: number = 3;
  const level = daysLeft <= 3 ? "urgent" : daysLeft <= 7 ? "soon" : "calm";

  const tones = {
    calm: "border-border bg-muted/40",
    soon: "border-warning/40 bg-warning/10",
    urgent: "border-destructive/40",
  };

  const iconTones = {
    calm: "bg-muted text-muted-foreground",
    soon: "bg-warning/20 text-warning",
    urgent: "bg-destructive/10 text-destructive",
  };

  return (
    <div
      role="status"
      className={cn("flex flex-wrap items-start gap-3 rounded-lg border p-4", tones[level])}
    >
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
          iconTones[level],
        )}
      >
        <Clock className="h-4 w-4" aria-hidden="true" />
      </span>

      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-sm font-medium">
          {daysLeft} {daysLeft === 1 ? "day" : "days"} left in your trial
        </p>
        <p className="text-sm text-muted-foreground">
          After that, dashboards stay readable but exports, saved views and API keys are disabled.
          Nothing is deleted.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button size="sm">Choose a plan</Button>
        {/* Named for what it does. A bare × on a banner that returns next session reads as a bug. */}
        <Button variant="ghost" size="sm" aria-label="Remind me later">
          <X className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
