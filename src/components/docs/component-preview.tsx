"use client";

import { useRef, useState } from "react";
import { ExpandIcon, RotateCcwIcon } from "lucide-react";

import { CopyButton } from "@/components/docs/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const toolButton =
  "inline-flex size-8 cursor-pointer items-center justify-center rounded-md border bg-card text-muted-foreground transition-colors hover:text-foreground";

/**
 * Preview / Code tabs for one example. The demo renders on the server and
 * arrives as `children`; the code is pre-highlighted HTML.
 */
export function ComponentPreview({
  children,
  code,
  highlighted,
  title,
  className,
}: {
  children: React.ReactNode;
  code: string;
  highlighted: string;
  title: string;
  className?: string;
}) {
  const [replayKey, setReplayKey] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);

  return (
    <Tabs defaultValue="preview" className={cn("gap-3", className)}>
      <div className="flex items-center justify-between gap-2">
        <TabsList>
          <TabsTrigger value="preview" className="px-3">
            Preview
          </TabsTrigger>
          <TabsTrigger value="code" className="px-3">
            Code
          </TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className={toolButton}
            aria-label={`Replay ${title} animation`}
            title="Replay"
            onClick={() => setReplayKey((k) => k + 1)}
          >
            <RotateCcwIcon className="size-4" />
          </button>
          <button
            type="button"
            className={toolButton}
            aria-label={`Show ${title} full screen`}
            title="Full screen"
            onClick={() => stageRef.current?.requestFullscreen?.()}
          >
            <ExpandIcon className="size-4" />
          </button>
          <CopyButton text={code} label={`Copy ${title} example code`} />
        </div>
      </div>

      <TabsContent value="preview" forceMount className="data-[state=inactive]:hidden">
        <div
          ref={stageRef}
          className="relative flex min-h-80 items-center justify-center overflow-hidden rounded-2xl border bg-background p-8 fullscreen:min-h-svh"
        >
          <div key={replayKey} className="contents">
            {children}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="code">
        <div
          className="overflow-x-auto rounded-2xl border text-sm [&_pre]:max-h-[32rem] [&_pre]:overflow-auto [&_pre]:p-5"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </TabsContent>
    </Tabs>
  );
}
