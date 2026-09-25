import { WavyBackground } from "@/components/velora/wavy-background";

export default function WavyBackgroundDemo() {
  return (
    <div className="relative flex min-h-80 w-full items-center justify-center overflow-hidden rounded-lg bg-background">
      <WavyBackground />
      <p className="relative text-3xl font-semibold tracking-tight">Make some waves</p>
    </div>
  );
}
