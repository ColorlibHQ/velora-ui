export default function FloatingNavbarDemo() {
  return (
    <div className="w-full max-w-sm">
      {/* Static preview — the real component is fixed to the viewport. */}
      <div className="flex items-center justify-between gap-4 rounded-full border bg-background/80 px-5 py-2.5 shadow-lg backdrop-blur-md">
        <span className="text-sm font-semibold">Velora</span>
        <span className="text-sm text-muted-foreground">Docs</span>
        <span className="text-sm text-muted-foreground">Pricing</span>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Hides on scroll down, returns on scroll up
      </p>
    </div>
  );
}
