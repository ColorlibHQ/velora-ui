import { ShootingStars, StarsBackground } from "@/components/velora/shooting-stars";

export default function ShootingStarsNightSkyDemo() {
  return (
    <section className="relative flex min-h-[26rem] w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-neutral-950 px-6 py-16 text-center text-white">
      {/* Horizon glow */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(ellipse_at_bottom,var(--color-brand-from),transparent_65%)] opacity-40" />
      <StarsBackground density={6} />
      <ShootingStars delay={1600} length={180} />
      <p className="relative text-xs font-medium tracking-[0.3em] text-neutral-400 uppercase">
        Observatory
      </p>
      <h2 className="relative mt-4 max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        Watch your metrics light up the sky
      </h2>
      <p className="relative mt-4 max-w-md text-pretty text-neutral-400">
        Real-time dashboards that stay calm until something is worth your
        attention.
      </p>
      <a
        href="#"
        className="relative mt-8 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:outline-none"
      >
        Start stargazing
      </a>
    </section>
  );
}
