import { LightRays } from "@/components/velora/light-rays";

export default function LightRaysDemo() {
  return (
    <div className="flex h-full min-h-64 w-full items-center justify-center overflow-hidden rounded-lg relative bg-neutral-950">
      <LightRays count={7} />
      <p className="relative text-xl font-semibold text-white">Light Rays</p>
    </div>
  );
}
