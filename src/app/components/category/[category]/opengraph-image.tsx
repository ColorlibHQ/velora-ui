import {
  categories,
  categoryFromSlug,
  categorySlug,
  componentsMeta,
} from "@/lib/components-meta";
import { ogCard, ogSize } from "@/lib/og-card";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "Velora UI components";

export function generateStaticParams() {
  return categories.map((c) => ({ category: categorySlug(c) }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const name = categoryFromSlug(category)!;
  const count = componentsMeta.filter((c) => c.category === name).length;
  return ogCard({
    eyebrow: "Components",
    title: name,
    accent: "for React",
    description: `${count} free, animated ${name.toLowerCase()} components for React and Tailwind CSS.`,
    chips: ["shadcn CLI", "Reduced-motion safe", "MIT"],
  });
}
