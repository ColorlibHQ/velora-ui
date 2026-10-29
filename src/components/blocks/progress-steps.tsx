"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = ["Account", "Workspace", "Team", "Billing", "Done"];

/**
 * Where something is in a fixed sequence.
 *
 * The connector is a flex sibling rather than an absolutely positioned line, so it stretches
 * between steps at any width and needs no measurement. The current step carries `aria-current`,
 * and the completed ones say so in text — a tick is invisible to a screen reader, and "step 3 of
 * 5" is the only part of this component that actually conveys progress.
 */
export function ProgressSteps() {
  const current = 2; // zero-based

  return (
    <ol className="flex items-center">
      {STEPS.map((step, index) => {
        const done = index < current;
        const active = index === current;

        return (
          <li
            key={step}
            className={cn("flex items-center", index < STEPS.length - 1 && "flex-1")}
            aria-current={active ? "step" : undefined}
          >
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold tabular-nums",
                  done && "border-primary bg-primary text-primary-foreground",
                  active && "border-primary text-primary",
                  !done && !active && "border-border text-muted-foreground",
                )}
              >
                {done ? <Check className="size-3.5" aria-hidden="true" /> : index + 1}
              </span>
              <span
                className={cn(
                  "hidden text-[11px] sm:block",
                  active ? "font-medium text-foreground" : "text-muted-foreground",
                )}
              >
                {step}
              </span>
              <span className="sr-only">
                {done ? "completed" : active ? `current, step ${index + 1} of ${STEPS.length}` : "not started"}
              </span>
            </div>

            {index < STEPS.length - 1 && (
              <span
                className={cn("mx-2 h-px flex-1", done ? "bg-primary" : "bg-border")}
                aria-hidden="true"
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
