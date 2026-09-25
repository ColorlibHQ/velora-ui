import { FlipWords } from "@/components/velora/flip-words";

export default function FlipWordsDemo() {
  return (
    <p className="text-2xl font-semibold">
      Make it{" "}
      <FlipWords
        words={["modern", "animated", "accessible"]}
        className="text-primary"
      />
    </p>
  );
}
