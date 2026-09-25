import { BorderBeam } from "@/components/velora/border-beam";

export default function BorderBeamDemo() {
  return (
    <div className="relative flex h-40 w-full max-w-sm items-center justify-center rounded-2xl border bg-card">
      <BorderBeam size={64} duration={6} />
      <p className="text-sm text-muted-foreground">&lt;BorderBeam /&gt;</p>
    </div>
  );
}
