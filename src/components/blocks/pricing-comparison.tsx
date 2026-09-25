import { CheckIcon, MinusIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlurFade } from "@/components/velora/blur-fade";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "$0",
    period: "free forever",
    cta: "Get started",
    featured: false,
  },
  {
    id: "team",
    name: "Team",
    price: "$24",
    period: "per seat / month",
    cta: "Start free trial",
    featured: true,
  },
  {
    id: "business",
    name: "Business",
    price: "$48",
    period: "per seat / month",
    cta: "Start free trial",
    featured: false,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "billed annually",
    cta: "Contact sales",
    featured: false,
  },
] as const;

type PlanId = (typeof PLANS)[number]["id"];
/** `true` = included, `false` = not included, a string = included with that limit */
type Value = boolean | string;

const GROUPS: {
  name: string;
  features: { name: string; values: Record<PlanId, Value> }[];
}[] = [
  {
    name: "Workspace",
    features: [
      {
        name: "Members",
        values: {
          starter: "Up to 3",
          team: "Unlimited",
          business: "Unlimited",
          enterprise: "Unlimited",
        },
      },
      {
        name: "Projects",
        values: {
          starter: "5",
          team: "Unlimited",
          business: "Unlimited",
          enterprise: "Unlimited",
        },
      },
      {
        name: "File storage",
        values: {
          starter: "2 GB",
          team: "100 GB",
          business: "1 TB",
          enterprise: "Custom",
        },
      },
      {
        name: "Guest access",
        values: {
          starter: false,
          team: true,
          business: true,
          enterprise: true,
        },
      },
      {
        name: "Version history",
        values: {
          starter: "7 days",
          team: "90 days",
          business: "1 year",
          enterprise: "Unlimited",
        },
      },
    ],
  },
  {
    name: "Automation",
    features: [
      {
        name: "Workflow runs",
        values: {
          starter: "250 / month",
          team: "10,000 / month",
          business: "Unlimited",
          enterprise: "Unlimited",
        },
      },
      {
        name: "Integrations",
        values: { starter: true, team: true, business: true, enterprise: true },
      },
      {
        name: "Public API and webhooks",
        values: {
          starter: false,
          team: true,
          business: true,
          enterprise: true,
        },
      },
      {
        name: "Custom AI agents",
        values: {
          starter: false,
          team: false,
          business: true,
          enterprise: true,
        },
      },
    ],
  },
  {
    name: "Security",
    features: [
      {
        name: "Two-factor authentication",
        values: { starter: true, team: true, business: true, enterprise: true },
      },
      {
        name: "SAML SSO",
        values: {
          starter: false,
          team: false,
          business: true,
          enterprise: true,
        },
      },
      {
        name: "SCIM provisioning",
        values: {
          starter: false,
          team: false,
          business: false,
          enterprise: true,
        },
      },
      {
        name: "Audit log",
        values: {
          starter: false,
          team: false,
          business: "90 days",
          enterprise: "Unlimited",
        },
      },
      {
        name: "Data residency",
        values: {
          starter: false,
          team: false,
          business: false,
          enterprise: true,
        },
      },
    ],
  },
  {
    name: "Support",
    features: [
      {
        name: "Help centre and community",
        values: { starter: true, team: true, business: true, enterprise: true },
      },
      {
        name: "Email support",
        values: {
          starter: false,
          team: "48 h",
          business: "4 h",
          enterprise: "1 h",
        },
      },
      {
        name: "Uptime SLA",
        values: {
          starter: false,
          team: false,
          business: "99.9%",
          enterprise: "99.99%",
        },
      },
      {
        name: "Dedicated success manager",
        values: {
          starter: false,
          team: false,
          business: false,
          enterprise: true,
        },
      },
    ],
  },
];

function Cell({ value, featured }: { value: Value; featured?: boolean }) {
  if (value === true) {
    return (
      <>
        <CheckIcon
          aria-hidden
          className={cn(
            "size-5",
            featured ? "text-primary" : "text-foreground/80",
          )}
        />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <MinusIcon aria-hidden className="size-5 text-muted-foreground/50" />
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <span className="text-sm">{value}</span>;
}

/**
 * Full plan comparison. Wide screens get a semantic table with a sticky plan
 * header and grouped rows; below `lg` each plan becomes a tab with its own
 * grouped list, so nothing needs sideways scrolling.
 */
export function PricingComparison() {
  return (
    <section className="px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <BlurFade className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">Compare plans</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            Every feature, side by side
          </h2>
          <p className="mt-5 text-lg text-pretty text-muted-foreground">
            Start free and upgrade when you need more room. Every paid plan
            comes with a free two-week trial.
          </p>
        </BlurFade>

        {/* Below lg: one plan at a time */}
        <div className="mx-auto mt-12 max-w-xl lg:hidden">
          <Tabs defaultValue="team">
            <TabsList
              aria-label="Choose a plan"
              className="h-auto! w-full flex-wrap gap-1 rounded-xl p-1"
            >
              {PLANS.map((plan) => (
                <TabsTrigger
                  key={plan.id}
                  value={plan.id}
                  className="h-9 min-w-[calc(50%-0.25rem)] rounded-lg sm:min-w-0"
                >
                  {plan.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {PLANS.map((plan) => (
              <TabsContent key={plan.id} value={plan.id} className="mt-4">
                <div
                  className={cn(
                    "rounded-3xl border bg-card p-6 sm:p-8",
                    plan.featured &&
                      "border-primary/30 shadow-lg shadow-primary/10",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    {plan.featured && <Badge>Most popular</Badge>}
                  </div>
                  <p className="mt-4 flex flex-wrap items-baseline gap-x-2">
                    <span className="text-4xl font-semibold tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {plan.period}
                    </span>
                  </p>
                  <Button
                    asChild
                    size="lg"
                    variant={plan.featured ? "default" : "outline"}
                    className="mt-6 h-11 w-full rounded-full"
                  >
                    <a href="#">
                      {plan.cta}
                      <span className="sr-only"> — {plan.name} plan</span>
                    </a>
                  </Button>

                  {GROUPS.map((group) => (
                    <div key={group.name} className="mt-8">
                      <h4 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        {group.name}
                      </h4>
                      <ul className="mt-3 divide-y border-y">
                        {group.features.map((feature) => {
                          const value = feature.values[plan.id];
                          return (
                            <li
                              key={feature.name}
                              className={cn(
                                "flex items-center justify-between gap-4 py-3 text-sm",
                                value === false && "text-muted-foreground",
                              )}
                            >
                              <span>{feature.name}</span>
                              <span className="flex shrink-0 items-center text-right">
                                <Cell value={value} featured={plan.featured} />
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* lg and up: the full table */}
        <div className="mt-16 hidden lg:block">
          <table className="w-full table-fixed border-separate border-spacing-0 text-left">
            <caption className="sr-only">
              Feature comparison of the Starter, Team, Business and Enterprise
              plans
            </caption>
            <colgroup>
              <col className="w-[28%]" />
              {PLANS.map((plan) => (
                <col key={plan.id} />
              ))}
            </colgroup>
            <thead>
              <tr>
                <td className="sticky top-0 z-10 border-b bg-background/85 pb-6 backdrop-blur-md" />
                {PLANS.map((plan) => (
                  <th
                    key={plan.id}
                    scope="col"
                    className={cn(
                      "sticky top-0 z-10 border-b bg-background/85 px-4 pt-6 pb-6 align-bottom font-normal backdrop-blur-md",
                      plan.featured &&
                        "before:pointer-events-none before:absolute before:inset-0 before:rounded-t-2xl before:bg-primary/[0.04]",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center gap-2",
                        plan.featured && "text-primary",
                      )}
                    >
                      <span className="text-base font-semibold">
                        {plan.name}
                      </span>
                      {plan.featured && <Badge>Popular</Badge>}
                    </div>
                    <p className="mt-2">
                      <span className="block text-3xl font-semibold tracking-tight text-foreground">
                        {plan.price}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {plan.period}
                      </span>
                    </p>
                    <Button
                      asChild
                      variant={plan.featured ? "default" : "outline"}
                      className="mt-4 h-9 w-full rounded-full"
                    >
                      <a href="#">
                        {plan.cta}
                        <span className="sr-only"> — {plan.name} plan</span>
                      </a>
                    </Button>
                  </th>
                ))}
              </tr>
            </thead>

            {GROUPS.map((group) => (
              <tbody key={group.name}>
                <tr>
                  <th
                    scope="rowgroup"
                    className="pt-10 pb-3 text-sm font-semibold"
                  >
                    {group.name}
                  </th>
                  {PLANS.map((plan) => (
                    <td
                      key={plan.id}
                      className={cn(plan.featured && "bg-primary/[0.04]")}
                    />
                  ))}
                </tr>
                {group.features.map((feature) => (
                  <tr key={feature.name} className="group/row">
                    <th
                      scope="row"
                      className="border-t py-3.5 pr-4 text-sm font-normal text-muted-foreground group-hover/row:text-foreground"
                    >
                      {feature.name}
                    </th>
                    {PLANS.map((plan) => (
                      <td
                        key={plan.id}
                        className={cn(
                          "border-t px-4 py-3.5 group-hover/row:bg-muted/40",
                          plan.featured &&
                            "bg-primary/[0.04] group-hover/row:bg-primary/[0.08]",
                        )}
                      >
                        <span className="flex items-center">
                          <Cell
                            value={feature.values[plan.id]}
                            featured={plan.featured}
                          />
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </section>
  );
}
