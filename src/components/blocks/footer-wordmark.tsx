import { ArrowUpRightIcon } from "lucide-react";

import { TextHoverEffect } from "@/components/velora/text-hover-effect";

const BRAND = "Halcyon";
const STATEMENT = "Quiet software for loud problems.";
const BLURB =
  "Halcyon is the incident desk for teams who would rather sleep through the night.";
const EMAIL = "hello@halcyon.dev";

const LINKS = ["Product", "Pricing", "Changelog", "Docs", "Careers", "Contact"];
const LEGAL = ["Privacy", "Terms"];

const SOCIAL = [
  {
    label: "X",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "GitHub",
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  {
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
];

const focusRing =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

/**
 * Minimal footer: a one-line statement, a short row of links and a legal
 * bar, closed off by the brand's name drawn as a giant outlined wordmark
 * that lights up in brand colours under the pointer.
 */
export function FooterWordmark() {
  return (
    <footer className="relative isolate overflow-hidden border-t bg-background px-6 pt-20 pb-6 sm:pt-24 sm:pb-8 lg:px-8">
      <h2 className="sr-only">Footer</h2>
      {/* Faint brand glow rising behind the wordmark */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-radial-[ellipse_at_50%_100%] from-brand/12 to-transparent to-70%"
      />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div className="max-w-md">
            <p className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{STATEMENT}</p>
            <p className="mt-4 text-pretty text-muted-foreground">{BLURB}</p>
            <a
              href="#"
              className={`group/email mt-6 inline-flex items-center gap-1.5 font-medium transition-colors hover:text-primary ${focusRing}`}
            >
              {EMAIL}
              <ArrowUpRightIcon
                aria-hidden
                className="size-4 transition-transform group-hover/email:translate-x-0.5 group-hover/email:-translate-y-0.5 motion-reduce:transition-none"
              />
            </a>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-14 gap-y-3 text-sm sm:grid-cols-3">
              {LINKS.map((label) => (
                <li key={label}>
                  <a href="#" className={`text-muted-foreground transition-colors hover:text-foreground ${focusRing}`}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col-reverse gap-6 border-t pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p>© 2026 {BRAND} Labs</p>
            {LEGAL.map((label) => (
              <a key={label} href="#" className={`transition-colors hover:text-foreground ${focusRing}`}>
                {label}
              </a>
            ))}
          </div>
          <ul className="-ml-2 flex gap-1 sm:ml-0 sm:-mr-2">
            {SOCIAL.map(({ label, path }) => (
              <li key={label}>
                <a
                  href="#"
                  aria-label={`${BRAND} on ${label}`}
                  className="grid size-9 place-items-center rounded-full transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className="size-4">
                    <path d={path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <TextHoverEffect
        text={BRAND.toLowerCase()}
        className="mx-auto mt-8 max-w-7xl font-black tracking-tight sm:mt-12"
      />
    </footer>
  );
}
