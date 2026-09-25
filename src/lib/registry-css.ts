import fs from "node:fs";
import path from "node:path";

type CssTree = { [selector: string]: string | CssTree };

interface RegistryItem {
  name: string;
  css?: CssTree;
  cssVars?: {
    theme?: Record<string, string>;
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
}

let items: Map<string, RegistryItem> | undefined;

function registryItems() {
  if (!items) {
    const registry = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "registry.json"), "utf8")
    ) as { items: RegistryItem[] };
    items = new Map(registry.items.map((item) => [item.name, item]));
  }
  return items;
}

const block = (selector: string, decls: Record<string, string>, prefix = "") =>
  `${selector} {\n${Object.entries(decls)
    .map(([k, v]) => `  ${prefix}${k}: ${v};`)
    .join("\n")}\n}`;

function renderTree(tree: CssTree, depth = 0): string {
  const pad = "  ".repeat(depth);
  return Object.entries(tree)
    .map(([key, value]) =>
      typeof value === "string"
        ? `${pad}${key}: ${value};`
        : `${pad}${key} {\n${renderTree(value, depth + 1)}\n${pad}}`
    )
    .join("\n");
}

/**
 * The CSS a component needs when copied by hand — the same tokens and
 * keyframes the shadcn CLI merges into globals.css. Null if it needs none.
 */
export function manualCss(slug: string): string | null {
  const item = registryItems().get(slug);
  if (!item) return null;
  const parts: string[] = [];
  const { theme, light, dark } = item.cssVars ?? {};
  if (theme) parts.push(block("@theme inline", theme, "--"));
  if (light) parts.push(block(":root", light, "--"));
  if (dark) parts.push(block(".dark", dark, "--"));
  if (item.css) parts.push(renderTree(item.css));
  return parts.length ? parts.join("\n\n") + "\n" : null;
}
