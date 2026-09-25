import { AuroraBackground } from "@/components/velora/aurora-background";
import { GridPattern } from "@/components/velora/grid-pattern";
import { AvatarCircles } from "@/components/velora/avatar-circles";

/** Decorative right-hand panel for the auth screens. */
export function AuthVisual() {
  return (
    <div className="relative hidden overflow-hidden lg:block">
      <AuroraBackground intensity="medium" />
      <GridPattern
        width={48}
        height={48}
        className="fill-transparent stroke-border/40"
      />
      <div className="relative flex h-full flex-col justify-end p-12">
        <figure className="max-w-md rounded-2xl border border-border/60 bg-card/70 p-6 backdrop-blur">
          <blockquote className="text-sm leading-6 text-card-foreground">
            “We moved our whole team onto it in a week. Onboarding took an
            afternoon and nobody has asked to go back.”
          </blockquote>
          <figcaption className="mt-4 flex items-center gap-3">
            <AvatarCircles
              people={["Maya Chen"]}
              className="[&>span]:size-8 [&>span]:text-[10px]"
            />
            <div>
              <p className="text-sm font-medium">Maya Chen</p>
              <p className="text-xs text-muted-foreground">
                Example customer · Design engineer
              </p>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
