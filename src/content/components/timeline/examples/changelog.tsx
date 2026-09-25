"use client";

import { useRef } from "react";

import { Timeline } from "@/components/velora/timeline";

const tag = {
  New: "bg-brand/10 text-brand",
  Improved: "bg-muted text-foreground",
  Fixed: "bg-muted text-muted-foreground",
};

function Release({
  version,
  date,
}: {
  version: string;
  date: string;
}) {
  return (
    <span className="flex flex-col">
      {version}
      <span className="text-sm font-normal text-muted-foreground">{date}</span>
    </span>
  );
}

function Entry({
  headline,
  changes,
  children,
}: {
  headline: string;
  changes: [keyof typeof tag, string][];
  children?: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border bg-card p-5 shadow-sm">
      <h4 className="font-semibold">{headline}</h4>
      <ul className="mt-3 space-y-2 text-sm">
        {changes.map(([kind, text]) => (
          <li key={text} className="flex items-start gap-3">
            <span
              className={`mt-px w-18 shrink-0 rounded-full px-2 py-0.5 text-center text-xs font-medium ${tag[kind]}`}
            >
              {kind}
            </span>
            <span className="text-muted-foreground">{text}</span>
          </li>
        ))}
      </ul>
      {children}
    </article>
  );
}

// A small product screenshot drawn with Tailwind.
function Shot({ bars }: { bars: number[] }) {
  return (
    <div aria-hidden className="mt-5 overflow-hidden rounded-xl border bg-background">
      <div className="flex items-center gap-1.5 border-b px-3 py-2">
        <span className="size-2 rounded-full bg-muted-foreground/30" />
        <span className="size-2 rounded-full bg-muted-foreground/30" />
        <span className="size-2 rounded-full bg-muted-foreground/30" />
      </div>
      <div className="flex h-28 items-end gap-2 bg-gradient-to-b from-transparent to-brand/5 p-4">
        {bars.map((height, i) => (
          <span
            key={i}
            style={{ height: `${height}%` }}
            className="flex-1 rounded-t-md bg-gradient-to-t from-brand-from to-brand-to opacity-80"
          />
        ))}
      </div>
    </div>
  );
}

const releases = [
  {
    title: <Release version="v3.2" date="Sep 2026" />,
    content: (
      <Entry
        headline="Usage insights"
        changes={[
          ["New", "Per-seat usage chart on the billing page."],
          ["Improved", "Exports finish up to 4× faster."],
        ]}
      >
        <Shot bars={[35, 52, 44, 70, 62, 88, 76]} />
      </Entry>
    ),
  },
  {
    title: <Release version="v3.1" date="Aug 2026" />,
    content: (
      <Entry
        headline="Keyboard everywhere"
        changes={[
          ["New", "Command menu on ⌘K with fuzzy search."],
          ["Fixed", "Focus no longer escapes the settings dialog."],
        ]}
      />
    ),
  },
  {
    title: <Release version="v3.0" date="Jun 2026" />,
    content: (
      <Entry
        headline="A new dashboard"
        changes={[
          ["New", "Customisable widgets with drag to reorder."],
          ["Improved", "Dark mode contrast across every chart."],
          ["Fixed", "Timezones in scheduled reports."],
        ]}
      >
        <Shot bars={[60, 40, 72, 50, 84, 66, 92]} />
      </Entry>
    ),
  },
];

export default function TimelineChangelogDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className="relative h-96 w-full overflow-y-auto rounded-xl border @container-size"
    >
      <div className="mx-auto max-w-3xl px-6 pt-10 pb-[35cqh] sm:px-10">
        <h2 className="mb-10 text-2xl font-semibold tracking-tight">
          Changelog
        </h2>
        <Timeline items={releases} container={scrollRef} />
      </div>
    </div>
  );
}
