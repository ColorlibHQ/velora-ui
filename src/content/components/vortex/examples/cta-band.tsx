import { Vortex } from "@/components/velora/vortex";

export default function VortexCtaBandDemo() {
  return (
    <section className="relative w-full overflow-hidden rounded-2xl bg-neutral-950 px-6 py-16 text-center text-white">
      <Vortex particles={700} speed={0.8} range={0.9} />
      <div className="relative mx-auto max-w-lg">
        <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Everything your team ships, in one place
        </h2>
        <p className="mt-3 text-pretty text-neutral-300">
          Start free. Invite your team when you are ready — no card required.
        </p>
        <a
          href="#"
          className="mt-8 inline-flex rounded-full bg-white px-6 py-2.5 text-sm font-medium text-neutral-950 shadow-lg transition-colors hover:bg-neutral-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 focus-visible:outline-none"
        >
          Start building
        </a>
      </div>
    </section>
  );
}
