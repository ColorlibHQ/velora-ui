import { AnimatedGradientText } from "@/components/velora/animated-gradient-text";
import { Typewriter } from "@/components/velora/typewriter";

export default function TypewriterDemo() {
  return (
    <p className="text-2xl font-semibold">
      Build it{" "}
      <AnimatedGradientText>
        <Typewriter words={["faster.", "smoother.", "free."]} />
      </AnimatedGradientText>
    </p>
  );
}
