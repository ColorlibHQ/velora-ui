import { ArrowRightIcon } from "lucide-react";

import { BlurFade } from "@/components/velora/blur-fade";
import { SpotlightCard } from "@/components/velora/spotlight-card";
import { cn } from "@/lib/utils";

/*
 * Fictional brands drawn as simple geometric marks, painted with the brand
 * ramp. Swap an entry's `mark` for an <img> or your customer's SVG.
 */
const LOGOS: { name: string; wordmark: string; mark: React.ReactNode }[] = [
  {
    name: "Acme",
    wordmark: "font-bold uppercase tracking-[0.2em]",
    mark: (
      <>
        <path d="M12 3 21.5 20h-19z" fill="var(--brand-from)" />
        <path d="M12 10.5 16.5 18.5h-9z" fill="var(--card)" />
      </>
    ),
  },
  {
    name: "Northwind",
    wordmark: "font-semibold tracking-tight",
    mark: (
      <>
        <rect x="3" y="13" width="4.5" height="8" rx="1" fill="var(--brand-to)" />
        <rect x="9.75" y="8" width="4.5" height="13" rx="1" fill="var(--brand-via)" />
        <rect x="16.5" y="3" width="4.5" height="18" rx="1" fill="var(--brand-from)" />
      </>
    ),
  },
  {
    name: "Lumen",
    wordmark: "font-medium lowercase tracking-tight",
    mark: (
      <>
        <circle cx="12" cy="12" r="4.5" fill="var(--brand-via)" />
        <path
          d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1"
          stroke="var(--brand-to)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    name: "Orbit",
    wordmark: "font-mono font-semibold lowercase",
    mark: (
      <>
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" opacity=".35" />
        <circle cx="12" cy="12" r="3.5" fill="var(--brand-from)" />
        <circle cx="18.9" cy="8" r="2.5" fill="var(--brand-to)" />
      </>
    ),
  },
  {
    name: "Halcyon",
    wordmark: "font-serif italic tracking-tight text-lg",
    mark: (
      <>
        <circle cx="12" cy="12" r="9.5" fill="var(--brand-to)" opacity=".35" />
        <path d="M12 2.5a9.5 9.5 0 0 1 0 19z" fill="var(--brand-from)" />
      </>
    ),
  },
  {
    name: "Kestrel",
    wordmark: "font-extrabold tracking-tighter",
    mark: (
      <>
        <path d="M12 2 22 12 12 22 2 12z" fill="var(--brand-via)" />
        <path d="M12 7 17 12 12 17 7 12z" fill="var(--card)" opacity=".85" />
      </>
    ),
  },
  {
    name: "Tidewater",
    wordmark: "font-semibold tracking-tight",
    mark: (
      <path
        d="M2 9c2.5-2.7 5-2.7 7.5 0s5 2.7 7.5 0 3.6-2 5-1M2 16c2.5-2.7 5-2.7 7.5 0s5 2.7 7.5 0 3.6-2 5-1"
        stroke="var(--brand-to)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    name: "Foxglove",
    wordmark: "font-serif font-medium text-lg",
    mark: (
      <>
        <circle cx="9" cy="9" r="6" fill="var(--brand-from)" opacity=".85" />
        <circle cx="15" cy="9" r="6" fill="var(--brand-to)" opacity=".7" />
        <circle cx="12" cy="15" r="6" fill="var(--brand-via)" opacity=".7" />
      </>
    ),
  },
];

/**
 * Customer logos on a hairline grid beside a short pitch. Each cell lights
 * up under the cursor with a soft brand spotlight and brings its logo into
 * colour; the grid reflows from two to four columns.
 */
export function LogosGrid() {
  return (
    <section className="px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] xl:gap-16">
        <BlurFade className="max-w-2xl">
          <p className="text-sm font-semibold text-brand">Customers</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            The teams behind products you use every day
          </h2>
          <p className="mt-5 text-lg text-pretty text-muted-foreground">
            More than 4,000 companies plan, build and ship with Acme — from
            seed-stage startups to public companies with hundreds of teams.
          </p>
          <a
            href="#"
            className="group/link mt-8 inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-brand focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            See customer stories
            <ArrowRightIcon
              aria-hidden
              className="size-4 transition-transform group-hover/link:translate-x-0.5 motion-reduce:transition-none"
            />
          </a>
        </BlurFade>

        <ul
          aria-label="Customer logos"
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border sm:grid-cols-4"
        >
          {LOGOS.map((logo) => (
            <li key={logo.name} className="bg-card">
              <SpotlightCard
                radius={180}
                className="h-full rounded-none border-0 bg-transparent"
              >
                <div className="flex h-28 items-center justify-center gap-2 px-3 text-muted-foreground opacity-80 grayscale transition duration-300 group-hover/spotlight:text-foreground group-hover/spotlight:opacity-100 group-hover/spotlight:grayscale-0 motion-reduce:transition-none sm:h-32">
                  <svg viewBox="0 0 24 24" aria-hidden className="size-6 shrink-0">
                    {logo.mark}
                  </svg>
                  <span className={cn("text-base whitespace-nowrap", logo.wordmark)}>
                    {logo.name}
                  </span>
                </div>
              </SpotlightCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
