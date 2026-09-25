import { ImageSlider } from "@/components/velora/image-slider";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1600&q=70&auto=format&fit=crop`;

const images = [
  { src: photo("1600585154340-be6161a56a0c"), alt: "" },
  { src: photo("1600607687939-ce8a6c25118c"), alt: "" },
  { src: photo("1600566753190-17f0baa2a6c3"), alt: "" },
  { src: photo("1512917774080-9991f1c4c750"), alt: "" },
];

export default function ImageSliderHeroDemo() {
  return (
    <ImageSlider
      images={images}
      interval={6000}
      label="Featured homes"
      className="h-[28rem] rounded-2xl"
    >
      <div className="flex h-full flex-col items-center justify-center bg-radial from-black/40 to-transparent to-70% px-16 pb-10 text-center">
        <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium tracking-wide backdrop-blur">
          Spring collection · 42 new listings
        </span>
        <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
          Homes built around the light
        </h2>
        <p className="mt-4 max-w-md text-sm text-pretty text-white/80 sm:text-base">
          Architect-designed houses with open plans, big glass and quiet
          gardens, ready to move into this season.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href="#listings"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black shadow-sm hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Browse listings
          </a>
          <a
            href="#tour"
            className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-medium backdrop-blur hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Book a tour
          </a>
        </div>
      </div>
    </ImageSlider>
  );
}
