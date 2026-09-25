import {
  BarsLoader,
  DotsLoader,
  OrbitLoader,
  PulseLoader,
  SpinnerLoader,
} from "@/components/velora/loaders";

const loaders = [
  { name: "Dots", Loader: DotsLoader },
  { name: "Pulse", Loader: PulseLoader },
  { name: "Orbit", Loader: OrbitLoader },
  { name: "Bars", Loader: BarsLoader },
  { name: "Spinner", Loader: SpinnerLoader },
];

export default function LoadersDemo() {
  return (
    <div className="grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-5">
      {loaders.map(({ name, Loader }) => (
        <div
          key={name}
          className="flex flex-col items-center gap-4 rounded-2xl border bg-card px-4 py-6"
        >
          <div className="flex h-10 items-center gap-4 text-brand">
            <Loader size="sm" />
            <Loader size="lg" />
          </div>
          <span className="text-xs font-medium text-muted-foreground">{name}</span>
        </div>
      ))}
    </div>
  );
}
