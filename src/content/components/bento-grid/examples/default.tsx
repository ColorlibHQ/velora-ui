import { BentoCard, BentoGrid } from "@/components/velora/bento-grid";
import { DotPattern } from "@/components/velora/grid-pattern";
import { Meteors } from "@/components/velora/meteors";

export default function BentoGridDemo() {
  return (
    <BentoGrid className="w-full auto-rows-[11rem] grid-cols-2 gap-3">
      <BentoCard
        name="Patterns"
        description="Maskable backdrops."
        background={
          <DotPattern className="[mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        }
      />
      <BentoCard
        name="Meteors"
        description="Streaks of light."
        background={<Meteors number={6} />}
      />
    </BentoGrid>
  );
}
