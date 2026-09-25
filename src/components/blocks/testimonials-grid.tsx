import { ArrowRightIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/velora/blur-fade";
import { TextHighlighter } from "@/components/velora/text-highlighter";
import { TweetCard } from "@/components/velora/tweet-card";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=160&h=160&q=70&auto=format&fit=crop`;

const FEATURED = {
  before:
    "We moved 40 teams onto Acme in a fortnight. Six months later, specs reach production",
  highlight: "three times faster",
  after: "and nobody has to chase a status update again.",
  name: "Grace Whitfield",
  role: "Engineering Director, Pinewood",
  avatar: photo("1580489944761-15a19d654956"),
  metric: "3.2×",
  metricLabel: "faster from spec to release",
  secondary: "40 teams migrated in 14 days",
};

type Post =
  | {
      kind: "tweet";
      name: string;
      handle: string;
      time: string;
      verified?: boolean;
      avatar?: string;
      text: string;
    }
  | {
      kind: "quote";
      name: string;
      role: string;
      avatar?: string;
      text: string;
    };

const POSTS: Post[] = [
  {
    kind: "tweet",
    name: "Tomás Herrera",
    handle: "tomasbuilds",
    time: "Mar 14",
    verified: true,
    avatar: photo("1500648767791-00dcc994a43e"),
    text: "Switched our whole org to @acmehq this quarter. The GitHub sync is the first one I've never had to babysit.",
  },
  {
    kind: "quote",
    name: "Hannah Weiss",
    role: "Design Lead, Kestrel",
    avatar: photo("1438761681033-6461ffad8d80"),
    text: "It's calm software. Nothing pings unless it matters, specs sit right next to the tickets they describe, and design reviews finally happen in one place instead of four.",
  },
  {
    kind: "tweet",
    name: "Aiko Tanaka",
    handle: "aiko_ops",
    time: "Feb 2",
    text: "Quarterly planning for 12 teams, done before lunch. @acmehq I owe you a coffee.",
  },
  {
    kind: "quote",
    name: "Samuel Achebe",
    role: "COO, Meridian",
    text: "Acme scaled from our first ten people to four hundred without turning into a spreadsheet.",
  },
  {
    kind: "tweet",
    name: "Lena Fischer",
    handle: "lenadesigns",
    time: "Jan 28",
    verified: true,
    avatar: photo("1534528741775-53994a69daeb"),
    text: "Hot take: the best feature of @acmehq is what it leaves out. No clutter, no noise, just the work. Keyboard shortcuts for everything too.",
  },
  {
    kind: "quote",
    name: "Daniel Okafor",
    role: "Engineering Manager, Lumen Labs",
    avatar: photo("1507003211169-0a1dd7228f2d"),
    text: "The release notes write themselves from merged work. Our support queue dropped by a third the month we switched.",
  },
  {
    kind: "tweet",
    name: "Rafael Costa",
    handle: "rafacodes",
    time: "Dec 9",
    text: "Imported five years of issues into @acmehq in one afternoon. Labels, links, history — all of it came across.",
  },
  {
    kind: "tweet",
    name: "Priya Raman",
    handle: "priyaships",
    time: "Nov 21",
    verified: true,
    avatar: photo("1544005313-94ddf0286df2"),
    text: "Our public roadmap on @acmehq gets more traffic than our pricing page. Customers love seeing what's next.",
  },
  {
    kind: "quote",
    name: "Marcus Bell",
    role: "CTO, Tidewater",
    avatar: photo("1506794778202-cad84cf45f1d"),
    text: "Fast, quiet and opinionated in the right places. My team stopped complaining about process tooling.",
  },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

/** Colours @mentions so they read like a real post. */
function withMentions(text: string) {
  return text.split(/(@\w+)/g).map((part, i) =>
    part.startsWith("@") ? (
      <span key={i} className="text-brand">
        {part}
      </span>
    ) : (
      part
    )
  );
}

function Person({
  name,
  detail,
  avatar,
  size = "default",
}: {
  name: string;
  detail: string;
  avatar?: string;
  size?: "default" | "lg";
}) {
  return (
    <figcaption className="flex items-center gap-3">
      <Avatar size="lg" className={size === "lg" ? "size-12" : undefined}>
        {avatar && <AvatarImage src={avatar} alt="" />}
        <AvatarFallback className="bg-gradient-to-br from-brand-from to-brand-to text-xs font-semibold text-brand-foreground">
          {initials(name)}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 text-sm">
        <div className="font-medium">{name}</div>
        <div className="text-muted-foreground">{detail}</div>
      </div>
    </figcaption>
  );
}

/**
 * Review wall: a wide case-study quote with its headline metric, then a
 * masonry of social posts and quote cards laid out with CSS columns — no
 * JavaScript measuring, and cards never split across columns.
 */
export function TestimonialsGrid() {
  return (
    <section className="px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <BlurFade className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-brand">Wall of love</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
              Don&apos;t take our word for it
            </h2>
            <p className="mt-5 text-lg text-pretty text-muted-foreground">
              Engineers, designers and operators on what changed after they
              moved their team to Acme.
            </p>
          </div>
          <Button variant="outline" asChild className="self-start lg:self-auto">
            <a href="#">
              Read all reviews <ArrowRightIcon />
            </a>
          </Button>
        </BlurFade>

        <div className="relative mt-14 grid overflow-hidden rounded-3xl border bg-card lg:grid-cols-[1fr_20rem]">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-brand/15 blur-3xl"
          />
          <figure className="relative flex flex-col justify-between gap-10 p-6 sm:p-10">
            <blockquote className="text-xl font-medium tracking-tight text-pretty sm:text-2xl lg:text-3xl">
              <p>
                &ldquo;{FEATURED.before}{" "}
                <TextHighlighter>{FEATURED.highlight}</TextHighlighter>{" "}
                {FEATURED.after}&rdquo;
              </p>
            </blockquote>
            <Person
              name={FEATURED.name}
              detail={FEATURED.role}
              avatar={FEATURED.avatar}
              size="lg"
            />
          </figure>
          <div className="relative flex flex-col justify-center gap-2 border-t bg-muted/40 p-6 sm:p-10 lg:border-t-0 lg:border-l">
            <p className="bg-gradient-to-br from-brand-from via-brand-via to-brand-to bg-clip-text text-6xl font-semibold tracking-tight text-transparent sm:text-7xl">
              {FEATURED.metric}
            </p>
            <p className="text-base font-medium">{FEATURED.metricLabel}</p>
            <p className="text-sm text-muted-foreground">{FEATURED.secondary}</p>
          </div>
        </div>

        <div className="mt-4 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {POSTS.map((post) =>
            post.kind === "tweet" ? (
              <TweetCard
                key={post.handle}
                name={post.name}
                handle={post.handle}
                time={post.time}
                verified={post.verified}
                avatar={post.avatar}
                content={withMentions(post.text)}
                className="mb-4 max-w-none break-inside-avoid p-5"
              />
            ) : (
              <figure
                key={post.name}
                className="mb-4 flex break-inside-avoid flex-col gap-5 rounded-2xl border bg-card p-6 text-card-foreground"
              >
                <blockquote className="text-sm leading-relaxed text-pretty sm:text-base">
                  <p>&ldquo;{post.text}&rdquo;</p>
                </blockquote>
                <Person name={post.name} detail={post.role} avatar={post.avatar} />
              </figure>
            )
          )}
        </div>
      </div>
    </section>
  );
}
