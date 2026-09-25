import { IphoneMockup } from "@/components/velora/iphone-mockup";

export default function IphoneMockupDemo() {
  return (
    <IphoneMockup className="w-44">
      <div className="flex size-full items-center justify-center bg-gradient-to-b from-brand-from/25 to-brand-to/25 pt-10">
        <p className="text-xs text-muted-foreground">Your app here</p>
      </div>
    </IphoneMockup>
  );
}
