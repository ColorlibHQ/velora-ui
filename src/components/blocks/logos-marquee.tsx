import { Marquee } from "@/components/velora/marquee";
import { cn } from "@/lib/utils";

/*
 * Fictional brands drawn as simple geometric marks. Marks paint with the
 * brand ramp, so they pick up your colours when a logo is hovered. Swap an
 * entry's `mark` for an <img> or your customer's SVG.
 */
const LOGOS: { name: string; wordmark: string; mark: React.ReactNode }[] = [
  {
    name: "Acme",
    wordmark: "font-bold uppercase tracking-[0.2em] text-lg",
    mark: (
      <>
        <path d="M12 3 21.5 20h-19z" fill="var(--brand-from)" />
        <path d="M12 10.5 16.5 18.5h-9z" fill="var(--background)" />
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
    wordmark: "font-serif italic tracking-tight text-xl",
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
        <path d="M12 7 17 12 12 17 7 12z" fill="var(--background)" opacity=".85" />
      </>
    ),
  },
  {
    name: "Quartzite",
    wordmark: "font-semibold uppercase tracking-widest text-sm",
    mark: (
      <>
        <path d="M12 2 20.7 7v10L12 22l-8.7-5V7z" fill="var(--brand-from)" />
        <path d="M12 2v20M3.3 7 12 12l8.7-5" stroke="var(--background)" strokeWidth="1.5" fill="none" opacity=".6" />
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
    wordmark: "font-serif font-medium text-xl",
    mark: (
      <>
        <circle cx="9" cy="9" r="6" fill="var(--brand-from)" opacity=".85" />
        <circle cx="15" cy="9" r="6" fill="var(--brand-to)" opacity=".7" />
        <circle cx="12" cy="15" r="6" fill="var(--brand-via)" opacity=".7" />
      </>
    ),
  },
  {
    name: "Meridian",
    wordmark: "font-light uppercase tracking-[0.3em] text-sm",
    mark: (
      <>
        <circle cx="12" cy="12" r="9" fill="none" stroke="var(--brand-via)" strokeWidth="2" />
        <ellipse cx="12" cy="12" rx="4" ry="9" fill="none" stroke="var(--brand-via)" strokeWidth="2" />
        <path d="M3 12h18" stroke="var(--brand-via)" strokeWidth="2" />
      </>
    ),
  },
];

/**
 * Logo strip for under a hero: a short trust line over a slow marquee of
 * customer logos. Logos rest in grayscale and take their colour on hover;
 * the strip pauses on hover and focus, and becomes a static wrapped row
 * under `prefers-reduced-motion`.
 */
export function LogosMarquee() {
  return (
    <section className="px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-sm font-medium text-balance text-muted-foreground sm:text-base"
        >
          Trusted by product teams at{" "}
          <span className="text-foreground">4,000+ companies</span>, from
          seed-stage startups to the Fortune 500
        </h2>

        <div className="relative mt-10">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
          />
          <Marquee
            pauseOnHover
            repeat={3}
            role="list"
            aria-label="Customer logos"
            className="py-8 [--duration:45s] [--gap:2.5rem] sm:[--gap:4.5rem]"
          >
            {LOGOS.map((logo) => (
              <div
                key={logo.name}
                role="listitem"
                className="flex shrink-0 items-center gap-2.5 text-muted-foreground opacity-80 grayscale transition duration-300 hover:text-foreground hover:opacity-100 hover:grayscale-0 motion-reduce:transition-none"
              >
                <svg viewBox="0 0 24 24" aria-hidden className="size-7 shrink-0">
                  {logo.mark}
                </svg>
                <span className={cn("text-lg whitespace-nowrap", logo.wordmark)}>
                  {logo.name}
                </span>
              </div>
            ))}
          </Marquee>
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
