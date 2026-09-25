import { BlurFade } from "@/components/velora/blur-fade";

export default function BlurFadeDemo() {
  return (
    <div className="flex gap-3">
      {[0, 0.15, 0.3].map((delay) => (
        <BlurFade key={delay} delay={delay} once={false}>
          <div className="flex size-20 items-center justify-center rounded-xl border bg-card text-sm font-medium">
            {delay}s
          </div>
        </BlurFade>
      ))}
    </div>
  );
}
