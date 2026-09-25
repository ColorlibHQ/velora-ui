import { QuoteIcon, StarIcon } from "lucide-react";

import {
  AnimatedTestimonials,
  type Testimonial,
} from "@/components/velora/animated-testimonials";
import { BlurFade } from "@/components/velora/blur-fade";
import { BorderBeam } from "@/components/velora/border-beam";
import { GridPattern } from "@/components/velora/grid-pattern";
import { NumberTicker } from "@/components/velora/number-ticker";

const portrait = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=400&h=400&q=70&auto=format&fit=crop`;

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Acme gave us back a day a week. Planning, specs and release notes live in one place, and the whole company can finally see what we're shipping and why.",
    name: "Maya Lindqvist",
    role: "Head of Product, Northwind",
    src: portrait("1494790108377-be9c29b29330"),
  },
  {
    quote:
      "We migrated 40 teams in a fortnight without a single blocked sprint. It's the rare tool engineers ask to keep using after the trial.",
    name: "Daniel Okafor",
    role: "VP Engineering, Lumen Labs",
    src: portrait("1507003211169-0a1dd7228f2d"),
  },
  {
    quote:
      "Our changelog used to be a chore nobody owned. Now it's generated from merged work, and customers actually subscribe to it.",
    name: "Nadia Haddad",
    role: "Growth Lead, Quartzite",
    src: portrait("1531123897727-8f129e1688ce"),
  },
  {
    quote:
      "Calm, fast and keyboard-first. Acme is the first process tool my team has never once complained about.",
    name: "Marcus Bell",
    role: "CTO, Tidewater",
    src: portrait("1506794778202-cad84cf45f1d"),
  },
];

const STATS = [
  { label: "Average rating from 2,400+ reviews", value: 4.9, decimals: 1, suffix: "/5", stars: true },
  { label: "Teams planning their work in Acme", value: 12000, suffix: "+" },
  { label: "Hours saved per person, every week", value: 6.5, decimals: 1, suffix: "h" },
];

/**
 * One rotating customer quote as the centrepiece, framed by a travelling
 * border beam, with a row of stats that count up as they scroll into view.
 */
export function TestimonialsFeatured() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      <GridPattern className="-z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_65%)]" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-40 -z-10 mx-auto h-64 max-w-3xl rounded-full bg-gradient-to-r from-brand-from/15 via-brand-via/10 to-brand-to/15 blur-3xl"
      />

      <div className="mx-auto max-w-4xl">
        <BlurFade className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-brand">Customer stories</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            The tool our customers recommend first
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-pretty text-muted-foreground">
            From ten-person startups to companies with hundreds of teams, Acme
            is where the work gets planned and shipped.
          </p>
        </BlurFade>

        <BlurFade delay={0.1}>
          <figure className="relative mt-14 rounded-3xl border bg-card/70 p-6 shadow-sm backdrop-blur-sm sm:p-10 lg:p-12">
            <BorderBeam size={120} duration={10} />
            <span
              aria-hidden
              className="absolute -top-5 right-6 grid size-10 place-items-center rounded-full bg-gradient-to-br from-brand-from to-brand-to text-brand-foreground shadow-lg ring-4 ring-background sm:right-10"
            >
              <QuoteIcon className="size-4 fill-current" />
            </span>
            <AnimatedTestimonials
              testimonials={TESTIMONIALS}
              interval={7}
              className="sm:gap-10 [&_blockquote]:min-h-52 sm:[&_blockquote]:min-h-40 [&_blockquote_p]:text-xl [&_blockquote_p]:font-medium [&_blockquote_p]:tracking-tight sm:[&_blockquote_p]:text-2xl"
            />
          </figure>
        </BlurFade>

        <dl className="mt-12 grid gap-8 text-center sm:grid-cols-3 sm:gap-0 sm:divide-x">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse items-center gap-2 px-6">
              <dt className="max-w-48 text-sm text-pretty text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="flex flex-col items-center gap-2">
                {stat.stars && (
                  <span className="flex gap-0.5 text-brand" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} className="size-4 fill-current" />
                    ))}
                  </span>
                )}
                <NumberTicker
                  value={stat.value}
                  decimalPlaces={stat.decimals ?? 0}
                  suffix={stat.suffix}
                  className="text-4xl font-semibold tracking-tight"
                />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
