import { Lens } from "@/components/velora/lens";

export default function LensDemo() {
  return (
    <Lens className="aspect-[4/3] w-full max-w-lg shadow-lg">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=75&auto=format&fit=crop"
        alt="Close-up of a circuit board covered in chips and components"
        className="size-full object-cover"
      />
    </Lens>
  );
}
