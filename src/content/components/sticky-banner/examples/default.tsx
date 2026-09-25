import { StickyBanner } from "@/components/velora/sticky-banner";

export default function StickyBannerDemo() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg border">
      <StickyBanner className="static">
        <span className="text-sm">Velora 0.4 is out — 64 components</span>
      </StickyBanner>
      <div className="h-20 bg-muted/40" />
    </div>
  );
}
