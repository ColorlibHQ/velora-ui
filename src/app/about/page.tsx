import type { Metadata } from "next";
import {
  AccessibilityIcon,
  GaugeIcon,
  PaletteIcon,
  ScaleIcon,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHeader } from "@/components/page-header";
import { BlurFade } from "@/components/velora/blur-fade";
import { NumberTicker } from "@/components/velora/number-ticker";
import { SpotlightCard } from "@/components/velora/spotlight-card";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
  description:
    "Why Velora UI exists: landing-page polish shouldn't cost $199. Free, accessible, token-driven animated components for React.",
};

const principles = [
  {
    icon: <ScaleIcon className="size-6" />,
    title: "Free is the product",
    body: "The complete template — not a teaser — is MIT licensed. Pro adds breadth for teams, but nothing on this site is held back.",
  },
  {
    icon: <GaugeIcon className="size-6" />,
    title: "Animations with receipts",
    body: "Every component publishes its gzipped size and dependency count. No three.js payloads hiding behind a pretty demo.",
  },
  {
    icon: <AccessibilityIcon className="size-6" />,
    title: "Motion that asks permission",
    body: "prefers-reduced-motion is respected globally, keyboard focus stays visible, and markup stays semantic.",
  },
  {
    icon: <PaletteIcon className="size-6" />,
    title: "Tokens, not hardcoded hues",
    body: "Components read shadcn CSS variables. Rebrand the entire system — every gradient, beam and glow — by changing one token block.",
  },
];

const stats = [
  { value: 32, suffix: "+", label: "Animated components" },
  { value: 100, suffix: "", label: "Lighthouse performance" },
  { value: 0, suffix: "", label: "Runtime deps beyond Motion" },
  { value: 10, suffix: "+", label: "Template pages" },
];

export default function AboutPage() {
  return (
    <main className="relative">
      <SiteHeader />

      <PageHeader
        eyebrow="About"
        title={
          <>
            Landing-page polish{" "}
            <span className="text-primary">shouldn&apos;t cost $199</span>
          </>
        }
        description="Velora UI started with a simple observation: the animated-component market charges premium prices for what is, at its core, CSS variables and a motion library. We think that layer should be free."
      />

      {/* Story */}
      <section className="pb-20">
        <div className="mx-auto max-w-3xl space-y-5 px-4 text-muted-foreground lg:px-8">
          <BlurFade>
            <p className="leading-7">
              The React ecosystem settled on a great pattern: copy the
              component into your project, own the code. But the libraries that
              popularized animated marketing components put their best work —
              the assembled, multi-page templates — behind $149–$299 paywalls,
              hardcode their brand colors into every snippet, and rarely tell
              you what an effect costs in kilobytes.
            </p>
          </BlurFade>
          <BlurFade delay={0.1}>
            <p className="leading-7">
              Velora is the version of that idea we wanted to exist: every
              component wired to your design tokens, every animation
              accountable for its bundle size and its motion-sensitivity
              behavior, and the complete template — blog, pricing, auth,
              changelog and all — free under MIT. It works with Base UI and
              Radix shadcn projects alike, installs through the standard
              shadcn registry, and is documented for humans and AI agents
              equally.
            </p>
          </BlurFade>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/40 py-14">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 px-4 lg:grid-cols-4 lg:px-8">
          {stats.map((stat, i) => (
            <BlurFade key={stat.label} delay={i * 0.08}>
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-4xl font-semibold tracking-tight">
                  <NumberTicker value={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-sm text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <BlurFade>
            <h2 className="text-center text-3xl font-semibold tracking-tight">
              What we optimize for
            </h2>
          </BlurFade>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {principles.map((p, i) => (
              <BlurFade key={p.title} delay={i * 0.1}>
                <SpotlightCard className="h-full p-8">
                  <div className="mb-4 w-fit rounded-xl bg-primary/10 p-3 text-primary">
                    {p.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
                </SpotlightCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
