import { DotPattern, GridPattern } from "@/components/velora/grid-pattern";

export default function GridPatternDemo() {
  return (
    <div className="relative flex min-h-80 w-full items-center justify-center overflow-hidden rounded-xl border bg-background">
      <GridPattern
        width={40}
        height={40}
        squares={[
          [1, 1],
          [4, 2],
          [2, 5],
          [6, 4],
          [3, 7],
        ]}
        className="fill-brand/10 stroke-border mask-[linear-gradient(to_right,black_35%,transparent_65%)]"
      />
      <DotPattern
        width={16}
        height={16}
        className="fill-muted-foreground/40 mask-[linear-gradient(to_right,transparent_35%,black_65%)]"
      />
      <div className="relative px-6 text-center">
        <p className="text-sm font-medium text-muted-foreground">
          Grid pattern · Dot pattern
        </p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance">
          Texture that stays out of the way
        </h2>
      </div>
    </div>
  );
}
