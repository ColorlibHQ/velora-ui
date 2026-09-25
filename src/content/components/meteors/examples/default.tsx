import { Meteors } from "@/components/velora/meteors";

export default function MeteorsDemo() {
  return (
    <div className="relative flex h-full min-h-64 w-full items-center justify-center overflow-hidden rounded-lg bg-neutral-950 text-white">
      <Meteors number={12} className="bg-white/70 before:from-white/60" />
      <p className="relative text-xl font-semibold">Meteors</p>
    </div>
  );
}
