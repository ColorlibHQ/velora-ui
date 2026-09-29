import { BackgroundBeams } from "@/components/velora/background-beams";

export default function BackgroundBeamsDemo() {
  return (
    <div className="relative flex min-h-80 w-full items-center justify-center overflow-hidden rounded-xl border bg-linear-to-b from-background to-brand-from/10">
      <BackgroundBeams count={10} />
      <div className="relative px-6 text-center">
        <p className="text-sm font-medium text-primary">Now in public beta</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance">
          Deploy on every push
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-muted-foreground text-balance">
          Preview links for each branch, ready before the review starts.
        </p>
      </div>
    </div>
  );
}
