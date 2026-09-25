import { WobbleCard } from "@/components/velora/wobble-card";

export default function WobbleCardDemo() {
  return (
    <WobbleCard className="w-full max-w-xl" contentClassName="min-h-56">
      <p className="text-sm font-medium opacity-80">Launch week</p>
      <h3 className="mt-2 max-w-xs text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
        Ship previews for every pull request
      </h3>
      <p className="mt-3 max-w-60 text-sm opacity-80">
        Each branch gets its own URL, so reviewers click instead of cloning.
      </p>
      <div
        aria-hidden
        className="absolute -right-8 -bottom-10 hidden w-56 -rotate-6 rounded-xl border border-white/25 bg-white/10 p-3 shadow-2xl sm:block"
      >
        <div className="flex gap-1">
          <span className="size-2 rounded-full bg-white/50" />
          <span className="size-2 rounded-full bg-white/30" />
          <span className="size-2 rounded-full bg-white/30" />
        </div>
        <div className="mt-3 h-2 w-3/4 rounded-full bg-white/40" />
        <div className="mt-2 h-2 w-1/2 rounded-full bg-white/25" />
        <div className="mt-4 h-16 rounded-lg bg-white/15" />
      </div>
    </WobbleCard>
  );
}
