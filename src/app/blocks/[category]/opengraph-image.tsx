import { blockCategories, blocksIn } from "@/lib/blocks-meta";
import { ogCard, ogSize } from "@/lib/og-card";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "Velora UI blocks";

export function generateStaticParams() {
  return blockCategories
    .filter((c) => blocksIn(c.slug).length)
    .map((c) => ({ category: c.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = blockCategories.find((c) => c.slug === category)!;
  const count = blocksIn(category).length;
  return ogCard({
    eyebrow: "Free blocks",
    title: cat.title,
    accent: "for React",
    description: `${count} free, copy-paste ${cat.title.toLowerCase()} for React and Tailwind CSS.`,
    chips: ["shadcn CLI", "Responsive", "Accessible", "MIT"],
  });
}
