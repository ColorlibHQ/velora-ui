"use client";

import { useId, useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

export interface CodeFile {
  name: string;
  code: string;
  language?: string;
  highlightLines?: number[];
}

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Source to show (ignored when `tabs` is set) */
  code?: string;
  /** Language for highlighting: tsx, ts, jsx, js, css, bash, json */
  language?: string;
  /** File name shown in the header and used as the code region's label */
  filename?: string;
  /** Several files, shown as tabs */
  tabs?: CodeFile[];
  /** 1-based line numbers to highlight */
  highlightLines?: number[];
  /** Show the line-number gutter */
  lineNumbers?: boolean;
}

const ring = "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

// Token colours, readable on bg-card in both themes
const C: Record<string, string> = {
  c: "text-muted-foreground italic",
  s: "text-emerald-700 dark:text-emerald-400",
  t: "text-sky-700 dark:text-sky-400",
  a: "text-violet-700 dark:text-violet-300",
  k: "text-rose-700 dark:text-rose-400",
  n: "text-amber-700 dark:text-amber-300",
  f: "text-blue-700 dark:text-blue-400",
  p: "text-muted-foreground",
};

const KW =
  "as|async|await|break|case|catch|class|const|default|do|else|export|extends|false|for|from|function|if|import|in|interface|let|new|null|of|return|switch|this|throw|true|try|type|typeof|undefined|var|while|then|fi|done|esac";

// [class, pattern]: the first alternative that matches wins
function rules(lang: string): [string, string][] {
  const sh = /sh/.test(lang);
  const css = /css$/.test(lang);
  const r: [string, string | false][] = [
    ["c", sh ? "#.*" : "//.*|/\\*[\\s\\S]*?\\*/"],
    ["s", "\"(?:\\\\.|[^\"\\\\\\n])*\"|'(?:\\\\.|[^'\\\\\\n])*'|`(?:\\\\.|[^`\\\\])*`"],
    ["t", /sx|html/.test(lang) && "</?[A-Za-z][\\w.:-]*"],
    ["a", sh ? "(?<=\\s)--?[\\w-]+" : css ? "^\\s*[\\w-]+(?=\\s*:[^{\\n]*$)" : "[\\w-]+(?==[\"'{])"],
    ["k", css ? "@[\\w-]+|!important" : `\\b(?:${KW})\\b`],
    ["n", "\\b\\d+(?:\\.\\d+)?[a-z%]*"],
    ["f", sh ? "(?<=^[$\\s]*|[|&;]\\s*)[\\w./@-]+" : "[A-Za-z_$][\\w$-]*(?=\\()"],
    ["t", !sh && !css && "\\b[A-Z][\\w$]*"],
    ["p", !sh && "[{}()[\\];,.<>/=+*!&|?:-]+"],
  ];
  return r.filter((x): x is [string, string] => !!x[1]);
}

function highlight(code: string, lang: string) {
  const list = rules(lang);
  const re = new RegExp(list.map(([, s]) => `(${s})`).join("|"), "gm");
  const lines: React.ReactNode[][] = [[]];
  let key = 0;
  const push = (text: string, cls?: string) =>
    text.split("\n").forEach((part, i) => {
      if (i) lines.push([]);
      if (part) lines.at(-1)!.push(cls ? <span key={key++} className={C[cls]}>{part}</span> : part);
    });
  let last = 0;
  for (const m of code.matchAll(re)) {
    push(code.slice(last, m.index));
    push(m[0], list[m.findIndex((g, i) => i && g !== undefined) - 1][0]);
    last = m.index + m[0].length;
  }
  push(code.slice(last));
  return lines;
}

/**
 * Code panel with a file name or tabs, line numbers, highlighted lines and a
 * copy button. A tiny built-in tokenizer colours the code — no dependency.
 */
export function CodeBlock({
  code = "",
  language = "tsx",
  filename,
  tabs,
  highlightLines = [],
  lineNumbers = true,
  className,
  ...props
}: CodeBlockProps) {
  const id = useId();
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const file: CodeFile = tabs?.[active] ?? { name: filename ?? "", code, language, highlightLines };
  const lang = file.language ?? language;
  const source = file.code.replace(/\n$/, "");
  const lines = useMemo(() => highlight(source, lang), [source, lang]);
  const marked = new Set(file.highlightLines ?? highlightLines);

  const copy = () =>
    navigator.clipboard.writeText(source).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const n = tabs!.length;
    const i = { ArrowRight: active + 1, ArrowLeft: active + n - 1, Home: 0, End: n - 1 }[e.key];
    if (i == null) return;
    e.preventDefault();
    setActive(i % n);
    (e.currentTarget.children[i % n] as HTMLElement).focus();
  };

  return (
    <div
      {...props}
      data-slot="code-block"
      className={cn("overflow-hidden rounded-xl border bg-card text-card-foreground", className)}
    >
      <div className="flex min-h-11 items-center gap-2 border-b bg-muted/50 pr-2 pl-4">
        {tabs ? (
          <div role="tablist" aria-label="Files" onKeyDown={onKeyDown} className="-ml-2 flex min-w-0 gap-1 self-stretch overflow-x-auto">
            {tabs.map((t, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                id={`${id}t${i}`}
                aria-selected={i == active}
                aria-controls={`${id}p`}
                tabIndex={i == active ? 0 : -1}
                onClick={() => setActive(i)}
                className={cn("shrink-0 border-b-2 border-transparent px-2 font-mono text-xs text-muted-foreground hover:text-foreground focus-visible:ring-inset aria-selected:border-brand aria-selected:text-foreground", ring)}
              >
                {t.name}
              </button>
            ))}
          </div>
        ) : (
          <span className="truncate font-mono text-xs text-muted-foreground">{filename}</span>
        )}
        <span className="ml-auto rounded-md border bg-background px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground uppercase">
          {lang}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label="Copy code"
          className={cn("grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-background hover:text-foreground", ring)}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
        <span role="status" className="sr-only">
          {copied && "Copied to clipboard"}
        </span>
      </div>
      <div
        role={tabs && "tabpanel"}
        id={`${id}p`}
        aria-labelledby={tabs && `${id}t${active}`}
      >
        <pre
          tabIndex={0}
          aria-label={file.name || `${lang} code`}
          className={cn("overflow-x-auto py-4 font-mono text-[13px] leading-6 focus-visible:ring-inset", ring)}
        >
          <code className="grid w-max min-w-full">
            {lines.map((tokens, i) => (
              <span
                key={i}
                className={cn(
                  "px-4",
                  marked.has(i + 1) && "bg-brand/10 shadow-[inset_2px_0_0_var(--brand)]"
                )}
              >
                {lineNumbers && (
                  <span
                    aria-hidden
                    style={{ width: `${String(lines.length).length}ch` }}
                    className="mr-5 inline-block text-right text-muted-foreground/60 select-none"
                  >
                    {i + 1}
                  </span>
                )}
                {tokens.length ? tokens : " "}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
