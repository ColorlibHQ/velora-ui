import { ArrowRightIcon, CheckCircle2Icon, RocketIcon, TrendingUpIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BorderBeam } from "@/components/velora/border-beam";
import { DotPattern } from "@/components/velora/grid-pattern";
import { Meteors } from "@/components/velora/meteors";

const EYEBROW = "Lumen Analytics";
const TITLE = "See what your users do — before they tell you";
const COPY =
  "Connect your product in five minutes and get live funnels, retention and release impact on one screen.";
const BENEFITS = [
  "Self-serve dashboards for every team",
  "Alerts when a release moves a metric",
  "Privacy-first: no cookies, EU hosting",
];
const PRIMARY = { label: "Start a free trial", href: "#" };
const SECONDARY = { label: "See a live demo", href: "#" };

// Sample data for the dashboard mock-up (weekly active users, in thousands).
const BARS = [38, 52, 46, 61, 58, 72, 69, 84, 78, 92, 88, 100];
const STATS = [
  { label: "Weekly active", value: "12,480", delta: "+18%" },
  { label: "Retention", value: "64%", delta: "+4.2%" },
];

/**
 * Split call-to-action card: copy, benefits and two actions on one side, a
 * Tailwind-built dashboard mock-up on the other, with a beam tracing the
 * card's border. Swap the mock-up for a screenshot if you have one.
 */
export function CtaSplitImage() {
  return (
    <section className="px-6 py-24 sm:py-32 lg:px-8">
      <div className="relative mx-auto grid max-w-7xl overflow-hidden rounded-3xl border bg-card shadow-sm lg:grid-cols-2">
        <BorderBeam size={120} duration={9} />

        <div className="flex flex-col justify-center px-6 py-14 sm:px-12 sm:py-16 lg:py-20">
          <p className="text-sm font-medium text-primary">{EYEBROW}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {TITLE}
          </h2>
          <p className="mt-5 text-base text-pretty text-muted-foreground sm:text-lg">{COPY}</p>

          <ul className="mt-8 space-y-3">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 text-sm sm:text-base">
                <CheckCircle2Icon aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
                {benefit}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-11 rounded-full px-6">
              <a href={PRIMARY.href}>
                {PRIMARY.label}
                <ArrowRightIcon aria-hidden />
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="h-11 rounded-full px-6">
              <a href={SECONDARY.href}>{SECONDARY.label}</a>
            </Button>
          </div>
        </div>

        <div className="relative isolate flex items-center overflow-hidden border-t bg-muted/40 px-6 py-14 sm:px-12 lg:border-t-0 lg:border-l lg:py-20">
          <DotPattern
            aria-hidden
            className="-z-10 fill-foreground/15 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
          />
          <div
            aria-hidden
            className="absolute -top-24 -right-24 -z-10 size-80 rounded-full bg-brand-to/25 blur-3xl"
          />
          <Meteors number={10} />

          <DashboardMock />
        </div>
      </div>
    </section>
  );
}

function DashboardMock() {
  return (
    <div
      role="img"
      aria-label="Lumen dashboard: weekly active users up 18% to 12,480 and retention up to 64%, with a rising twelve-week bar chart."
      className="relative mx-auto w-full max-w-md"
    >
      <div className="rounded-2xl border bg-background/90 shadow-xl shadow-brand/10 backdrop-blur">
        <div className="flex items-center gap-1.5 border-b px-4 py-3">
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="size-2.5 rounded-full bg-muted-foreground/30" />
          <span className="ml-3 text-xs text-muted-foreground">lumen.app/overview</span>
        </div>

        <div className="grid grid-cols-2 gap-3 p-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-xl border bg-card p-3">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="mt-1 text-xl font-semibold tabular-nums">{stat.value}</p>
              <p className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary">
                <TrendingUpIcon className="size-3.5" />
                {stat.delta}
              </p>
            </div>
          ))}
        </div>

        <div className="px-4 pb-4">
          <div className="rounded-xl border bg-card p-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Active users · 12 weeks</span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">
                Live
              </span>
            </div>
            <div className="mt-4 flex h-28 items-end gap-1.5">
              {BARS.map((value, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-brand-from/70 to-brand-to"
                  style={{ height: `${value}%`, opacity: 0.45 + (i / BARS.length) * 0.55 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-6 -left-3 flex items-center gap-3 rounded-xl border bg-background px-3 py-2.5 shadow-lg sm:-left-8">
        <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
          <RocketIcon className="size-4" />
        </span>
        <div className="text-xs">
          <p className="font-medium">Release 4.2 shipped</p>
          <p className="text-muted-foreground">Sign-ups +9% since launch</p>
        </div>
      </div>
    </div>
  );
}
