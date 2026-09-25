import Link from "next/link";

import { ComponentCard } from "@/components/docs/component-card";
import { AnimatedGradientText } from "@/components/velora/animated-gradient-text";
import {
  categories,
  categorySlug,
  componentsMeta,
} from "@/lib/components-meta";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Components",
  description: `${componentsMeta.length} free animated React components for landing pages. Copy the code or install with the shadcn CLI.`,
  path: "/components",
  image: "/components/opengraph-image",
});

export default function ComponentsPage() {
  return (
    <div>
      <h1 className="text-4xl font-semibold tracking-tight">
        <AnimatedGradientText>{componentsMeta.length}</AnimatedGradientText>{" "}
        animated components
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Every component is free, MIT licensed, reduced-motion safe and
        installable with one CLI command. Click any card for code, props and
        install instructions.
      </p>

      {categories.map((category) => {
        const items = componentsMeta.filter((c) => c.category === category);
        if (!items.length) return null;
        return (
          <section key={category} className="mt-14">
            <h2 className="mb-6 text-xl font-semibold">
              <Link
                href={`/components/category/${categorySlug(category)}`}
                className="hover:underline hover:underline-offset-4"
              >
                {category}
              </Link>
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {items.map((c) => (
                <ComponentCard key={c.slug} component={c} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
