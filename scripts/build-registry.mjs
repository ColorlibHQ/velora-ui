// Generates registry.json (for `shadcn build` → public/r/*.json)
// and public/llms.txt from src/lib/components-meta.json.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const meta = JSON.parse(
  readFileSync(resolve(root, "src/lib/components-meta.json"), "utf8")
);

const HOMEPAGE = process.env.REGISTRY_HOMEPAGE ?? "https://velora.colorlib.com";

// ---------------------------------------------------------------------------
// Shared CSS fragments. Components copied into a foreign project need their
// keyframes and brand tokens to travel with them.
// ---------------------------------------------------------------------------

const brandVars = {
  light: {
    brand: "oklch(0.546 0.245 263)",
    "brand-from": "oklch(0.546 0.245 263)",
    "brand-via": "oklch(0.623 0.214 260)",
    "brand-to": "oklch(0.685 0.169 237)",
  },
  dark: {
    brand: "oklch(0.623 0.214 260)",
    "brand-from": "oklch(0.623 0.214 260)",
    "brand-via": "oklch(0.707 0.165 255)",
    "brand-to": "oklch(0.746 0.16 233)",
  },
  theme: {
    "color-brand": "var(--brand)",
    "color-brand-from": "var(--brand-from)",
    "color-brand-via": "var(--brand-via)",
    "color-brand-to": "var(--brand-to)",
  },
};

const keyframes = {
  marquee: {
    "@keyframes marquee": {
      from: { transform: "translateX(0)" },
      to: { transform: "translateX(calc(-100% - var(--gap)))" },
    },
    "@keyframes marquee-vertical": {
      from: { transform: "translateY(0)" },
      to: { transform: "translateY(calc(-100% - var(--gap)))" },
    },
  },
  shimmer: {
    "@keyframes shimmer": {
      from: { "background-position": "200% 0" },
      to: { "background-position": "-200% 0" },
    },
  },
  gradient: {
    "@keyframes gradient": {
      "0%, 100%": { "background-position": "0% 50%" },
      "50%": { "background-position": "100% 50%" },
    },
  },
  orbit: {
    "@keyframes orbit": {
      "0%": {
        transform:
          "rotate(calc(var(--angle) * 1deg)) translateY(calc(var(--radius) * -1px)) rotate(calc(var(--angle) * -1deg))",
      },
      "100%": {
        transform:
          "rotate(calc(var(--angle) * 1deg + 360deg)) translateY(calc(var(--radius) * -1px)) rotate(calc((var(--angle) * 1deg + 360deg) * -1))",
      },
    },
  },
  aurora: {
    "@keyframes aurora-1": {
      "0%": { transform: "translate(-10%, -12%) scale(1)" },
      "50%": { transform: "translate(12%, 8%) scale(1.25)" },
      "100%": { transform: "translate(-6%, 14%) scale(0.95)" },
    },
    "@keyframes aurora-2": {
      "0%": { transform: "translate(12%, 10%) scale(1.1)" },
      "50%": { transform: "translate(-14%, -6%) scale(0.9)" },
      "100%": { transform: "translate(8%, -12%) scale(1.2)" },
    },
    "@keyframes aurora-3": {
      "0%": { transform: "translate(0%, 16%) scale(0.95)" },
      "50%": { transform: "translate(10%, -10%) scale(1.15)" },
      "100%": { transform: "translate(-12%, 4%) scale(1)" },
    },
  },
  meteor: {
    "@keyframes meteor": {
      "0%": {
        transform: "rotate(var(--meteor-angle, 215deg)) translateX(0)",
        opacity: "1",
      },
      "70%": { opacity: "1" },
      "100%": {
        transform: "rotate(var(--meteor-angle, 215deg)) translateX(-600px)",
        opacity: "0",
      },
    },
  },
  retroGrid: {
    "@keyframes retro-grid": {
      from: { transform: "translateY(-50%)" },
      to: { transform: "translateY(0)" },
    },
  },
  rainbow: {
    "@keyframes rainbow": {
      from: { "background-position": "0% 50%" },
      to: { "background-position": "200% 50%" },
    },
  },
  ripple: {
    "@keyframes ripple": {
      from: { transform: "scale(0)", opacity: "0.35" },
      to: { transform: "scale(1)", opacity: "0" },
    },
  },
  movingBorder: {
    "@keyframes moving-border": {
      from: { "offset-distance": "0%" },
      to: { "offset-distance": "100%" },
    },
  },
  flicker: {
    "@keyframes flicker": {
      "0%, 100%": { opacity: "var(--flicker-max, 0.45)" },
      "50%": { opacity: "var(--flicker-min, 0.08)" },
    },
  },
  rippleRing: {
    "@keyframes ripple-ring": {
      from: { transform: "scale(0.6)", opacity: "0.5" },
      to: { transform: "scale(2.2)", opacity: "0" },
    },
  },
};

// Per-slug extras: { css, cssVars } merged into the registry item.
const extras = {
  marquee: {
    css: keyframes.marquee,
    cssVars: {
      theme: {
        "animate-marquee": "marquee var(--duration, 40s) linear infinite",
        "animate-marquee-vertical":
          "marquee-vertical var(--duration, 40s) linear infinite",
      },
    },
  },
  "shimmer-button": {
    css: keyframes.shimmer,
    cssVars: { theme: { "animate-shimmer": "shimmer 2.5s linear infinite" } },
  },
  "text-shimmer": {
    css: keyframes.shimmer,
    cssVars: { theme: { "animate-shimmer": "shimmer 2.5s linear infinite" } },
  },
  "animated-gradient-text": {
    css: keyframes.gradient,
    cssVars: {
      ...brandVars,
      theme: {
        ...brandVars.theme,
        "animate-gradient": "gradient 6s ease infinite",
      },
    },
  },
  "orbiting-circles": {
    css: keyframes.orbit,
    cssVars: {
      theme: { "animate-orbit": "orbit calc(var(--duration) * 1s) linear infinite" },
    },
  },
  "aurora-background": {
    css: keyframes.aurora,
    cssVars: {
      ...brandVars,
      theme: {
        ...brandVars.theme,
        "animate-aurora-1": "aurora-1 14s ease-in-out infinite alternate",
        "animate-aurora-2": "aurora-2 18s ease-in-out infinite alternate",
        "animate-aurora-3": "aurora-3 22s ease-in-out infinite alternate",
      },
    },
  },
  meteors: {
    css: keyframes.meteor,
    cssVars: { theme: { "animate-meteor": "meteor 5s linear infinite" } },
  },
  "retro-grid": {
    css: keyframes.retroGrid,
    cssVars: {
      theme: { "animate-retro-grid": "retro-grid 18s linear infinite" },
    },
  },
  "border-beam": { cssVars: brandVars },
  "scroll-progress": { cssVars: brandVars },
  "background-beams": { cssVars: brandVars },
  "sparkles-text": { cssVars: brandVars },
  lamp: { cssVars: brandVars },
  "spotlight-card": { cssVars: brandVars },

  // ── added in 0.4.0 ─────────────────────────────────────────────
  "rainbow-button": {
    css: keyframes.rainbow,
    cssVars: {
      ...brandVars,
      theme: {
        ...brandVars.theme,
        "animate-rainbow": "rainbow var(--rainbow-duration, 4s) linear infinite",
      },
    },
  },
  "ripple-button": {
    css: keyframes.ripple,
    cssVars: { theme: { "animate-ripple": "ripple 600ms ease-out forwards" } },
  },
  "moving-border": {
    css: keyframes.movingBorder,
    cssVars: {
      ...brandVars,
      theme: {
        ...brandVars.theme,
        "animate-moving-border":
          "moving-border var(--mb-duration, 4s) linear infinite",
      },
    },
  },
  "flickering-grid": {
    css: keyframes.flicker,
    cssVars: { theme: { "animate-flicker": "flicker 3s steps(1, end) infinite" } },
  },
  ripple: {
    css: keyframes.rippleRing,
    cssVars: {
      ...brandVars,
      theme: {
        ...brandVars.theme,
        "animate-ripple-ring": "ripple-ring 3s ease-out infinite",
      },
    },
  },
  "light-rays": { cssVars: brandVars },
  "sticky-banner": { cssVars: brandVars },
  "animated-testimonials": { cssVars: brandVars },
  "tweet-card": { cssVars: brandVars },
  stepper: { cssVars: brandVars },
  "text-highlighter": { cssVars: brandVars },
  "glare-card": { cssVars: brandVars },
  "direction-aware-hover": { cssVars: brandVars },
  "container-scroll": { cssVars: brandVars },
  "tracing-beam": { cssVars: brandVars },
  "sticky-scroll": { cssVars: brandVars },
  "file-drop": { cssVars: brandVars },
};

const items = meta.map((c) => ({
  name: c.slug,
  type: "registry:ui",
  title: c.title,
  description: c.description,
  dependencies: c.dependencies.length ? c.dependencies : undefined,
  // Every component imports cn() from @/lib/utils.
  registryDependencies: ["utils"],
  files: [
    {
      path: `src/components/velora/${c.slug}.tsx`,
      type: "registry:ui",
      target: `components/velora/${c.slug}.tsx`,
    },
  ],
  ...(extras[c.slug] ?? {}),
}));

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "velora",
  homepage: HOMEPAGE,
  items,
};

writeFileSync(
  resolve(root, "registry.json"),
  JSON.stringify(registry, null, 2) + "\n"
);

// ---------------------------------------------------------------------------
// llms.txt — lets AI agents discover and install Velora components.
// ---------------------------------------------------------------------------

let stats = {};
try {
  stats = JSON.parse(
    readFileSync(resolve(root, "src/lib/component-stats.json"), "utf8")
  );
} catch {
  // stats file is generated by scripts/component-stats.mjs; optional here
}

const receipt = (slug) => {
  const s = stats[slug];
  if (!s) return "";
  const deps = s.deps.length === 0 ? "zero deps" : `deps: ${s.deps.join(", ")}`;
  return ` (${(s.gzip / 1024).toFixed(1)} KB gzipped, ${deps})`;
};

const llms = `# Velora UI

> Free, MIT-licensed animated React components and complete multi-page landing
> templates. Built with Next.js, Tailwind CSS 4, shadcn/ui and Motion.
> Components are primitive-agnostic: they work in Base UI (shadcn default) and
> Radix projects alike. Every component respects prefers-reduced-motion and
> publishes its gzipped size and dependency count.

Install any component with the shadcn CLI:

    npx shadcn@latest add ${HOMEPAGE}/r/<name>.json

## Components

${meta
  .map(
    (c) => `- [${c.title}](${HOMEPAGE}/components/${c.slug}): ${c.description}${receipt(c.slug)} Install: \`npx shadcn@latest add ${HOMEPAGE}/r/${c.slug}.json\``
  )
  .join("\n")}

## Pages

- [Components](${HOMEPAGE}/components): All components with live previews, install commands and source.
- [Themes](${HOMEPAGE}/themes): Brand ramp presets — rebrand every effect by copying seven CSS variables.
- [Pricing](${HOMEPAGE}/pricing): Free forever (MIT); Pro adds niche templates and variants.
- [Blog](${HOMEPAGE}/blog): Engineering notes and announcements (MDX pipeline is part of the free template).
- [Changelog](${HOMEPAGE}/changelog): Every release, documented.
- Template pages included free: about, contact, login, signup, blog, changelog, 404.
`;

writeFileSync(resolve(root, "public/llms.txt"), llms);

console.log(`registry.json: ${items.length} items, llms.txt written`);
