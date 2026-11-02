import fs from "node:fs/promises";
import path from "node:path";
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
/** HTML captured by `pnpm pro:snapshot` at each preview width. */
interface ProSnapshot {
  mobile: string;
  tablet: string;
  laptop: string;
  desktop: string;
}

// Each snapshot covers widths from its capture width up to the next one, so
// it is only ever scaled up a little. Keep in sync with pro/scripts/snapshot-pro.mjs.
const SNAPSHOT_RANGES: [keyof ProSnapshot, string][] = [
  ["mobile", "min-[768px]:hidden"],
  ["tablet", "hidden min-[768px]:block min-[1024px]:hidden"],
  ["laptop", "hidden min-[1024px]:block min-[1216px]:hidden"],
  ["desktop", "hidden min-[1216px]:block"],
];

async function readSnapshot(slug: string): Promise<ProSnapshot> {
  const file = path.join(process.cwd(), "pro/previews", `${slug}.json`);
  return JSON.parse(await fs.readFile(file, "utf8"));
}

export default async function BlockPreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = blocksMeta.find((b) => b.slug === slug);
  if (!meta) notFound();
  const Block = blockComponents[slug];

  // Application blocks are fragments of a page, not full-bleed sections.
  const shell = meta.pro ? "bg-muted/30 p-6 sm:p-10" : "bg-background";

  if (Block) {
    return (
      <main className={shell}>
        <Block />
      </main>
    );
  }

  // Production Pro preview: rendered HTML only, so no Pro code reaches the
  // browser. The iframe's width picks the snapshot (CSS only, no script).
  const snap = await readSnapshot(slug);
  return (
    <main className={shell} data-snapshot="">
      {SNAPSHOT_RANGES.map(([width, className]) => (
        <div
          key={width}
          className={className}
          dangerouslySetInnerHTML={{ __html: snap[width] }}
        />
      ))}
    </main>
  );
}
