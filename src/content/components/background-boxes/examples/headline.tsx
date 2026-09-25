import { BackgroundBoxes } from "@/components/velora/background-boxes";

export default function BackgroundBoxesHeadlineDemo() {
  return (
    <section className="relative flex min-h-[26rem] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border bg-background px-6 py-16 text-center">
      <BackgroundBoxes
        cellSize={40}
        className="[mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]"
      />
      {/* Text ignores the pointer so the grid keeps lighting up beneath it */}
      <div className="pointer-events-none relative flex flex-col items-center">
        <h2 className="max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Build on a grid that responds
        </h2>
        <p className="mt-4 max-w-md text-pretty text-muted-foreground">
          Every cell you pass lights up in your brand colours, then quietly
          fades back into place.
        </p>
        <a
          href="#"
          className="pointer-events-auto mt-8 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
        >
          Explore the library
        </a>
      </div>
    </section>
  );
}
