import { ExpandableCard } from "@/components/velora/expandable-card";

export default function ExpandableCardDemo() {
  return (
    <ExpandableCard
      title="Animations with receipts"
      subtitle="Click to expand"
      media={
        <div className="h-24 w-full bg-gradient-to-br from-brand-from/30 to-brand-to/30" />
      }
    >
      Every component publishes its gzipped size and dependency count.
    </ExpandableCard>
  );
}
