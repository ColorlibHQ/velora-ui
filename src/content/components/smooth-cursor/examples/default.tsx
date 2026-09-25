"use client";

import { useRef } from "react";

import { SmoothCursor } from "@/components/velora/smooth-cursor";

export default function SmoothCursorDemo() {
  // Scoped to this box for the demo. In an app, render <SmoothCursor />
  // once in your root layout without a container.
  const area = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={area}
      className="grid h-72 w-full place-items-center rounded-2xl border bg-card bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[32px_32px]"
    >
      <SmoothCursor container={area} />
      <div className="space-y-3 rounded-xl border bg-background/90 px-6 py-5 text-center shadow-sm backdrop-blur">
        <p className="text-sm font-medium">Move your mouse around this box</p>
        <p className="text-sm text-muted-foreground">
          The ring trails behind the dot and grows over{" "}
          <a href="#" className="font-medium text-primary underline underline-offset-4">
            links
          </a>{" "}
          and buttons.
        </p>
      </div>
    </div>
  );
}
