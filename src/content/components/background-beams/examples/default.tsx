import { BackgroundBeams } from "@/components/velora/background-beams";

export default function BackgroundBeamsDemo() {
  return (
    <div className="relative flex h-full min-h-64 w-full items-center justify-center overflow-hidden rounded-lg">
      <BackgroundBeams />
      <p className="relative text-xl font-semibold">Beams</p>
    </div>
  );
}
