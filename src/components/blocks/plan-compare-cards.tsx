"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Minus } from "lucide-react";

/**
 * Pricing cards with a billing-period switch that states the saving.
 *
 * Annual prices are derived from the monthly figure and a discount rate, so the "save 20%" badge
 * and the number can never contradict each other — which they do in most pricing sections, because
 * both are typed by hand.
 *
 * Absent features get an explicit dash rather than being omitted. Different-length lists make the
 * cards impossible to compare row by row, which is the entire job of a pricing table.
 *
 * The period switch is a `radiogroup`: exactly one period applies, and two `aria-pressed` toggles
 * would let assistive tech report both as active.
 */
export function PlanCompareCards() {
  const [annual, setAnnual] = useState(true);
  const DISCOUNT = 0.2;

  const plans = [
    { name: "Starter", monthly: 19, blurb: "For a single project", features: [true, true, false, false] },
    { name: "Pro", monthly: 49, blurb: "For a small team", features: [true, true, true, false], popular: true },
    { name: "Scale", monthly: 149, blurb: "For an organisation", features: [true, true, true, true] },
  ];

  const featureNames = ["Unlimited projects", "Saved views & export", "RBAC and audit log", "SSO and SLA"];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center gap-3">
        <div role="radiogroup" aria-label="Billing period" className="inline-flex rounded-md bg-muted p-0.5">
          {[
            { id: "monthly", label: "Monthly", value: false },
            { id: "annual", label: "Annual", value: true },
          ].map((option) => (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={annual === option.value}
              tabIndex={annual === option.value ? 0 : -1}
              onClick={() => setAnnual(option.value)}
              className={cn(
                "rounded px-3 py-1 text-xs font-medium transition-colors",
                annual === option.value
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
        {annual && (
          <Badge variant="success" className="text-[10px]">
            Save {Math.round(DISCOUNT * 100)}%
          </Badge>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {plans.map((plan) => {
          // Derived, so the badge and the price cannot disagree.
          const price = annual ? Math.round(plan.monthly * (1 - DISCOUNT)) : plan.monthly;
          return (
            <div
              key={plan.name}
              className={cn(
                "flex flex-col gap-4 rounded-lg border p-4",
                plan.popular && "border-primary shadow-sm",
              )}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold">{plan.name}</p>
                  {plan.popular && <Badge className="text-[10px]">Most popular</Badge>}
                </div>
                <p className="text-xs text-muted-foreground">{plan.blurb}</p>
              </div>

              <p className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tabular-nums">${price}</span>
                <span className="text-xs text-muted-foreground">/ month</span>
              </p>

              <ul className="flex-1 space-y-1.5">
                {featureNames.map((feature, index) => (
                  <li key={feature} className="flex items-start gap-2 text-xs">
                    {plan.features[index] ? (
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
                    ) : (
                      <Minus className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/50" aria-hidden="true" />
                    )}
                    <span className={plan.features[index] ? undefined : "text-muted-foreground"}>
                      {feature}
                      <span className="sr-only">
                        {plan.features[index] ? " — included" : " — not included"}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <Button variant={plan.popular ? "default" : "outline"} className="w-full">
                Choose {plan.name}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
