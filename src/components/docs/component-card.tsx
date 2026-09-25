import Link from "next/link";

import { componentExamples } from "@/content/components";
import type { ComponentMeta } from "@/lib/components-meta";

/**
 * Catalogue card with a live, inert preview. Demos can contain links and
 * buttons, so the card isn't a link itself: the title link stretches over it.
 */
export function ComponentCard({
  component,
  headingLevel: Heading = "h3",
}: {
  component: ComponentMeta;
  headingLevel?: "h2" | "h3";
}) {
  const Demo = componentExamples[component.slug]?.[0]?.Component;
  return (
    <div className="group/card relative min-w-0 rounded-2xl border bg-card/50 transition-all focus-within:ring-2 focus-within:ring-ring hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5">
      <div
        inert
        className="flex h-56 items-center justify-center overflow-hidden border-b border-border/60 p-6"
      >
        {Demo && <Demo />}
      </div>
      <div className="p-5">
        <Heading className="font-medium transition-colors group-hover/card:text-primary">
          <Link
            href={`/components/${component.slug}`}
            className="outline-none after:absolute after:inset-0 after:rounded-2xl"
          >
            {component.title}
          </Link>
        </Heading>
        <p className="mt-1 text-sm text-muted-foreground">
          {component.description}
        </p>
      </div>
    </div>
  );
}
