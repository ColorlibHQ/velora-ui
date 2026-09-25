"use client";

import { useRef } from "react";

import { Timeline } from "@/components/velora/timeline";

function Tiles({ labels }: { labels: string[] }) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3">
      {labels.map((label) => (
        <div
          key={label}
          className="flex aspect-[16/10] items-end rounded-xl border bg-gradient-to-br from-brand-from/15 via-brand-via/5 to-brand-to/20 p-3 text-xs font-medium text-muted-foreground"
        >
          {label}
        </div>
      ))}
    </div>
  );
}

const items = [
  {
    title: "2023",
    content: (
      <>
        <p className="text-muted-foreground">
          Two engineers, one spare room and a shared belief that UI libraries
          should ship as source you own.
        </p>
        <Tiles labels={["First commit", "Kitchen-table office"]} />
      </>
    ),
  },
  {
    title: "2024",
    content: (
      <>
        <p className="text-muted-foreground">
          The first public release. A thousand teams installed a component in
          the first month, and the issue tracker never slept again.
        </p>
        <Tiles labels={["v1.0 launch", "1,000 teams"]} />
      </>
    ),
  },
  {
    title: "2025",
    content: (
      <>
        <p className="text-muted-foreground">
          Theming, reduced-motion support and an accessibility audit of every
          component. Contributors from 40 countries.
        </p>
        <Tiles labels={["Theme builder", "Community call"]} />
      </>
    ),
  },
  {
    title: "Today",
    content: (
      <p className="text-muted-foreground">
        Still small, still shipping. The next chapter is being written in the
        open.
      </p>
    ),
  },
];

export default function TimelineDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    // `@container-size` makes the component's cqh offsets measure this
    // box instead of the viewport. On a real page, drop it and `container`.
    <div
      ref={scrollRef}
      className="relative h-96 w-full overflow-y-auto rounded-xl border @container-size"
    >
      <div className="px-6 pt-10 pb-[35cqh] sm:px-10">
        <Timeline items={items} container={scrollRef} />
      </div>
    </div>
  );
}
