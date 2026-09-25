import { StarIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BlurFade } from "@/components/velora/blur-fade";
import { Marquee } from "@/components/velora/marquee";
import { cn } from "@/lib/utils";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=160&h=160&q=70&auto=format&fit=crop`;

type Review = {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
};

const TOP_ROW: Review[] = [
  {
    quote:
      "We replaced three tools and a weekly sync with Acme. Planning used to take a morning — now it takes a coffee.",
    name: "Maya Lindqvist",
    role: "Head of Product",
    company: "Northwind",
    avatar: photo("1494790108377-be9c29b29330"),
  },
  {
    quote:
      "The release notes write themselves. Our support queue dropped by a third the month we switched.",
    name: "Daniel Okafor",
    role: "Engineering Manager",
    company: "Lumen Labs",
    avatar: photo("1507003211169-0a1dd7228f2d"),
  },
  {
    quote:
      "Finally a roadmap the whole company actually reads. Sales stopped asking me what ships next.",
    name: "Priya Raman",
    role: "VP Product",
    company: "Halcyon",
  },
  {
    quote:
      "Onboarding a new engineer went from two weeks of Slack archaeology to a single linked doc.",
    name: "Tomás Herrera",
    role: "Staff Engineer",
    company: "Orbit",
    avatar: photo("1500648767791-00dcc994a43e"),
  },
  {
    quote:
      "It's calm software. Nothing pings unless it matters, and everything is where I expect it.",
    name: "Hannah Weiss",
    role: "Design Lead",
    company: "Kestrel",
    avatar: photo("1438761681033-6461ffad8d80"),
  },
  {
    quote:
      "We run quarterly planning for 40 teams in Acme. It scales without turning into a spreadsheet.",
    name: "Samuel Achebe",
    role: "COO",
    company: "Meridian",
  },
];

const BOTTOM_ROW: Review[] = [
  {
    quote:
      "Docs, specs and tickets finally live next to each other. Context switching is way down.",
    name: "Lena Fischer",
    role: "Product Designer",
    company: "Foxglove",
    avatar: photo("1534528741775-53994a69daeb"),
  },
  {
    quote:
      "The GitHub sync is the first one that doesn't need babysitting. It just stays correct.",
    name: "Marcus Bell",
    role: "CTO",
    company: "Tidewater",
    avatar: photo("1506794778202-cad84cf45f1d"),
  },
  {
    quote:
      "I can see what shipped, what slipped and why, in one screen, without asking anyone.",
    name: "Aiko Tanaka",
    role: "Chief of Staff",
    company: "Acme Corp",
  },
  {
    quote:
      "Our changelog went from an afterthought to something customers subscribe to. Wild.",
    name: "Nadia Haddad",
    role: "Growth Lead",
    company: "Quartzite",
    avatar: photo("1531123897727-8f129e1688ce"),
  },
  {
    quote:
      "Setup took an afternoon. The import brought over five years of issues without a hitch.",
    name: "Grace Whitfield",
    role: "Engineering Director",
    company: "Pinewood",
    avatar: photo("1580489944761-15a19d654956"),
  },
  {
    quote:
      "Keyboard-first, fast and quiet. My team stopped complaining about process tooling.",
    name: "Rafael Costa",
    role: "Tech Lead",
    company: "Solstice",
  },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

function ReviewCard({ quote, name, role, company, avatar }: Review) {
  return (
    <figure className="flex w-72 shrink-0 flex-col justify-between gap-6 rounded-2xl border bg-card p-6 text-card-foreground shadow-xs transition-colors hover:border-foreground/20 sm:w-96">
      <div>
        <div className="flex gap-0.5 text-brand" role="img" aria-label="Rated 5 out of 5">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} aria-hidden className="size-4 fill-current" />
          ))}
        </div>
        <blockquote className="mt-4 text-sm leading-relaxed text-pretty sm:text-base">
          <p>&ldquo;{quote}&rdquo;</p>
        </blockquote>
      </div>
      <figcaption className="flex items-center gap-3">
        <Avatar size="lg">
          {avatar && <AvatarImage src={avatar} alt="" />}
          <AvatarFallback className="bg-gradient-to-br from-brand-from to-brand-to text-xs font-semibold text-brand-foreground">
            {initials(name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 text-sm">
          <div className="truncate font-medium">{name}</div>
          <div className="truncate text-muted-foreground">
            {role}, {company}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

function ReviewRow({ reviews, reverse }: { reviews: Review[]; reverse?: boolean }) {
  return (
    <Marquee
      pauseOnHover
      reverse={reverse}
      repeat={2}
      className={cn(
        "py-1 [--gap:1.25rem]",
        reverse ? "[--duration:70s]" : "[--duration:60s]"
      )}
    >
      {reviews.map((review) => (
        <ReviewCard key={review.name} {...review} />
      ))}
    </Marquee>
  );
}

/**
 * Wall of love: two rows of review cards drifting in opposite directions.
 * Rows pause on hover or keyboard focus and stop entirely under
 * `prefers-reduced-motion`, where the cards wrap into a static grid.
 */
export function TestimonialsMarquee() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 -z-10 mx-auto h-72 max-w-4xl -translate-y-1/2 rounded-full bg-brand/10 blur-3xl"
      />

      <div className="mx-auto max-w-2xl text-center">
        <BlurFade>
          <p className="text-sm font-semibold text-brand">Testimonials</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            Loved by teams who ship every week
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-pretty text-muted-foreground">
            Thousands of product teams plan, build and launch with Acme. Here is
            what a few of them have to say.
          </p>
        </BlurFade>
      </div>

      <div className="-mx-6 mt-16 flex flex-col gap-5 lg:-mx-8">
        <ReviewRow reviews={TOP_ROW} />
        <ReviewRow reviews={BOTTOM_ROW} reverse />
      </div>
    </section>
  );
}
