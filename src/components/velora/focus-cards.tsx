import { cn } from "@/lib/utils";

interface FocusCard {
  /** Shown over the card while it has the focus; always read by screen readers */
  title: string;
  /** Image URL */
  src: string;
  /** Describes the photo; leave empty when the title says enough */
  alt?: string;
  /** Makes the card a link */
  href?: string;
}

interface FocusCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  /** The cards, in order */
  cards: FocusCard[];
  /** Extra classes for every card, e.g. a different aspect ratio */
  cardClassName?: string;
}

// Blur and shrink every card while a sibling is hovered or keyboard-focused;
// the card under the pointer or focus opts back out.
const card = cn(
  "group/focus-card relative block aspect-[4/3] overflow-hidden rounded-2xl bg-muted shadow-sm transition-[filter,scale] duration-300 ease-out motion-reduce:transition-none",
  "group-has-[[data-focus-card]:hover]/focus-cards:blur-[3px] group-has-[[data-focus-card]:focus-visible]/focus-cards:blur-[3px]",
  "motion-safe:group-has-[[data-focus-card]:hover]/focus-cards:scale-[0.97] motion-safe:group-has-[[data-focus-card]:focus-visible]/focus-cards:scale-[0.97]",
  // `!` because the :has() selectors above out-rank a plain :hover/:focus-visible.
  "hover:scale-100! hover:blur-none! focus-visible:scale-100! focus-visible:blur-none!",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
);

// Titles show on hover and keyboard focus, and always on touch screens.
const reveal =
  "opacity-0 transition duration-300 group-hover/focus-card:opacity-100 group-focus-visible/focus-card:opacity-100 pointer-coarse:opacity-100 motion-reduce:transition-none";

/**
 * Image grid where the card you point at (or tab to) stays sharp while the
 * rest soften and step back, and its title rises over a gradient. Pure CSS —
 * no client JavaScript. Cards with an `href` are links; the others are
 * focusable figures so keyboard users can reveal their titles too.
 */
export function FocusCards({
  cards,
  cardClassName,
  className,
  ...props
}: FocusCardsProps) {
  return (
    <ul
      data-slot="focus-cards"
      className={cn("group/focus-cards grid gap-4 sm:grid-cols-2 md:grid-cols-3", className)}
      {...props}
    >
      {cards.map(({ title, src, alt = "", href }) => {
        const Caption = href ? "span" : "figcaption";
        const body = (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover/focus-card:scale-105 motion-safe:group-focus-visible/focus-card:scale-105"
            />
            <div
              aria-hidden
              className={cn("absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent", reveal)}
            />
            <Caption
              className={cn(
                "absolute inset-x-0 bottom-0 p-5 text-lg font-semibold tracking-tight text-white pointer-fine:motion-safe:translate-y-2 motion-safe:group-hover/focus-card:translate-y-0 motion-safe:group-focus-visible/focus-card:translate-y-0",
                reveal
              )}
            >
              {title}
            </Caption>
          </>
        );
        return (
          <li key={src + title}>
            {href ? (
              <a href={href} data-focus-card="" className={cn(card, cardClassName)}>
                {body}
              </a>
            ) : (
              <figure tabIndex={0} data-focus-card="" className={cn(card, cardClassName)}>
                {body}
              </figure>
            )}
          </li>
        );
      })}
    </ul>
  );
}
