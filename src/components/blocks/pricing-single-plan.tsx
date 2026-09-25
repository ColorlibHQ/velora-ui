import {
  ArrowRightIcon,
  CheckIcon,
  InfinityIcon,
  LifeBuoyIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AvatarCircles } from "@/components/velora/avatar-circles";
import { BlurFade } from "@/components/velora/blur-fade";
import { GlowingEffect } from "@/components/velora/glowing-effect";
import { GridPattern } from "@/components/velora/grid-pattern";
import { SpotlightCard } from "@/components/velora/spotlight-card";

const PLAN = {
  name: "Acme Complete",
  price: 29,
  unit: "per seat / month",
  note: "Billed yearly, or $35 month to month",
  included: [
    "Unlimited projects and docs",
    "Roadmaps, releases and changelog",
    "Automations and integrations",
    "Guest access and client portals",
    "SSO and granular permissions",
    "Unlimited version history",
    "Analytics and custom reports",
    "Priority support, every day",
  ],
};

const BENEFITS = [
  {
    icon: InfinityIcon,
    title: "No feature gates",
    description:
      "Every seat gets every feature from day one. No upsells hiding behind a tier.",
  },
  {
    icon: UsersIcon,
    title: "Pay for people, not usage",
    description:
      "Guests and viewers are free. You only pay for teammates who edit.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure by default",
    description:
      "SOC 2 Type II, encryption at rest and in transit, EU or US data residency.",
  },
  {
    icon: LifeBuoyIcon,
    title: "Humans on support",
    description: "Real engineers answer within four hours, including weekends.",
  },
];

const REASSURANCES = [
  {
    question: "Is there a free trial?",
    answer: "Yes — 14 days with every feature, no card required.",
  },
  {
    question: "Can I cancel at any time?",
    answer: "Cancel in two clicks and we refund unused months on yearly plans.",
  },
  {
    question: "Do you offer discounts?",
    answer: "Non-profits, schools and early-stage startups get 50% off.",
  },
];

const CUSTOMERS = [
  "Mara Lind",
  "Theo Brandt",
  "Ines Okafor",
  "Kai Sato",
  "Rhea Patel",
];

/**
 * One all-inclusive plan: a spotlight card with the price and everything it
 * includes, beside the reasons to pick it and quick answers to the usual
 * objections.
 */
export function PricingSinglePlan() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      <GridPattern
        aria-hidden
        className="absolute inset-0 -z-10 size-full stroke-foreground/[0.06] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_60%)]"
      />

      <div className="mx-auto max-w-7xl">
        <BlurFade className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Pricing</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            One plan. Everything included.
          </h2>
          <p className="mt-5 text-lg text-pretty text-muted-foreground">
            No tiers to compare and no add-ons to budget for. Pick the number of
            seats, and your whole team gets the full product.
          </p>
        </BlurFade>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <BlurFade delay={0.1} className="lg:col-span-6 xl:col-span-7">
            <div className="relative rounded-3xl">
              <SpotlightCard
                radius={420}
                className="rounded-3xl shadow-xl shadow-primary/5"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-primary/10 to-transparent"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-brand-via to-transparent"
                />
                <div className="relative p-8 sm:p-10">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold">{PLAN.name}</h3>
                    <Badge variant="secondary">14-day free trial</Badge>
                  </div>

                  <p className="mt-8 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-6xl font-semibold tracking-tight text-transparent tabular-nums">
                      ${PLAN.price}
                    </span>
                    <span className="text-muted-foreground">{PLAN.unit}</span>
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {PLAN.note}
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button
                      asChild
                      size="lg"
                      className="h-11 rounded-full px-6"
                    >
                      <a href="#">
                        Start your free trial <ArrowRightIcon />
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="h-11 rounded-full px-6"
                    >
                      <a href="#">Talk to sales</a>
                    </Button>
                  </div>

                  <div className="mt-10 border-t pt-8">
                    <p className="text-sm font-medium">
                      Everything in the plan
                    </p>
                    <ul className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                      {PLAN.included.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                            <CheckIcon aria-hidden className="size-3" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl bg-muted/60 p-4">
                    <AvatarCircles people={CUSTOMERS} extra={99} aria-hidden />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        12,000+ teams
                      </span>{" "}
                      switched to Acme this year.
                    </p>
                  </div>
                </div>
              </SpotlightCard>
              <GlowingEffect proximity={96} spread={60} />
            </div>
          </BlurFade>

          <div className="lg:col-span-6 xl:col-span-5">
            <BlurFade delay={0.2}>
              <h3 className="text-lg font-semibold">Why a single plan</h3>
              <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {BENEFITS.map(({ icon: Icon, title, description }) => (
                  <li key={title}>
                    <span className="grid size-10 place-items-center rounded-xl border bg-card shadow-xs">
                      <Icon aria-hidden className="size-5 text-primary" />
                    </span>
                    <p className="mt-4 font-medium">{title}</p>
                    <p className="mt-1 text-sm text-pretty text-muted-foreground">
                      {description}
                    </p>
                  </li>
                ))}
              </ul>
            </BlurFade>

            <BlurFade delay={0.3} className="mt-12 border-t pt-10">
              <h3 className="text-lg font-semibold">Good to know</h3>
              <dl className="mt-6 space-y-6">
                {REASSURANCES.map(({ question, answer }) => (
                  <div key={question}>
                    <dt className="font-medium">{question}</dt>
                    <dd className="mt-1 text-sm text-pretty text-muted-foreground">
                      {answer}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-8 text-sm text-muted-foreground">
                More questions?{" "}
                <a
                  href="#"
                  className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
                >
                  Read the billing FAQ
                </a>
              </p>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
