import Link from "next/link";
import { notFound } from "next/navigation";

import { ComponentCard } from "@/components/docs/component-card";
import {
  categories,
  categoryFromSlug,
  categoryInfo,
  categorySlug,
  componentsMeta,
} from "@/lib/components-meta";
import { JsonLd, absoluteUrl, breadcrumbs, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return categories.map((c) => ({ category: categorySlug(c) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const name = categoryFromSlug(category);
  if (!name) return {};
  const count = componentsMeta.filter((c) => c.category === name).length;
  return pageMetadata({
    absoluteTitle: `${categoryInfo[name].heading} (${count} free) | Velora UI`,
    description: categoryInfo[name].description,
    path: `/components/category/${category}`,
    image: `/components/category/${category}/opengraph-image`,
  });
}

export default async function ComponentCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const name = categoryFromSlug(category);
  if (!name) notFound();
  const items = componentsMeta.filter((c) => c.category === name);
  const info = categoryInfo[name];
  const path = `/components/category/${category}`;

  return (
    <div>
      <JsonLd
        data={[
          breadcrumbs([
            { name: "Components", path: "/components" },
            { name, path },
          ]),
          {
            "@type": "CollectionPage",
            name: info.heading,
            description: info.description,
            url: absoluteUrl(path),
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: items.length,
              itemListElement: items.map((c, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: c.title,
                url: absoluteUrl(`/components/${c.slug}`),
              })),
            },
          },
        ]}
      />
      <nav
        aria-label="Breadcrumb"
        className="mb-4 text-sm text-muted-foreground"
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link
              href="/components"
              className="transition-colors hover:text-foreground"
            >
              Components
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>{name}</li>
        </ol>
      </nav>
      <h1 className="text-4xl font-semibold tracking-tight">{info.heading}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{info.description}</p>
      <p className="mt-4 text-sm text-muted-foreground">
        {items.length} {items.length === 1 ? "component" : "components"} · free
        and MIT licensed · install any of them with the shadcn CLI
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {items.map((c) => (
          <ComponentCard key={c.slug} component={c} headingLevel="h2" />
        ))}
      </div>
    </div>
  );
}
