import { Card3D, Card3DItem } from "@/components/velora/3d-card";

export default function Card3DProductCardDemo() {
  return (
    <Card3D
      maxTilt={12}
      className="w-full max-w-xs"
      cardClassName="rounded-3xl border bg-card p-4 shadow-sm"
    >
      <Card3DItem
        depth={20}
        className="relative flex h-56 items-center justify-center rounded-2xl bg-linear-to-b from-brand-from/15 to-brand-to/5"
      >
        <span className="absolute top-3 left-3 rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium shadow-sm">
          New
        </span>
        <div className="absolute bottom-8 h-4 w-28 rounded-[50%] bg-foreground/15 blur-md" />
        {/* Product image built from Tailwind: a smart speaker */}
        <Card3DItem depth={80} rotateZ={-6} className="relative">
          <div className="relative h-36 w-24 rounded-[2.25rem] bg-linear-to-b from-zinc-600 to-zinc-900 shadow-2xl ring-1 ring-white/10 ring-inset">
            <div className="absolute inset-2 rounded-[1.9rem] bg-[radial-gradient(circle,rgb(255_255_255/0.22)_1px,transparent_1.5px)] bg-size-[6px_6px]" />
            <div className="absolute inset-x-4 top-2.5 h-1.5 rounded-full bg-linear-to-r from-brand-from via-brand-via to-brand-to shadow-[0_0_12px_var(--brand)]" />
          </div>
        </Card3DItem>
      </Card3DItem>

      <div className="mt-4 flex items-start justify-between gap-3 px-1">
        <div>
          <Card3DItem depth={50} className="font-semibold tracking-tight">
            Halo Mini
          </Card3DItem>
          <Card3DItem depth={30} className="text-sm text-muted-foreground">
            Room-filling sound
          </Card3DItem>
        </div>
        <Card3DItem depth={40} className="text-lg font-semibold">
          $129
        </Card3DItem>
      </div>

      <Card3DItem depth={60} className="mt-4">
        <button
          type="button"
          className="w-full rounded-xl bg-primary py-2.5 text-sm font-medium text-primary-foreground shadow-md shadow-primary/25 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
        >
          Add to cart
        </button>
      </Card3DItem>
    </Card3D>
  );
}
