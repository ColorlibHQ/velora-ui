import { LogoCloud } from "@/components/velora/logo-cloud";

const chips = ["Astro", "Next.js", "Remix", "Vite", "Nuxt", "SvelteKit"];

export default function LogoCloudDemo() {
  return (
    <LogoCloud
      className="max-w-sm grid-cols-3 gap-6 lg:grid-cols-3"
      logos={chips.slice(0, 6).map((name) => ({
        name,
        logo: <span className="text-sm font-semibold">{name}</span>,
      }))}
    />
  );
}
