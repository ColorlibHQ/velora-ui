"use client";

import { useRef } from "react";

import { SmoothCursor } from "@/components/velora/smooth-cursor";

export default function SmoothCursorCtaCardDemo() {
  const area = useRef<HTMLDivElement>(null);

  return (
    <div ref={area} className="grid w-full place-items-center rounded-2xl bg-muted/40 p-6 sm:p-10">
      <SmoothCursor container={area} />
      <section className="w-full max-w-md space-y-5 rounded-2xl border bg-card p-6 shadow-sm">
        <div className="space-y-1.5">
          <p className="text-xs font-medium tracking-wide text-primary uppercase">Early access</p>
          <h3 className="text-xl font-semibold tracking-tight">Ship your next launch page this week</h3>
          <p className="text-sm text-muted-foreground">
            Join 4,200 builders getting new components every Friday.
          </p>
        </div>
        <form className="space-y-2" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="cta-email" className="text-sm font-medium">
            Work email
          </label>
          <div className="flex gap-2">
            <input
              id="cta-email"
              type="email"
              placeholder="you@company.com"
              className="h-10 min-w-0 flex-1 rounded-lg border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button
              type="submit"
              className="h-10 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Join
            </button>
          </div>
        </form>
        <div className="flex items-center justify-between border-t pt-4 text-sm">
          <a href="#" className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
            See what&apos;s new
          </a>
          <button
            type="button"
            className="rounded-lg border px-3 py-1.5 font-medium hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Book a demo
          </button>
        </div>
      </section>
    </div>
  );
}
