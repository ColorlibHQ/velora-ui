"use client";

import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const PLANS = [
  { name: "Starter", price: 0, blurb: "For trying things out.", features: ["1 project", "7-day history", "Community support"] },
  { name: "Team", price: 29, blurb: "For a working team.", features: ["10 projects", "90-day history", "Email support", "Shared views"], featured: true },
  { name: "Business", price: 79, blurb: "For an organisation.", features: ["Unlimited projects", "2-year history", "Priority support", "SSO and SCIM", "Audit log"] },
];

/**
 * Plan cards with one recommended.
 *
 * The featured plan is raised with a ring and a badge rather than being made larger — a taller
 * card breaks the row's alignment and makes the feature lists stop lining up, which is exactly
 * what someone comparing plans is trying to do.
 *
 * "Free" rather than "$0": the price line is read as a label, and $0/month invites the question
 * of what happens at the end of the month.
 */
export function CommercePlanCard() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {PLANS.map((plan) => (
        <Card
          key={plan.name}
          className={cn("relative flex flex-col", plan.featured && "ring-2 ring-primary")}
        >
          {plan.featured && (
            <Badge className="absolute -top-2.5 start-4 text-[10px]">Recommended</Badge>
          )}

          <CardContent className="flex flex-1 flex-col gap-4 p-5">
            <div>
              <p className="font-semibold">{plan.name}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{plan.blurb}</p>
            </div>

            <p className="flex items-baseline gap-1">
              <span className="text-2xl font-bold tabular-nums">
                {plan.price === 0 ? "Free" : `$${plan.price}`}
              </span>
              {plan.price > 0 && (
                <span className="text-sm text-muted-foreground">/ user / month</span>
              )}
            </p>

            <ul className="flex-1 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-success" aria-hidden="true" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button variant={plan.featured ? "default" : "outline"} size="sm" className="w-full">
              {plan.price === 0 ? "Start free" : `Choose ${plan.name}`}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
