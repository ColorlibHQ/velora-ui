import { ImageSlider } from "@/components/velora/image-slider";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1600&q=70&auto=format&fit=crop`;

const images = [
  { src: photo("1506905925346-21bda4d32df4"), alt: "Mountain peaks rising above a sea of clouds" },
  { src: photo("1507525428034-b723cf961d3e"), alt: "An empty beach at golden hour" },
  { src: photo("1470071459604-3b5ec3a7fe05"), alt: "Morning fog over green highland hills" },
  { src: photo("1531366936337-7c912a4589a7"), alt: "Northern lights over a snowy ridge" },
  { src: photo("1500530855697-b586d89ba3ee"), alt: "A road winding through red rock canyons" },
];

export default function ImageSliderDemo() {
  return (
    <ImageSlider
      images={images}
      label="Landscapes"
      className="h-80 rounded-2xl sm:h-96"
    />
  );
}
