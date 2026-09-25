import { CardsCarousel, CarouselCard } from "@/components/velora/apple-cards-carousel";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&q=70&auto=format&fit=crop`;

const stories = [
  { category: "Photo essay", title: "A week above the clouds", src: photo("1506905925346-21bda4d32df4") },
  { category: "Lakes", title: "Rowing out before sunrise", src: photo("1476514525535-07fb3b4ae5f1") },
  { category: "Night skies", title: "Chasing the northern lights", src: photo("1531366936337-7c912a4589a7") },
  { category: "Road trip", title: "Four hundred miles of red rock", src: photo("1500530855697-b586d89ba3ee") },
  { category: "Islands", title: "Where the lagoon turns turquoise", src: photo("1518509562904-e7ef99cdcc86") },
  { category: "Coastline", title: "Golden hour on an empty beach", src: photo("1507525428034-b723cf961d3e") },
];

export default function CardsCarouselDemo() {
  return (
    <CardsCarousel label="Field notes">
      {stories.map((story) => (
        <CarouselCard key={story.title} {...story}>
          <p>
            <strong className="font-medium text-foreground">{story.title}.</strong>{" "}
            We packed light, left the itinerary loose and let the weather decide
            where to go next. These are the moments that made the trip.
          </p>
          <p>
            Every photo was shot handheld on a single prime lens, then edited
            only for exposure — what you see is what we saw.
          </p>
        </CarouselCard>
      ))}
    </CardsCarousel>
  );
}
