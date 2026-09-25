import { Pin3D } from "@/components/velora/3d-pin";

export default function Pin3DDemo() {
  return (
    <Pin3D
      title="velora.colorlib.com"
      href="https://velora.colorlib.com"
      className="mt-6 w-72"
    >
      <div className="relative flex h-44 flex-col justify-between overflow-hidden rounded-xl bg-linear-to-br from-brand-from/20 via-brand-via/5 to-brand-to/25 p-4">
        <div className="absolute -top-10 -right-10 size-36 rounded-full bg-brand/30 blur-2xl" />
        <span className="relative text-xs font-medium tracking-wider text-muted-foreground uppercase">
          Velora UI
        </span>
        <div className="relative">
          <h3 className="text-lg font-semibold tracking-tight">
            Components that move
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Copy, paste and ship animated interfaces.
          </p>
        </div>
      </div>
    </Pin3D>
  );
}
