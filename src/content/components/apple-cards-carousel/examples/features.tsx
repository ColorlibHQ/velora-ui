import { CardsCarousel, CarouselCard } from "@/components/velora/apple-cards-carousel";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&q=70&auto=format&fit=crop`;

const features = [
  {
    category: "Performance",
    title: "Builds finish before your coffee cools.",
    src: photo("1517694712202-14dd9538aa97"),
    body: "A new ten-core chip and a smarter thermal design keep sustained workloads fast and the fans silent.",
    stats: [["2.1×", "faster builds"], ["10", "CPU cores"], ["0 dB", "at idle"]],
  },
  {
    category: "Continuity",
    title: "Start on your phone. Finish anywhere.",
    src: photo("1511707171634-5f897ff02aa9"),
    body: "Drafts, tabs and clipboards follow you between devices the moment you pick the next one up.",
    stats: [["1 tap", "handoff"], ["E2E", "encrypted"], ["3", "devices synced"]],
  },
  {
    category: "Health",
    title: "Gentle nudges to stand, breathe and move.",
    src: photo("1523275335684-37898b6baf30"),
    body: "Your watch notices long focus sessions and suggests a break at a natural pause, never mid-sentence.",
    stats: [["24/7", "heart rate"], ["5 min", "breathing"], ["7 days", "battery"]],
  },
  {
    category: "Audio",
    title: "Studio sound for open-plan offices.",
    src: photo("1505740420928-5e560c06d30e"),
    body: "Adaptive noise cancelling fades out chatter while keeping your own voice crisp on calls.",
    stats: [["40 h", "playback"], ["6", "microphones"], ["−35 dB", "noise"]],
  },
  {
    category: "Insights",
    title: "Your whole week, in one glance.",
    src: photo("1460925895917-afdab827c52f"),
    body: "A private weekly summary shows where your time went and which hours were your most focused.",
    stats: [["On-device", "processing"], ["Weekly", "digest"], ["0", "ads"]],
  },
];

export default function CardsCarouselFeaturesDemo() {
  return (
    <section className="w-full min-w-0 space-y-4">
      <h2 className="px-2 text-2xl font-semibold tracking-tight sm:text-3xl">
        Features you&apos;ll love.
      </h2>
      <CardsCarousel label="Features">
        {features.map(({ body, stats, ...card }) => (
          <CarouselCard key={card.title} {...card}>
            <p className="text-lg text-foreground">{body}</p>
            <dl className="grid grid-cols-3 gap-3 pt-2">
              {stats.map(([value, label]) => (
                <div
                  key={label}
                  className="flex flex-col-reverse rounded-2xl border bg-muted/50 p-4"
                >
                  <dt className="text-xs sm:text-sm">{label}</dt>
                  <dd className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <p>
              Available on every model this autumn. Learn more in the{" "}
              <a
                href="#features"
                className="rounded-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                full feature guide
              </a>
              .
            </p>
          </CarouselCard>
        ))}
      </CardsCarousel>
    </section>
  );
}
