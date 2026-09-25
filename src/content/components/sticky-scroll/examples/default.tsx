"use client";

import { useRef } from "react";

import { StickyScroll } from "@/components/velora/sticky-scroll";

const items = [
  {
    title: "Install",
    description: "Add a component with one CLI command. The source lands in your repo.",
    content: <span className="font-mono text-sm">npx shadcn add …</span>,
  },
  {
    title: "Customize",
    description: "Every class is yours to edit. Tokens come from your theme.",
    content: <span className="text-lg font-medium">Your tokens</span>,
  },
  {
    title: "Ship",
    description: "No runtime to configure. It is just a React component.",
    content: <span className="text-lg font-medium">Deployed</span>,
  },
];

export default function StickyScrollDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    // `@container-size` makes the component's cqh heights measure this
    // box instead of the viewport. On a real page, drop it and `container`.
    <div
      ref={scrollRef}
      className="relative h-80 w-full max-w-xl overflow-y-auto rounded-xl border @container-size"
    >
      <StickyScroll items={items} container={scrollRef} className="gap-6 px-6" />
    </div>
  );
}
