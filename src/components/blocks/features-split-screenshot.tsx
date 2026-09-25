import {
  ArrowRightIcon,
  BellIcon,
  BotIcon,
  CheckIcon,
  HouseIcon,
  InboxIcon,
  LayersIcon,
  MailIcon,
  SettingsIcon,
  TrendingUpIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/velora/blur-fade";
import { BorderBeam } from "@/components/velora/border-beam";
import { BrowserMockup } from "@/components/velora/browser-mockup";
import { cn } from "@/lib/utils";

const HEADING = {
  eyebrow: "Why Acme",
  title: "Less busywork. More of the work that matters.",
  description:
    "Acme gives every team a shared picture of the business and quietly handles the repetitive parts.",
};

const ROWS = [
  {
    eyebrow: "Dashboards",
    title: "See the whole business at a glance",
    description:
      "Pipeline, revenue and customer health live on one screen that updates itself. No spreadsheets to reconcile, no stale exports.",
    points: [
      "Live metrics from every connected source",
      "Drill down from any chart to the underlying records",
      "Share read-only views with a single link",
    ],
    cta: "Explore dashboards",
    url: "app.acme.com/overview",
    screen: DashboardScreen,
  },
  {
    eyebrow: "Automations",
    title: "Let the routine work run itself",
    description:
      "Describe a rule once and Acme follows it forever — routing requests, chasing approvals and keeping everyone in the loop.",
    points: [
      "Visual builder with 40+ triggers and actions",
      "Test runs with real data before you publish",
      "Full history of every run, with one-click retries",
    ],
    cta: "See how automations work",
    url: "app.acme.com/automations",
    screen: AutomationScreen,
  },
];

/**
 * Two alternating feature rows: copy with a checklist on one side and a
 * browser-framed product screen on the other. Screens are plain Tailwind,
 * so they stay sharp and re-theme with your tokens.
 */
export function FeaturesSplitScreenshot() {
  return (
    <section className="overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <BlurFade>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-primary">{HEADING.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
              {HEADING.title}
            </h2>
            <p className="mt-5 text-lg text-pretty text-muted-foreground">
              {HEADING.description}
            </p>
          </div>
        </BlurFade>

        <div className="mt-20 space-y-24 sm:mt-24 sm:space-y-32">
          {ROWS.map(({ screen: Screen, ...row }, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={row.title}
                className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
              >
                <BlurFade direction={flip ? "left" : "right"} className={cn("min-w-0", flip && "lg:order-last")}>
                  <p className="text-sm font-semibold text-primary">{row.eyebrow}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-balance sm:text-4xl">
                    {row.title}
                  </h3>
                  <p className="mt-4 text-lg text-pretty text-muted-foreground">{row.description}</p>
                  <ul className="mt-8 space-y-4">
                    {row.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-from to-brand-to text-brand-foreground">
                          <CheckIcon aria-hidden className="size-3" strokeWidth={3} />
                        </span>
                        <span className="text-sm leading-6">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="mt-10" asChild>
                    <a href="#">
                      {row.cta}
                      <ArrowRightIcon aria-hidden />
                    </a>
                  </Button>
                </BlurFade>

                <BlurFade direction={flip ? "right" : "left"} delay={0.1} className="relative min-w-0">
                  <div
                    aria-hidden
                    className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-brand-from/20 via-brand-via/10 to-brand-to/20 blur-2xl"
                  />
                  <BrowserMockup url={row.url} aria-hidden className="relative">
                    <Screen />
                    <BorderBeam size={120} duration={10} delay={i * 4} />
                  </BrowserMockup>
                </BlurFade>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Product screens (decorative, built with Tailwind) ---------- */

function DashboardScreen() {
  const nav = [
    { icon: HouseIcon, label: "Overview", active: true },
    { icon: InboxIcon, label: "Inbox" },
    { icon: UsersIcon, label: "Customers" },
    { icon: LayersIcon, label: "Projects" },
    { icon: SettingsIcon, label: "Settings" },
  ];
  const kpis = [
    { label: "Revenue", value: "$84.2k", delta: "+12%" },
    { label: "Active users", value: "3,912", delta: "+6%" },
    { label: "Churn", value: "1.8%", delta: "−0.4%" },
  ];
  const bars = [40, 55, 48, 62, 58, 71, 66, 80, 74, 88, 83, 95];
  const deals = [
    { name: "Northwind", stage: "Proposal", value: "$24,000" },
    { name: "Halcyon", stage: "Negotiation", value: "$18,500" },
    { name: "Lumen", stage: "Closed won", value: "$12,900" },
  ];

  return (
    <div className="flex bg-background/60 text-left">
      <div className="hidden w-40 shrink-0 flex-col gap-1 border-r p-3 sm:flex">
        <div className="mb-3 flex items-center gap-2 px-2 py-1">
          <span className="size-5 rounded-md bg-gradient-to-br from-brand-from to-brand-to" />
          <span className="text-xs font-semibold">Acme</span>
        </div>
        {nav.map(({ icon: Icon, label, active }) => (
          <div
            key={label}
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-muted-foreground",
              active && "bg-muted font-medium text-foreground"
            )}
          >
            <Icon className="size-3.5" />
            {label}
          </div>
        ))}
      </div>

      <div className="min-w-0 flex-1 space-y-3 p-3 sm:p-4">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="rounded-lg border bg-card p-2.5 sm:p-3">
              <p className="truncate text-[10px] text-muted-foreground sm:text-[11px]">{kpi.label}</p>
              <p className="mt-1 text-sm font-semibold tracking-tight sm:text-base">{kpi.value}</p>
              <p className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">{kpi.delta}</p>
            </div>
          ))}
        </div>

        <div className="rounded-lg border bg-card p-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-medium">Revenue</span>
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <TrendingUpIcon className="size-3 text-primary" />
              Last 12 months
            </span>
          </div>
          <div className="mt-3 flex h-24 items-end gap-1 sm:h-28 sm:gap-1.5">
            {bars.map((v, i) => (
              <div
                key={i}
                style={{ height: `${v}%` }}
                className={cn(
                  "flex-1 rounded-t-sm",
                  i >= bars.length - 3 ? "bg-gradient-to-t from-brand-from to-brand-to" : "bg-primary/15"
                )}
              />
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-card">
          {deals.map((deal, i) => (
            <div
              key={deal.name}
              className={cn("flex items-center gap-3 px-3 py-2 text-[11px]", i > 0 && "border-t")}
            >
              <span className="grid size-5 place-items-center rounded-full bg-muted text-[9px] font-semibold">
                {deal.name[0]}
              </span>
              <span className="font-medium">{deal.name}</span>
              <span className="hidden text-muted-foreground sm:inline">{deal.stage}</span>
              <span className="ml-auto tabular-nums">{deal.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AutomationScreen() {
  const steps = [
    { icon: MailIcon, kind: "Trigger", title: "New request in Support inbox", meta: "Any sender" },
    { icon: BotIcon, kind: "Action", title: "Classify priority and product area", meta: "AI · 98% confident" },
    { icon: UsersIcon, kind: "Action", title: "Assign to the on-call engineer", meta: "Round robin · Platform team" },
    { icon: BellIcon, kind: "Action", title: "Notify #support-escalations", meta: "Only if priority is urgent" },
  ];

  return (
    <div className="bg-background/60 p-4 text-left sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <ZapIcon className="size-4 text-primary" />
        <p className="text-sm font-medium">Route urgent requests</p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          Live
        </span>
        <span className="ml-auto text-[11px] text-muted-foreground">1,284 runs this week</span>
      </div>

      <ol className="mt-5">
        {steps.map(({ icon: Icon, kind, title, meta }, i) => (
          <li key={title} className="relative flex gap-3 pb-4 last:pb-0">
            {i < steps.length - 1 && (
              <span className="absolute top-9 bottom-0 left-4 w-px -translate-x-1/2 bg-border" />
            )}
            <span
              className={cn(
                "relative grid size-8 shrink-0 place-items-center rounded-lg border bg-card",
                i === 0 && "border-primary/40 bg-primary/10 text-primary"
              )}
            >
              <Icon className="size-4" />
            </span>
            <div className="min-w-0 flex-1 rounded-lg border bg-card px-3 py-2 shadow-sm">
              <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">{kind}</p>
              <p className="truncate text-xs font-medium">{title}</p>
              <p className="truncate text-[11px] text-muted-foreground">{meta}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
