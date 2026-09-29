<div align="center">

# Velora UI

**Free, MIT-licensed animated components and complete landing templates for React.**

100 animated shadcn/ui components and a full multi-page SaaS template — home, pricing, blog (MDX), auth, changelog, contact and 404 — built with Next.js 16, Tailwind CSS 4 and Motion. The free tier isn't a teaser: everything on the site ships under MIT, commercial use included.

[![Live demo](https://img.shields.io/badge/Live_demo-velora.colorlib.com-2563eb?style=for-the-badge&logo=vercel&logoColor=white)](https://velora.colorlib.com)
&nbsp;
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](./LICENSE)
&nbsp;
[![Stars](https://img.shields.io/github/stars/ColorlibHQ/velora-ui?style=for-the-badge&color=eab308)](https://github.com/ColorlibHQ/velora-ui/stargazers)

![Components](https://img.shields.io/badge/components-100-2563eb?style=flat-square)
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
  <a href="https://velora.colorlib.com/components"><img src=".github/screenshots/components.webp" alt="Component catalog — 100 animated components grouped by category"></a>
  <br><sub><b>Component catalog</b> — 100 components, grouped by category, one CLI command to install.</sub>
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
- **Animations with receipts.** Every component's docs page shows its gzipped size (0.3–3 KB for 97 of them; the dependency-free Globe carries its own land map at 5.2 KB — no Three.js, no WebGL) and dependency count. 51 of 100 components have zero runtime dependencies; the rest use Motion and nothing else.
- **Tokens, not hardcoded hues.** Components read your shadcn CSS variables. Rebrand every gradient, beam and glow by editing seven variables — ready-made presets on the [themes page](https://velora.colorlib.com/themes).
- **Motion that asks permission.** Every component handles `prefers-reduced-motion` itself — so it still does after you install it — and documents what reduced-motion, keyboard and screen-reader users get on its docs page.
- **Primitive-agnostic.** Velora components import neither Radix nor Base UI — they work in any shadcn project, whichever primitive layer you use.

## What's inside

### 100 animated components

| Category | Components |
|----------|-----------|
| **Backgrounds** | Aurora Background · Background Beams · Background Boxes · Dotted Glow Background · Flickering Grid · Grid & Dot Pattern · Lamp · Light Rays · Meteors · Noise Background · Particles · Retro Grid · Ripple · Shooting Stars · Vortex · Wavy Background |
| **Text** | Animated Gradient Text · Flip Words · Hyper Text · Morphing Text · Number Ticker · Sparkles Text · Text Highlighter · Text Hover Effect · Text Reveal · Text Shimmer · Typewriter · Word Rotate |
| **Buttons** | Confetti · Magnetic Button · Moving Border · Rainbow Button · Ripple Button · Shimmer Button · Stateful Button · Theme Toggler |
| **Cards & Layout** | Animated List · Animated Tooltip · Avatar Circles · Bento Grid · Card Hover Effect · Card Stack · Compare Slider · Direction Aware Hover · Dock · Draggable Card · Evervault Card · Expandable Card · File Tree · Focus Cards · Glare Card · Layout Grid · Marquee · Orbiting Circles · Spotlight Card · Tilt Card · Wobble Card |
| **Navigation** | Animated Sidebar · Animated Tabs · Floating Navbar · Navbar Menu · Resizable Navbar · Sticky Banner |
| **Forms** | File Drop · Stepper · Vanish Input |
| **Overlays** | Animated Modal |
| **Loaders** | Loaders · Multi Step Loader |
| **Social Proof** | Animated Testimonials · Logo Cloud · Tweet Card |
| **Scroll** | Container Scroll · Hero Parallax · Macbook Scroll · Parallax Grid · Scroll Progress · Scroll Velocity · Sticky Scroll · Timeline · Tracing Beam |
| **Effects** | Animated Beam · Blur Fade · Border Beam · Glowing Effect |
| **3D** | 3D Card · 3D Pin |
| **Carousels** | 3D Marquee · Apple Cards Carousel · Image Slider |
| **Cursor & Pointer** | Following Pointer · Lens · Pointer Highlight · Smooth Cursor |
| **Data & Maps** | Globe · World Map |
| **Mockups** | Browser Mockup · Code Block · iPhone Mockup · Terminal |

Browse them all — with live demos, props, install commands and source — at [velora.colorlib.com/components](https://velora.colorlib.com/components). New here? Start with [Get started](https://velora.colorlib.com/components/get-started), or register the namespace once and install by name:

```bash
npx shadcn@latest registry add @velora=https://velora.colorlib.com/r/{name}.json
npx shadcn@latest add @velora/marquee
```

Coming from another library? See the measured comparisons with [Aceternity UI](https://velora.colorlib.com/compare/aceternity-ui) and [Magic UI](https://velora.colorlib.com/compare/magic-ui).

### 31 free blocks

Complete sections built from Velora components — preview them at desktop, tablet and mobile widths, copy the code, or install one with the shadcn CLI and it brings every component it uses along:

```bash
npx shadcn@latest add https://velora.colorlib.com/r/hero-globe.json
```

| Category | Blocks |
|----------|--------|
| **[Hero Sections](https://velora.colorlib.com/blocks/hero-sections)** | Aurora hero · Globe split hero · Product screenshot hero · Phone split hero · Wavy hero · Developer tool hero |
| **[Feature Sections](https://velora.colorlib.com/blocks/feature-sections)** | Bento feature grid · Icon feature grid · Tabbed product tour · Alternating screenshot rows · Numbered steps |
| **[Pricing Sections](https://velora.colorlib.com/blocks/pricing-sections)** | Three-tier pricing · Single plan pricing · Pricing comparison table |
| **[Testimonial Sections](https://velora.colorlib.com/blocks/testimonial-sections)** | Testimonial marquee · Featured testimonial · Testimonial grid |
| **[CTA Sections](https://velora.colorlib.com/blocks/cta-sections)** | Vortex CTA band · Split CTA with product visual · Newsletter sign-up |
| **[Logo Clouds](https://velora.colorlib.com/blocks/logo-clouds)** | Logo marquee · Logo grid |
| **[FAQ Sections](https://velora.colorlib.com/blocks/faq-sections)** | Centered FAQ accordion · Two-column FAQ |
| **[Navbars](https://velora.colorlib.com/blocks/navbars)** | Floating pill navbar · Mega menu navbar |
| **[Footers](https://velora.colorlib.com/blocks/footers)** | Link columns footer · Giant wordmark footer · Newsletter footer |
| **[Login & Sign-up](https://velora.colorlib.com/blocks/auth-sections)** | Split login page · Sign-up card |

### The complete template

A production landing site, not a component sandbox — browse it at [/templates](https://velora.colorlib.com/templates). Every page is real, static-rendered and yours to keep:

| Page | What you get |
|------|--------------|
| [SaaS landing](https://velora.colorlib.com/templates/saas) | Animated hero, feature bento, integrations, sample testimonials, pricing, FAQ and CTA — in `src/app/templates/saas/page.tsx`; move it to `src/app/page.tsx` to make it your homepage |
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
