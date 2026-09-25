import componentStats from "@/lib/component-stats.json";
import { componentsMeta } from "@/lib/components-meta";
import { ogCard, ogSize } from "@/lib/og-card";

export const dynamic = "force-static";
export const size = ogSize;
export const contentType = "image/png";
export const alt = "Velora UI component";

export function generateStaticParams() {
  return componentsMeta.map((c) => ({ slug: c.slug }));
}

const stats = componentStats as Record<
  string,
  { gzip: number; deps: string[] }
>;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = componentsMeta.find((c) => c.slug === slug)!;
  const s = stats[slug];
  return ogCard({
    eyebrow: meta.category,
    title: meta.title,
    description: meta.description,
    chips: [
      "React + Tailwind CSS",
      ...(s ? [`${(s.gzip / 1024).toFixed(1)} KB gzipped`] : []),
      s && s.deps.length === 0 ? "Zero dependencies" : "Motion",
      "MIT",
    ],
  });
}
