import { RetroGrid } from "@/components/velora/retro-grid";

export default function RetroGridDemo() {
  return (
    <div className="relative flex min-h-80 w-full items-center justify-center overflow-hidden rounded-xl border bg-radial from-brand-from/20 to-background to-70%">
      <RetroGrid opacity={1} cellSize={48} />
      <div className="relative px-6 text-center">
        <p className="text-sm font-medium text-primary">Launch week · Day 3</p>
        <h2 className="mt-2 text-4xl font-semibold tracking-tight text-balance">
          Back to the grid
        </h2>
      </div>
    </div>
  );
}
