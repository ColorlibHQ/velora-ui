import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { blockComponents } from "@/content/blocks-index";
import { blocksMeta } from "@/lib/blocks-meta";

export function generateStaticParams() {
  return blocksMeta.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const block = blocksMeta.find((b) => b.slug === slug);
  if (!block) return {};
  return {
    title: `${block.title} preview`,
    // Bare iframe target — the category page is the one to index.
    robots: { index: false, follow: true },
  };
}

/** A block alone on the page, for the docs iframe and "open in new tab". */
export default async function BlockPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const Block = blockComponents[slug];
  if (!Block) notFound();
  return (
    <main className="bg-background">
      <Block />
    </main>
  );
}
