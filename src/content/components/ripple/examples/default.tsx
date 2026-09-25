import { Ripple } from "@/components/velora/ripple";

export default function RippleDemo() {
  return (
    <div className="flex h-full min-h-64 w-full items-center justify-center overflow-hidden rounded-lg relative">
      <Ripple circles={5} baseSize={90} />
      <p className="relative text-xl font-semibold">Ripple</p>
    </div>
  );
}
