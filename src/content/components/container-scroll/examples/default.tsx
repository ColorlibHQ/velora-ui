import { ContainerScroll } from "@/components/velora/container-scroll";

export default function ContainerScrollDemo() {
  return (
    <ContainerScroll className="w-full max-w-xs">
      <div className="flex h-28 items-center justify-center bg-gradient-to-br from-brand-from/20 to-brand-to/20 text-sm text-muted-foreground">
        Your screenshot
      </div>
    </ContainerScroll>
  );
}
