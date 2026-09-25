import { codeToHtml } from "shiki";

/** Build-time syntax highlighting for docs code blocks. */
export function highlight(code: string, lang: "tsx" | "css" | "ts" = "tsx") {
  return codeToHtml(code.trimEnd(), { lang, theme: "github-dark-default" });
}
