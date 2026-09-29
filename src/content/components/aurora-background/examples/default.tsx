import { AuroraBackground } from "@/components/velora/aurora-background";

export default function AuroraBackgroundDemo() {
  return (
    <div className="relative flex min-h-80 w-full items-center justify-center overflow-hidden rounded-xl border bg-background">
      <AuroraBackground intensity="vivid" />
      <div className="relative px-6 text-center">
        <p className="text-sm font-medium text-foreground/70">Spring release</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Northern lights for your hero
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-foreground/70 text-balance">
          A slow, drifting gradient that sits behind any headline.
        </p>
      </div>
    </div>
  );
}
