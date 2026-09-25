import { GlareCard } from "@/components/velora/glare-card";

export default function GlareCardDemo() {
  return (
    <GlareCard className="w-full max-w-xs">
      <h3 className="font-medium">Glare Card</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Move the cursor across this card.
      </p>
    </GlareCard>
  );
}
