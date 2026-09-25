import { AuroraBackground } from "@/components/velora/aurora-background";

export default function AuroraBackgroundDemo() {
  return (
    <div className="relative flex h-full min-h-64 w-full items-center justify-center overflow-hidden rounded-lg">
      <AuroraBackground intensity="vivid" />
      <p className="relative text-xl font-semibold">Aurora</p>
    </div>
  );
}
