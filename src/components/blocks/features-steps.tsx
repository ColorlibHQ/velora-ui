import {
  CalendarIcon,
  CircleCheckIcon,
  CloudIcon,
  DatabaseIcon,
  FileTextIcon,
  MailIcon,
  MessageSquareIcon,
} from "lucide-react";

import { AvatarCircles } from "@/components/velora/avatar-circles";
import { BlurFade } from "@/components/velora/blur-fade";
import { BorderBeam } from "@/components/velora/border-beam";
import { NumberTicker } from "@/components/velora/number-ticker";
import { cn } from "@/lib/utils";

const HEADING = {
  eyebrow: "How it works",
  title: "Up and running in an afternoon",
  description:
    "No migration project, no consultants. Most teams go from sign-up to their first release in under a day.",
};

const STEPS = [
  {
    title: "Connect your tools",
    description: "Link your repo, inbox and calendar with one-click OAuth. Nothing to install.",
    visual: ConnectVisual,
  },
  {
    title: "Import your work",
    description: "Bring issues, docs and history across from your old tracker in minutes.",
    visual: ImportVisual,
  },
  {
    title: "Invite your team",
    description: "Add teammates by email or SSO. Roles and permissions are set up for you.",
    visual: InviteVisual,
  },
  {
    title: "Ship with confidence",
    description: "Plan, review and release from one place, with every change tracked end to end.",
    visual: ShipVisual,
  },
];

/**
 * "How it works" in four numbered steps joined by a gradient connector —
 * vertical on small screens, horizontal from `lg`. Each step carries a small
 * Tailwind-built visual; edit STEPS to change them.
 */
export function FeaturesSteps() {
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

        <ol className="mx-auto mt-16 grid max-w-xl gap-12 sm:mt-20 lg:max-w-none lg:grid-cols-4 lg:gap-8">
          {STEPS.map(({ title, description, visual: Visual }, i) => (
            <li key={title} className="relative grid grid-cols-[2.5rem_1fr] gap-x-5 lg:grid-cols-1 lg:gap-y-6">
              {i < STEPS.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-12 -bottom-10 left-5 w-px -translate-x-1/2 bg-gradient-to-b from-brand-from/70 to-brand-to/30 lg:top-5 lg:-right-4 lg:bottom-auto lg:left-14 lg:h-px lg:w-auto lg:translate-x-0 lg:bg-gradient-to-r"
                />
              )}
              <BlurFade delay={0.1 * i}>
                <span className="relative grid size-10 place-items-center rounded-full border bg-background text-sm font-semibold shadow-sm">
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-from/15 to-brand-to/15" />
                  <span className="relative bg-gradient-to-br from-brand-from to-brand-to bg-clip-text text-transparent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
              </BlurFade>
              <BlurFade delay={0.1 * i + 0.05} className="flex flex-col gap-6">
                <div aria-hidden className={cn("relative h-36 overflow-hidden rounded-xl border bg-card p-4 shadow-sm", i === STEPS.length - 1 && "border-primary/30")}>
                  <Visual />
                  {i === STEPS.length - 1 && <BorderBeam size={80} duration={8} />}
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-pretty text-muted-foreground">
                    {description}
                  </p>
                </div>
              </BlurFade>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Step visuals (decorative) ---------- */

function ConnectVisual() {
  const apps = [
    { icon: DatabaseIcon, name: "Database", on: true },
    { icon: MailIcon, name: "Mail", on: true },
    { icon: CalendarIcon, name: "Calendar", on: false },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-2">
      {apps.map(({ icon: Icon, name, on }) => (
        <div key={name} className="flex items-center gap-2.5 text-xs">
          <span className="grid size-6 place-items-center rounded-md border bg-muted/60">
            <Icon className="size-3.5 text-muted-foreground" />
          </span>
          <span className="font-medium">{name}</span>
          <span
            className={cn(
              "ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium",
              on ? "bg-primary/10 text-primary" : "border text-muted-foreground"
            )}
          >
            {on ? "Connected" : "Connect"}
          </span>
        </div>
      ))}
    </div>
  );
}

function ImportVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <div className="flex items-baseline justify-between text-xs">
        <span className="font-medium">Importing issues</span>
        <span className="text-muted-foreground tabular-nums">
          <NumberTicker value={1284} /> / 1,780
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-brand-from to-brand-to" />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {[
          { icon: FileTextIcon, label: "Docs" },
          { icon: MessageSquareIcon, label: "Comments" },
          { icon: CloudIcon, label: "Files" },
        ].map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1 rounded-md border bg-muted/50 px-1.5 py-0.5 text-[10px] text-muted-foreground"
          >
            <Icon className="size-3" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function InviteVisual() {
  return (
    <div className="flex h-full flex-col justify-center gap-3">
      <AvatarCircles
        people={["Maya Kim", "Jon Lee", "Ana Ruiz", "Sam Obi"]}
        extra={12}
      />
      <div className="flex items-center gap-2 rounded-lg border bg-background px-2.5 py-1.5 text-xs">
        <span className="truncate text-muted-foreground">dev@northwind.io</span>
        <span className="ml-auto shrink-0 rounded-md bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
          Invite
        </span>
      </div>
    </div>
  );
}

function ShipVisual() {
  const heights = [30, 42, 36, 55, 48, 66, 60, 78, 90];
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center gap-2 text-xs">
        <CircleCheckIcon className="size-4 text-emerald-500" />
        <span className="font-medium">v2.14 is live</span>
        <span className="ml-auto text-[10px] text-muted-foreground">just now</span>
      </div>
      <div className="flex h-16 items-end gap-1">
        {heights.map((v, i) => (
          <div
            key={i}
            style={{ height: `${v}%` }}
            className={cn(
              "flex-1 rounded-t-sm",
              i === heights.length - 1 ? "bg-gradient-to-t from-brand-from to-brand-to" : "bg-primary/15"
            )}
          />
        ))}
      </div>
    </div>
  );
}
