"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  CornerDownLeftIcon,
  FileTextIcon,
  LayoutTemplateIcon,
  SearchIcon,
  ShapesIcon,
} from "lucide-react";

import { blockCategories, blocksIn, blocksMeta } from "@/lib/blocks-meta";
import { categories, componentsMeta, type ComponentMeta } from "@/lib/components-meta";

const blockGroups = blockCategories.filter((c) => blocksIn(c.slug).length);

const pages = [
  { href: "/components/get-started", title: "Get started" },
  { href: "/components", title: "All components" },
  { href: "/blocks", title: "All blocks" },
  { href: "/themes", title: "Themes" },
  { href: "/pricing", title: "Pricing" },
  { href: "/blog", title: "Blog" },
  { href: "/changelog", title: "Changelog" },
];

const itemClass =
  "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground data-[selected=true]:bg-muted data-[selected=true]:text-foreground";

const groupClass =
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground";

/** ⌘K / Ctrl+K command palette over every component and page. */
export function Search() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !isTyping(e))) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // cmdk's own filter keeps category order; rank ourselves so the best match leads.
  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return null;
    return {
      components: componentsMeta
        .map((c) => ({ c, s: score(terms, c.title, c.category, c.description) }))
        .filter((r) => r.s > 0)
        .sort((a, b) => b.s - a.s)
        .map((r) => r.c),
      blocks: [
        ...blockGroups.map((c) => ({
          href: `/blocks/${c.slug}`,
          title: c.title,
          hint: `${blocksIn(c.slug).length} blocks`,
          s: score(terms, c.title, "blocks sections", c.heading) + 1,
        })),
        ...blocksMeta.map((b) => {
          const cat = blockGroups.find((c) => c.slug === b.category)!;
          return {
            href: `/blocks/${b.category}#${b.slug}`,
            title: b.title,
            hint: cat.title,
            s: score(terms, b.title, cat.title, b.description),
          };
        }),
      ]
        .filter((r) => r.s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, 8),
      pages: pages.filter((p) => score(terms, p.title, "", "") > 0),
    };
  }, [query]);

  const changeOpen = (next: boolean) => {
    setOpen(next);
    if (!next) setQuery("");
  };

  const go = (href: string) => {
    changeOpen(false);
    router.push(href);
  };

  const componentItem = (c: ComponentMeta) => (
    <Command.Item
      key={c.slug}
      value={c.slug}
      onSelect={() => go(`/components/${c.slug}`)}
      className={itemClass}
    >
      <ShapesIcon className="size-4 shrink-0" />
      <span className="flex-1 truncate">
        <span className="text-foreground">{c.title}</span>
        <span className="ml-2 hidden text-xs sm:inline">{c.description}</span>
      </span>
      <CornerDownLeftIcon className="size-3.5 shrink-0 opacity-0 in-data-[selected=true]:opacity-100" />
    </Command.Item>
  );

  const blockItem = (b: { href: string; title: string; hint: string }) => (
    <Command.Item key={b.href} value={b.href} onSelect={() => go(b.href)} className={itemClass}>
      <LayoutTemplateIcon className="size-4 shrink-0" />
      <span className="flex-1 truncate">
        <span className="text-foreground">{b.title}</span>
        <span className="ml-2 text-xs">{b.hint}</span>
      </span>
    </Command.Item>
  );

  const pageItem = (p: (typeof pages)[number]) => (
    <Command.Item key={p.href} value={p.href} onSelect={() => go(p.href)} className={itemClass}>
      <FileTextIcon className="size-4 shrink-0" />
      <span className="flex-1 text-foreground">{p.title}</span>
    </Command.Item>
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search components"
        className="inline-flex h-8 cursor-pointer items-center gap-2 rounded-md border bg-card/60 px-2 text-sm text-muted-foreground transition-colors hover:text-foreground lg:w-56 lg:px-3"
      >
        <SearchIcon className="size-4" />
        <span className="hidden flex-1 text-left lg:inline">Search components…</span>
        <kbd className="hidden rounded border bg-muted px-1.5 font-mono text-[10px] lg:inline">
          ⌘K
        </kbd>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={changeOpen}
        label="Search components and pages"
        shouldFilter={false}
        overlayClassName="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        contentClassName="fixed top-[12vh] left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-2xl"
      >
        <div className="flex items-center gap-2 border-b px-4">
          <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
          <Command.Input
            value={query}
            onValueChange={setQuery}
            placeholder="Search components, e.g. “marquee” or “scroll”…"
            className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <Command.List className={`max-h-[60vh] overflow-y-auto p-2 ${groupClass}`}>
          <Command.Empty className="px-3 py-8 text-center text-sm text-muted-foreground">
            No components match.
          </Command.Empty>
          {results ? (
            <>
              {results.components.length > 0 && (
                <Command.Group heading="Components">
                  {results.components.map(componentItem)}
                </Command.Group>
              )}
              {results.blocks.length > 0 && (
                <Command.Group heading="Blocks">{results.blocks.map(blockItem)}</Command.Group>
              )}
              {results.pages.length > 0 && (
                <Command.Group heading="Pages">{results.pages.map(pageItem)}</Command.Group>
              )}
            </>
          ) : (
            <>
              {categories.map((category) => (
                <Command.Group key={category} heading={category}>
                  {componentsMeta.filter((c) => c.category === category).map(componentItem)}
                </Command.Group>
              ))}
              <Command.Group heading="Blocks">
                {blockGroups.map((c) =>
                  blockItem({
                    href: `/blocks/${c.slug}`,
                    title: c.title,
                    hint: `${blocksIn(c.slug).length} blocks`,
                  })
                )}
              </Command.Group>
              <Command.Group heading="Pages">{pages.map(pageItem)}</Command.Group>
            </>
          )}
        </Command.List>
      </Command.Dialog>
    </>
  );
}

/** Substring ranking: title beats category beats description. 0 = no match. */
function score(terms: string[], title: string, category: string, description: string) {
  const t = title.toLowerCase();
  const c = category.toLowerCase();
  const d = description.toLowerCase();
  let total = 0;
  for (const term of terms) {
    if (t.startsWith(term)) total += 4;
    else if (t.includes(term)) total += 3;
    else if (c.includes(term)) total += 2;
    else if (d.includes(term)) total += 1;
    else return 0;
  }
  return total;
}

function isTyping(e: KeyboardEvent) {
  const el = e.target as HTMLElement | null;
  return !!el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName));
}
