"use client";

import { cn } from "@/lib/utils";
import { Check, Circle, Truck } from "lucide-react";

/**
 * Fulfilment progress as an ordered list, not a row of styled divs.
 *
 * It is an `<ol>` because the steps have an inherent order and a screen reader should say "3 of 5".
 * The usual implementation — a flex row of divs with connecting borders — conveys the sequence
 * visually and nothing else.
 *
 * The connector is a pseudo-element on each step rather than a separate element between steps, so
 * there is no odd-one-out markup at the ends and no `index < length - 1` conditional. Because it is
 * positioned with `inset-inline-start`, the whole timeline mirrors under RTL with no JavaScript.
 *
 * The current step carries `aria-current="step"`, which is what lets assistive tech report where in
 * the process the order actually is — otherwise "in progress" is conveyed only by a ring colour.
 */
export function OrderTimeline() {
  const steps = [
    { label: "Order placed", when: "12 Mar, 09:14", state: "done" as const },
    { label: "Payment captured", when: "12 Mar, 09:15", state: "done" as const },
    { label: "Picked and packed", when: "12 Mar, 14:02", state: "done" as const },
    { label: "In transit", when: "Expected 15 Mar", state: "current" as const },
    { label: "Delivered", when: "—", state: "todo" as const },
  ];

  return (
    <ol className="space-y-0">
      {steps.map((step, index) => (
        <li key={step.label} className="relative flex gap-4 pb-6 last:pb-0">
          {/* The connector: a line from this marker down to the next, hidden on the last item.
              `start-*` rather than `left-*`, so it stays under the marker in RTL. */}
          {index < steps.length - 1 && (
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-8 h-full w-px start-[15px]",
                step.state === "done" ? "bg-success/40" : "bg-border",
              )}
            />
          )}

          <span
            className={cn(
              "z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-background",
              step.state === "done" && "border-success text-success",
              step.state === "current" && "border-primary text-primary",
              step.state === "todo" && "border-border text-muted-foreground",
            )}
          >
            {step.state === "done" ? (
              <Check className="h-4 w-4" aria-hidden="true" />
            ) : step.state === "current" ? (
              <Truck className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Circle className="h-2 w-2 fill-current" aria-hidden="true" />
            )}
          </span>

          <div
            className="min-w-0 flex-1 pt-1"
            aria-current={step.state === "current" ? "step" : undefined}
          >
            <p
              className={cn(
                "text-sm",
                step.state === "todo" ? "text-muted-foreground" : "font-medium",
              )}
            >
              {step.label}
            </p>
            <p className="text-xs text-muted-foreground">{step.when}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
