import { VanishInput } from "@/components/velora/vanish-input";

export default function VanishInputDemo() {
  return (
    <VanishInput
      className="max-w-xs"
      placeholders={[
        "Search components…",
        "Try 'border beam'",
        "Try 'bento grid'",
      ]}
    />
  );
}
