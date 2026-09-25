import type { MetadataRoute } from "next";

import { componentsMeta } from "@/lib/components-meta";
import { blogPosts } from "@/lib/blog-posts";
import { siteConfig } from "@/lib/site-config";

export const dynamic = "force-static";

const BASE = siteConfig.url;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/components",
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
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const postPages = blogPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.dateISO,
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...componentPages, ...postPages];
}
