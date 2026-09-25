import { DotPattern, GridPattern } from "@/components/velora/grid-pattern";

export default function GridPatternDemo() {
  return (
    <div className="relative flex h-full min-h-64 w-full items-center justify-center overflow-hidden rounded-lg">
      <GridPattern
        width={36}
        height={36}
        className="fill-transparent stroke-border [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"
      />
      <DotPattern className="[mask-image:radial-gradient(ellipse_at_center,black,transparent_55%)]" />
      <p className="relative text-xl font-semibold">Patterns</p>
    </div>
  );
}
