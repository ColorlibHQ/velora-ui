import { RetroGrid } from "@/components/velora/retro-grid";

export default function RetroGridDemo() {
  return (
    <div className="relative flex h-full min-h-64 w-full items-center justify-center overflow-hidden rounded-lg">
      <RetroGrid opacity={0.6} />
      <p className="relative text-xl font-semibold">Retro Grid</p>
    </div>
  );
}
