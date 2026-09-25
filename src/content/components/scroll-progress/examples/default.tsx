"use client";

import { useRef } from "react";

import { ScrollProgress } from "@/components/velora/scroll-progress";

export default function ScrollProgressDemo() {
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      className="relative h-72 w-full max-w-md overflow-y-auto rounded-xl border"
    >
      {/* On a real page, drop `container` and the default fixed position. */}
      <ScrollProgress container={container} className="sticky" />
      <div className="space-y-4 p-6">
        <p className="font-semibold">Scroll this box</p>
        {Array.from({ length: 12 }, (_, i) => (
          <p key={i} className="text-sm text-muted-foreground">
            Paragraph {i + 1}. The bar above fills as you read, easing on a
            spring so it never jitters.
          </p>
        ))}
      </div>
    </div>
  );
}
