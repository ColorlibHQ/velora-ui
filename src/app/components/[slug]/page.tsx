import fs from "node:fs/promises";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";
import { codeToHtml } from "shiki";

import { CopyButton } from "@/components/docs/copy-button";
import { componentDemos } from "@/components/demo/component-demos";
import { componentsMeta } from "@/lib/components-meta";
import componentStats from "@/lib/component-stats.json";
import { siteConfig } from "@/lib/site-config";

const REGISTRY_BASE =
  process.env.NEXT_PUBLIC_REGISTRY_URL ?? `${siteConfig.url}/r`;

export function generateStaticParams() {
  return componentsMeta.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = componentsMeta.find((c) => c.slug === slug);
  if (!meta) return {};
  return {
    title: meta.title,
    alternates: { canonical: `/components/${slug}` },
    description: meta.description,
  };
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = componentsMeta.find((c) => c.slug === slug);
  if (!meta) notFound();

  const installCommand = `npx shadcn@latest add ${REGISTRY_BASE}/${slug}.json`;
  const source = await fs.readFile(
    path.join(process.cwd(), "src/components/velora", `${slug}.tsx`),
    "utf8"
  );
  const highlighted = await codeToHtml(source, {
    lang: "tsx",
    theme: "github-dark-default",
  });

  return (
    <article>
      <Link
        href="/components"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeftIcon className="size-4" />
        All components
      </Link>

      <h1 className="text-3xl font-semibold tracking-tight">{meta.title}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{meta.description}</p>

      {/* Receipts — generated at build time by scripts/component-stats.mjs */}
      {(() => {
        const stats = (
          componentStats as Record<
            string,
            { bytes: number; gzip: number; deps: string[] }
          >
        )[slug];
        if (!stats) return null;
        const chips = [
          `${(stats.gzip / 1024).toFixed(1)} KB gzipped`,
          stats.deps.length === 0
            ? "Zero dependencies"
            : `Deps: ${stats.deps.join(", ")}`,
          "Reduced-motion safe",
          "Base UI & Radix compatible",
        ];
        return (
          <div className="mt-5 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {chip}
              </span>
            ))}
          </div>
        );
      })()}

      {/* Preview */}
      <div className="relative mt-8 flex min-h-80 items-center justify-center overflow-hidden rounded-2xl border bg-background p-8">
        {componentDemos[slug] ?? (
          <p className="text-sm text-muted-foreground">Preview coming soon</p>
        )}
      </div>

      {/* Install */}
      <h2 className="mt-12 text-lg font-semibold">Installation</h2>
      <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border bg-neutral-950 px-4 py-3 font-mono text-sm text-neutral-200">
        <code className="truncate">{installCommand}</code>
        <CopyButton text={installCommand} className="border-white/15 bg-white/5" />
      </div>
      {meta.dependencies.length > 0 && (
        <p className="mt-3 text-sm text-muted-foreground">
          Installs with: {meta.dependencies.join(", ")}
        </p>
      )}

      {/* Source */}
      <div className="mt-12 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Source</h2>
        <CopyButton text={source} />
      </div>
      <div
        className="mt-3 overflow-x-auto rounded-xl border text-sm [&_pre]:max-h-[36rem] [&_pre]:overflow-auto [&_pre]:p-5"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </article>
  );
}
