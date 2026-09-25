import {
  BarsLoader,
  DotsLoader,
  OrbitLoader,
  PulseLoader,
  SpinnerLoader,
} from "@/components/velora/loaders";

export default function LoadersInContextDemo() {
  return (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-3 rounded-2xl border bg-card p-5">
        <p className="text-sm font-medium">Buttons</p>
        <div className="flex flex-wrap gap-2">
          {/* The button text already says what is happening, so hide the loader */}
          <button
            type="button"
            disabled
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-80"
          >
            <SpinnerLoader size="sm" aria-hidden />
            Saving…
          </button>
          <button
            type="button"
            disabled
            className="inline-flex h-9 items-center gap-2 rounded-lg border px-4 text-sm font-medium text-muted-foreground"
          >
            <DotsLoader size="sm" aria-hidden />
            Syncing
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-2xl border bg-card p-5">
        <div className="flex size-10 items-center justify-center rounded-full bg-muted text-sm font-semibold">
          AL
        </div>
        <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-muted-foreground">
          <DotsLoader size="sm" label="Alex is typing" />
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-2xl border bg-card p-5">
        <BarsLoader className="text-brand" label="Uploading report" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">q3-report.pdf</p>
          <p className="text-xs text-muted-foreground">Uploading · 2.4 of 6.1 MB</p>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-2xl border bg-card p-5">
        <div>
          <p className="text-sm font-medium">Production</p>
          <p className="text-xs text-muted-foreground">api.example.com</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
          <PulseLoader size="sm" className="text-brand" aria-hidden />
          Live
        </span>
      </div>

      <div className="flex h-36 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed bg-card p-5 sm:col-span-2">
        <OrbitLoader size="lg" className="text-brand" label="Loading analytics" />
        <p className="text-sm text-muted-foreground">Crunching this week’s numbers</p>
      </div>
    </div>
  );
}
