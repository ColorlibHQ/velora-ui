import { cn } from "@/lib/utils";

// `content` is omitted from the base attributes: HTML has its own `content`
// attribute typed as a string, and ours takes a node.
interface TweetCardProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "content"> {
  name: string;
  handle: string;
  content: React.ReactNode;
  /** Optional avatar URL; falls back to the author's initial */
  avatar?: string;
  /** Free-form, e.g. "2h" or "Mar 14" */
  time?: string;
  verified?: boolean;
}

/**
 * Static social-proof card in the shape of a tweet. Takes props rather than
 * calling an API — no network request, no rate limit, no runtime dependency.
 */
export function TweetCard({
  name,
  handle,
  content,
  avatar,
  time,
  verified = false,
  className,
  ...props
}: TweetCardProps) {
  return (
    <figure
      {...props}
      data-slot="tweet-card"
      className={cn(
        "flex w-full max-w-sm flex-col gap-3 rounded-2xl border bg-card p-4 text-card-foreground transition-colors hover:bg-muted/40",
        className
      )}
    >
      <header className="flex items-center gap-3">
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img loading="lazy" decoding="async"
            src={avatar}
            alt=""
            className="size-10 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-from to-brand-to text-sm font-semibold text-brand-foreground"
          >
            {name.charAt(0)}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span className="truncate text-sm font-semibold">{name}</span>
            {verified && (
              <svg
                viewBox="0 0 24 24"
                className="size-4 shrink-0 fill-brand"
                aria-label="Verified account"
                role="img"
              >
                <path d="M12 2l2.4 1.8 3-.3 1 2.8 2.6 1.5-1 2.9 1 2.9-2.6 1.5-1 2.8-3-.3L12 22l-2.4-1.8-3 .3-1-2.8L3 16.2l1-2.9-1-2.9 2.6-1.5 1-2.8 3 .3z" />
                <path
                  d="M8.5 12.2l2.3 2.3 4.5-4.6"
                  fill="none"
                  stroke="var(--card)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <p className="truncate text-sm text-muted-foreground">@{handle}</p>
        </div>
        {time && (
          <time className="shrink-0 text-xs text-muted-foreground">{time}</time>
        )}
      </header>
      <blockquote className="text-sm leading-relaxed text-pretty">
        {content}
      </blockquote>
    </figure>
  );
}
