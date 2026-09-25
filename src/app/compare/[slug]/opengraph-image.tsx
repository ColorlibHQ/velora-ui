import { comparisons, velora } from "@/content/compare";
import { ogCard, ogSize } from "@/lib/og-card";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "Velora UI comparison";

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = comparisons.find((x) => x.slug === slug)!;
  return ogCard({
    eyebrow: "Comparison",
    title: "Velora UI vs",
    accent: c.them.name,
    description:
      "Components, blocks, licence, price and accessibility — measured the same way for both.",
    chips: [
      `${velora.freeComponents} free components`,
      `${velora.freeBlocks} free blocks`,
      "MIT",
    ],
  });
}
