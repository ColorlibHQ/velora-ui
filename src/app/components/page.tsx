import type { Metadata } from "next";
import Link from "next/link";

import { componentDemos } from "@/components/demo/component-demos";
import { AnimatedGradientText } from "@/components/velora/animated-gradient-text";
import { categories, componentsMeta } from "@/lib/components-meta";

export const metadata: Metadata = {
  title: "Components",
  alternates: { canonical: "/components" },
  description: `${componentsMeta.length} free animated React components for landing pages. Copy the code or install with the shadcn CLI.`,
};

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
            <h2 className="mb-6 text-xl font-semibold">{category}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {items.map((c) => (
                <Link
                  key={c.slug}
                  href={`/components/${c.slug}`}
                  className="group min-w-0 rounded-2xl border bg-card/50 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex h-56 items-center justify-center overflow-hidden border-b border-border/60 p-6 [&_*]:pointer-events-none">
                    {componentDemos[c.slug]}
                  </div>
                  <div className="p-5">
                    <h3 className="font-medium transition-colors group-hover:text-primary">
                      {c.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {c.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
