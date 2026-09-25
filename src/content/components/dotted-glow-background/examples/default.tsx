import { DottedGlowBackground } from "@/components/velora/dotted-glow-background";

export default function DottedGlowBackgroundDemo() {
  return (
    <div className="relative flex min-h-80 w-full items-center justify-center overflow-hidden rounded-xl border bg-background">
      <DottedGlowBackground />
      <div className="relative px-6 text-center">
        <p className="text-sm font-medium text-muted-foreground">Realtime sync</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance">
          Every edit, everywhere, instantly
        </h2>
      </div>
    </div>
  );
}
