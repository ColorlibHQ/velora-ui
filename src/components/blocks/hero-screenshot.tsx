import { useId } from "react";
import {
  ArrowRightIcon,
  BarChart3Icon,
  BellIcon,
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  PlayCircleIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/velora/blur-fade";
import { BorderBeam } from "@/components/velora/border-beam";
import { BrowserMockup } from "@/components/velora/browser-mockup";
import { LogoCloud } from "@/components/velora/logo-cloud";

const NAV = [
  { icon: HomeIcon, label: "Overview", active: true },
  { icon: BarChart3Icon, label: "Reports" },
  { icon: UsersIcon, label: "Customers" },
  { icon: FolderIcon, label: "Projects" },
  { icon: SettingsIcon, label: "Settings" },
];

const KPIS = [
  { label: "Revenue", value: "$48,210", delta: "+12.4%" },
  { label: "Active users", value: "8,642", delta: "+5.1%" },
  { label: "Conversion", value: "3.8%", delta: "+0.6%" },
  { label: "Avg. session", value: "4m 12s", delta: "+18s" },
];

// Weekly revenue, 0–100 scale — drives the area chart
const SERIES = [32, 38, 35, 46, 42, 55, 51, 60, 58, 70, 66, 78];

const CHANNELS = [
  { name: "Organic", share: 42 },
  { name: "Referral", share: 27 },
  { name: "Paid", share: 19 },
  { name: "Email", share: 12 },
];

const ACTIVITY = [
  { who: "Northwind", what: "Upgraded to Scale", amount: "$1,200" },
  { who: "Halcyon", what: "New subscription", amount: "$480" },
  { who: "Acme Co.", what: "Added 12 seats", amount: "$360" },
];

// Fictional wordmarks with simple geometric marks — swap in your customers.
const LOGOS = [
  { name: "Acme", mark: <path d="M12 3 21 20H3z" /> },
  {
    name: "Northwind",
    mark: (
      <path
        d="M3 8h13a3 3 0 1 0-3-3M3 13h17a3 3 0 1 1-3 3M3 18h8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    ),
  },
  { name: "Beacon", mark: <circle cx="12" cy="12" r="8" /> },
  {
    name: "Orbit",
    mark: (
      <path
        d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 5a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"
        fillRule="evenodd"
      />
    ),
  },
  { name: "Halcyon", mark: <path d="m12 2 8.66 5v10L12 22l-8.66-5V7z" /> },
  { name: "Quanta", mark: <path d="M3 3h8v8H3zm10 10h8v8h-8zM13 3h8v8h-8z" /> },
].map(({ name, mark }) => ({
  name,
  logo: (
    <span className="flex items-center gap-2 text-lg font-semibold tracking-tight">
      <svg viewBox="0 0 24 24" className="size-6 fill-current" aria-hidden>
        {mark}
      </svg>
      {name}
    </span>
  ),
}));

/** A dashboard drawn with Tailwind — no image to host, and it re-themes. */
function DashboardPreview() {
  const id = useId();
  const w = 600;
  const h = 180;
  const points = SERIES.map((v, i) => [
    (i / (SERIES.length - 1)) * w,
    h - (v / 100) * h,
  ]);
  const line = points.map(([x, y], i) => `${i ? "L" : "M"}${x},${y}`).join(" ");

  return (
    <div
      role="img"
      aria-label="Preview of the Lumen analytics dashboard: revenue up 12.4% with a rising weekly revenue chart"
      className="flex bg-background text-left"
    >
      <aside className="hidden w-48 shrink-0 flex-col gap-1 border-r bg-muted/30 p-3 lg:flex">
        <div className="mb-3 flex items-center gap-2 px-2 py-1 font-semibold">
          <span className="size-5 rounded-md bg-gradient-to-br from-brand-from to-brand-to" />
          Lumen
        </div>
        {NAV.map(({ icon: Icon, label, active }) => (
          <div
            key={label}
            className={
              active
                ? "flex items-center gap-2 rounded-md bg-background px-2 py-1.5 text-sm font-medium shadow-xs ring-1 ring-border"
                : "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground"
            }
          >
            <Icon className="size-4" />
            {label}
          </div>
        ))}
      </aside>

      <div className="min-w-0 flex-1 p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold sm:text-base">Overview</div>
            <div className="text-xs text-muted-foreground">Last 12 weeks</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden h-8 w-44 items-center gap-2 rounded-md border px-2 text-xs text-muted-foreground sm:flex">
              <SearchIcon className="size-3.5" /> Search…
            </div>
            <div className="flex h-8 items-center gap-1.5 rounded-md border px-2 text-xs text-muted-foreground">
              <CalendarIcon className="size-3.5" /> Q3
            </div>
            <div className="grid size-8 place-items-center rounded-md border text-muted-foreground">
              <BellIcon className="size-3.5" />
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {KPIS.map((k) => (
            <div key={k.label} className="rounded-lg border bg-card p-3">
              <div className="text-xs text-muted-foreground">{k.label}</div>
              <div className="mt-1 flex items-baseline justify-between gap-2">
                <span className="text-base font-semibold tracking-tight sm:text-xl">
                  {k.value}
                </span>
                <span className="rounded-full bg-brand/10 px-1.5 py-0.5 text-[10px] font-medium text-brand">
                  {k.delta}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-4 md:col-span-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium">Weekly revenue</span>
              <span className="text-muted-foreground">USD</span>
            </div>
            <svg
              viewBox={`0 -8 ${w} ${h + 8}`}
              preserveAspectRatio="none"
              className="mt-4 h-32 w-full sm:h-40"
            >
              <defs>
                <linearGradient id={`${id}-fill`} x1="0" x2="0" y1="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--brand)"
                    stopOpacity="0.28"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--brand)"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>
              {[0.25, 0.5, 0.75].map((f) => (
                <line
                  key={f}
                  x1="0"
                  x2={w}
                  y1={h * f}
                  y2={h * f}
                  className="stroke-border"
                  strokeDasharray="4 6"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              <path
                d={`${line} L${w},${h} L0,${h} Z`}
                fill={`url(#${id}-fill)`}
              />
              <path
                d={line}
                fill="none"
                className="stroke-brand"
                strokeWidth="2"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <div className="hidden rounded-lg border bg-card p-4 md:block">
            <div className="text-xs font-medium">Traffic by channel</div>
            <div className="mt-4 space-y-3">
              {CHANNELS.map((c) => (
                <div key={c.name}>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{c.name}</span>
                    <span className="tabular-nums">{c.share}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-from to-brand-to"
                      style={{
                        width: `${(c.share / CHANNELS[0].share) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 hidden rounded-lg border bg-card sm:block">
          {ACTIVITY.map((a, i) => (
            <div
              key={a.who}
              className={`flex items-center gap-3 px-4 py-2.5 text-xs ${i ? "border-t" : ""}`}
            >
              <span className="grid size-7 place-items-center rounded-full bg-muted font-medium">
                {a.who[0]}
              </span>
              <span className="font-medium">{a.who}</span>
              <span className="text-muted-foreground">{a.what}</span>
              <span className="ml-auto font-medium tabular-nums">
                {a.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Centered product hero: headline and calls to action above a full dashboard
 * in a browser frame, traced by a border beam, with a customer logo row
 * underneath. The dashboard is plain Tailwind — edit it like any markup.
 */
export function HeroScreenshot() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[36rem] bg-gradient-to-b from-brand/10 to-transparent"
      />

      <div className="mx-auto max-w-3xl text-center">
        <BlurFade>
          <p className="text-sm font-medium text-brand">Lumen Analytics 3.0</p>
        </BlurFade>
        <BlurFade delay={0.1}>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            Every number your team needs, on one calm screen
          </h1>
        </BlurFade>
        <BlurFade delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-lg text-pretty text-muted-foreground">
            Connect your product, billing and marketing data in minutes. Lumen
            turns it into a live dashboard your whole team actually opens.
          </p>
        </BlurFade>
        <BlurFade delay={0.3}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-11 w-full rounded-full px-6 sm:w-auto"
              asChild
            >
              <a href="#">
                Start free trial <ArrowRightIcon />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="h-11 rounded-full px-6"
              asChild
            >
              <a href="#">
                <PlayCircleIcon /> Watch the 2-min tour
              </a>
            </Button>
          </div>
        </BlurFade>
      </div>

      <BlurFade
        delay={0.4}
        offset={32}
        className="relative mx-auto mt-16 max-w-6xl sm:mt-20"
      >
        {/* Glow under the frame */}
        <div
          aria-hidden
          className="absolute inset-x-8 top-12 -bottom-8 -z-10 rounded-[3rem] bg-gradient-to-r from-brand-from/30 via-brand-via/20 to-brand-to/30 blur-3xl"
        />
        <BrowserMockup url="app.lumen.io/overview" className="relative bg-card">
          <DashboardPreview />
          <BorderBeam size={120} duration={10} />
        </BrowserMockup>
      </BlurFade>

      <div className="mx-auto mt-20 max-w-5xl">
        <p className="text-center text-sm text-muted-foreground">
          Trusted by 2,000+ product teams, from seed to IPO
        </p>
        <LogoCloud logos={LOGOS} className="mt-8 lg:grid-cols-6" />
      </div>
    </section>
  );
}
