import { SpotlightCard } from "@/components/velora/spotlight-card";

export default function SpotlightCardDemo() {
  return (
    <SpotlightCard className="w-full max-w-sm p-8">
      <h3 className="font-semibold">Move your cursor here</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        The glow follows the pointer across the card surface.
      </p>
    </SpotlightCard>
  );
}
