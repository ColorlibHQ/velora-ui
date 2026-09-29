import { Lamp } from "@/components/velora/lamp";

export default function LampDemo() {
  return (
    <div className="w-full overflow-hidden rounded-xl border bg-background">
      {/* The mask fades the light cones out at the sides and bottom, so the
          glow reads as a beam at any width instead of a solid block. */}
      <Lamp className="py-10 [&>div:first-child]:min-h-52 [&>div:first-child]:mask-[radial-gradient(ellipse_70%_75%_at_50%_25%,black_45%,transparent)]">
        <h2 className="text-3xl font-semibold tracking-tight text-balance">
          Lit from above
        </h2>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground text-balance">
          A glowing lamp line that opens as the section scrolls in.
        </p>
      </Lamp>
    </div>
  );
}
