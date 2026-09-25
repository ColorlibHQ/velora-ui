import { componentsMeta } from "@/lib/components-meta";
import { ogCard, ogSize } from "@/lib/og-card";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "Free animated React components — Velora UI";

export default function Image() {
  return ogCard({
    eyebrow: "Components",
    title: `${componentsMeta.length} animated components`,
    accent: "for React",
    description:
      "Copy the code or install with the shadcn CLI. Every one documents its size and accessibility.",
    chips: ["Tailwind CSS", "Motion", "Reduced-motion safe", "MIT"],
  });
}
