import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

/**
 * Per-page metadata with matching Open Graph and Twitter fields, so shared
 * links show the page's own title instead of the site default. The OG image
 * comes from the nearest opengraph-image file.
 */
export function pageMetadata({
  title,
  absoluteTitle,
  description,
  path,
  noindex,
  image = "/opengraph-image",
}: {
  /** Goes through the "%s — Velora UI" template */
  title?: string;
  /** Used as-is (for keyword-led titles that carry the brand themselves) */
  absoluteTitle?: string;
  description: string;
  path: string;
  noindex?: boolean;
  /** Social card path; defaults to the site card */
  image?: string;
}): Metadata {
  const shareTitle =
    absoluteTitle ??
    (title ? `${title} — ${siteConfig.name}` : siteConfig.name);
  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      url: `${siteConfig.url}${path}`,
      title: shareTitle,
      description,
      // A child's openGraph replaces the parent's wholesale (inherited and
      // file-based images included), so every page names its card.
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [image],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export const absoluteUrl = (path: string) => `${siteConfig.url}${path}`;

export const publisher = {
  "@type": "Organization",
  name: "Colorlib",
  url: "https://colorlib.com",
} as const;

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Renders schema.org JSON-LD. `<` is escaped so content can't close the tag. */
export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[];
}) {
  const graph = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
