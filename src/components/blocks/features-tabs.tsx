import {
  ArrowRightIcon,
  ChartColumnIcon,
  CheckIcon,
  CircleCheckIcon,
  GitPullRequestIcon,
  KanbanIcon,
  LoaderCircleIcon,
  RocketIcon,
} from "lucide-react";

import { AnimatedTabs } from "@/components/velora/animated-tabs";
import { BlurFade } from "@/components/velora/blur-fade";
import { cn } from "@/lib/utils";

const HEADING = {
  eyebrow: "Product tour",
  title: "From idea to impact, without switching tabs",
  description:
    "Plan the work, review the code, ship the release and measure the result — all in the same calm workspace.",
};

const TOUR = [
  {
    value: "plan",
    label: "Plan",
    cta: "Explore planning",
    icon: KanbanIcon,
    title: "Roadmaps that stay honest",
    description:
      "Break goals into projects and issues, then drag them across the board. Priorities and estimates roll up automatically.",
    points: ["Boards, lists and timelines", "Cycles with automatic rollover", "Linked docs and specs"],
    mock: PlanMock,
  },
  {
    value: "build",
    label: "Build",
    cta: "Explore code review",
    icon: GitPullRequestIcon,
    title: "Reviews in the flow of work",
    description:
      "Pull requests link to their issues, so reviewers get the full context and the issue moves itself when the code merges.",
    points: ["Branch names generated for you", "Inline diffs with comments", "Status checks on every issue"],
    mock: BuildMock,
  },
  {
    value: "ship",
    label: "Ship",
    cta: "Explore releases",
    icon: RocketIcon,
    title: "Releases without the checklist",
    description:
      "Promote builds from preview to production with one click. Acme writes the changelog from what actually shipped.",
    points: ["Preview links for every change", "Staged rollouts and instant rollback", "Auto-drafted release notes"],
    mock: ShipMock,
  },
  {
    value: "measure",
    label: "Measure",
    cta: "Explore insights",
    icon: ChartColumnIcon,
    title: "Know what moved the needle",
    description:
      "Tie every release to adoption and revenue. Dashboards update live and share with a link — no exports.",
    points: ["Adoption per feature", "Cycle time and throughput", "Shareable live dashboards"],
    mock: MeasureMock,
  },
];

/**
 * Product tour: animated tabs, each pairing short copy and a checklist with
 * a Tailwind-built mock of the product. Edit TOUR to change the steps.
 */
export function FeaturesTabs() {
  return (
    <section className="px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl">
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

        <BlurFade delay={0.1}>
          <AnimatedTabs
            className="mt-12 gap-8"
            listClassName="self-center"
            tabs={TOUR.map(({ value, label, icon: Icon, mock: Mock, ...copy }) => ({
              value,
              title: (
                <span className="flex items-center gap-2">
                  <Icon aria-hidden className="hidden size-4 sm:block" />
                  {label}
                </span>
              ),
              content: (
                <div className="grid h-full gap-8 p-6 sm:p-8 lg:grid-cols-5 lg:items-center lg:gap-12 lg:p-10">
                  <div className="lg:col-span-2">
                    <h3 className="text-2xl font-semibold tracking-tight">{copy.title}</h3>
                    <p className="mt-3 text-pretty text-muted-foreground">{copy.description}</p>
                    <ul className="mt-6 space-y-3 text-sm">
                      {copy.points.map((point) => (
                        <li key={point} className="flex items-center gap-3">
                          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                            <CheckIcon aria-hidden className="size-3" />
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#"
                      className="mt-8 inline-flex items-center gap-1 rounded-sm text-sm font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {copy.cta}
                      <ArrowRightIcon aria-hidden className="size-4" />
                    </a>
                  </div>
                  <div
                    aria-hidden
                    className="relative overflow-hidden rounded-xl border bg-muted/40 p-3 sm:p-5 lg:col-span-3"
                  >
                    <div className="absolute -top-24 -right-24 size-64 rounded-full bg-brand/10 blur-3xl" />
                    <div className="relative">
                      <Mock />
                    </div>
                  </div>
                </div>
              ),
            }))}
          />
        </BlurFade>
      </div>
    </section>
  );
}

/* ---------- Mock UIs (decorative, built with Tailwind) ---------- */

function Avatar({ initials, className }: { initials: string; className?: string }) {
  return (
    <span
      className={cn(
        "grid size-5 place-items-center rounded-full bg-gradient-to-br from-brand-from to-brand-to text-[9px] font-semibold text-brand-foreground ring-2 ring-card",
        className
      )}
    >
      {initials}
    </span>
  );
}

function PlanMock() {
  const columns = [
    {
      name: "Backlog",
      count: 8,
      cards: [
        { title: "Usage-based billing", tag: "Billing" },
        { title: "Dark mode for email", tag: "Design" },
        { title: "Audit log export", tag: "Security" },
      ],
    },
    {
      name: "In progress",
      count: 3,
      cards: [
        { title: "Onboarding checklist", tag: "Growth", active: true },
        { title: "Search v2 ranking", tag: "Core" },
        { title: "Mobile quick capture", tag: "Mobile" },
      ],
    },
    {
      name: "Done",
      count: 21,
      cards: [
        { title: "SSO for all plans", tag: "Security" },
        { title: "Faster board loads", tag: "Perf" },
        { title: "Guest access", tag: "Growth" },
      ],
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {columns.map((col, c) => (
        <div key={col.name} className={cn("space-y-2", c === 2 && "hidden sm:block")}>
          <div className="flex items-center gap-2 px-1 text-xs font-medium">
            <span
              className={cn(
                "size-2 rounded-full",
                c === 0 && "bg-muted-foreground/40",
                c === 1 && "bg-brand",
                c === 2 && "bg-emerald-500"
              )}
            />
            {col.name}
            <span className="text-muted-foreground">{col.count}</span>
          </div>
          {col.cards.map((card, i) => (
            <div
              key={card.title}
              className={cn(
                "rounded-lg border bg-card p-3 shadow-sm",
                "active" in card && "border-primary/40 shadow-md ring-2 shadow-primary/10 ring-primary/15"
              )}
            >
              <p className="text-xs font-medium">{card.title}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  {card.tag}
                </span>
                <Avatar initials={["MK", "JL", "AR"][(c + i) % 3]} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function BuildMock() {
  const lines = [
    { type: " ", text: "export function Checklist({ steps }) {" },
    { type: "-", text: "  const done = steps.filter((s) => s.done);" },
    { type: "+", text: "  const done = useMemo(" },
    { type: "+", text: "    () => steps.filter((s) => s.done)," },
    { type: "+", text: "    [steps]" },
    { type: "+", text: "  );" },
    { type: " ", text: "  return <Progress value={done.length} />;" },
  ];
  return (
    <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b px-4 py-3">
        <GitPullRequestIcon className="size-4 text-primary" />
        <p className="text-sm font-medium">Memoize onboarding progress</p>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
          ACME-128
        </span>
        <span className="ml-auto flex -space-x-1">
          <Avatar initials="JL" />
          <Avatar initials="AR" />
        </span>
      </div>
      <div className="overflow-hidden py-2 font-mono text-[11px] leading-6">
        {lines.map((line, i) => (
          <div
            key={i}
            className={cn(
              "flex gap-3 px-4 whitespace-pre",
              line.type === "+" && "bg-emerald-500/10",
              line.type === "-" && "bg-red-500/10"
            )}
          >
            <span className="w-4 shrink-0 text-right text-muted-foreground/60">{i + 41}</span>
            <span
              className={cn(
                "w-2 shrink-0",
                line.type === "+" && "text-emerald-600 dark:text-emerald-400",
                line.type === "-" && "text-red-600 dark:text-red-400"
              )}
            >
              {line.type}
            </span>
            <span className="overflow-hidden text-ellipsis">{line.text}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 border-t px-4 py-3 text-xs text-muted-foreground">
        <CircleCheckIcon className="size-4 text-emerald-500" />
        All checks passed
        <span className="ml-auto rounded-md bg-primary px-2.5 py-1 font-medium text-primary-foreground">
          Merge
        </span>
      </div>
    </div>
  );
}

function ShipMock() {
  const stages = [
    { name: "Preview", detail: "pr-128.acme.app", state: "done" },
    { name: "Staging", detail: "Smoke tests · 42 passed", state: "done" },
    { name: "Production", detail: "Rolling out to 60% of traffic", state: "running" },
  ];
  return (
    <div className="space-y-3">
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium">Release v2.14.0</span>
          <span className="text-muted-foreground">Started 3 min ago</span>
        </div>
        <ol className="mt-4 space-y-4">
          {stages.map((stage) => (
            <li key={stage.name} className="flex items-center gap-3">
              {stage.state === "done" ? (
                <CircleCheckIcon className="size-5 shrink-0 text-emerald-500" />
              ) : (
                <LoaderCircleIcon className="size-5 shrink-0 text-primary motion-safe:animate-spin" />
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{stage.name}</p>
                <p className="truncate text-xs text-muted-foreground">{stage.detail}</p>
              </div>
              {stage.state === "running" && (
                <div className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-muted sm:block">
                  <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-brand-from to-brand-to" />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <p className="text-xs font-medium text-muted-foreground">Drafted release notes</p>
        <ul className="mt-2 space-y-1.5 text-xs">
          <li>
            <span className="font-medium text-primary">New</span> Onboarding checklist for new workspaces
          </li>
          <li>
            <span className="font-medium text-primary">Improved</span> Boards load 2× faster
          </li>
          <li>
            <span className="font-medium text-primary">Fixed</span> Timezone drift in cycle reports
          </li>
        </ul>
      </div>
    </div>
  );
}

function MeasureMock() {
  const kpis = [
    { label: "Adoption", value: "68%", delta: "+9%" },
    { label: "Cycle time", value: "2.4d", delta: "−18%" },
    { label: "Shipped", value: "142", delta: "+23" },
  ];
  const bars = [32, 45, 38, 52, 48, 61, 58, 70, 66, 78, 74, 88];
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-lg border bg-card p-3 shadow-sm">
            <p className="truncate text-[11px] text-muted-foreground">{kpi.label}</p>
            <p className="mt-1 text-lg font-semibold tracking-tight">{kpi.value}</p>
            <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">{kpi.delta}</p>
          </div>
        ))}
      </div>
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium">Weekly active teams</span>
          <span className="text-muted-foreground">Last 12 weeks</span>
        </div>
        <div className="mt-4 flex h-28 items-end gap-1.5">
          {bars.map((v, i) => (
            <div
              key={i}
              style={{ height: `${v}%` }}
              className={cn(
                "flex-1 rounded-t-sm",
                i === bars.length - 1
                  ? "bg-gradient-to-t from-brand-from to-brand-to"
                  : "bg-primary/20"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
