import { Marquee3D } from "@/components/velora/3d-marquee";

const shot = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&q=70&auto=format&fit=crop`;

const screenshots = [
  "1460925895917-afdab827c52f",
  "1551288049-bebda4e38f71",
  "1545235617-9465d2a55698",
  "1531403009284-440f080d1e12",
  "1561070791-2526d30994b5",
  "1618005182384-a83a8bd57fbe",
  "1558655146-9f40138edfeb",
  "1517694712202-14dd9538aa97",
  "1604871000636-074fa5117945",
  "1633356122544-f134324a6cee",
  "1498050108023-c5249f4df085",
  "1550745165-9bc0b252726f",
  "1523961131990-5ea7c61b2107",
  "1579546929518-9e396f3cc809",
  "1618172193622-ae2d025f4032",
].map(shot);

export default function Marquee3DShowcaseDemo() {
  return (
    <section className="relative isolate w-full overflow-hidden rounded-2xl border bg-background">
      <Marquee3D
        images={screenshots}
        columns={6}
        duration={60}
        pauseOnHover={false}
        className="absolute inset-0 -z-10 h-full opacity-60 dark:opacity-45"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-radial from-background from-25% via-background/80 to-background/10"
      />
      <div className="flex min-h-[26rem] flex-col items-center justify-center px-6 py-16 text-center">
        <span className="rounded-full border bg-card/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
          Showcase
        </span>
        <h2 className="mt-5 max-w-lg text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          Built with{" "}
          <span className="bg-linear-to-r from-brand-from via-brand-via to-brand-to bg-clip-text text-transparent">
            Velora
          </span>
        </h2>
        <p className="mt-4 max-w-md text-pretty text-muted-foreground">
          Dashboards, storefronts and launch pages from teams who shipped
          faster with copy-paste components.
        </p>
        <a
          href="#submit"
          className="mt-7 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Submit your project
        </a>
      </div>
    </section>
  );
}
