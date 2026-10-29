// Velora Pro download — the source for every Pro block plus everything it
// imports, laid out to drop into a shadcn project's src/ folder.
//   → dist/velora-pro/ and dist/velora-pro.zip
import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = resolve(root, "dist/velora-pro");
const { version } = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));

const blocks = JSON.parse(readFileSync(resolve(root, "src/lib/blocks-meta.json"), "utf8")).filter((b) => b.pro);
const categories = JSON.parse(readFileSync(resolve(root, "src/content/block-categories.json"), "utf8")).filter((c) => c.pro);
if (!blocks.length) throw new Error("no Pro blocks — run scripts/build-docs.mjs first");

rmSync(resolve(root, "dist"), { recursive: true, force: true });
const copy = (from, to = from) => {
  mkdirSync(dirname(resolve(out, to)), { recursive: true });
  cpSync(resolve(root, "src", from), resolve(out, to), { recursive: true });
};

for (const b of blocks) copy(`components/blocks/${b.slug}.tsx`);
copy("components/charts");
copy("lib/utils.ts");

// shadcn primitives: what the blocks import, plus what the chart kit imports.
const ui = new Set(blocks.flatMap((b) => b.ui));
for (const f of readdirSync(resolve(root, "src/components/charts"))) {
  const src = readFileSync(resolve(root, "src/components/charts", f), "utf8");
  for (const [, name] of src.matchAll(/from "@\/components\/ui\/([\w-]+)"/g)) ui.add(name);
}
for (const name of ui) copy(`components/ui/${name}.tsx`);

// Theme tokens the blocks rely on, lifted from globals.css so they can't drift.
const css = readFileSync(resolve(root, "src/app/globals.css"), "utf8");
const TOKENS = /^\s*--(success|success-foreground|warning|warning-foreground|chart-[1-5]): [^;]+;$/;
const pick = (selector) => {
  const body = css.slice(css.indexOf(`${selector} {`)).split("\n}")[0];
  return body.split("\n").filter((l) => TOKENS.test(l)).join("\n");
};
mkdirSync(resolve(out, "styles"));
writeFileSync(
  resolve(out, "styles/velora-pro.css"),
  `/* Velora Pro tokens — import after your shadcn theme in globals.css:
 *   @import "./velora-pro.css";
 * Replace the values with your brand's; every block and chart follows them. */

@theme inline {
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}

:root {
${pick(":root")}
}

.dark {
${pick(".dark")}
}
`
);

const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const deps = ["radix-ui", "class-variance-authority", "clsx", "tailwind-merge", "lucide-react", "recharts", "input-otp"];
const missing = deps.filter((d) => !pkg.dependencies[d]);
if (missing.length) throw new Error(`package.json lacks ${missing.join(", ")}`);

writeFileSync(
  resolve(out, "blocks.json"),
  JSON.stringify(
    blocks.map(({ slug, title, description, category, exportName }) => ({
      slug,
      title,
      description,
      category,
      import: `import { ${exportName} } from "@/components/blocks/${slug}";`,
    })),
    null,
    2
  ) + "\n"
);

writeFileSync(
  resolve(out, "README.md"),
  `# Velora Pro ${version}

${blocks.length} application blocks for React, Tailwind CSS 4 and shadcn/ui, in ${categories.length} categories.
Previews: https://velora.colorlib.com/blocks

## Install

1. Copy \`components/\`, \`lib/\` and \`styles/\` into your project's \`src/\` folder.
   If you already have shadcn primitives in \`components/ui/\`, keep yours,
   but make sure \`badge.tsx\` has the \`success\` and \`warning\` variants from this one.
2. Install the dependencies:

   \`\`\`bash
   npm install ${deps.map((d) => `${d}@^${pkg.dependencies[d].replace(/^\^/, "")}`).join(" ")}
   \`\`\`

3. Add \`@import "./velora-pro.css";\` to your \`globals.css\` after the shadcn theme
   (adjust the path to wherever you put \`styles/\`).
4. Use any block: \`blocks.json\` lists each one with its import line.

Blocks assume the \`@/\` alias points at \`src/\`, as in a default shadcn project.
They don't depend on Next.js.

## Categories

${categories
  .map((c) => `- **${c.title}** (${blocks.filter((b) => b.category === c.slug).length}): ${c.description}`)
  .join("\n")}

## License

See LICENSE.md. Updates: download the latest zip from your dashboardpack.com account.
`
);

writeFileSync(
  resolve(out, "LICENSE.md"),
  `# Velora Pro License

Copyright (c) ${new Date().getFullYear()} Aigars Silkalns. All rights reserved.

**Personal license:** one developer. **Team license:** up to 10 developers in one organization.

You may:
- Use Velora Pro in unlimited end products for yourself or your clients, commercial or not.
- Modify the source in any way.

You may not:
- Redistribute or resell Velora Pro, in original or modified form, as a UI kit, component
  library, template, theme or starter, whether free or paid.
- Publish the source in a public repository.

Velora's free components remain MIT-licensed; this license covers only the Pro files.
The software is provided "as is", without warranty of any kind.
`
);

if (!existsSync(resolve(out, "components/ui/badge.tsx"))) throw new Error("badge.tsx missing");
execFileSync("zip", ["-qr", "velora-pro.zip", "velora-pro"], { cwd: resolve(root, "dist") });
console.log(`pro: ${blocks.length} blocks, ${ui.size} ui primitives → dist/velora-pro.zip`);
