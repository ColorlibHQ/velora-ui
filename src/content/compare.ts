/**
 * Comparison pages. Every number is a dated snapshot measured the same way
 * for every library: each one's public shadcn registry items (registry:ui)
 * scanned by one script. Re-measure before changing numbers — never
 * estimate. Method is explained on the page itself.
 */

export const measuredOn = "September 25, 2026";

export interface LibraryFacts {
  name: string;
  url: string;
  freeComponents: number;
  /** Source handles prefers-reduced-motion (media query, useReducedMotion, motion-safe/-reduce) */
  reducedMotion: number;
  /** Source contains aria-* attributes or role= */
  aria: number;
  /** Registry item lists no npm dependencies */
  zeroDeps: number;
  /** Uses a custom animate-* utility whose keyframes the registry item doesn't ship */
  incompleteInstalls: number;
  license: string;
  freeBlocks: string;
  templates: string;
  pricing: string;
  tailwind: string;
}

export const velora: LibraryFacts = {
  name: "Velora UI",
  url: "https://velora.colorlib.com",
  freeComponents: 100,
  reducedMotion: 89,
  aria: 32,
  zeroDeps: 51,
  incompleteInstalls: 0,
  license: "MIT, source on GitHub",
  freeBlocks: "31",
  templates: "1 multi-page SaaS template, free",
  pricing: "Free. Pro ($99 one-time, niche templates) is on a waitlist",
  tailwind: "v4",
};

export interface Comparison {
  slug: string;
  them: LibraryFacts;
  summary: string;
  /** Where the other library is genuinely ahead */
  theyWin: string[];
  /** Where Velora is ahead */
  weWin: string[];
  /** Their component name → equivalent Velora component slug */
  equivalents: [string, string][];
  /** Set when this library was measured on a different day from `measuredOn` */
  measuredOn?: string;
  /** Anything about how this library was measured that differs from the others */
  methodNote?: string;
}

export const comparisons: Comparison[] = [
  {
    slug: "aceternity-ui",
    them: {
      name: "Aceternity UI",
      url: "https://ui.aceternity.com",
      freeComponents: 112,
      reducedMotion: 4,
      aria: 11,
      zeroDeps: 36,
      incompleteInstalls: 6,
      license: "Custom licence; source not public",
      freeBlocks: "9 demo blocks (173 paid)",
      templates: "17 (2 free)",
      pricing:
        "Free components; $169/year, $199 lifetime or $1,590 for 10 seats",
      tailwind: "v3 and v4",
    },
    summary:
      "Aceternity UI popularised the animated, dark-mode landing-page look and has the bigger catalogue, templates and community. Velora covers every category it offers, is MIT licensed and open source, gives its section blocks away, and builds reduced-motion and keyboard support into each component.",
    theyWin: [
      "More components (112 free against our 100) and far more sections overall — 173 paid blocks and 17 templates",
      "WebGL and three.js effects (canvas reveal, shader backgrounds, a 3D globe) — Velora deliberately skips WebGL to stay light",
      "Supports Tailwind CSS v3 as well as v4",
      "A larger community, showcase and course material",
    ],
    weWin: [
      "MIT licensed with the source on GitHub — no licence to read before you ship",
      "Section blocks are free; Aceternity's real sections are part of its paid plans",
      "Reduced motion handled in the component source (89 of 100 components; the other 11 don't animate), and keyboard, focus and screen-reader behaviour documented on every page",
      "CLI installs are complete: every component ships the keyframes and tokens it needs",
      "Size and dependency receipts on every component; 51 of 100 need no npm package",
    ],
    equivalents: [
      ["3D Card", "3d-card"],
      ["3D Pin", "3d-pin"],
      ["3D Marquee", "3d-marquee"],
      ["Animated Modal", "animated-modal"],
      ["Animated Testimonials", "animated-testimonials"],
      ["Animated Tooltip", "animated-tooltip"],
      ["Apple Cards Carousel", "apple-cards-carousel"],
      ["Aurora Background", "aurora-background"],
      ["Background Beams", "background-beams"],
      ["Background Boxes", "background-boxes"],
      ["Background Ripple Effect", "ripple"],
      ["Bento Grid", "bento-grid"],
      ["Card Hover Effect", "card-hover-effect"],
      ["Card Stack", "card-stack"],
      ["Code Block", "code-block"],
      ["Compare", "compare-slider"],
      ["Container Scroll Animation", "container-scroll"],
      ["Direction Aware Hover", "direction-aware-hover"],
      ["Dotted Glow Background", "dotted-glow-background"],
      ["Draggable Card", "draggable-card"],
      ["Evervault Card", "evervault-card"],
      ["File Upload", "file-drop"],
      ["Flip Words", "flip-words"],
      ["Floating Dock", "dock"],
      ["Floating Navbar", "floating-navbar"],
      ["Focus Cards", "focus-cards"],
      ["Following Pointer", "following-pointer"],
      ["Glare Card", "glare-card"],
      ["Globe", "globe"],
      ["Glowing Effect", "glowing-effect"],
      ["Hero Parallax", "hero-parallax"],
      ["Images Slider", "image-slider"],
      ["Infinite Moving Cards", "marquee"],
      ["Lamp", "lamp"],
      ["Layout Grid", "layout-grid"],
      ["Lens", "lens"],
      ["Loader", "loaders"],
      ["Macbook Scroll", "macbook-scroll"],
      ["Magnetic Button", "magnetic-button"],
      ["Meteors", "meteors"],
      ["Moving Border", "moving-border"],
      ["Multi Step Loader", "multi-step-loader"],
      ["Navbar Menu", "navbar-menu"],
      ["Noise Background", "noise-background"],
      ["Parallax Scroll", "parallax-grid"],
      ["Placeholders and Vanish Input", "vanish-input"],
      ["Pointer Highlight", "pointer-highlight"],
      ["Resizable Navbar", "resizable-navbar"],
      ["Shooting Stars", "shooting-stars"],
      ["Sidebar", "animated-sidebar"],
      ["Stars Background", "shooting-stars"],
      ["Stateful Button", "stateful-button"],
      ["Sticky Banner", "sticky-banner"],
      ["Sticky Scroll Reveal", "sticky-scroll"],
      ["Tabs", "animated-tabs"],
      ["Terminal", "terminal"],
      ["Text Generate Effect", "text-reveal"],
      ["Text Hover Effect", "text-hover-effect"],
      ["Timeline", "timeline"],
      ["Tracing Beam", "tracing-beam"],
      ["Typewriter Effect", "typewriter"],
      ["Vortex", "vortex"],
      ["Wavy Background", "wavy-background"],
      ["Wobble Card", "wobble-card"],
      ["World Map", "world-map"],
    ],
  },
  {
    slug: "magic-ui",
    them: {
      name: "Magic UI",
      url: "https://magicui.design",
      freeComponents: 78,
      reducedMotion: 6,
      aria: 21,
      zeroDeps: 40,
      incompleteInstalls: 0,
      license: "MIT, source on GitHub",
      freeBlocks: "Sections are part of Magic UI Pro",
      templates: "In Magic UI Pro",
      pricing: "Free components; Pro $199 one-time",
      tailwind: "v4",
    },
    summary:
      "Magic UI is the closest open-source peer: MIT licensed, shadcn-native and very popular (about 22,400 GitHub stars). Velora has more free components and free section blocks, and handles reduced motion and keyboard access inside every component.",
    theyWin: [
      "A much larger community — about 22,400 GitHub stars",
      "An official MCP server for AI coding agents",
      "Paid templates and sections in Magic UI Pro",
      "Some effects Velora doesn't have yet (icon cloud, video text, pixel image)",
    ],
    weWin: [
      "More free components (100 against 78) and 31 free section blocks",
      "Reduced motion handled in the component source (89 of 100 components; the other 11 don't animate), with behaviour documented per component",
      "Keyboard, focus and screen-reader notes on every component page",
      "Overlays, loaders, navigation and 3D categories with accessible dialogs, tabs and menus",
    ],
    equivalents: [
      ["Animated Beam", "animated-beam"],
      ["Animated Gradient Text", "animated-gradient-text"],
      ["Animated List", "animated-list"],
      ["Animated Theme Toggler", "theme-toggler"],
      ["Avatar Circles", "avatar-circles"],
      ["Bento Grid", "bento-grid"],
      ["Blur Fade", "blur-fade"],
      ["Border Beam", "border-beam"],
      ["Confetti", "confetti"],
      ["Dock", "dock"],
      ["Dot Pattern", "grid-pattern"],
      ["File Tree", "file-tree"],
      ["Flickering Grid", "flickering-grid"],
      ["Globe", "globe"],
      ["Grid Pattern", "grid-pattern"],
      ["Highlighter", "text-highlighter"],
      ["Hyper Text", "hyper-text"],
      ["iPhone", "iphone-mockup"],
      ["Lens", "lens"],
      ["Light Rays", "light-rays"],
      ["Magic Card", "spotlight-card"],
      ["Marquee", "marquee"],
      ["Meteors", "meteors"],
      ["Morphing Text", "morphing-text"],
      ["Number Ticker", "number-ticker"],
      ["Orbiting Circles", "orbiting-circles"],
      ["Particles", "particles"],
      ["Pointer", "following-pointer"],
      ["Rainbow Button", "rainbow-button"],
      ["Retro Grid", "retro-grid"],
      ["Ripple", "ripple"],
      ["Ripple Button", "ripple-button"],
      ["Safari", "browser-mockup"],
      ["Scroll Based Velocity", "scroll-velocity"],
      ["Scroll Progress", "scroll-progress"],
      ["Shimmer Button", "shimmer-button"],
      ["Smooth Cursor", "smooth-cursor"],
      ["Sparkles Text", "sparkles-text"],
      ["Terminal", "terminal"],
      ["Text Reveal", "text-reveal"],
      ["Tweet Card", "tweet-card"],
      ["Typing Animation", "typewriter"],
      ["Word Rotate", "word-rotate"],
    ],
  },
  {
    slug: "react-bits",
    measuredOn: "September 29, 2026",
    methodNote:
      "React Bits publishes each component four times (JavaScript or TypeScript, plain CSS or Tailwind) as registry:component items, not registry:ui. We measured the TypeScript + Tailwind variant of each of the 212 components in its public registry at reactbits.dev/r, so every component counts once; Velora was re-measured the same day with unchanged results.",
    them: {
      name: "React Bits",
      url: "https://reactbits.dev",
      freeComponents: 212,
      reducedMotion: 67,
      aria: 78,
      zeroDeps: 46,
      incompleteInstalls: 2,
      license: "MIT + Commons Clause (no reselling the components); source on GitHub",
      freeBlocks: "None free; 280 in React Bits Pro",
      templates: "15 in React Bits Pro (1 free)",
      pricing:
        "Free components; Pro $129–$349 one-time, or $79–$199/year",
      tailwind: "Tailwind or plain CSS, per component",
    },
    summary:
      "React Bits is one of the most popular animated-component collections for React (about 48,000 GitHub stars), with more than twice Velora's free components, each in JavaScript, TypeScript, CSS and Tailwind versions. Velora is smaller and built around shadcn/ui: plain MIT, free section blocks and a SaaS template, reduced motion handled in nearly every animated component, and CLI installs that bring their keyframes.",
    theyWin: [
      "Far more free components (212 against our 100), including dozens of WebGL, three.js and shader backgrounds Velora doesn't attempt",
      "Every component in four variants — JavaScript or TypeScript, plain CSS or Tailwind — so it works outside Tailwind projects too",
      "Official Vue (Vue Bits) and Svelte (Svelte Bits) ports from the same author",
      "A much larger community — about 48,000 GitHub stars",
      "A paid Pro library with 150 more components, 280 page blocks, 300 app-UI screens and 15 templates",
      "Relative to size, more components set ARIA attributes or roles (78 of 212 against our 32 of 100)",
    ],
    weWin: [
      "Plain MIT licence. React Bits adds a Commons Clause that bars selling or redistributing the components themselves, alone or in a bundle",
      "31 free section blocks and a free multi-page SaaS template; React Bits' free library has no page-level blocks — those are in Pro",
      "Reduced motion handled in the component source in 89 of 100 components (the other 11 don't animate), against 67 of 212 in React Bits",
      "Lighter installs: 51 of 100 components need no npm package (React Bits: 46 of 212, with ogl, GSAP, motion and three.js the most common)",
      "CLI installs are complete: every component ships its keyframes. Two React Bits Tailwind components leave theirs as a comment to paste into a Tailwind config",
      "Built for shadcn/ui: components read your theme tokens and brand variables, and keyboard, focus and screen-reader behaviour is documented on every page",
    ],
    equivalents: [
      ["Animated Content", "blur-fade"],
      ["Animated List", "animated-list"],
      ["Aurora", "aurora-background"],
      ["Border Glow", "glowing-effect"],
      ["Card Swap", "card-stack"],
      ["Count Up", "number-ticker"],
      ["Decrypted Text", "hyper-text"],
      ["Dock", "dock"],
      ["Fade Content", "blur-fade"],
      ["Glare Hover", "glare-card"],
      ["Gradient Text", "animated-gradient-text"],
      ["Light Rays", "light-rays"],
      ["Logo Loop", "marquee"],
      ["Magic Bento", "bento-grid"],
      ["Magnet", "magnetic-button"],
      ["Particles", "particles"],
      ["Rotating Text", "word-rotate"],
      ["Scroll Reveal", "text-reveal"],
      ["Scroll Velocity", "scroll-velocity"],
      ["Shiny Text", "text-shimmer"],
      ["Spotlight Card", "spotlight-card"],
      ["Star Border", "moving-border"],
      ["Stepper", "stepper"],
      ["Text Type", "typewriter"],
      ["Tilted Card", "tilt-card"],
    ],
  },
];
