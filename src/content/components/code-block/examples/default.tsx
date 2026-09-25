import { CodeBlock } from "@/components/velora/code-block";

const code = `import { useState } from "react";

// A counter that remembers its last value
export function Counter({ start = 0 }: { start?: number }) {
  const [count, setCount] = useState(start);
  const label = \`Clicked \${count} times\`;

  return (
    <button type="button" onClick={() => setCount(count + 1)}>
      {label}
    </button>
  );
}`;

export default function CodeBlockDemo() {
  return (
    <CodeBlock
      filename="counter.tsx"
      language="tsx"
      code={code}
      highlightLines={[5, 9]}
      className="w-full max-w-2xl"
    />
  );
}
