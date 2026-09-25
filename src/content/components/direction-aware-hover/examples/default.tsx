import { DirectionAwareHover } from "@/components/velora/direction-aware-hover";

export default function DirectionAwareHoverDemo() {
  return (
    <DirectionAwareHover
      className="size-44"
      overlay={<span className="font-medium">Enters from your edge</span>}
    >
      <div className="flex size-full items-center justify-center bg-muted">
        <span className="text-sm text-muted-foreground">Hover me</span>
      </div>
    </DirectionAwareHover>
  );
}
