import { Pin3D } from "@/components/velora/3d-pin";

const bars = [38, 62, 48, 80, 56, 92, 70];

export default function Pin3DProjectShowcaseDemo() {
  return (
    <Pin3D title="nimbus.app/dashboard" className="mt-6 w-80">
      {/* Screenshot built from Tailwind */}
      <div className="overflow-hidden rounded-xl border bg-background">
        <div className="flex items-center gap-1.5 border-b px-3 py-2">
          <span className="size-2 rounded-full bg-muted-foreground/30" />
          <span className="size-2 rounded-full bg-muted-foreground/30" />
          <span className="size-2 rounded-full bg-muted-foreground/30" />
          <span className="ml-2 h-2 w-24 rounded-full bg-muted" />
        </div>
        <div className="flex gap-3 p-3">
          <div className="flex w-12 flex-col gap-2">
            <span className="h-2 rounded-full bg-brand/60" />
            <span className="h-2 rounded-full bg-muted" />
            <span className="h-2 rounded-full bg-muted" />
            <span className="h-2 rounded-full bg-muted" />
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-md border p-2">
                <span className="block h-1.5 w-8 rounded-full bg-muted" />
                <span className="mt-1.5 block text-sm font-semibold">24.8k</span>
              </div>
              <div className="rounded-md border p-2">
                <span className="block h-1.5 w-10 rounded-full bg-muted" />
                <span className="mt-1.5 block text-sm font-semibold">+12%</span>
              </div>
            </div>
            <div className="mt-2 flex h-16 items-end gap-1.5 rounded-md border p-2">
              {bars.map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 rounded-sm bg-linear-to-t from-brand-from to-brand-to opacity-80"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-1 pt-4 pb-1">
        <h3 className="font-semibold tracking-tight">Nimbus Analytics</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Real-time product analytics for small teams.
        </p>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex gap-1.5">
            {["Next.js", "Postgres"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href="https://github.com"
            className="rounded-sm text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Source
          </a>
        </div>
      </div>
    </Pin3D>
  );
}
