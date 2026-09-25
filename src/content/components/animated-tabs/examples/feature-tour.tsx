import { Check } from "lucide-react";

import { AnimatedTabs } from "@/components/velora/animated-tabs";

function Feature({
  eyebrow,
  heading,
  body,
  points,
  children,
}: {
  eyebrow: string;
  heading: string;
  body: string;
  points: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="@container">
      <div className="grid gap-8 p-6 @xl:grid-cols-2 @xl:p-8">
        <div className="space-y-3">
          <p className="text-xs font-semibold tracking-wider text-brand uppercase">
            {eyebrow}
          </p>
          <h3 className="text-2xl font-semibold tracking-tight">{heading}</h3>
          <p className="text-sm text-muted-foreground">{body}</p>
          <ul className="space-y-2 pt-1 text-sm">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <Check className="size-4 text-brand" aria-hidden />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border bg-muted/40 p-4" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

const tabs = [
  {
    value: "analytics",
    title: "Analytics",
    content: (
      <Feature
        eyebrow="Analytics"
        heading="See what moves the needle"
        body="Live dashboards that update as events arrive — no nightly batch jobs."
        points={["Funnels and retention", "Custom events", "CSV and API export"]}
      >
        <div className="flex h-40 items-end gap-1.5">
          {[30, 45, 38, 60, 52, 74, 66, 88, 80, 95].map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%` }}
              className="flex-1 rounded-t bg-linear-to-t from-brand-from/60 to-brand-to"
            />
          ))}
        </div>
      </Feature>
    ),
  },
  {
    value: "automations",
    title: "Automations",
    content: (
      <Feature
        eyebrow="Automations"
        heading="Workflows that run themselves"
        body="Chain triggers and actions visually, then let them run on every event."
        points={["40+ triggers", "Branching and delays", "Run history with replays"]}
      >
        <div className="flex flex-col items-center gap-2 py-2 text-xs font-medium">
          {["New signup", "Wait 1 day", "Send welcome email"].map((step, i) => (
            <div key={step} className="flex flex-col items-center gap-2">
              {i > 0 && <span className="h-4 w-px bg-border" />}
              <span className="rounded-lg border bg-card px-4 py-2 shadow-sm">
                {step}
              </span>
            </div>
          ))}
        </div>
      </Feature>
    ),
  },
  {
    value: "collaboration",
    title: "Collaboration",
    content: (
      <Feature
        eyebrow="Collaboration"
        heading="Decide together, in context"
        body="Comment on any chart or row and mention teammates where the work lives."
        points={["Threads on every object", "Mentions and assignees", "Slack sync"]}
      >
        <div className="space-y-3">
          {[
            ["MK", "Can we split this by region?"],
            ["JT", "Done — EMEA is up 18% week over week."],
          ].map(([who, text]) => (
            <div key={who} className="flex items-start gap-2">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand text-[10px] font-semibold text-brand-foreground">
                {who}
              </span>
              <p className="rounded-lg rounded-tl-none border bg-card px-3 py-2 text-xs">
                {text}
              </p>
            </div>
          ))}
        </div>
      </Feature>
    ),
  },
  {
    value: "security",
    title: "Security",
    content: (
      <Feature
        eyebrow="Security"
        heading="Enterprise-ready from day one"
        body="Single sign-on, audit logs and fine-grained roles on every plan."
        points={["SAML and SCIM", "Audit log retention", "SOC 2 Type II"]}
      >
        <div className="space-y-2 text-xs">
          {["SSO enforced", "2FA required", "Data encrypted at rest"].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-lg border bg-card px-3 py-2"
            >
              {item}
              <span className="h-4 w-7 rounded-full bg-brand p-0.5">
                <span className="ml-auto block size-3 rounded-full bg-brand-foreground" />
              </span>
            </div>
          ))}
        </div>
      </Feature>
    ),
  },
];

export default function AnimatedTabsFeatureTourDemo() {
  return <AnimatedTabs tabs={tabs} defaultValue="analytics" className="max-w-3xl" />;
}
