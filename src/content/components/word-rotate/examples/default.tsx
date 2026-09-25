import { WordRotate } from "@/components/velora/word-rotate";

export default function WordRotateDemo() {
  return (
    <p className="text-2xl font-semibold">
      Build{" "}
      <WordRotate
        words={["faster", "lighter", "calmer"]}
        className="text-brand"
      />
    </p>
  );
}
