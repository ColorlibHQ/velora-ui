import { NoiseBackground } from "@/components/velora/noise-background";

export default function NoiseBackgroundDemo() {
  return (
    <NoiseBackground className="flex min-h-80 w-full items-center justify-center rounded-2xl border px-6">
      <div className="text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Quiet software for loud ideas
        </h2>
        <p className="mt-3 text-foreground/75">A calm workspace for teams that ship.</p>
      </div>
    </NoiseBackground>
  );
}
