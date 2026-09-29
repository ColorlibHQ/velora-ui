import { execFileSync } from "node:child_process";
import type { MetadataRoute } from "next";

import { blockCategories, blocksIn } from "@/lib/blocks-meta";
import { categories, categorySlug, componentsMeta } from "@/lib/components-meta";
import { comparisons } from "@/content/compare";
import { blogPosts } from "@/lib/blog-posts";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

const BASE = siteConfig.url;

/**
 * Last commit that touched any of `paths`, so search engines see real
 * change dates. Undefined outside a git checkout or for uncommitted files.
 */
function lastCommit(...paths: string[]): string | undefined {
  try {
    const date = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], {
      encoding: "utf8",
    }).trim();
    return date || undefined;
  } catch {
    return undefined;
  }
}

const latest = (dates: (string | undefined)[]) =>
  dates.filter(Boolean).sort().at(-1);

export default function sitemap(): MetadataRoute.Sitemap {
  const componentDates = Object.fromEntries(
    componentsMeta.map((c) => [
      c.slug,
      lastCommit(`src/components/velora/${c.slug}.tsx`, `src/content/components/${c.slug}`),
    ])
  );

  const staticPages = [
    "",
    "/components",
    "/components/get-started",
    "/components/ai",
    "/blocks",
    "/templates",
    "/templates/saas",
    "/showcase",
    "/themes",
    "/pricing",
    "/blog",
    "/changelog",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const componentPages = componentsMeta.map((c) => ({
    url: `${BASE}/components/${c.slug}`,
    lastModified: componentDates[c.slug],
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const componentCategoryPages = categories.map((category) => ({
    url: `${BASE}/components/category/${categorySlug(category)}`,
    lastModified: latest(
      componentsMeta.filter((c) => c.category === category).map((c) => componentDates[c.slug])
    ),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const blockPages = blockCategories
    .filter((c) => blocksIn(c.slug).length)
    .map((c) => ({
      url: `${BASE}/blocks/${c.slug}`,
      lastModified: lastCommit(
        ...blocksIn(c.slug).map((b) => `src/components/blocks/${b.slug}.tsx`)
      ),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  const comparePages = comparisons.map((c) => ({
    url: `${BASE}/compare/${c.slug}`,
    lastModified: lastCommit("src/content/compare.ts"),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const postPages = blogPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.dateISO,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...blockPages,
    ...componentCategoryPages,
    ...componentPages,
    ...comparePages,
    ...postPages,
  ];
}
