import { TracingBeam } from "@/components/velora/tracing-beam";

export default function TracingBeamDemo() {
  return (
    <TracingBeam className="max-w-xs pl-6">
      <div className="space-y-2">
        <div className="h-2 w-full rounded bg-muted-foreground/25" />
        <div className="h-2 w-4/5 rounded bg-muted-foreground/25" />
        <div className="h-2 w-3/5 rounded bg-muted-foreground/25" />
        <p className="pt-2 text-xs text-muted-foreground">
          The beam draws as you read.
        </p>
      </div>
    </TracingBeam>
  );
}
