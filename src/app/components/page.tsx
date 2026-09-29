import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { ComponentCard } from "@/components/docs/component-card";
import { AnimatedGradientText } from "@/components/velora/animated-gradient-text";
import {
  categories,
  categorySlug,
  componentsMeta,
  latestSince,
  newComponents,
} from "@/lib/components-meta";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Components",
  description: `${componentsMeta.length} free animated React components for landing pages. Copy the code or install with the shadcn CLI.`,
  path: "/components",
  image: "/components/opengraph-image",
});

const groups = categories
  .map((category) => ({
    category,
    slug: categorySlug(category),
    items: componentsMeta.filter((c) => c.category === category),
  }))
  .filter((g) => g.items.length);

const chip =
  "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border bg-background px-3 text-sm whitespace-nowrap text-muted-foreground transition-colors outline-none hover:border-foreground/20 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring";
const chipCount = "text-xs text-muted-foreground tabular-nums";

export default function ComponentsPage() {
  return (
    <div>
      <h1 className="text-4xl font-semibold tracking-tight">
        <AnimatedGradientText>{componentsMeta.length}</AnimatedGradientText>{" "}
        animated components
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Every component is free, MIT licensed, reduced-motion safe and
        installable with one CLI command. Click any card for code, props and
        install instructions.
      </p>

      <nav
        aria-label="Jump to a category"
        className="sticky top-16 z-20 -mx-4 mt-8 border-b border-border/60 bg-background/85 backdrop-blur-xl lg:mx-0"
      >
        <ul className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-none mask-[linear-gradient(to_right,black_calc(100%-2.5rem),transparent)] after:w-6 after:shrink-0 after:content-[''] lg:px-0 [&::-webkit-scrollbar]:hidden">
          <li>
            <a href="#catalogue" className={chip}>
              All <span className={chipCount}>{componentsMeta.length}</span>
            </a>
          </li>
          {newComponents.length > 0 && (
            <li>
              <a href="#new" className={chip}>
                <span aria-hidden className="size-1.5 rounded-full bg-primary" />
                New <span className={chipCount}>{newComponents.length}</span>
              </a>
            </li>
          )}
          {groups.map((g) => (
            <li key={g.slug}>
              <a href={`#${g.slug}`} className={chip}>
                {g.category}{" "}
                <span className={chipCount}>{g.items.length}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div id="catalogue" className="scroll-mt-36">
        {newComponents.length > 0 && (
          <section
            id="new"
            aria-labelledby="new-heading"
            className="mt-8 scroll-mt-36 rounded-xl border bg-card/40 p-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 id="new-heading" className="text-lg font-semibold">
                New in v{latestSince}{" "}
                <span className="text-sm font-normal text-muted-foreground tabular-nums">
                  {newComponents.length}
                  <span className="sr-only"> components</span>
                </span>
              </h2>
              <Link
                href="/changelog"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Read the changelog
              </Link>
            </div>
            <ul className="mt-3 -mx-2.5 grid grid-cols-2 gap-x-1 gap-y-0.5 md:grid-cols-3 xl:grid-cols-4">
              {newComponents.map((c) => (
                <li key={c.slug} className="min-w-0">
                  <Link
                    href={`/components/${c.slug}`}
                    className="group/new flex flex-col rounded-md px-2.5 py-1.5 transition-colors outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span className="text-sm leading-snug font-medium group-hover/new:text-primary">
                      {c.title}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {c.category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {groups.map((g) => (
          <section
            key={g.slug}
            id={g.slug}
            aria-labelledby={`${g.slug}-heading`}
            className="mt-12 scroll-mt-36"
          >
            <h2 id={`${g.slug}-heading`} className="mb-4 text-xl font-semibold">
              <Link
                href={`/components/category/${g.slug}`}
                className="group/h inline-flex items-baseline gap-2 rounded-sm outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
              >
                {g.category}
                <span className="text-sm font-normal text-muted-foreground tabular-nums">
                  {g.items.length}
                  <span className="sr-only">
                    {g.items.length === 1 ? " component" : " components"}
                  </span>
                </span>
                <ArrowRightIcon
                  aria-hidden
                  className="size-4 self-center text-muted-foreground transition-[translate,color] group-hover/h:translate-x-0.5 group-hover/h:text-primary motion-reduce:transition-none"
                />
              </Link>
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {g.items.map((c) => (
                <ComponentCard key={c.slug} component={c} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
