import Link from "next/link";

import { componentExamples } from "@/content/components";
import { isNew, type ComponentMeta } from "@/lib/components-meta";

/**
 * Catalogue card with a live, inert preview. Demos can contain links and
 * buttons, so the card isn't a link itself: the title link stretches over it.
 *
 * The demo renders on a stage 4/3 the size of the frame, scaled to 75%, so
 * examples built for the docs preview read as miniatures instead of being
 * cropped, and backdrops that fill their stage fill the thumbnail too.
 */
export function ComponentCard({
  component,
  headingLevel: Heading = "h3",
}: {
  component: ComponentMeta;
  headingLevel?: "h2" | "h3";
}) {
  const Demo = componentExamples[component.slug]?.[0]?.Component;
  const fresh = isNew(component);
  return (
    <div className="group/card relative min-w-0 overflow-hidden rounded-xl border bg-card/50 transition-[translate,box-shadow,border-color] focus-within:ring-2 focus-within:ring-ring hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-lg hover:shadow-primary/5 motion-reduce:hover:translate-y-0">
      <div
        inert
        className="relative h-48 overflow-hidden border-b border-border/60 bg-background"
      >
        <div className="absolute top-0 left-0 flex h-[133.334%] w-[133.334%] origin-top-left scale-75 items-center justify-center p-6">
          {Demo && <Demo />}
        </div>
      </div>
      <div className="px-4 pt-3 pb-4">
        <div className="flex items-center gap-2">
          <Heading className="truncate text-sm font-medium transition-colors group-hover/card:text-primary">
            <Link
              href={`/components/${component.slug}`}
              className="outline-none after:absolute after:inset-0 after:rounded-xl"
            >
              {component.title}
            </Link>
          </Heading>
          {fresh && (
            <span className="shrink-0 rounded-full bg-primary/10 px-1.5 py-px text-[11px] font-medium text-primary ring-1 ring-primary/20 ring-inset">
              New
            </span>
          )}
        </div>
        <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-muted-foreground">
          {component.description}
        </p>
      </div>
    </div>
  );
}
