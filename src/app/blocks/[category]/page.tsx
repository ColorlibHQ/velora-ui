import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlockPreview } from "@/components/docs/block-preview";
import { PackageManagerCommand } from "@/components/docs/install-tabs";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { blockCategories, blocksIn } from "@/lib/blocks-meta";
import { componentsMeta } from "@/lib/components-meta";
import { highlight } from "@/lib/highlight";
import { JsonLd, absoluteUrl, breadcrumbs, pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const REGISTRY_BASE =
  process.env.NEXT_PUBLIC_REGISTRY_URL ?? `${siteConfig.url}/r`;

export function generateStaticParams() {
  return blockCategories
    .filter((c) => blocksIn(c.slug).length)
    .map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = blockCategories.find((c) => c.slug === category);
  if (!cat) return {};
  return pageMetadata({
    absoluteTitle: `Free ${cat.title} for React & Tailwind CSS | Velora UI`,
    description: cat.description,
    path: `/blocks/${cat.slug}`,
    image: `/blocks/${cat.slug}/opengraph-image`,
  });
}

const titleOf = (slug: string) =>
  componentsMeta.find((c) => c.slug === slug)?.title ?? slug;

export default async function BlockCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = blockCategories.find((c) => c.slug === category);
  const blocks = blocksIn(category);
  if (!cat || !blocks.length) notFound();

  const items = await Promise.all(
    blocks.map(async (block) => {
      const code = await fs.readFile(
        path.join(process.cwd(), "src/components/blocks", `${block.slug}.tsx`),
        "utf8",
      );
      return { block, code, html: await highlight(code) };
    }),
  );

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl px-4 pt-28 pb-24 lg:px-8">
        <JsonLd
          data={[
            breadcrumbs([
              { name: "Blocks", path: "/blocks" },
              { name: cat.title, path: `/blocks/${cat.slug}` },
            ]),
            {
              "@type": "CollectionPage",
              name: cat.heading,
              description: cat.description,
              url: absoluteUrl(`/blocks/${cat.slug}`),
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: blocks.length,
                itemListElement: blocks.map((b, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  name: b.title,
                  url: absoluteUrl(`/blocks/${cat.slug}#${b.slug}`),
                })),
              },
            },
          ]}
        />
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link
                href="/blocks"
                className="transition-colors hover:text-foreground"
              >
                Blocks
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>{cat.title}</li>
          </ol>
        </nav>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          {cat.heading}
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {cat.description}
        </p>

        <nav
          aria-label="Block categories"
          className="mt-8 flex flex-wrap gap-2"
        >
          {blockCategories
            .filter((c) => blocksIn(c.slug).length)
            .map((c) => (
              <Link
                key={c.slug}
                href={`/blocks/${c.slug}`}
                aria-current={c.slug === cat.slug ? "page" : undefined}
                className={cn(
                  "rounded-full border px-3 py-1 text-sm transition-colors",
                  c.slug === cat.slug
                    ? "border-primary/40 bg-primary/10 text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {c.title}
                <span className="ml-1.5 text-xs text-muted-foreground">
                  {blocksIn(c.slug).length}
                </span>
              </Link>
            ))}
        </nav>

        <div className="mt-14 space-y-20">
          {items.map(({ block, code, html }) => (
            <section
              key={block.slug}
              id={block.slug}
              aria-labelledby={`${block.slug}-title`}
              className="scroll-mt-24"
            >
              <h2
                id={`${block.slug}-title`}
                className="text-xl font-semibold tracking-tight"
              >
                <a
                  href={`#${block.slug}`}
                  className="hover:underline hover:underline-offset-4"
                >
                  {block.title}
                </a>
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {block.description}
              </p>

              <div className="mt-5">
                <BlockPreview
                  src={`/blocks/preview/${block.slug}`}
                  registryUrl={`${REGISTRY_BASE}/${block.slug}.json`}
                  title={block.title}
                  code={code}
                  highlighted={html}
                />
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_20rem]">
                <PackageManagerCommand
                  type="dlx"
                  args={`shadcn@latest add ${REGISTRY_BASE}/${block.slug}.json`}
                />
                {block.components.length > 0 && (
                  <p className="text-sm text-muted-foreground lg:pt-9">
                    Installs to{" "}
                    <code className="font-mono text-foreground">
                      components/blocks/{block.slug}.tsx
                    </code>{" "}
                    with{" "}
                    {block.components.map((c, i) => (
                      <span key={c}>
                        {i > 0 &&
                          (i === block.components.length - 1 ? " and " : ", ")}
                        <Link
                          href={`/components/${c}`}
                          className="text-foreground underline-offset-4 hover:underline"
                        >
                          {titleOf(c)}
                        </Link>
                      </span>
                    ))}
                    .
                  </p>
                )}
              </div>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
