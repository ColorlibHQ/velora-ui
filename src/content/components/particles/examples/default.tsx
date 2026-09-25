import { Particles } from "@/components/velora/particles";

export default function ParticlesDemo() {
  return (
    <div className="relative flex h-full min-h-64 w-full items-center justify-center overflow-hidden rounded-lg bg-neutral-950 text-white">
      <Particles quantity={80} />
      <p className="relative text-xl font-semibold">Particles</p>
    </div>
  );
}
