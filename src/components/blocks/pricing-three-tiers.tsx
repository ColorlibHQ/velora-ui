"use client";

import { useState } from "react";
import { CheckIcon, SparklesIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/velora/blur-fade";
import { BorderBeam } from "@/components/velora/border-beam";
import { DotPattern } from "@/components/velora/grid-pattern";
import { NumberTicker } from "@/components/velora/number-ticker";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "yearly";

const YEARLY_DISCOUNT = "Save 20%";

/** Prices are per seat, per month. `yearly` is the monthly equivalent when billed annually. */
const PLANS = [
  {
    name: "Starter",
    description:
      "For solo makers and small teams getting their first project out.",
    price: { monthly: 15, yearly: 12 },
    cta: "Start free trial",
    featured: false,
    features: [
      "Up to 5 members",
      "3 active projects",
      "Docs and roadmaps",
      "Community support",
      "7-day version history",
    ],
  },
  {
    name: "Pro",
    description:
      "For growing teams that ship every week and need room to scale.",
    price: { monthly: 40, yearly: 32 },
    cta: "Start free trial",
    featured: true,
    features: [
      "Unlimited members",
      "Unlimited projects",
      "Release automation",
      "Guest access and client portals",
      "Priority email support",
      "90-day version history",
    ],
  },
  {
    name: "Scale",
    description: "For organisations with security reviews, SSO and many teams.",
    price: { monthly: 90, yearly: 72 },
    cta: "Talk to sales",
    featured: false,
    features: [
      "Everything in Pro",
      "SAML SSO and SCIM",
      "Audit log and data residency",
      "99.9% uptime SLA",
      "Dedicated success manager",
      "Unlimited version history",
    ],
  },
] as const;

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

/**
 * Three plan cards with a monthly/yearly toggle. The toggle is a pair of
 * native radio buttons, so arrow keys and screen readers work for free; the
 * featured plan gets a travelling border beam.
 */
export function PricingThreeTiers() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      <DotPattern
        aria-hidden
        className="absolute inset-0 -z-10 size-full fill-foreground/10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_65%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 mx-auto h-72 max-w-3xl rounded-full bg-gradient-to-r from-brand-from/15 via-brand-via/10 to-brand-to/15 blur-3xl"
      />

      <div className="mx-auto max-w-7xl">
        <BlurFade className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Pricing</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            Plans that grow with your team
          </h2>
          <p className="mt-5 text-lg text-pretty text-muted-foreground">
            Start free for 14 days on any plan. Switch or cancel whenever you
            like — no contracts, no surprises.
          </p>
        </BlurFade>

        <BlurFade delay={0.1} className="mt-10 flex justify-center">
          <fieldset>
            <legend className="sr-only">Billing period</legend>
            <div className="inline-flex items-center gap-1 rounded-full border bg-background/70 p-1 backdrop-blur">
              {(["monthly", "yearly"] as const).map((option) => (
                <label
                  key={option}
                  className={cn(
                    "group/billing relative inline-flex h-9 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                    "has-checked:bg-primary has-checked:text-primary-foreground has-checked:shadow-sm",
                    "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring",
                  )}
                >
                  <input
                    type="radio"
                    name="pricing-three-tiers-billing"
                    value={option}
                    checked={billing === option}
                    onChange={() => setBilling(option)}
                    className="sr-only"
                  />
                  {option === "monthly" ? "Monthly" : "Yearly"}
                  {option === "yearly" && (
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary group-has-checked/billing:bg-primary-foreground/20 group-has-checked/billing:text-primary-foreground"
                    >
                      {YEARLY_DISCOUNT}
                    </Badge>
                  )}
                </label>
              ))}
            </div>
          </fieldset>
        </BlurFade>

        {/* Announces the change once, instead of every price reading out */}
        <p aria-live="polite" className="sr-only">
          {billing === "yearly"
            ? "Showing yearly billing prices, 20% off."
            : "Showing monthly billing prices."}
        </p>

        <div className="mx-auto mt-12 grid max-w-md gap-6 lg:max-w-none lg:grid-cols-3">
          {PLANS.map((plan, i) => {
            const price = plan.price[billing];
            return (
              <BlurFade
                key={plan.name}
                delay={0.15 + i * 0.08}
                className={cn("h-full", plan.featured && "lg:-my-4")}
              >
                <article
                  className={cn(
                    "relative flex h-full flex-col rounded-3xl border bg-card p-8 shadow-sm",
                    plan.featured &&
                      "border-primary/30 bg-gradient-to-b from-primary/[0.07] to-card shadow-xl shadow-primary/10 lg:py-12",
                  )}
                >
                  {plan.featured && <BorderBeam size={120} duration={8} />}

                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    {plan.featured && (
                      <Badge className="gap-1">
                        <SparklesIcon aria-hidden />
                        Most popular
                      </Badge>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-pretty text-muted-foreground">
                    {plan.description}
                  </p>

                  <p className="mt-8 flex items-baseline gap-1.5">
                    <NumberTicker
                      value={price}
                      startValue={plan.price.monthly}
                      prefix="$"
                      className="text-5xl font-semibold tracking-tight"
                    />
                    <span className="text-sm text-muted-foreground">
                      per seat / month
                    </span>
                  </p>
                  <p className="mt-2 h-5 text-sm text-muted-foreground">
                    {billing === "yearly"
                      ? `${usd(price * 12)} billed yearly`
                      : "Billed monthly"}
                  </p>

                  <Button
                    asChild
                    size="lg"
                    variant={plan.featured ? "default" : "outline"}
                    className="mt-8 h-11 w-full rounded-full"
                  >
                    <a href="#">
                      {plan.cta}
                      <span className="sr-only"> — {plan.name} plan</span>
                    </a>
                  </Button>

                  <ul className="mt-8 space-y-3 border-t pt-8 text-sm">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-3">
                        <CheckIcon
                          aria-hidden
                          className={cn(
                            "mt-0.5 size-4 shrink-0",
                            plan.featured
                              ? "text-primary"
                              : "text-muted-foreground",
                          )}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </article>
              </BlurFade>
            );
          })}
        </div>

        <p className="mt-12 text-center text-sm text-muted-foreground">
          Prices in USD, excluding tax. Non-profits and schools get 50% off —{" "}
          <a
            href="#"
            className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
          >
            ask us
          </a>
          .
        </p>
      </div>
    </section>
  );
}
