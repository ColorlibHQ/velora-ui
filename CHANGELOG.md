# Changelog

All notable changes to Velora UI. Also published at [/changelog](https://velora.colorlib.com/changelog).

## 0.8.0 — 2026-09-25

### Added

- **31 free blocks** in 10 categories: Hero Sections (6), Feature Sections (5), Pricing
  Sections (3), Testimonial Sections (3), CTA Sections (3), Logo Clouds (2), FAQ Sections (2),
  Navbars (2), Footers (3) and Login & Sign-up (2)
- `/blocks` and one page per category, with iframe previews at desktop, tablet and mobile widths
- Blocks are `registry:block` items: `npx shadcn add …/r/<block>.json` installs the section and
  every Velora component it uses (pulled in by URL)
- `scripts/build-docs.mjs` derives each block's components, shadcn primitives and npm
  dependencies from its imports and rejects site-only imports
- Blocks in the header, footer, sitemap, ⌘K search and llms.txt

### Fixed

- The footer prefetched `/llms.txt` and the 404 demo as routes, logging 404s on every page
- Resizable Navbar keyed items by `href`, so duplicate links collided

## 0.7.0 — 2026-09-25

### Added

- **18 new components — 100 in total.** New categories: Overlays and Loaders.
  - **Overlays** — Animated Modal (`Modal`, `ModalTrigger`, `ModalContent`, `ModalFooter`,
    `ModalClose`) on the native `<dialog>`: top layer, focus trap, Escape, exit animation before close
  - **Navigation** — Animated Sidebar (collapsible rail; native-dialog drawer below 42rem),
    Animated Tabs (WAI-ARIA tabs with roving tabindex), Resizable Navbar
  - **Loaders** — Multi-Step Loader (live-region progress), Loaders (`DotsLoader`, `PulseLoader`,
    `OrbitLoader`, `BarsLoader`, `SpinnerLoader`), Stateful Button (promise-aware, stable width)
  - **Cursor & Pointer** — Following Pointer, Smooth Cursor, Pointer Highlight
  - **Carousels** — Image Slider (visible pause, swipe, arrow keys), 3D Marquee
  - **Cards & Layout** — Draggable Card, Layout Grid, Wobble Card
  - **Mockups** — Code Block (tabs, line numbers, highlighted lines, zero-dependency tokenizer)
  - **Backgrounds** — Dotted Glow Background, Noise Background
- Registry: 3D Marquee ships the `marquee-vertical` keyframes it uses

## 0.6.0 — 2026-09-25

### Added

- **18 new components — 82 in total.** Four new categories: 3D, Carousels, Cursor & Pointer
  and Data & Maps.
  - **Data & Maps** — Globe (2D canvas, no WebGL; markers, great-circle arcs, drag with inertia,
    arrow keys) and World Map (SVG, animated connections, generated accessible description).
    Land mask derived from Natural Earth (public domain), embedded — no map dependency
  - **3D** — 3D Card (`Card3D` + `Card3DItem` depth layers), 3D Pin
  - **Scroll** — Hero Parallax, MacBook Scroll, Timeline
  - **Backgrounds** — Wavy Background, Vortex, Shooting Stars (+ Stars Background), Background Boxes
  - **Cards & Layout / Effects** — Glowing Effect, Evervault Card, Focus Cards, Card Hover Effect
  - **Text** — Text Hover Effect; **Carousels** — Apple Cards Carousel (focus-trapped dialog,
    portalled to `<body>`); **Cursor & Pointer** — Lens (keyboard-movable)
- Every new component has two examples, generated props and an Accessibility section

### Fixed

- Scroll Velocity ran a requestAnimationFrame loop every frame for its whole life, including
  under reduced motion and offscreen; it now runs only while visible and motion is allowed

## 0.5.0 — 2026-09-25

### Added

- Component pages: Preview/Code tabs with replay and full screen, CLI and manual install tabs
  (pnpm/npm/yarn/bun, plus the exact CSS the registry merges), props tables generated from each
  component's TypeScript interfaces, an Accessibility section, breadcrumbs and prev/next links
- **Copy prompt** (install command, working example and props for AI agents) and **Open in v0**
- ⌘K search across components and pages
- `DockIcon` accepts `href` and `onClick`; `NavbarMenu` items accept `href`; `VanishInput` takes a
  `label`; `ScrollProgress`, `StickyScroll` and `FloatingNavbar` can track a scroll container
- Registry items declare `registryDependencies: ["utils"]` so installs work outside shadcn projects

### Fixed

- Accessibility audit of all 64 components: 60 defects fixed across 38 of them. Highlights:
  keyboard-operable Dock, Animated Tooltip, Navbar Menu (Escape, focus return) and Expandable Card
  (focus trap, Escape, focus restore); screen-reader text for typed, scrambled and rotating copy;
  pause on hover and focus for everything that loops (WCAG 2.2.2); named Stepper markers,
  labelled File Drop, 24px testimonial dots
- CSS keyframe animations use `motion-safe:` so reduced motion works in projects that install
  components with the CLI — previously the guard lived only in this site's `globals.css`
- Hydration mismatches under reduced motion (Typewriter, Text Reveal, Background Beams, Sparkles
  Text, Animated List, Terminal, Container Scroll, Parallax Grid)
- Number Ticker still counted up under reduced motion; Orbiting Circles collapsed to the centre

### Changed

- Demos live in `src/content/components/<slug>/examples/`; `scripts/build-docs.mjs` generates the
  catalogue, example index and props data before every dev and build
- Components are 0.3–2.0 KB gzipped after the accessibility work (was 0.3–1.5 KB)

## 0.4.0 — 2026-09-05

### Added

- **32 new components — the catalogue doubles to 64.** Four categories that were
  previously empty now exist, which was the widest gap against Magic UI and Aceternity:
  - **Navigation** — Floating Navbar (hides on scroll down, returns on scroll up),
    Navbar Menu (morphing pill and panel), Sticky Banner
  - **Forms** — Vanish Input, File Drop, Stepper
  - **Social Proof** — Animated Testimonials, Tweet Card (props, not an API call), Logo Cloud
  - **Scroll** — Sticky Scroll, Container Scroll, Tracing Beam, Scroll Velocity,
    Parallax Grid (Scroll Progress moved into this category)
- Buttons went from 2 to 7: Rainbow Button, Ripple Button, Magnetic Button, Moving Border,
  and a Theme Toggler that wipes the new theme in with the View Transitions API
- Cards & Layout gained Card Stack, Glare Card, Expandable Card, Direction Aware Hover,
  Compare Slider and File Tree
- Text gained Word Rotate, Hyper Text, Text Highlighter and Morphing Text
- Backgrounds gained Flickering Grid, Ripple and Light Rays

### Changed

- The receipts still hold at double the size: every component is 0.3–1.5 KB gzipped, and
  **33 of 64 now carry no runtime dependency** (previously 15 of 32). No WebGL, no Three.js —
  deliberately, since a single 3D component would cost more than the entire catalogue
- Every new component respects `prefers-reduced-motion`, either through the global CSS kill
  switch or `useReducedMotion`, and none imports Radix or Base UI

## 0.3.1 — 2026-09-05

### Changed

- Dependencies updated to latest across the board: Next.js 16.3.4, React 19.2.8, Motion 13.2.0,
  TypeScript 7.0.2, `radix-ui` 1.6.7, `lucide-react` 1.41.0, `shiki` 4.4.3, `shadcn` 4.21.0,
  `@next/mdx` 16.3.4, `@types/node` 26.4.1, `@types/react` 19.2.18, `@types/react-dom` 19.2.7
- **Next.js 16.3** — Turbopack disk caching now covers `next build`, dev-server memory use drops
  sharply, and `next build` type-checks through the project-local `tsc` CLI, which is what makes
  TypeScript 7 usable here. No config or application changes were needed; every route still
  prerenders under `output: "export"`
- **TypeScript 7** — the native Go compiler. Type checking this project drops from ~1.57s to
  ~0.54s. TypeScript 7 ships only a `tsc` binary (no `tsserver`, no JavaScript compiler API), so
  the v6 API is installed alongside it for the editor language service and `typescript-eslint`:
  `typescript` is aliased to `@typescript/typescript6`, and `typescript-native` carries v7. This
  is the side-by-side arrangement the TypeScript team documents; see the README for details and
  for the exit path once `typescript-eslint` supports 7.1
- **Motion 13** — no source changes required. The only breaking change is the removal of
  `@emotion/is-prop-valid` as an optional dependency, which affects CSS-in-JS users only

### Not upgraded

- **ESLint 10** — held at 9.39.5. `eslint-config-next` still depends on `eslint-plugin-react`,
  `eslint-plugin-import` and `eslint-plugin-jsx-a11y`, none of which have published an
  ESLint 10-compatible release; ESLint 10 fails at rule-load time, not just on peer warnings.
  Revisit when those plugins ship ESLint 10 support

## 0.3.0 — 2026-07-16

### Added

- Complete multi-page template: pricing, blog (MDX pipeline), about, contact, changelog, login, signup and a custom 404
- Themes page with six brand-ramp presets, live preview and copy-paste token blocks
- Performance receipts on every component docs page: gzipped size, dependency count, reduced-motion badge (generated by `scripts/component-stats.mjs` at registry build time)
- Receipts embedded in `llms.txt` so AI agents can select components by cost
- Multi-column site footer, expanded header navigation
- `sitemap.xml` and `robots.txt`
- README, LICENSE (MIT) and this changelog

### Changed

- Base UI compatibility documented: all Velora primitives are primitive-agnostic (zero Radix imports)

## 0.2.0 — 2026-07-16

### Changed

- Default theme moved from violet to a restrained blue ramp; brand gradient narrowed from violet→fuchsia→cyan to blue→sky
- Gradient text limited to the hero; section headings use solid primary color
- Hero aurora reduced to subtle; CTA effect stack reduced; avatar circles use solid tones
- All dependencies updated (Next.js 16.2.10, React 19.2.7, Motion 12.42, Tailwind CSS 4.3.3); TypeScript pinned to 5.x and ESLint to 9.x for Next 16.2 compatibility

## 0.1.2 — 2026-06-12

### Added

- shadcn registry (`public/r/*.json`) — components carry their own keyframes and brand tokens
- Docs site: categorized listing and per-component pages with live previews, install commands and highlighted source
- 10 new components (32 total): text shimmer, flip words, sparkles text, terminal, confetti, lamp, background beams, animated tooltip, browser mockup, iPhone mockup
- Light mode via next-themes
- `llms.txt` for AI-agent discovery

## 0.1.1 — 2026-06-11

### Added

- 8 new primitives: meteors, retro grid, animated beam, animated list, dock, tilt card, avatar circles, particles
- Integrations-beam, live-activity, testimonial and CTA sections on the showcase homepage

## 0.1.0 — 2026-06-10

### Added

- Next.js 16 + Tailwind CSS 4 + shadcn/ui + Motion scaffold
- Design tokens: brand gradient variables, animation keyframes, global reduced-motion kill switch
- 14 animated primitives and the dark-first showcase homepage
