import {
  ArrowRightIcon,
  ChartColumnIcon,
  LockIcon,
  PlugIcon,
  UsersIcon,
  WorkflowIcon,
  ZapIcon,
} from "lucide-react";

import { BlurFade } from "@/components/velora/blur-fade";
import { GlowingEffect } from "@/components/velora/glowing-effect";

const HEADING = {
  eyebrow: "Features",
  title: "Built for teams that move fast",
  description:
    "Every part of Acme is designed to remove a step, not add one. Here is what you get on day one.",
};

const FEATURES = [
  {
    icon: ZapIcon,
    title: "Instant sync",
    description:
      "Changes land on every device in milliseconds, even on patchy connections. Offline edits merge on reconnect.",
  },
  {
    icon: WorkflowIcon,
    title: "Automations",
    description:
      "Build if-this-then-that rules in plain language. Assign, label, notify and close without lifting a finger.",
  },
  {
    icon: UsersIcon,
    title: "Real-time collaboration",
    description:
      "See who is viewing, editing and typing. Comments, mentions and reactions keep threads out of your inbox.",
  },
  {
    icon: ChartColumnIcon,
    title: "Insights",
    description:
      "Cycle time, throughput and burndown charts that build themselves from the work you are already doing.",
  },
  {
    icon: LockIcon,
    title: "Secure by default",
    description:
      "SSO, SCIM, audit logs and encryption at rest on every plan. SOC 2 Type II reports on request.",
  },
  {
    icon: PlugIcon,
    title: "API and webhooks",
    description:
      "A typed REST and GraphQL API with webhooks for every event, so Acme fits into the stack you already have.",
  },
];

const FOOTNOTE = { text: "Need something we don't cover?", link: "Talk to our team" };

/**
 * Six feature cards in a three-column grid. Each card's border lights up
 * along the side nearest the pointer. Swap the icons and copy in FEATURES.
 */
export function FeaturesIconGrid() {
  return (
    <section className="px-6 py-24 sm:py-32 lg:px-8">
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

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }, i) => (
            <li key={title}>
              <BlurFade delay={0.05 * i} className="h-full">
                <div className="relative h-full rounded-2xl border p-1.5">
                  <GlowingEffect proximity={80} spread={70} />
                  <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-xl border bg-card p-6 shadow-sm">
                    <div
                      aria-hidden
                      className="absolute -top-16 -right-16 size-40 rounded-full bg-brand/5 blur-2xl"
                    />
                    <div className="relative grid size-11 place-items-center rounded-lg border bg-gradient-to-br from-brand-from/15 to-brand-to/5 text-primary">
                      <Icon aria-hidden className="size-5" />
                    </div>
                    <h3 className="relative text-lg font-semibold tracking-tight">{title}</h3>
                    <p className="relative text-sm leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              </BlurFade>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-center text-sm text-muted-foreground">
          {FOOTNOTE.text}{" "}
          <a
            href="#"
            className="inline-flex items-center gap-1 rounded-sm font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {FOOTNOTE.link}
            <ArrowRightIcon aria-hidden className="size-3.5" />
          </a>
        </p>
      </div>
    </section>
  );
}
