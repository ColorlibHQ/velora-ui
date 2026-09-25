import { MorphingText } from "@/components/velora/morphing-text";

export default function MorphingTextDemo() {
  return (
    <div className="text-2xl font-semibold">
      <MorphingText texts={["Animate", "Measure", "Ship"]} />
    </div>
  );
}
