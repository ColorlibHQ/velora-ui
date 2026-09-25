import { FollowingPointer } from "@/components/velora/following-pointer";

export default function FollowingPointerDemo() {
  return (
    <FollowingPointer
      label="Maya · Design"
      className="grid h-72 w-full max-w-xl place-items-center rounded-2xl border bg-card bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-size-[18px_18px] shadow-sm"
    >
      <div className="max-w-xs space-y-3 rounded-xl border bg-background/90 p-5 text-center shadow-sm backdrop-blur">
        <p className="text-sm font-medium">Q3 launch board</p>
        <p className="text-sm text-muted-foreground">
          Move your mouse around the canvas to see a teammate&apos;s cursor.
        </p>
        <div className="flex justify-center -space-x-2" aria-hidden>
          {["bg-brand-from", "bg-brand-via", "bg-brand-to"].map((tone) => (
            <span key={tone} className={`size-7 rounded-full ring-2 ring-background ${tone}`} />
          ))}
        </div>
      </div>
    </FollowingPointer>
  );
}
