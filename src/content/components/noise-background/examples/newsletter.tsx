"use client";

import { NoiseBackground } from "@/components/velora/noise-background";

export default function NoiseBackgroundNewsletterDemo() {
  return (
    <div className="flex w-full justify-center py-6">
      <NoiseBackground grain={0.5} className="w-full max-w-md rounded-2xl border p-8 shadow-lg">
        <h3 className="text-xl font-semibold tracking-tight">The Friday changelog</h3>
        <p className="mt-2 text-sm text-foreground/75">
          One short email a week: what shipped, what broke and what we learned.
        </p>
        <form className="mt-6 flex flex-col gap-2 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className="h-10 flex-1 rounded-lg border bg-background/80 px-3 text-sm backdrop-blur placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          />
          <button
            type="submit"
            className="h-10 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-3 text-xs text-foreground/60">No spam. Unsubscribe in one click.</p>
      </NoiseBackground>
    </div>
  );
}
