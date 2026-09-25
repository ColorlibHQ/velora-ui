"use client";

import { useRef } from "react";

import { FloatingNavbar } from "@/components/velora/floating-navbar";

export default function FloatingNavbarDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className="relative h-80 w-full max-w-md overflow-y-auto rounded-xl border"
    >
      {/* In a real layout, drop `scrollContainer` and `sticky`: the bar is
          fixed to the viewport and follows the page scroll. */}
      <FloatingNavbar
        scrollContainer={scrollRef}
        revealAfter={40}
        className="sticky"
      >
        <span className="text-sm font-semibold">Velora</span>
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <a href="#docs" className="hover:text-foreground">
            Docs
          </a>
          <a href="#pricing" className="hover:text-foreground">
            Pricing
          </a>
        </nav>
      </FloatingNavbar>
      <div className="space-y-3 px-6 pt-8 pb-6">
        <p className="text-sm text-muted-foreground">
          Scroll down in this box to hide the bar, then scroll up to bring it
          back.
        </p>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-10 rounded-lg bg-muted" />
        ))}
      </div>
    </div>
  );
}
