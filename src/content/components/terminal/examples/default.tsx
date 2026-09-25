import { Terminal } from "@/components/velora/terminal";

export default function TerminalDemo() {
  return (
    <Terminal
      className="max-w-md"
      lines={[
        "$ npx shadcn@latest add velora/marquee",
        "✔ Checking registry…",
        "✔ Installing dependencies…",
        "✔ Created components/velora/marquee.tsx",
      ]}
    />
  );
}
