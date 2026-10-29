import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { AnimatedGradientText } from "@/components/velora/animated-gradient-text";
import { BlockThumbnail } from "@/components/docs/block-thumbnail";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import {
  blockCategories,
  blocksIn,
  blocksMeta,
  freeBlocks,
  proBlocks,
} from "@/lib/blocks-meta";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "React & Tailwind CSS Blocks",
  description: `${freeBlocks.length} free, copy-paste marketing sections and ${proBlocks.length} Pro application blocks for React and Tailwind CSS — heroes, pricing, KPI cards, charts, tables, AI interfaces and more.`,
  path: "/blocks",
  image: "/blocks/opengraph-image",
});

const groups = [
  {
    key: "marketing",
    title: "Marketing sections",
    badge: "Free · MIT",
    count: freeBlocks.length,
  },
  {
    key: "application",
    title: "Application blocks",
    badge: "Pro",
    count: proBlocks.length,
  },
] as const;

export default function BlocksPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl px-4 pt-28 pb-24 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight">
          <AnimatedGradientText>{blocksMeta.length}</AnimatedGradientText>{" "}
          blocks for React & Tailwind CSS
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Marketing sections are free and install with the shadcn CLI.
          Application blocks for dashboards and SaaS apps come with Velora Pro.
        </p>

        {groups.map((group) => {
          const categories = blockCategories.filter(
            (c) => c.group === group.key && blocksIn(c.slug).length,
          );
          return (
            <section
              key={group.key}
              aria-labelledby={`${group.key}-title`}
              className="mt-16"
            >
              <div className="flex flex-wrap items-baseline gap-3">
                <h2
                  id={`${group.key}-title`}
                  className="text-2xl font-semibold tracking-tight"
                >
                  {group.title}
                </h2>
                <span className="text-sm text-muted-foreground tabular-nums">
                  {group.count} blocks · {categories.length} categories
                </span>
                <Badge
                  variant={group.key === "application" ? "default" : "secondary"}
                >
                  {group.badge}
                </Badge>
              </div>

              <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((cat) => {
                  const blocks = blocksIn(cat.slug);
                  return (
                    <li
                      key={cat.slug}
                      className="group/card relative min-w-0 overflow-hidden rounded-2xl border bg-card/50 transition-all focus-within:ring-2 focus-within:ring-ring hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5"
                    >
                      <div className="border-b">
                        <BlockThumbnail
                          src={`/blocks/preview/${blocks[0].slug}`}
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-medium">
                          <Link
                            href={`/blocks/${cat.slug}`}
                            className="outline-none after:absolute after:inset-0"
                          >
                            {cat.title}
                          </Link>
                        </h3>
                        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                          {blocks.length}{" "}
                          {blocks.length === 1 ? "block" : "blocks"}
                          <ArrowRightIcon className="size-3.5 transition-transform group-hover/card:translate-x-0.5" />
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </main>
      <SiteFooter />
    </>
  );
}
