import { blocksMeta } from "@/lib/blocks-meta";
import { componentsMeta } from "@/lib/components-meta";
import { ogCard, ogSize } from "@/lib/og-card";
import { siteConfig } from "@/lib/site-config";

// Prerender the PNG at build time so it ships as a static asset (output: export).
export const dynamic = "force-static";
export const size = ogSize;
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

export default function OpengraphImage() {
  return ogCard({
    title: "Landing pages that feel",
    accent: "effortless.",
    description: "Free, MIT-licensed animated components and blocks for React.",
    chips: [
      `${componentsMeta.length} components`,
      `${blocksMeta.length} blocks`,
      "$0 forever",
    ],
  });
}
