"use client";

import { useRef } from "react";

import { MacbookScroll } from "@/components/velora/macbook-scroll";

export default function MacbookScrollDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    // `@container-size` makes the component's cqh heights measure this
    // box instead of the viewport. On a real page, drop it and `container`.
    <div
      ref={scrollRef}
      className="relative h-[30rem] w-full overflow-y-auto rounded-xl border @container-size"
    >
      <MacbookScroll
        container={scrollRef}
        title="Open it up. Everything is already set."
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=70&auto=format&fit=crop"
        badge={
          <span aria-hidden className="flex size-7 -rotate-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-from to-brand-to text-xs font-bold text-brand-foreground shadow-md">
            V
          </span>
        }
      />
    </div>
  );
}
