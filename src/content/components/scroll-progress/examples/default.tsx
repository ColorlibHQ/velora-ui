export default function ScrollProgressDemo() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="h-1 w-2/3 rounded-full bg-gradient-to-r from-brand-from via-brand-via to-brand-to" />
      <p className="text-sm text-muted-foreground">
        A live one is running at the top of this page — scroll to see it fill.
      </p>
    </div>
  );
}
