import { BackgroundBoxes } from "@/components/velora/background-boxes";

export default function BackgroundBoxesDemo() {
  return (
    <div className="relative flex min-h-80 w-full items-center justify-center overflow-hidden rounded-lg bg-background">
      <BackgroundBoxes className="[mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]" />
      <p className="pointer-events-none relative rounded-full border bg-background/80 px-4 py-1.5 text-sm font-medium backdrop-blur">
        Hover the grid
      </p>
    </div>
  );
}
