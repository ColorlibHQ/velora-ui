<div align="center">

# Velora UI

**Free, MIT-licensed animated components and complete landing templates for React.**

64 animated shadcn/ui components and a full multi-page SaaS template — home, pricing, blog (MDX), auth, changelog, contact and 404 — built with Next.js 16, Tailwind CSS 4 and Motion. The free tier isn't a teaser: everything on the site ships under MIT, commercial use included.

[![Live demo](https://img.shields.io/badge/Live_demo-velora.colorlib.com-2563eb?style=for-the-badge&logo=vercel&logoColor=white)](https://velora.colorlib.com)
&nbsp;
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](./LICENSE)
&nbsp;
[![Stars](https://img.shields.io/github/stars/ColorlibHQ/velora-ui?style=for-the-badge&color=eab308)](https://github.com/ColorlibHQ/velora-ui/stargazers)

![Components](https://img.shields.io/badge/components-64-2563eb?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-13-ff0088?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-7-3178c6?style=flat-square&logo=typescript&logoColor=white)

<a href="https://velora.colorlib.com">
  <img src=".github/screenshots/hero.webp" alt="Velora UI — landing pages that feel alive" width="100%">
</a>

</div>

## Screenshots

<table>
<tr>
<td width="50%" align="center">
  <a href="https://velora.colorlib.com/components"><img src=".github/screenshots/components.webp" alt="Component catalog — 64 animated components grouped by category"></a>
  <br><sub><b>Component catalog</b> — 64 components, grouped by category, one CLI command to install.</sub>
</td>
<td width="50%" align="center">
  <a href="https://velora.colorlib.com/themes"><img src=".github/screenshots/themes.webp" alt="Themes — rebrand from one token block"></a>
  <br><sub><b>Themes</b> — swap the whole identity by editing seven CSS variables.</sub>
</td>
</tr>
<tr>
<td width="50%" align="center">
  <a href="https://velora.colorlib.com/components/border-beam"><img src=".github/screenshots/component-page.webp" alt="Component docs page with size, dependency and reduced-motion badges"></a>
  <br><sub><b>Every component ships its receipts</b> — gzip size, dependency count and reduced-motion status, plus live demo, install command and source.</sub>
</td>
<td width="50%" align="center">
  <a href="https://velora.colorlib.com/pricing"><img src=".github/screenshots/pricing.webp" alt="Pricing — the whole product is free"></a>
  <br><sub><b>The whole product is free</b> — every component and the complete template under MIT.</sub>
</td>
</tr>
</table>

## Why Velora

- **The free tier is the whole product.** Complete assembled pages, not just isolated components. The kind of template that costs $149–$299 elsewhere is the baseline here.
- **Animations with receipts.** Every component's docs page shows its gzipped size (0.3–2.0 KB — no Three.js payloads) and dependency count. 33 of 64 components have zero runtime dependencies; the rest use Motion and nothing else.
- **Tokens, not hardcoded hues.** Components read your shadcn CSS variables. Rebrand every gradient, beam and glow by editing seven variables — ready-made presets on the [themes page](https://velora.colorlib.com/themes).
- **Motion that asks permission.** A global `prefers-reduced-motion` kill switch covers every animation. Keyboard focus stays visible, markup stays semantic.
- **Primitive-agnostic.** Velora components import neither Radix nor Base UI — they work in any shadcn project, whichever primitive layer you use.

## What's inside

### 64 animated components

| Category | Components |
|----------|-----------|
| **Backgrounds** | Aurora Background · Grid & Dot Pattern · Retro Grid · Particles · Meteors · Background Beams · Lamp · Flickering Grid · Ripple · Light Rays |
| **Text** | Animated Gradient Text · Text Reveal · Typewriter · Flip Words · Sparkles Text · Text Shimmer · Number Ticker · Word Rotate · Hyper Text · Text Highlighter · Morphing Text |
| **Buttons** | Shimmer Button · Confetti · Rainbow Button · Ripple Button · Magnetic Button · Moving Border · Theme Toggler |
| **Cards & Layout** | Bento Grid · Spotlight Card · Tilt Card · Marquee · Animated List · Orbiting Circles · Avatar Circles · Animated Tooltip · Dock · Card Stack · Glare Card · Expandable Card · Direction Aware Hover · Compare Slider · File Tree |
| **Navigation** | Floating Navbar · Navbar Menu · Sticky Banner |
| **Forms** | Vanish Input · File Drop · Stepper |
| **Social Proof** | Animated Testimonials · Tweet Card · Logo Cloud |
| **Scroll** | Scroll Progress · Sticky Scroll · Container Scroll · Tracing Beam · Scroll Velocity · Parallax Grid |
| **Effects** | Border Beam · Animated Beam · Blur Fade |
| **Mockups** | Browser Mockup · iPhone Mockup · Terminal |

Browse them all — with live demos, props, install commands and source — at [velora.colorlib.com/components](https://velora.colorlib.com/components).

### The complete template

A production landing site, not a component sandbox. Every page is real, static-rendered and yours to keep:

| Page | What you get |
|------|--------------|
| [Home](https://velora.colorlib.com) | Animated hero, feature bento, social proof, marquee and CTA sections |
| [Components](https://velora.colorlib.com/components) | Browsable gallery + a docs page per component (demo · props · install · source) |
| [Themes](https://velora.colorlib.com/themes) | Six brand presets with live token switching |
| [Pricing](https://velora.colorlib.com/pricing) | Free vs. Pro tiers with feature comparison |
| [Blog](https://velora.colorlib.com/blog) | MDX-powered blog with three starter posts |
| [Changelog](https://velora.colorlib.com/changelog) | Release timeline |
| [About](https://velora.colorlib.com/about) · [Contact](https://velora.colorlib.com/contact) | Company page + frontend-only contact form |
| [Login](https://velora.colorlib.com/login) · [Signup](https://velora.colorlib.com/signup) | Auth screens (frontend-only) |
| 404 | Styled not-found page |

## Install components

Every component is a standard shadcn registry item:

```bash
npx shadcn@latest add https://velora.colorlib.com/r/aurora-background.json
```

Components carry their own keyframes and brand tokens, so they work standalone in existing projects. Browse the full catalog at [velora.colorlib.com/components](https://velora.colorlib.com/components).

### Use with AI agents

Velora is a standard shadcn registry, so it plugs into the shadcn MCP server with zero extra setup — an agent in Cursor, Claude Code or VS Code can browse and install Velora components by name:

```bash
pnpm dlx shadcn@latest mcp init --client claude
```

For discovery, [llms.txt](https://velora.colorlib.com/llms.txt) lists every component with its install command, gzipped size and dependency count — so an agent can pick components by cost, not just by looks.

## Use the template

```bash
git clone https://github.com/ColorlibHQ/velora-ui.git my-landing
cd my-landing
pnpm install
pnpm dev
```

Then make it yours:

1. **Content** — pages live in `src/app/`, section data is inline per page.
2. **Brand** — swap the token block in `src/app/globals.css` (or copy a preset from `/themes`).
3. **Blog** — add MDX files under `src/app/blog/(posts)/<slug>/page.mdx` and register them in `src/lib/blog-posts.ts`.
4. **Forms** — contact and auth forms are frontend-only demos; wire them to your backend or auth provider.

## Scripts

```bash
pnpm dev              # dev server (Turbopack)
pnpm build            # production build (all pages static)
pnpm lint             # eslint
pnpm registry:build   # component stats + registry.json + public/r/*.json + llms.txt
```

## Stack

Next.js 16 · React 19 · Tailwind CSS 4 · shadcn/ui · Motion · TypeScript

### About the TypeScript setup

TypeScript 7 is a native (Go) compiler that ships **only** a `tsc` binary — no `tsserver`
and no JavaScript compiler API. Editors and `typescript-eslint` still need the API, so this
repo installs both, which is the arrangement the TypeScript team documents:

| Dependency | Resolves to | Used by |
|------------|-------------|---------|
| `typescript` | `@typescript/typescript6` (v6 API + `tsc6`) | editor language service, `typescript-eslint` |
| `typescript-native` | `typescript` v7 (`tsc`) | `next build` type checking |

`next build` runs the project-local `tsc`, so type checking uses the native compiler
(~3× faster here), while your editor and `pnpm lint` keep working. Nothing in the
component source depends on this — it is purely a toolchain detail.

> Do not run `pnpm add -D typescript` in this repo: it replaces the aliased v6 package and
> breaks linting. Collapse both entries back to a plain `typescript` dependency once
> `typescript-eslint` supports TypeScript 7.1.

## License

[MIT](./LICENSE) — free for personal and commercial use, no attribution required.
