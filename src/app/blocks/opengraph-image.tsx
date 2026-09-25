import { blocksMeta } from "@/lib/blocks-meta";
import { ogCard, ogSize } from "@/lib/og-card";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "Free React and Tailwind CSS blocks — Velora UI";

export default function Image() {
  return ogCard({
    eyebrow: "Blocks",
    title: `${blocksMeta.length} free sections`,
    accent: "for React",
    description:
      "Heroes, features, pricing, testimonials, CTAs and more — installable with the shadcn CLI.",
    chips: ["Tailwind CSS", "Responsive", "Accessible", "MIT"],
  });
}
