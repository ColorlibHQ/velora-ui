"use client";

import { useRef } from "react";

import { MacbookScroll } from "@/components/velora/macbook-scroll";

const stats = [
  { label: "Revenue", value: "$48.2k", delta: "+12.4%" },
  { label: "Active users", value: "2,184", delta: "+5.1%" },
  { label: "Churn", value: "1.9%", delta: "−0.3%" },
];

const nav = ["Overview", "Customers", "Billing", "Reports", "Settings"];

// The screen is an inline-size container, so `cqw` units scale this
// mock with the laptop instead of the page.
function Dashboard() {
  return (
    <div className="flex size-full bg-background text-[2.2cqw] text-foreground">
      <aside className="flex w-[22%] flex-col gap-[1.3cqw] border-r bg-muted/50 p-[2.6cqw]">
        <span className="mb-[2cqw] flex items-center gap-[1.3cqw] font-semibold">
          <span className="size-[3.1cqw] rounded-[0.8cqw] bg-gradient-to-br from-brand-from to-brand-to" />
          Acme
        </span>
        {nav.map((item, i) => (
          <span
            key={item}
            className={
              i === 0
                ? "rounded-[1cqw] bg-brand/10 px-[1.6cqw] py-[0.8cqw] font-medium text-brand"
                : "px-[1.6cqw] py-[0.8cqw] text-muted-foreground"
            }
          >
            {item}
          </span>
        ))}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col gap-[2.3cqw] p-[3.1cqw]">
        <div className="flex items-center justify-between">
          <span className="text-[3.1cqw] font-semibold">Overview</span>
          <span className="rounded-full border px-[1.8cqw] py-[0.5cqw] text-muted-foreground">
            Last 30 days
          </span>
        </div>

        <div className="grid grid-cols-3 gap-[2.1cqw]">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[1.6cqw] border bg-card p-[2.1cqw]">
              <p className="text-muted-foreground">{stat.label}</p>
              <p className="mt-[0.5cqw] text-[3.4cqw] font-semibold tracking-tight">
                {stat.value}
              </p>
              <p className="text-brand">{stat.delta}</p>
            </div>
          ))}
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden rounded-[1.6cqw] border bg-card p-[2.1cqw]">
          <p className="text-muted-foreground">Monthly recurring revenue</p>
          <svg
            viewBox="0 0 300 100"
            preserveAspectRatio="none"
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-3/4 w-full text-brand"
          >
            <defs>
              <linearGradient id="mrr-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="currentColor" stopOpacity="0.35" />
                <stop offset="1" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 80 C30 74 45 60 75 62 S120 40 150 44 S200 20 230 26 S275 8 300 6 V100 H0 Z"
              fill="url(#mrr-fill)"
            />
            <path
              d="M0 80 C30 74 45 60 75 62 S120 40 150 44 S200 20 230 26 S275 8 300 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function MacbookScrollDashboardDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className="relative h-[30rem] w-full overflow-y-auto rounded-xl border @container-size"
    >
      <MacbookScroll
        container={scrollRef}
        title="Your numbers, the moment you open the lid"
      >
        <Dashboard />
      </MacbookScroll>
    </div>
  );
}
