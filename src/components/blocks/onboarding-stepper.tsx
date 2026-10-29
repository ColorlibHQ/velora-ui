"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

/**
 * A horizontal stepper as an ordered list, with the connector as a pseudo-element.
 *
 * `<ol>` gives "3 of 5" for free; a flex row of divs with borders between them conveys the sequence
 * to sighted users only. The current step carries `aria-current="step"`, which is what lets
 * assistive tech report position rather than leaving it to a ring colour.
 *
 * The connector is positioned with `start-1/2` and `end-*` logical properties, so the whole stepper
 * flows the other way under RTL with no JavaScript and no separate stylesheet.
 */
export function OnboardingStepper() {
  const steps = ["Account", "Organisation", "Billing", "Team", "Done"];
  const [current, setCurrent] = useState(2);

  return (
    <div className="space-y-6">
      <ol className="flex">
        {steps.map((step, index) => {
          const done = index < current;
          const active = index === current;
          return (
            <li key={step} className="relative flex flex-1 flex-col items-center gap-2">
              {/* Connector to the next step. Logical inset, so it mirrors under RTL. */}
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  // start-1/2 + w-full spans from this step's centre to the next one's, since
                  // every <li> is flex-1 and so one <li> wide.
                  className={cn(
                    "absolute top-4 h-0.5 w-full -translate-y-1/2 start-1/2",
                    done ? "bg-success" : "bg-border",
                  )}
                />
              )}

              <span
                className={cn(
                  "z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-background text-xs font-semibold tabular-nums",
                  done && "border-success bg-success text-success-foreground",
                  active && "border-primary text-primary",
                  !done && !active && "border-border text-muted-foreground",
                )}
              >
                {done ? <Check className="h-4 w-4" aria-hidden="true" /> : index + 1}
              </span>

              <span
                aria-current={active ? "step" : undefined}
                className={cn(
                  "text-center text-xs",
                  active ? "font-medium text-foreground" : "text-muted-foreground",
                )}
              >
                {step}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="flex justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={current === 0}
          onClick={() => setCurrent((step) => Math.max(0, step - 1))}
        >
          Back
        </Button>
        <Button
          size="sm"
          disabled={current === steps.length - 1}
          onClick={() => setCurrent((step) => Math.min(steps.length - 1, step + 1))}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
