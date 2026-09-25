import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { AnimatedGradientText } from "@/components/velora/animated-gradient-text";
import { BlockThumbnail } from "@/components/docs/block-thumbnail";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { blockCategories, blocksIn, blocksMeta } from "@/lib/blocks-meta";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Free React & Tailwind CSS Blocks",
  description: `${blocksMeta.length} free, copy-paste sections for React and Tailwind CSS — heroes, features, pricing, testimonials, CTAs and more. MIT licensed, installable with the shadcn CLI.`,
  path: "/blocks",
  image: "/blocks/opengraph-image",
});

export default function BlocksPage() {
  const categories = blockCategories.filter((c) => blocksIn(c.slug).length);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl px-4 pt-28 pb-24 lg:px-8">
        <h1 className="text-4xl font-semibold tracking-tight">
          <AnimatedGradientText>{blocksMeta.length}</AnimatedGradientText> free
          blocks for React & Tailwind CSS
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Complete sections built from Velora components. Copy the code or
          install one with the shadcn CLI — it brings every component it uses
          along. MIT licensed, accessible, reduced-motion safe.
        </p>

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const blocks = blocksIn(cat.slug);
            return (
              <li
                key={cat.slug}
                className="group/card relative min-w-0 overflow-hidden rounded-2xl border bg-card/50 transition-all focus-within:ring-2 focus-within:ring-ring hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="border-b">
                  <BlockThumbnail src={`/blocks/preview/${blocks[0].slug}`} />
                </div>
                <div className="p-5">
                  <h2 className="font-medium">
                    <Link
                      href={`/blocks/${cat.slug}`}
                      className="outline-none after:absolute after:inset-0"
                    >
                      {cat.title}
                    </Link>
                  </h2>
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    {blocks.length} {blocks.length === 1 ? "block" : "blocks"}
                    <ArrowRightIcon className="size-3.5 transition-transform group-hover/card:translate-x-0.5" />
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
