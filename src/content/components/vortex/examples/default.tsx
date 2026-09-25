import { Vortex } from "@/components/velora/vortex";

export default function VortexDemo() {
  return (
    <div className="relative flex min-h-80 w-full items-center justify-center overflow-hidden rounded-lg bg-background">
      <Vortex />
      <p className="relative text-3xl font-semibold tracking-tight">Into the vortex</p>
    </div>
  );
}
