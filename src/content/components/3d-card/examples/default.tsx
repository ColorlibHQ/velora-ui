import { Card3D, Card3DItem } from "@/components/velora/3d-card";

export default function Card3DDemo() {
  return (
    <Card3D
      className="w-full max-w-sm"
      cardClassName="rounded-2xl border bg-card p-6 shadow-sm"
    >
      <Card3DItem depth={50} className="text-xl font-semibold tracking-tight">
        Depth on demand
      </Card3DItem>
      <Card3DItem depth={35} className="mt-2 text-sm text-muted-foreground">
        Every layer floats at its own height as the card turns toward you.
      </Card3DItem>
      <Card3DItem depth={90} className="relative mt-5">
        <div className="relative h-36 overflow-hidden rounded-xl bg-linear-to-br from-brand-from via-brand-via to-brand-to shadow-lg shadow-brand/25">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.12)_1px,transparent_1px)] bg-size-[20px_20px]" />
          <div className="absolute -bottom-8 -left-6 size-32 rounded-full bg-white/25 blur-2xl" />
        </div>
        <Card3DItem
          depth={40}
          className="absolute right-4 bottom-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-zinc-900 shadow-lg"
        >
          +130px
        </Card3DItem>
      </Card3DItem>
      <div className="mt-5 flex items-center justify-between">
        <Card3DItem depth={25} className="text-xs text-muted-foreground">
          Hover or tab in
        </Card3DItem>
        <Card3DItem depth={60}>
          <button
            type="button"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            Try it
          </button>
        </Card3DItem>
      </div>
    </Card3D>
  );
}
