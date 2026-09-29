"use client";

import { useEffect, useRef, useState } from "react";
import {
  ExternalLinkIcon,
  MonitorIcon,
  RotateCcwIcon,
  SmartphoneIcon,
  SparklesIcon,
  TabletIcon,
} from "lucide-react";

import { CopyButton } from "@/components/docs/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const viewports = [
  { key: "desktop", label: "Desktop", width: "100%", icon: MonitorIcon },
  { key: "tablet", label: "Tablet", width: "768px", icon: TabletIcon },
  { key: "mobile", label: "Mobile", width: "390px", icon: SmartphoneIcon },
] as const;

const toolButton =
  "inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground aria-pressed:bg-background aria-pressed:text-foreground aria-pressed:shadow-sm";

/**
 * A block rendered in an iframe, so its responsive layout reacts to the
 * preview width (Tailwind breakpoints follow the viewport, not the box).
 */
export function BlockPreview({
  src,
  registryUrl,
  title,
  code,
  highlighted,
}: {
  /** URL of the bare preview page */
  src: string;
  /** The block's shadcn registry item, for "Open in v0" */
  registryUrl: string;
  title: string;
  code: string;
  highlighted: string;
}) {
  const [viewport, setViewport] = useState<(typeof viewports)[number]["key"]>("desktop");
  const [height, setHeight] = useState(640);
  const [reloadKey, setReloadKey] = useState(0);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  // Same-origin iframe: size it to its content.
  const measure = () => {
    // Measure the block itself: <body> is min-h-full, so it never shrinks.
    const block = frameRef.current?.contentDocument?.querySelector("main");
    if (!block) return;
    observerRef.current?.disconnect();
    const update = () => setHeight(Math.max(240, Math.ceil(block.getBoundingClientRect().height)));
    observerRef.current = new ResizeObserver(update);
    observerRef.current.observe(block);
    update();
  };

  useEffect(() => {
    // The iframe may finish loading before hydration attaches onLoad.
    if (frameRef.current?.contentDocument?.readyState === "complete") measure();
    return () => observerRef.current?.disconnect();
  }, [reloadKey]);

  const width = viewports.find((v) => v.key === viewport)!.width;

  return (
    <Tabs defaultValue="preview" className="gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <TabsList>
          <TabsTrigger value="preview" className="px-3">
            Preview
          </TabsTrigger>
          <TabsTrigger value="code" className="px-3">
            Code
          </TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-1.5">
          <div
            role="group"
            aria-label="Preview width"
            className="hidden items-center gap-0.5 rounded-lg bg-muted p-0.5 md:flex"
          >
            {viewports.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                aria-pressed={viewport === key}
                aria-label={label}
                title={label}
                onClick={() => setViewport(key)}
                className={toolButton}
              >
                <Icon className="size-4" />
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label={`Reload ${title} preview`}
            title="Reload"
            onClick={() => setReloadKey((k) => k + 1)}
            className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md border bg-card text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcwIcon className="size-4" />
          </button>
          <a
            href={src}
            target="_blank"
            rel="noopener"
            aria-label={`Open ${title} in a new tab`}
            title="Open in a new tab"
            className="inline-flex size-8 items-center justify-center rounded-md border bg-card text-muted-foreground transition-colors hover:text-foreground"
          >
            <ExternalLinkIcon className="size-4" />
          </a>
          <a
            href={`https://v0.app/chat/api/open?url=${encodeURIComponent(registryUrl)}`}
            target="_blank"
            rel="noopener"
            aria-label={`Open ${title} in v0`}
            className="inline-flex h-8 items-center gap-1.5 rounded-md border bg-card px-2.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <SparklesIcon className="size-3.5" aria-hidden />
            Open in v0
          </a>
          <CopyButton text={code} label={`Copy ${title} code`} />
        </div>
      </div>

      <TabsContent value="preview" forceMount className="data-[state=inactive]:hidden">
        <div className="overflow-hidden rounded-2xl border bg-muted/30">
          <iframe
            key={reloadKey}
            ref={frameRef}
            src={src}
            title={`${title} preview`}
            loading="lazy"
            onLoad={measure}
            style={{ width, height }}
            className={cn(
              "mx-auto block max-w-full bg-background transition-[width] duration-300 motion-reduce:transition-none",
              viewport !== "desktop" && "border-x"
            )}
          />
        </div>
      </TabsContent>
      <TabsContent value="code">
        <div
          className="overflow-x-auto rounded-2xl border text-sm [&_pre]:max-h-[36rem] [&_pre]:overflow-auto [&_pre]:p-5"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </TabsContent>
    </Tabs>
  );
}
