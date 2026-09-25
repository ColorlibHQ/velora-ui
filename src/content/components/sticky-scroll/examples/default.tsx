export default function StickyScrollDemo() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="flex gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-2 w-full rounded bg-foreground/80" />
          <div className="h-2 w-3/4 rounded bg-muted-foreground/30" />
          <div className="h-2 w-2/3 rounded bg-muted-foreground/30" />
        </div>
        <div className="h-20 flex-1 rounded-lg border bg-gradient-to-br from-brand-from/15 to-brand-to/15" />
      </div>
      <p className="text-xs text-muted-foreground">
        Copy scrolls; the panel stays pinned and swaps per section.
      </p>
    </div>
  );
}
