import { Marquee } from "@/components/velora/marquee";

const chips = ["Astro", "Next.js", "Remix", "Vite", "Nuxt", "SvelteKit"];

export default function MarqueeDemo() {
  return (
    <Marquee pauseOnHover className="w-full [--duration:18s]">
      {chips.map((chip) => (
        <span
          key={chip}
          className="mx-2 rounded-full border bg-card px-4 py-1.5 text-sm font-medium"
        >
          {chip}
        </span>
      ))}
    </Marquee>
  );
}
