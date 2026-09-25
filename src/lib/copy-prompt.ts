import type { ComponentPropsDoc } from "@/lib/component-props";
import type { ComponentMeta } from "@/lib/components-meta";
import { siteConfig } from "@/lib/site-config";

/**
 * A self-contained brief an AI coding agent can act on: how to install the
 * component, a working usage example and the props it takes.
 */
export function buildCopyPrompt({
  meta,
  props,
  registryUrl,
  example,
}: {
  meta: ComponentMeta;
  props: ComponentPropsDoc | undefined;
  registryUrl: string;
  example: string;
}) {
  const propLines =
    props?.components.flatMap((c) => [
      ...(props.components.length > 1 ? [`${c.name}:`] : []),
      ...c.props.map(
        (p) =>
          `- ${p.name}${p.required ? "" : "?"}: ${p.type}` +
          (p.default ? ` = ${p.default}` : "") +
          (p.description ? ` — ${p.description}` : "")
      ),
      ...(c.extends.length ? [`- …plus every ${c.extends.join(", ")} prop`] : []),
    ]) ?? [];

  return `Add the "${meta.title}" component from Velora UI (free, MIT licensed) to this project.

${meta.description}

1. Install it with the shadcn CLI (it also installs dependencies and merges any keyframes into the global CSS):

   npx shadcn@latest add ${registryUrl}

   This creates components/velora/${meta.slug}.tsx${
     meta.dependencies.length ? ` and installs ${meta.dependencies.join(", ")}` : ""
   }. It needs Tailwind CSS v4 and the cn() helper from lib/utils (present in every shadcn/ui project).

2. Use it like this:

\`\`\`tsx
${example.trimEnd()}
\`\`\`
${propLines.length ? `\nProps:\n${propLines.join("\n")}\n` : ""}${
    meta.a11y ? `\nReduced motion: ${meta.a11y.motion}\n` : ""
  }
Docs: ${siteConfig.url}/components/${meta.slug}
`;
}
