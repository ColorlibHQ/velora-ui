import type { Metadata } from "next";
import {
  CheckIcon,
  GaugeIcon,
  LayersIcon,
  MoonIcon,
  MousePointerClickIcon,
  PaletteIcon,
  RocketIcon,
  SparklesIcon,
  StarIcon,
  ZapIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ActivityList } from "@/components/demo/activity-list";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroMockup } from "@/components/demo/hero-mockup";
import IntegrationsBeam from "@/content/components/animated-beam/examples/default";
import { AnimatedGradientText } from "@/components/velora/animated-gradient-text";
import { AuroraBackground } from "@/components/velora/aurora-background";
import { AvatarCircles } from "@/components/velora/avatar-circles";
import { BentoCard, BentoGrid } from "@/components/velora/bento-grid";
import { BlurFade } from "@/components/velora/blur-fade";
import { BorderBeam } from "@/components/velora/border-beam";
import { Dock, DockIcon } from "@/components/velora/dock";
import { DotPattern, GridPattern } from "@/components/velora/grid-pattern";
import { Marquee } from "@/components/velora/marquee";
import { Meteors } from "@/components/velora/meteors";
import { NumberTicker } from "@/components/velora/number-ticker";
import { OrbitingCircles } from "@/components/velora/orbiting-circles";
import { Particles } from "@/components/velora/particles";
import { RetroGrid } from "@/components/velora/retro-grid";
import { ScrollProgress } from "@/components/velora/scroll-progress";
import { ShimmerButton } from "@/components/velora/shimmer-button";
import { SpotlightCard } from "@/components/velora/spotlight-card";
import { TextReveal } from "@/components/velora/text-reveal";
import { TiltCard } from "@/components/velora/tilt-card";
import { Typewriter } from "@/components/velora/typewriter";
import { componentsMeta } from "@/lib/components-meta";

const stack = [
  "Next.js",
  "React",
  "Tailwind CSS",
  "Motion",
  "shadcn/ui",
  "Radix",
  "Base UI",
  "TypeScript",
];

const stats = [
  {
    value: componentsMeta.length,
    suffix: "",
    prefix: "",
    label: "Animated components",
  },
  { value: 100, suffix: "", prefix: "", label: "Lighthouse performance" },
  { value: 0, suffix: "", prefix: "$", label: "Forever. MIT licensed" },
  { value: 5, suffix: " min", prefix: "", label: "To your first page" },
];

// Placeholder quotes for the template — swap in real customer quotes.
const testimonials = [
  {
    quote:
      "We moved our whole team onto it in a week. Onboarding took an afternoon and nobody has asked to go back.",
    name: "Maya Chen",
    role: "Example customer · Design engineer",
  },
  {
    quote: "The reporting view alone replaced two spreadsheets and a weekly status meeting.",
    name: "Tom Okafor",
    role: "Example customer · Frontend lead",
  },
  {
    quote:
      "Setup was copy, paste, ship. It fits the tools we already use instead of fighting them.",
    name: "Sofia Lindqvist",
    role: "Example customer · Indie hacker",
  },
  {
    quote: "Fast enough that I checked the numbers twice. Then I showed them to finance.",
    name: "Dan Romero",
    role: "Example customer · CTO",
  },
  {
    quote:
      "We launched in a day. Support answered every question before we finished asking it.",
    name: "Aisha Patel",
    role: "Example customer · Founder",
  },
  {
    quote: "The first tool in years our designers and engineers both like.",
    name: "Lukas Weber",
    role: "Example customer · Product designer",
  },
];

const faqs = [
  {
    q: "Is Velora UI really free?",
    a: "Yes — every component and the full landing template are MIT licensed. Use them in personal and commercial projects, no attribution required.",
  },
  {
    q: "How is this different from Magic UI?",
    a: "Velora ships complete, assembled landing pages — not just isolated components. Every animation respects prefers-reduced-motion, causes zero layout shift, and is tuned for mobile.",
  },
  {
    q: "What's the tech stack?",
    a: "Next.js 16, React 19, Tailwind CSS 4, shadcn/ui and Motion. Copy components via the CLI or clone the whole template.",
  },
  {
    q: "Will there be more templates?",
    a: "Yes. The SaaS template is free forever. Additional niches (AI agent, dev tool, mobile app, portfolio) and section variants land in Velora Pro.",
  },
];

const freeFeatures = [
  "64+ animated components",
  "Complete SaaS landing template",
  "Dark mode + full accessibility",
  "MIT license — commercial use OK",
  "Community support",
];

const proFeatures = [
  "5 niche templates (AI, dev tool, mobile…)",
  "50+ section design variants",
  "Figma source file",
  "Waitlist, newsletter & Stripe wiring",
  "Private registry + lifetime updates",
];

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="relative">
      <ScrollProgress />

      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden pt-40 pb-24 lg:pt-48 lg:pb-28">
        <AuroraBackground intensity="subtle" />
        <GridPattern
          width={48}
          height={48}
          className="fill-transparent stroke-border/60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
        />
        <div className="relative mx-auto max-w-6xl px-4 text-center lg:px-8">
          <BlurFade delay={0} direction="down">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-4 py-1.5 text-sm backdrop-blur">
              <SparklesIcon className="size-3.5 text-primary" />
              <span className="font-medium">
                Introducing Velora UI — free forever
              </span>
            </span>
          </BlurFade>

          <h1 className="mx-auto mt-8 max-w-4xl text-5xl font-semibold tracking-tight text-balance lg:text-7xl">
            <TextReveal text="Landing pages that feel" />{" "}
            <AnimatedGradientText>
              <Typewriter words={["alive.", "effortless.", "unforgettable."]} />
            </AnimatedGradientText>
          </h1>

          <BlurFade delay={0.35}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-pretty">
              Free, open-source animated components and complete landing
              templates for React. Built on Next.js 16, Tailwind CSS 4 and
              shadcn/ui — accessible, reduced-motion friendly and tuned for
              perfect Lighthouse scores.
            </p>
          </BlurFade>

          <BlurFade delay={0.5}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <ShimmerButton>
                <RocketIcon className="size-4" />
                Get started — it&apos;s free
              </ShimmerButton>
              <Button variant="ghost" size="lg" asChild>
                <a href="#features">Browse components</a>
              </Button>
            </div>
          </BlurFade>

          <BlurFade delay={0.6}>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {[
                "MIT licensed",
                `${componentsMeta.length} components`,
                "Reduced-motion safe",
                "shadcn CLI ready",
              ].map((fact) => (
                <li key={fact} className="flex items-center gap-1.5">
                  <CheckIcon className="size-4 text-primary" />
                  {fact}
                </li>
              ))}
            </ul>
          </BlurFade>

          {/* Product mockup */}
          <BlurFade delay={0.75} offset={32}>
            <HeroMockup className="mt-20" />
          </BlurFade>

          {/* Stats */}
          <div className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <BlurFade key={stat.label} delay={i * 0.1}>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-4xl font-semibold tracking-tight">
                    <NumberTicker
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Logo marquee */}
      <section className="border-y border-border/40 py-12">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <p className="mb-8 text-center text-sm text-muted-foreground">
            Built on the stack you already ship
          </p>
          <Marquee pauseOnHover className="[--duration:30s]">
            {stack.map((logo) => (
              <span
                key={logo}
                className="mx-8 text-xl font-semibold tracking-tight text-muted-foreground/60 transition-colors hover:text-foreground"
              >
                {logo}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Bento features */}
      <section id="features" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <BlurFade>
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-semibold tracking-tight text-balance lg:text-5xl">
              Everything you need to{" "}
              <span className="text-primary">ship beautiful</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
              Assembled sections, not puzzle pieces. Every block below is built
              from Velora primitives you can copy into your own project.
            </p>
          </BlurFade>

          <BlurFade delay={0.15}>
            <BentoGrid className="mt-16">
              <BentoCard
                name="Orbiting integrations"
                description="Showcase your ecosystem with multi-ring orbit animations."
                className="md:col-span-1"
                background={
                  <div className="relative flex size-full items-center justify-center pb-20">
                    <ZapIcon className="size-8 text-primary" />
                    <OrbitingCircles radius={90} iconSize={28} duration={24}>
                      <LayersIcon className="size-5 text-muted-foreground" />
                      <PaletteIcon className="size-5 text-muted-foreground" />
                      <GaugeIcon className="size-5 text-muted-foreground" />
                    </OrbitingCircles>
                  </div>
                }
              />
              <BentoCard
                name="Animated borders"
                description="Draw the eye with beams that travel around any card or CTA."
                className="md:col-span-2"
                background={
                  <div className="absolute inset-6 rounded-xl border bg-card/50">
                    <BorderBeam size={72} duration={7} />
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                      &lt;BorderBeam /&gt;
                    </div>
                  </div>
                }
              />
              <BentoCard
                name="Scrolling testimonials"
                description="Vertical marquees with hover-pause for social proof walls."
                className="md:col-span-2"
                background={
                  <div className="absolute inset-x-10 top-4 bottom-24">
                    <Marquee
                      vertical
                      pauseOnHover
                      className="h-full [--duration:24s]"
                    >
                      {[
                        "“Shipped our launch page in an afternoon.”",
                        "“The animations are buttery smooth.”",
                        "“Finally, free components that feel premium.”",
                        "“Lighthouse 100 out of the box.”",
                      ].map((quote) => (
                        <div
                          key={quote}
                          className="rounded-xl border bg-card/80 p-4 text-sm text-muted-foreground"
                        >
                          {quote}
                        </div>
                      ))}
                    </Marquee>
                  </div>
                }
              />
              <BentoCard
                name="Falling meteors"
                description="Subtle streaks that bring dark sections to life."
                className="md:col-span-1"
                background={
                  <div className="absolute inset-0">
                    <DotPattern className="[mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
                    <Meteors number={10} />
                  </div>
                }
              />
            </BentoGrid>
          </BlurFade>
        </div>
      </section>

      {/* Integrations beam */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <BlurFade direction="right">
            <div>
              <span className="text-sm font-medium text-primary">
                Animated beams
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance lg:text-4xl">
                Connect anything to{" "}
                <span className="text-primary">everything</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                The classic integrations diagram, rebuilt as a single component.
                Point a beam at any two elements and it draws, curves and
                animates itself — responsive and resize-aware.
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {[
                  "Auto-measured paths between any two refs",
                  "Curvature, direction, speed and color per beam",
                  "Resize-aware — no manual coordinates",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <CheckIcon className="size-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </BlurFade>
          <BlurFade direction="left" delay={0.15}>
            <IntegrationsBeam />
          </BlurFade>
        </div>
      </section>

      {/* Live activity */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <RetroGrid />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2 lg:gap-20 lg:px-8">
          <BlurFade direction="right" className="order-2 lg:order-1">
            <ActivityList />
          </BlurFade>
          <BlurFade direction="left" delay={0.15} className="order-1 lg:order-2">
            <div>
              <span className="text-sm font-medium text-primary">
                Animated lists
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance lg:text-4xl">
                Show your product{" "}
                <span className="text-primary">doing things</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Notifications, sales, deploys — a looping feed that springs each
                item in and gracefully pushes the rest down. Perfect for hero
                mockups and feature sections that need life.
              </p>
              <p className="mt-4 text-muted-foreground">
                Behind it: the retro grid backdrop, scrolling forever toward the
                horizon.
              </p>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Spotlight cards */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: <GaugeIcon className="size-6" />,
                title: "Performance first",
                body: "CSS-driven animations wherever possible, Motion only where it earns its bytes. No layout shift, ever.",
              },
              {
                icon: <MousePointerClickIcon className="size-6" />,
                title: "Accessible by default",
                body: "Every component respects prefers-reduced-motion, keeps keyboard focus visible and ships semantic markup.",
              },
              {
                icon: <MoonIcon className="size-6" />,
                title: "Dark mode native",
                body: "Designed dark-first with oklch color tokens. Flip one class and every gradient adapts.",
              },
            ].map((card, i) => (
              <BlurFade key={card.title} delay={i * 0.12}>
                <SpotlightCard className="h-full p-8">
                  <div className="mb-4 w-fit rounded-xl bg-primary/10 p-3 text-primary">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {card.body}
                  </p>
                </SpotlightCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <BlurFade>
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-semibold tracking-tight text-balance lg:text-5xl">
              A testimonial wall <span className="text-primary">that moves</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
              Sample quotes from the template — swap in your customers&apos;.
              Hover the cards: they tilt in 3D.
            </p>
          </BlurFade>
          <div className="mt-16 columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6">
            {testimonials.map((t, i) => (
              <BlurFade key={t.name} delay={(i % 3) * 0.1} className="break-inside-avoid">
                <TiltCard>
                  <figure className="rounded-2xl border bg-card p-6">
                    <span className="flex gap-0.5 text-amber-400">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <StarIcon key={s} className="size-3.5 fill-current" />
                      ))}
                    </span>
                    <blockquote className="mt-4 text-sm text-card-foreground">
                      “{t.quote}”
                    </blockquote>
                    <figcaption className="mt-4 flex items-center gap-3">
                      <AvatarCircles people={[t.name]} className="[&>span]:size-8 [&>span]:text-[10px]" />
                      <div>
                        <p className="text-sm font-medium">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </figcaption>
                  </figure>
                </TiltCard>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <BlurFade>
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-semibold tracking-tight text-balance lg:text-5xl">
              Free forever. <span className="text-primary">Pro later.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
              Everything on this page is free. Pro adds breadth — more niches,
              more variants, more shortcuts.
            </p>
          </BlurFade>

          <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
            <BlurFade>
              <div className="flex h-full flex-col rounded-2xl border bg-card p-8">
                <h3 className="text-lg font-semibold">Free</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Everything you see in this showcase.
                </p>
                <p className="mt-6 text-5xl font-semibold tracking-tight">
                  $0
                  <span className="text-base font-normal text-muted-foreground">
                    {" "}
                    forever
                  </span>
                </p>
                <ul className="mt-8 flex-1 space-y-3 text-sm">
                  {freeFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <CheckIcon className="size-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="lg" className="mt-8 w-full rounded-full">
                  Get started
                </Button>
              </div>
            </BlurFade>

            <BlurFade delay={0.12}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-8">
                <BorderBeam size={80} duration={8} />
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-primary">Pro</h3>
                  <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
                    Coming soon
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  For teams shipping more than one page.
                </p>
                <p className="mt-6 text-5xl font-semibold tracking-tight">
                  $99
                  <span className="text-base font-normal text-muted-foreground">
                    {" "}
                    lifetime
                  </span>
                </p>
                <ul className="mt-8 flex-1 space-y-3 text-sm">
                  {proFeatures.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="flex size-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <CheckIcon className="size-3" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <ShimmerButton className="mt-8 w-full">
                  Join the waitlist
                </ShimmerButton>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <BlurFade>
            <h2 className="text-center text-3xl font-semibold tracking-tight lg:text-4xl">
              Frequently asked questions
            </h2>
          </BlurFade>
          <BlurFade delay={0.15}>
            <Accordion type="single" collapsible className="mt-12">
              {faqs.map((faq) => (
                <AccordionItem key={faq.q} value={faq.q}>
                  <AccordionTrigger className="text-left text-base">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </BlurFade>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <AuroraBackground intensity="subtle" />
        <Particles quantity={50} />
        <div className="relative mx-auto max-w-4xl px-4 text-center lg:px-8">
          <BlurFade>
            <h2 className="text-4xl font-semibold tracking-tight text-balance lg:text-6xl">
              Stop paying <span className="text-primary">$199</span> for
              landing pages.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Velora UI gives you the same polish — animated, accessible and
              production-ready — for free.
            </p>
            <div className="mt-10">
              <ShimmerButton className="h-14 px-10 text-base">
                <RocketIcon className="size-5" />
                Start building now
              </ShimmerButton>
            </div>
          </BlurFade>
          <BlurFade delay={0.2}>
            <div className="mt-16">
              <p className="mb-4 text-xs text-muted-foreground">
                Even the dock is a component — hover it
              </p>
              <Dock>
                <DockIcon label="Components">
                  <LayersIcon className="size-5" />
                </DockIcon>
                <DockIcon label="Themes">
                  <PaletteIcon className="size-5" />
                </DockIcon>
                <DockIcon label="Performance">
                  <GaugeIcon className="size-5" />
                </DockIcon>
                <DockIcon label="Animations">
                  <ZapIcon className="size-5" />
                </DockIcon>
                <DockIcon label="Dark mode">
                  <MoonIcon className="size-5" />
                </DockIcon>
                <DockIcon label="Ship it">
                  <RocketIcon className="size-5" />
                </DockIcon>
              </Dock>
            </div>
          </BlurFade>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
