/**
 * "Built with Velora" — sites and apps that use Velora UI.
 *
 * Adding one is a one-entry PR (or open the showcase issue form and we'll add
 * it). Only list a site whose owner asked or agreed to be featured, and only
 * name components and blocks it really uses: `uses` is checked against the
 * registry at build time, so a typo fails the build instead of shipping a
 * broken link.
 */

export interface ShowcaseEntry {
  /** Project or site name */
  name: string;
  /** Where the card links — the live site */
  url: string;
  /** One sentence: what it is */
  description: string;
  /** Who made it (person, studio or company) */
  author: string;
  authorUrl?: string;
  /** Made by Colorlib, the team behind Velora — labelled as ours on the page */
  byColorlib?: boolean;
  /**
   * Preview. `live` iframes a page on this site, scaled down (only for our own
   * pages — most sites refuse to be framed). `image` is a screenshot in
   * public/showcase/, 16:10, ideally 1280×800 WebP.
   */
  preview: { live: string } | { image: string };
  /** Velora component or block slugs it uses, most visible first */
  uses: string[];
  /** Public source code, if any */
  sourceUrl?: string;
  /** "Template", "SaaS", "Portfolio", "Docs"… */
  kind: string;
}

export const showcase: ShowcaseEntry[] = [
  {
    name: "Velora SaaS template",
    url: "/templates/saas",
    description:
      "A free, multi-page SaaS landing template built from Velora components: animated hero, bento features, integrations, pricing and FAQ.",
    author: "Colorlib",
    authorUrl: "https://colorlib.com",
    byColorlib: true,
    preview: { live: "/templates/saas" },
    uses: [
      "aurora-background",
      "bento-grid",
      "animated-beam",
      "orbiting-circles",
      "marquee",
      "number-ticker",
      "text-reveal",
      "border-beam",
    ],
    sourceUrl: "https://github.com/ColorlibHQ/velora-ui",
    kind: "Template",
  },
];
