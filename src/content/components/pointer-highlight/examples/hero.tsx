import { PointerHighlight } from "@/components/velora/pointer-highlight";

export default function PointerHighlightHeroDemo() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center gap-6 px-4 py-10 text-center">
      <span className="rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
        New · Review mode for design teams
      </span>
      <h1 className="text-4xl leading-tight font-bold tracking-tight text-balance sm:text-5xl">
        Feedback that lands on{" "}
        <PointerHighlight
          rectangleClassName="rounded-md border-brand bg-brand/10"
          pointerClassName="text-brand"
        >
          <span className="bg-linear-to-r from-brand-from via-brand-via to-brand-to bg-clip-text text-transparent">
            the exact pixel
          </span>
        </PointerHighlight>
      </h1>
      <p className="max-w-md text-base text-muted-foreground">
        Pin comments to any element, resolve them in context, and ship without
        the screenshot ping-pong.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <a
          href="#"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Start free
        </a>
        <a
          href="#"
          className="rounded-lg border bg-card px-5 py-2.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Watch the tour
        </a>
      </div>
    </section>
  );
}
