import { WobbleCard } from "@/components/velora/wobble-card";

export default function WobbleCardBentoDemo() {
  return (
    <div className="grid w-full gap-4 md:grid-cols-3">
      <WobbleCard className="md:col-span-2" contentClassName="flex min-h-56 flex-col justify-end">
        <h3 className="text-2xl font-semibold tracking-tight text-balance">
          Deploys that roll back themselves
        </h3>
        <p className="mt-2 max-w-md text-sm opacity-80">
          Error rates spike, traffic shifts back to the last good build — before anyone is paged.
        </p>
      </WobbleCard>
      <WobbleCard className="bg-foreground text-background" contentClassName="flex min-h-56 flex-col justify-end">
        <h3 className="text-xl font-semibold tracking-tight">Edge cache, zero config</h3>
        <p className="mt-2 text-sm opacity-70">Static assets are served from 300+ cities.</p>
      </WobbleCard>
      <WobbleCard
        className="bg-linear-to-r from-brand-from to-brand-via text-white md:col-span-3"
        contentClassName="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h3 className="text-xl font-semibold tracking-tight">Start free, scale when it works</h3>
          <p className="mt-1 text-sm opacity-85">Hobby projects stay free forever.</p>
        </div>
        <a
          href="#"
          className="rounded-full bg-white px-5 py-2 text-sm font-medium text-neutral-950 transition-colors hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand focus-visible:outline-none"
        >
          Create a project
        </a>
      </WobbleCard>
    </div>
  );
}
