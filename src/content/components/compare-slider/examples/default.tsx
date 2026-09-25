import { CompareSlider } from "@/components/velora/compare-slider";

export default function CompareSliderDemo() {
  return (
    <CompareSlider
      className="max-w-sm"
      before={
        <div className="flex size-full items-center justify-center bg-neutral-900 text-sm text-white">
          Before
        </div>
      }
      after={
        <div className="flex size-full items-center justify-center bg-gradient-to-br from-brand-from to-brand-to text-sm text-white">
          After
        </div>
      }
    />
  );
}
