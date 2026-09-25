import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHeader } from "@/components/page-header";
import { BlurFade } from "@/components/velora/blur-fade";

export const metadata: Metadata = {
  title: "Changelog",
  alternates: { canonical: "/changelog" },
  description:
    "Every Velora UI release: new components, template pages and improvements.",
};

interface Release {
  date: string;
  version: string;
  title: string;
  tag?: "New" | "Improved" | "Fixed";
  items: string[];
}

const releases: Release[] = [
  {
    date: "September 5, 2026",
    version: "0.4.0",
    title: "The catalogue doubles to 64 components",
    tag: "New",
    items: [
      "Four new categories: Navigation, Forms, Social Proof and Scroll — each previously empty",
      "Navigation: floating navbar, morphing navbar menu, dismissible sticky banner",
      "Forms: vanish input, drag-and-drop file zone, multi-step stepper",
      "Social proof: animated testimonials, tweet card and logo cloud — no API calls, no rate limits",
      "Scroll: sticky scroll, container scroll, tracing beam, scroll velocity and parallax grid",
      "Buttons expanded to seven, including a View Transitions theme toggler",
      "Six more cards, four more text effects, three more backgrounds",
      "Still 0.3–1.5 KB per component — and 33 of the 64 have zero runtime dependencies",
    ],
  },
  {
    date: "September 5, 2026",
    version: "0.3.1",
    title: "Next.js 16.3, TypeScript 7 and Motion 13",
    tag: "Improved",
    items: [
      "Next.js 16.3: Turbopack disk caching for production builds and a much lighter dev server",
      "TypeScript 7, the native compiler — type checking this project is about 3× faster",
      "Motion 13 and React 19.2.8, with no changes needed in any component",
      "Every other dependency refreshed to its latest release",
    ],
  },
  {
    date: "July 16, 2026",
    version: "0.3.0",
    title: "Multi-page template, themes and performance receipts",
    tag: "New",
    items: [
      "Complete multi-page template: pricing, blog (MDX), about, contact, changelog, login, signup and a custom 404",
      "Theme presets page with live preview and copy-paste token blocks",
      "Per-component performance receipts: gzipped size, dependency count and reduced-motion behavior on every docs page",
      "Base UI compatibility: all Velora primitives are primitive-agnostic and work in Base UI or Radix shadcn projects",
      "Sitemap, robots and llms.txt cover all pages",
    ],
  },
  {
    date: "July 16, 2026",
    version: "0.2.0",
    title: "Blue default theme and a calmer look",
    tag: "Improved",
    items: [
      "Primary and brand tokens moved from violet to a restrained blue ramp",
      "Gradient text limited to the hero; section headings use solid primary color",
      "Reduced decorative effect stacking in hero and CTA sections",
      "All dependencies updated: Next.js 16.2.10, React 19.2.7, Motion 12.42, Tailwind CSS 4.3.3",
    ],
  },
  {
    date: "June 12, 2026",
    version: "0.1.2",
    title: "Registry, docs site and 10 new components",
    tag: "New",
    items: [
      "shadcn registry: every component installs with one CLI command and carries its own keyframes and tokens",
      "Docs site with live previews, install commands and highlighted source",
      "10 new components — 32 total: text shimmer, flip words, sparkles text, terminal, confetti, lamp, background beams, animated tooltip, browser and iPhone mockups",
      "Light mode with next-themes and a CSS-driven toggle",
      "llms.txt for AI-agent discovery",
    ],
  },
  {
    date: "June 11, 2026",
    version: "0.1.1",
    title: "Eight more primitives and four new sections",
    tag: "New",
    items: [
      "Meteors, retro grid, animated beam, animated list, dock, tilt card, avatar circles and canvas particles",
      "Integrations-beam, live-activity, testimonial and CTA sections on the showcase homepage",
    ],
  },
  {
    date: "June 10, 2026",
    version: "0.1.0",
    title: "First public build",
    tag: "New",
    items: [
      "Next.js 16 + Tailwind CSS 4 + shadcn/ui + Motion scaffold",
      "Design tokens: brand gradient variables, animation keyframes and a global reduced-motion kill switch",
      "14 animated primitives and the dark-first showcase homepage",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main className="relative">
      <SiteHeader />

      <PageHeader
        eyebrow="Changelog"
        title={
          <>
            What&apos;s <span className="text-primary">new</span>
          </>
        }
        description="New components, template pages and improvements — shipped in public, documented in full."
      />

      <section className="pb-28">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <ol className="relative space-y-14 border-l border-border/60 pl-8">
            {releases.map((release, i) => (
              <li key={release.version} className="relative">
                <span className="absolute -left-[2.44rem] top-1.5 size-3 rounded-full border-2 border-primary bg-background" />
                <BlurFade delay={Math.min(i * 0.08, 0.3)}>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <time>{release.date}</time>
                      <Badge variant="outline" className="font-mono">
                        v{release.version}
                      </Badge>
                      {release.tag && (
                        <Badge className="bg-primary/15 text-primary hover:bg-primary/15">
                          {release.tag}
                        </Badge>
                      )}
                    </div>
                    <h2 className="mt-3 text-xl font-semibold tracking-tight">
                      {release.title}
                    </h2>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                      {release.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </BlurFade>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
