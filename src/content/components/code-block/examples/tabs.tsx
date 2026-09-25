import { CodeBlock } from "@/components/velora/code-block";

const component = `import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "success";
}

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-0.5 text-xs font-medium",
        tone === "success" && "bg-emerald-500/15 text-emerald-700",
        className
      )}
      {...props}
    />
  );
}`;

const usage = `import { Badge } from "@/components/badge";

export default function Status() {
  return <Badge tone="success">Deployed</Badge>;
}`;

export default function CodeBlockTabsDemo() {
  return (
    <CodeBlock
      className="w-full max-w-2xl"
      tabs={[
        { name: "badge.tsx", code: component, language: "tsx", highlightLines: [4, 13] },
        { name: "status.tsx", code: usage, language: "tsx", highlightLines: [4] },
      ]}
    />
  );
}
