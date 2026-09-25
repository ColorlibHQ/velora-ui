import { ParallaxGrid } from "@/components/velora/parallax-grid";

export default function ParallaxGridDemo() {
  return (
    <ParallaxGrid className="w-full max-w-xs gap-2">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="h-14 rounded-lg bg-gradient-to-br from-brand-from/25 to-brand-to/25"
        />
      ))}
    </ParallaxGrid>
  );
}
