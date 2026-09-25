"use client";

import { useRef } from "react";

import { ResizableNavbar } from "@/components/velora/resizable-navbar";

const items = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
  { label: "Blog", href: "#blog" },
];

export default function ResizableNavbarDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className="relative h-96 w-full overflow-y-auto rounded-xl border bg-background"
    >
      {/* In a real layout, drop `container`: the bar sticks to the top of
          the page and watches the window scroll. */}
      <ResizableNavbar
        container={scrollRef}
        threshold={24}
        compactWidth={600}
        items={items}
        activeHref="#features"
        logo={
          <a href="#top" className="flex items-center gap-2 font-semibold">
            <span className="size-6 rounded-md bg-linear-to-br from-brand-from via-brand-via to-brand-to" />
            Northwind
          </a>
        }
        cta={
          <a
            href="#start"
            className="inline-flex h-9 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground"
          >
            Get started
          </a>
        }
      />
      <div className="space-y-3 px-6 pt-10 pb-6">
        <p className="text-center text-sm text-muted-foreground">
          Scroll inside this box — the bar shrinks into a floating pill.
        </p>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="mx-auto h-16 max-w-2xl rounded-xl bg-muted" />
        ))}
      </div>
    </div>
  );
}
