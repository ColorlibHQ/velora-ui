import { ShootingStars, StarsBackground } from "@/components/velora/shooting-stars";

export default function ShootingStarsDemo() {
  return (
    <div className="relative flex min-h-80 w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-background to-brand-from/10">
      <StarsBackground className="text-brand-from dark:text-white" />
      <ShootingStars />
      <p className="relative text-3xl font-semibold tracking-tight">Make a wish</p>
    </div>
  );
}
