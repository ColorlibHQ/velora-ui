import { FlickeringGrid } from "@/components/velora/flickering-grid";

export default function FlickeringGridDemo() {
  return (
    <div className="flex h-full min-h-64 w-full items-center justify-center overflow-hidden rounded-lg relative bg-neutral-950 text-white/70">
      <FlickeringGrid columns={44} rows={16} />
      <p className="relative text-xl font-semibold text-white">
        Flickering Grid
      </p>
    </div>
  );
}
