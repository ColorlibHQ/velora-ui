import { Lamp } from "@/components/velora/lamp";

export default function LampDemo() {
  return (
    <div className="w-full overflow-hidden rounded-lg [&_[data-slot=lamp]]:py-12">
      <Lamp className="[&>div:first-child]:min-h-44">
        <h3 className="text-2xl font-semibold">Lit from above</h3>
      </Lamp>
    </div>
  );
}
