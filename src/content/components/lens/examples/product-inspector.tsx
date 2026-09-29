import { Lens } from "@/components/velora/lens";

const colours = [
  { name: "Graphite", className: "bg-neutral-800" },
  { name: "Sand", className: "bg-amber-200" },
  { name: "Sage", className: "bg-emerald-300" },
];

export default function LensProductInspectorDemo() {
  return (
    <div className="grid w-full max-w-3xl items-center gap-8 md:grid-cols-[1.1fr_1fr]">
      <figure className="space-y-3">
        <Lens zoomFactor={2.5} radius={72} className="aspect-square w-full shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async"
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&q=75&auto=format&fit=crop"
            alt="Black over-ear headphones on a yellow background"
            className="size-full object-cover"
          />
        </Lens>
        <figcaption className="text-center text-xs text-muted-foreground">
          Hover to inspect the stitching — or focus the photo and use the arrow keys.
        </figcaption>
      </figure>

      <div className="space-y-5">
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-primary">New · Audio</p>
          <h3 className="text-2xl font-semibold tracking-tight">Aria Over-Ear</h3>
          <p className="text-sm text-muted-foreground">
            Memory-foam cushions wrapped in protein leather, with 40 hours of
            adaptive noise cancelling.
          </p>
        </div>
        <p className="text-3xl font-semibold tracking-tight">$249</p>
        <div className="space-y-2">
          <p className="text-sm font-medium">Colours</p>
          <ul className="flex gap-3 text-sm text-muted-foreground">
            {colours.map((colour) => (
              <li key={colour.name} className="flex items-center gap-1.5">
                <span aria-hidden className={`size-4 rounded-full ring-1 ring-border ${colour.className}`} />
                {colour.name}
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Add to bag
        </button>
      </div>
    </div>
  );
}
