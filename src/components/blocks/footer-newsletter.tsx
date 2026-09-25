"use client";

import { useId } from "react";
import { MailIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatefulButton } from "@/components/velora/stateful-button";

const BRAND = "Orbit";
const BLURB = "Deploy previews, feature flags and rollbacks for teams that ship every day.";

const NEWSLETTER = {
  title: "Stay in orbit",
  description: "One email a month with product updates and engineering notes. No spam, unsubscribe anytime.",
};

const COLUMNS = [
  { title: "Product", links: ["Previews", "Feature flags", "Rollbacks", "Pricing", "Changelog"] },
  { title: "Developers", links: ["Documentation", "CLI", "API reference", "Status"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
  { title: "Legal", links: ["Privacy", "Terms", "DPA", "Security"] },
];

const STATUS = "All systems normal";

// Replace with a call to your email provider; reject to show the error state.
function subscribe(email: string) {
  void email;
  return new Promise<void>((resolve) => setTimeout(resolve, 1200));
}

const focusRing =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

/**
 * Footer with a newsletter sign-up row, a brand column carrying a live
 * status badge, and four link columns. The subscribe button morphs through
 * loading and success states while the request runs.
 */
export function FooterNewsletter() {
  const emailId = useId();

  return (
    <footer className="border-t bg-background px-6 pt-16 pb-10 sm:pt-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative isolate overflow-hidden rounded-3xl border bg-card px-6 py-8 sm:px-10 sm:py-10">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-radial-[ellipse_at_100%_0%] from-brand/15 to-transparent to-60%"
          />
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="flex gap-4">
              <span
                aria-hidden
                className="hidden size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary sm:grid"
              >
                <MailIcon className="size-5" />
              </span>
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{NEWSLETTER.title}</h2>
                <p className="mt-2 max-w-md text-sm text-pretty text-muted-foreground sm:text-base">
                  {NEWSLETTER.description}
                </p>
              </div>
            </div>

            <form onSubmit={(event) => event.preventDefault()} className="w-full lg:max-w-md lg:justify-self-end">
              <Label htmlFor={emailId} className="mb-2">
                Work email
              </Label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  id={emailId}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="h-10 flex-1 rounded-full bg-background px-4"
                />
                <StatefulButton
                  type="submit"
                  successText="Subscribed"
                  errorText="Try again"
                  className="shrink-0"
                  onClick={(event) => {
                    // Pressing Enter in the field also lands here, as a click.
                    event.preventDefault();
                    const form = event.currentTarget.form;
                    if (!form?.reportValidity()) return;
                    const email = new FormData(form).get("email") as string;
                    return subscribe(email).then(() => form.reset());
                  }}
                >
                  Subscribe
                </StatefulButton>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
          <div className="max-w-xs">
            <a href="#" className={`inline-flex items-center gap-2.5 text-lg font-semibold tracking-tight ${focusRing}`}>
              <svg aria-hidden viewBox="0 0 32 32" fill="none" strokeWidth="2.5" className="size-8">
                <circle cx="16" cy="16" r="5" className="fill-primary" />
                <ellipse cx="16" cy="16" rx="13" ry="6" transform="rotate(-30 16 16)" className="stroke-primary/60" />
              </svg>
              {BRAND}
            </a>
            <p className="mt-4 text-sm leading-relaxed text-pretty text-muted-foreground">{BLURB}</p>
            <a
              href="#"
              className="mt-6 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <span aria-hidden className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping" />
                <span className="relative size-2 rounded-full bg-emerald-500" />
              </span>
              {STATUS}
            </a>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold">{column.title}</h3>
                <ul className="mt-4 space-y-3 text-sm">
                  {column.links.map((label) => (
                    <li key={label}>
                      <a href="#" className={`text-muted-foreground transition-colors hover:text-foreground ${focusRing}`}>
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <p className="mt-16 border-t pt-8 text-sm text-muted-foreground">
          © 2026 {BRAND} Technologies, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
