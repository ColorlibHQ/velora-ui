import { NumberTicker } from "@/components/velora/number-ticker";

export default function NumberTickerDemo() {
  return (
    <p className="text-5xl font-semibold tracking-tight">
      <NumberTicker value={12480} suffix="+" />
    </p>
  );
}
