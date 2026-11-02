/**
 * Single source of truth for external URLs. Override at build time with
 * NEXT_PUBLIC_SITE_URL / NEXT_PUBLIC_GITHUB_URL when the real domain and
 * repo are wired up.
 */
export const siteConfig = {
  name: "Velora UI",
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://velora.colorlib.com"
  ).replace(/\/$/, ""),
  github:
    process.env.NEXT_PUBLIC_GITHUB_URL ??
    "https://github.com/ColorlibHQ/velora-ui",
  /** Velora Pro is sold through dashboardpack.com (WooCommerce product 393469). */
  pro: {
    /**
     * Flip to true once product 393469 is published on dashboardpack.com
     * (and the Club Pass includes the zip). Until then Pro shows a waitlist,
     * because cart links to a draft product fail.
     */
    onSale: false,
    personal: {
      price: 149,
      checkout:
        "https://dashboardpack.com/cart/?add-to-cart=393469&variation_id=393470",
    },
    /** Blocks + every template, current and future */
    allAccess: {
      price: 249,
      checkout:
        "https://dashboardpack.com/cart/?add-to-cart=393469&variation_id=393485",
    },
    /** All-Access for up to 10 developers */
    team: {
      price: 399,
      checkout:
        "https://dashboardpack.com/cart/?add-to-cart=393469&variation_id=393471",
    },
    clubPass: "https://dashboardpack.com/lifetime-club-pass/",
  },
  tagline: "Free animated React components & landing templates",
  description:
    "A free, MIT-licensed library of animated shadcn/ui components and complete landing page templates. Built with Next.js 16, Tailwind CSS 4 and Motion — accessible, reduced-motion friendly and light — most components weigh under 3 KB.",
} as const;
