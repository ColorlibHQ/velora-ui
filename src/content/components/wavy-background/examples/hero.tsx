import { WavyBackground } from "@/components/velora/wavy-background";

export default function WavyBackgroundHeroDemo() {
  return (
    <section className="relative flex min-h-[26rem] w-full flex-col items-center justify-center overflow-hidden rounded-xl border bg-background px-6 py-16 text-center">
      <WavyBackground waves={6} blur={28} opacity={0.4} className="top-1/3" />
      <span className="relative rounded-full border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
        Now in public beta
      </span>
      <h2 className="relative mt-5 max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        Interfaces that feel alive
      </h2>
      <p className="relative mt-4 max-w-md text-pretty text-muted-foreground">
        Motion-rich components that respect reduced motion, ship tiny and
        re-theme with seven CSS variables.
      </p>
      <div className="relative mt-8 flex flex-wrap justify-center gap-3">
        <a
          href="#"
          className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
        >
          Get started
        </a>
        <a
          href="#"
          className="rounded-full border bg-background/70 px-5 py-2.5 text-sm font-medium backdrop-blur transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
        >
          Browse components
        </a>
      </div>
    </section>
  );
}
