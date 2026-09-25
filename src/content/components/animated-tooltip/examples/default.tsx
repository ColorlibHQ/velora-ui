import { AnimatedTooltip } from "@/components/velora/animated-tooltip";

export default function AnimatedTooltipDemo() {
  return (
    <AnimatedTooltip
      items={[
        { name: "Maya Chen", role: "Design engineer" },
        { name: "Tom Okafor", role: "Frontend lead" },
        { name: "Sofia Lindqvist", role: "Indie hacker" },
        { name: "Dan Romero", role: "CTO" },
      ]}
    />
  );
}
