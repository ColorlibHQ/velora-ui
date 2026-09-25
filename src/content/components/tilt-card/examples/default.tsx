import { TiltCard } from "@/components/velora/tilt-card";

export default function TiltCardDemo() {
  return (
    <TiltCard className="w-full max-w-sm">
      <div className="rounded-2xl border bg-card p-8">
        <h3 className="font-semibold">Tilt me</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          3D perspective that tracks your cursor.
        </p>
      </div>
    </TiltCard>
  );
}
