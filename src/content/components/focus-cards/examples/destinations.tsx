import { FocusCards } from "@/components/velora/focus-cards";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&q=70&auto=format&fit=crop`;

const destinations = [
  { title: "Paris, France", href: "#paris", src: photo("1502602898657-3e91760cbb34") },
  { title: "Tokyo, Japan", href: "#tokyo", src: photo("1540959733332-eab4deabeeaf") },
  { title: "Venice, Italy", href: "#venice", src: photo("1523906834658-6e24ef2386f9") },
  { title: "Santorini, Greece", href: "#santorini", src: photo("1570077188670-e3a8d69ac5ff") },
];

export default function FocusCardsDestinationsDemo() {
  return (
    <section className="w-full max-w-4xl space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-primary">Trending this season</p>
          <h2 className="text-2xl font-semibold tracking-tight">Where to next?</h2>
        </div>
        <a
          href="#all"
          className="rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          All destinations →
        </a>
      </div>
      <FocusCards
        cards={destinations}
        className="grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4"
        cardClassName="aspect-[3/4]"
      />
    </section>
  );
}
