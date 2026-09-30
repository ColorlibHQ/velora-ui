import type { Metadata } from "next";
import Link from "next/link";
import {
  AccessibilityIcon,
  AppWindowIcon,
  ArrowRightIcon,
  BoxIcon,
  ChevronsDownIcon,
  FeatherIcon,
  GalleryHorizontalIcon,
  GaugeIcon,
  GitCompareIcon,
  GlobeIcon,
  LayersIcon,
  LayoutGridIcon,
  LoaderIcon,
  MenuIcon,
  MessageSquareQuoteIcon,
  MonitorSmartphoneIcon,
  MousePointer2Icon,
  MousePointerClickIcon,
  PaletteIcon,
  SparklesIcon,
  TerminalIcon,
  TextCursorInputIcon,
  TypeIcon,
  WavesIcon,
  ZapIcon,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BlockThumbnail } from "@/components/docs/block-thumbnail";
import { CopyButton } from "@/components/docs/copy-button";
import { LiveDemo } from "@/components/home/live-demo";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StackLogo, stackNames } from "@/components/template/stack-logos";
import { AuroraBackground } from "@/components/velora/aurora-background";
import { GridPattern } from "@/components/velora/grid-pattern";
import {
  BarsLoader,
  DotsLoader,
  OrbitLoader,
  PulseLoader,
  SpinnerLoader,
} from "@/components/velora/loaders";
import { Marquee } from "@/components/velora/marquee";
import { OrbitingCircles } from "@/components/velora/orbiting-circles";
import { blocksMeta } from "@/lib/blocks-meta";
import componentStats from "@/lib/component-stats.json";
import {
  categories,
  categorySlug,
  componentsMeta,
} from "@/lib/components-meta";
import { JsonLd, publisher } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const stats = componentStats as Record<
  string,
  { bytes: number; gzip: number; deps: string[] }
>;
const statList = Object.values(stats);
const zeroDeps = statList.filter((s) => s.deps.length === 0).length;
const underThreeKb = statList.filter((s) => s.gzip <= 3 * 1024).length;
const kb = (slug: string) => (stats[slug].gzip / 1024).toFixed(1);

// A sample of names for the marquee tile; the full list would bloat the HTML.
const marqueeSample = componentsMeta.filter((_, i) => i % 3 === 0);
const marqueeRows = [
  marqueeSample.slice(0, Math.ceil(marqueeSample.length / 2)),
  marqueeSample.slice(Math.ceil(marqueeSample.length / 2)),
];

const REGISTRY = `${siteConfig.url}/r/{name}.json`;
const installSteps = [
  {
    title: "1. Register the namespace",
    command: `npx shadcn@latest registry add @velora=${REGISTRY}`,
  },
  {
    title: "2. Add a component or a block",
    command: "npx shadcn@latest add @velora/marquee @velora/hero-globe",
  },
];
const INSTALL = "npx shadcn@latest add @velora/marquee";

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Backgrounds: WavesIcon,
  Text: TypeIcon,
  Buttons: MousePointerClickIcon,
  "Cards & Layout": LayoutGridIcon,
  Navigation: MenuIcon,
  Forms: TextCursorInputIcon,
  Overlays: AppWindowIcon,
  Loaders: LoaderIcon,
  "Social Proof": MessageSquareQuoteIcon,
  Scroll: ChevronsDownIcon,
  Effects: SparklesIcon,
  "3D": BoxIcon,
  Carousels: GalleryHorizontalIcon,
  "Cursor & Pointer": MousePointer2Icon,
  "Data & Maps": GlobeIcon,
  Mockups: MonitorSmartphoneIcon,
};

const featuredBlocks = [
  "hero-globe",
  "features-bento",
  "pricing-three-tiers",
  "testimonials-marquee",
].flatMap((slug) => blocksMeta.filter((b) => b.slug === slug));

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Is Velora UI free for commercial projects?",
    a: (
      <>
        Yes. Every component, block and the SaaS template are MIT licensed, so you can
        use them in personal, client and commercial work. The source is on{" "}
        <a href={siteConfig.github} className="text-foreground underline underline-offset-4">
          GitHub
        </a>
        .
      </>
    ),
  },
  {
    q: "What do I need to use it?",
    a: "React 19, Tailwind CSS v4 and a shadcn/ui project. About half the components use Motion; the shadcn CLI installs it when a component needs it.",
  },
  {
    q: "Does it work with Radix UI or Base UI?",
    a: "Both. Velora components don't import Radix or Base UI, so they work whichever primitive layer your shadcn project uses.",
  },
  {
    q: "What happens when someone prefers reduced motion?",
    a: "Every animated component respects prefers-reduced-motion on its own, so it still does after you install it. Anything that loops pauses on hover and focus, and each docs page spells out what reduced-motion, keyboard and screen-reader users get.",
  },
  {
    q: "How do installs work?",
    a: (
      <>
        Components are source files you own. The shadcn CLI copies them into{" "}
        <code className="font-mono text-foreground">components/velora</code>, merges any
        keyframes and brand tokens into your CSS and installs npm dependencies. There is no
        Velora package to update. Blocks install the same way and bring the components they
        use along.
      </>
    ),
  },
  {
    q: "Can my AI agent install components?",
    a: (
      <>
        Yes. Velora is a standard shadcn registry, so the shadcn MCP server can search and
        install it by name. <a href="/llms.txt" className="text-foreground underline underline-offset-4">llms.txt</a>{" "}
        lists every component with its size and install command.
      </>
    ),
  },
  {
    q: "What is Velora Pro?",
    a: (
      <>
        A paid add-on in the works: niche templates, more section variants and a private
        registry, for $99 paid once. Everything free today stays free and MIT.{" "}
        <Link href="/pricing#waitlist" className="text-foreground underline underline-offset-4">
          Join the waitlist
        </Link>{" "}
        to hear when it opens.
      </>
    ),
  },
];

/** A showcase tile: a live component with its name, docs link and size. */
function Tile({
  slug,
  className,
  children,
}: {
  slug: string;
  className?: string;
  children: React.ReactNode;
}) {
  const meta = componentsMeta.find((c) => c.slug === slug);
  const s = stats[slug];
  return (
    <figure
      className={cn(
        "relative flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-card/50",
        className
      )}
    >
      <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
      <figcaption className="flex flex-wrap items-center justify-between gap-x-3 gap-y-0.5 border-t border-border/60 px-4 py-2.5 text-sm">
        <Link
          href={`/components/${slug}`}
          className="group/link inline-flex min-w-0 items-center gap-1 rounded-sm font-medium transition-colors outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="truncate">{meta?.title ?? slug}</span>
          <ArrowRightIcon className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover/link:translate-x-0.5" />
        </Link>
        {s && (
          <span className="shrink-0 font-mono text-xs text-muted-foreground">
            {kb(slug)} KB{s.deps.length === 0 && " · 0 deps"}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

function SectionHeading({
  id,
  eyebrow,
  title,
  children,
  className,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="text-sm font-medium text-primary">{eyebrow}</p>
      <h2
        id={id}
        className="mt-2 text-3xl font-semibold tracking-tight text-balance lg:text-4xl"
      >
        {title}
      </h2>
      {children && <p className="mt-3 text-muted-foreground text-pretty">{children}</p>}
    </div>
  );
}

export default function Home() {
  const why = [
    {
      icon: AccessibilityIcon,
      metric: "60",
      label: "accessibility fixes, documented per component",
      links: [{ href: "/components/animated-tabs#accessibility", label: "See an example" }],
    },
    {
      icon: GaugeIcon,
      metric: "≤ 3 KB",
      label: `${underThreeKb} of ${componentsMeta.length} components, gzipped`,
      links: [{ href: "/components/marquee", label: `Marquee: ${kb("marquee")} KB` }],
    },
    {
      icon: TerminalIcon,
      metric: "1 command",
      label: "code, keyframes, tokens and dependencies",
      links: [{ href: "/components/get-started", label: "How installs work" }],
    },
    {
      icon: GitCompareIcon,
      metric: "3",
      label: "comparisons, measured the same way",
      links: [
        { href: "/compare/aceternity-ui", label: "Aceternity" },
        { href: "/compare/magic-ui", label: "Magic UI" },
        { href: "/compare/react-bits", label: "React Bits" },
      ],
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
            publisher,
          },
          { ...publisher, sameAs: [siteConfig.github] },
        ]}
      />
      <SiteHeader />

      <main>
        {/* Hero + live showcase */}
        <section className="relative overflow-hidden pt-28 pb-16 lg:pt-36">
          <AuroraBackground intensity="subtle" />
          <GridPattern
            width={48}
            height={48}
            className="fill-transparent stroke-border/60 mask-[radial-gradient(ellipse_70%_50%_at_30%_0%,black,transparent)]"
          />
          <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 lg:grid-cols-2 lg:gap-12 lg:px-8">
            {/* Plain server HTML: the h1 and intro are the LCP. */}
            <div className="min-w-0">
              <Link
                href="/changelog"
                className="group/pill inline-flex max-w-full items-center gap-2 rounded-full border border-border/60 bg-card/60 py-1 pr-3 pl-1 text-sm backdrop-blur transition-colors hover:border-primary/40"
              >
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-foreground">
                  New in 0.7.0
                </span>
                <span className="truncate">Modal, Code Block, Loaders &amp; more</span>
                <ArrowRightIcon className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover/pill:translate-x-0.5" />
              </Link>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl xl:text-6xl">
                Animated React components &amp; blocks —{" "}
                <span className="bg-linear-to-r from-brand-from via-brand-via to-brand-to bg-clip-text text-transparent">
                  free, accessible, MIT
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground text-pretty">
                {componentsMeta.length} components and {blocksMeta.length} blocks for Tailwind CSS 4
                and shadcn/ui. One command, source you own.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/components"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background shadow-lg shadow-primary/20 transition-opacity hover:opacity-90"
                >
                  Browse components
                  <ArrowRightIcon className="size-4" />
                </Link>
                <Link
                  href="/components/get-started"
                  className="inline-flex h-11 items-center rounded-full border bg-background/60 px-6 text-sm font-medium backdrop-blur transition-colors hover:bg-muted"
                >
                  Get started
                </Link>
              </div>

              <div className="mt-6 flex max-w-md items-center gap-2 rounded-xl border bg-card/60 py-1.5 pr-1.5 pl-3.5 backdrop-blur">
                <span aria-hidden className="font-mono text-sm text-muted-foreground">
                  $
                </span>
                <code className="min-w-0 flex-1 truncate font-mono text-xs sm:text-sm">
                  {INSTALL}
                </code>
                <CopyButton text={INSTALL} label="Copy install command" />
              </div>
            </div>

            <div className="grid min-w-0 grid-cols-2 gap-3 lg:auto-rows-[10.5rem]">
              <Tile slug="globe" className="col-span-2 h-80 sm:col-span-1 sm:row-span-2 lg:h-auto">
                <LiveDemo name="globe" />
              </Tile>
              <Tile slug="morphing-text" className="col-span-2 h-40 sm:col-span-1 lg:h-auto">
                <LiveDemo name="morphing-text" />
              </Tile>
              <Tile slug="border-beam" className="col-span-2 h-40 sm:col-span-1 lg:h-auto">
                <div className="flex size-full items-center justify-center p-4">
                  <LiveDemo name="border-beam" />
                </div>
              </Tile>
              <Tile slug="dock" className="col-span-2 h-40 lg:h-auto">
                <LiveDemo name="dock" />
              </Tile>
            </div>
          </div>

          <div className="relative mx-auto mt-3 grid max-w-7xl grid-cols-2 gap-3 px-4 lg:grid-cols-4 lg:auto-rows-[11rem] lg:px-8">
            <Tile slug="3d-card" className="col-span-2 h-80 sm:col-span-1 lg:row-span-2 lg:h-auto">
              <div className="flex size-full items-center justify-center p-4">
                <LiveDemo name="3d-card" />
              </div>
            </Tile>
            <Tile slug="animated-list" className="col-span-2 h-80 sm:col-span-1 lg:row-span-2 lg:h-auto">
              <LiveDemo name="animated-list" />
            </Tile>
            <Tile slug="marquee" className="col-span-2 h-44 lg:h-auto">
              <div className="flex size-full flex-col justify-center gap-2.5">
                <Marquee pauseOnHover repeat={2} className="[--duration:90s] [--gap:0.5rem]">
                  {marqueeRows[0].map((c) => (
                    <span
                      key={c.slug}
                      className="rounded-full border bg-background px-3 py-1 text-xs whitespace-nowrap text-muted-foreground"
                    >
                      {c.title}
                    </span>
                  ))}
                </Marquee>
                <Marquee
                  pauseOnHover
                  reverse
                  repeat={2}
                  className="[--duration:90s] [--gap:0.5rem]"
                >
                  {marqueeRows[1].map((c) => (
                    <span
                      key={c.slug}
                      className="rounded-full border bg-background px-3 py-1 text-xs whitespace-nowrap text-muted-foreground"
                    >
                      {c.title}
                    </span>
                  ))}
                </Marquee>
              </div>
            </Tile>
            <Tile slug="orbiting-circles" className="h-48 lg:h-auto">
              <div className="relative flex size-full items-center justify-center">
                <ZapIcon className="size-6 text-primary" />
                <OrbitingCircles radius={52} iconSize={26} duration={20}>
                  <LayersIcon className="size-3.5 text-muted-foreground" />
                  <PaletteIcon className="size-3.5 text-muted-foreground" />
                  <GaugeIcon className="size-3.5 text-muted-foreground" />
                  <FeatherIcon className="size-3.5 text-muted-foreground" />
                </OrbitingCircles>
              </div>
            </Tile>
            <Tile slug="loaders" className="h-48 lg:h-auto">
              <div
                aria-hidden
                className="flex size-full flex-wrap content-center items-center justify-center gap-4 p-4 text-primary"
              >
                <DotsLoader />
                <PulseLoader />
                <OrbitLoader />
                <BarsLoader />
                <SpinnerLoader />
              </div>
            </Tile>
          </div>
        </section>

        {/* Stack strip */}
        <section aria-label="Built on" className="border-y border-border/40 py-12">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <p className="mb-8 text-center text-sm text-muted-foreground">
              Built on the stack you already ship
            </p>
            <Marquee pauseOnHover className="[--duration:30s]">
              {stackNames.map((name) => (
                <StackLogo
                  key={name}
                  name={name}
                  className="mx-8 text-lg font-semibold tracking-tight text-muted-foreground transition-colors hover:text-foreground"
                />
              ))}
            </Marquee>
          </div>
        </section>

        {/* Stats */}
        <section aria-label="Velora in numbers" className="px-4 py-14 lg:px-8">
          <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl border bg-border lg:grid-cols-4">
            {[
              { value: componentsMeta.length, label: "components" },
              { value: blocksMeta.length, label: "free blocks" },
              { value: zeroDeps, label: "zero-dependency" },
              { value: "MIT", label: "open source" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col-reverse gap-1 bg-background p-6 lg:p-8">
                <dt className="text-sm text-muted-foreground">{s.label}</dt>
                <dd className="text-4xl font-semibold tracking-tight">{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Categories */}
        <section aria-labelledby="categories" className="py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                id="categories"
                eyebrow="Components"
                title={`${categories.length} categories`}
              />
              <Link
                href="/components"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                All {componentsMeta.length} components
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
              {categories.map((category) => {
                const count = componentsMeta.filter((c) => c.category === category).length;
                const Icon = categoryIcons[category] ?? SparklesIcon;
                return (
                  <li
                    key={category}
                    className="group/card relative flex items-center gap-3 rounded-xl border bg-card/50 p-3 transition-colors focus-within:ring-2 focus-within:ring-ring hover:border-primary/40"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover/card:bg-primary/15">
                      <Icon className="size-4.5" />
                    </span>
                    <h3 className="min-w-0 flex-1 truncate text-sm font-medium">
                      <Link
                        href={`/components/category/${categorySlug(category)}`}
                        className="outline-none after:absolute after:inset-0 after:rounded-xl"
                      >
                        {category}
                      </Link>
                    </h3>
                    <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 font-mono text-xs text-foreground tabular-nums">
                      {count}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* Blocks */}
        <section aria-labelledby="blocks" className="py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading id="blocks" eyebrow="Blocks" title="Whole sections, free" />
              <Link
                href="/blocks"
                className="inline-flex h-10 items-center gap-1.5 rounded-full border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted"
              >
                {blocksMeta.length} free blocks
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featuredBlocks.map((block) => (
                <li
                  key={block.slug}
                  className="group/card relative min-w-0 overflow-hidden rounded-2xl border bg-card/50 transition-all focus-within:ring-2 focus-within:ring-ring hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="border-b">
                    <BlockThumbnail src={`/blocks/preview/${block.slug}`} />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium">
                      <Link
                        href={`/blocks/${block.category}`}
                        className="outline-none after:absolute after:inset-0"
                      >
                        {block.title}
                      </Link>
                    </h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Why */}
        <section aria-labelledby="why" className="py-14 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <SectionHeading id="why" eyebrow="Why Velora" title="Claims you can check" />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {why.map((item) => (
                <li key={item.label} className="flex flex-col rounded-2xl border bg-card/50 p-5">
                  <item.icon className="size-5 text-primary" />
                  <p className="mt-4 text-3xl font-semibold tracking-tight">{item.metric}</p>
                  <p className="mt-1 flex-1 text-sm text-muted-foreground">{item.label}</p>
                  <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm font-medium">
                    {item.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline"
                      >
                        {link.label}
                        {item.links.length === 1 && <ArrowRightIcon className="size-3.5" />}
                      </Link>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Install */}
        <section aria-labelledby="install" className="py-14 lg:py-20">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 lg:grid-cols-5 lg:gap-16 lg:px-8">
            <div className="lg:col-span-2">
              <SectionHeading id="install" eyebrow="Install" title="Install in seconds" />
              <Link
                href="/components/get-started"
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Read the get started guide
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
            <ol className="min-w-0 space-y-6 lg:col-span-3">
              {installSteps.map((step) => (
                <li key={step.title} className="min-w-0">
                  <p className="mb-2 text-sm font-medium">{step.title}</p>
                  <div className="flex items-start gap-3 rounded-xl border bg-neutral-950 py-2 pr-2 pl-4 text-neutral-200">
                    <code className="min-w-0 flex-1 py-1.5 font-mono text-sm break-all">
                      {step.command}
                    </code>
                    <CopyButton
                      text={step.command}
                      label={`Copy: ${step.title.slice(3).toLowerCase()} command`}
                      className="shrink-0 border-white/15 bg-white/5 text-neutral-300"
                    />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Pro teaser */}
        <section aria-labelledby="pro" className="py-8">
          <div className="mx-auto max-w-6xl px-4 lg:px-8">
            <div className="flex flex-col gap-4 rounded-2xl border bg-card/50 p-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
              <div>
                <h2 id="pro" className="flex flex-wrap items-center gap-2 font-semibold">
                  Velora Pro
                  <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-foreground">
                    Coming soon
                  </span>
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Niche templates, $99 once. The library stays free.
                </p>
              </div>
              <Link
                href="/pricing#waitlist"
                className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full border bg-background px-5 text-sm font-medium transition-colors hover:bg-muted"
              >
                Join the waitlist
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq" className="py-14 lg:py-20">
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <h2 id="faq" className="text-center text-3xl font-semibold tracking-tight lg:text-4xl">
              Questions, answered
            </h2>
            <Accordion type="single" collapsible className="mt-10">
              {faqs.map((faq) => (
                <AccordionItem key={faq.q} value={faq.q}>
                  <AccordionTrigger className="text-left text-base">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section aria-labelledby="cta" className="relative overflow-hidden py-24 lg:py-32">
          <GridPattern
            width={48}
            height={48}
            className="fill-transparent stroke-border/60 mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"
          />
          <div className="relative mx-auto max-w-3xl px-4 text-center lg:px-8">
            <h2 id="cta" className="text-4xl font-semibold tracking-tight text-balance lg:text-5xl">
              Pick a component. Run one command.{" "}
              <span className="bg-linear-to-r from-brand-from via-brand-via to-brand-to bg-clip-text text-transparent">
                Own the code.
              </span>
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/components"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background shadow-lg shadow-primary/20 transition-opacity hover:opacity-90"
              >
                Browse components
                <ArrowRightIcon className="size-4" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex h-11 items-center rounded-full border bg-background/60 px-6 text-sm font-medium transition-colors hover:bg-muted"
              >
                See the template
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
