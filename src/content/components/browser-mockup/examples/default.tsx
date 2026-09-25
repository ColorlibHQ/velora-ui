import { BrowserMockup } from "@/components/velora/browser-mockup";

export default function BrowserMockupDemo() {
  return (
    <BrowserMockup url="velora.dev" className="w-full max-w-md">
      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-brand-from/20 via-brand-via/15 to-brand-to/20">
        <p className="text-sm text-muted-foreground">Your product here</p>
      </div>
    </BrowserMockup>
  );
}
