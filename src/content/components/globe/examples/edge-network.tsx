import { Globe, type GlobeArc } from "@/components/velora/globe";

const origin: [number, number] = [50.11, 8.68]; // Frankfurt

const edges: [number, number][] = [
  [51.51, -0.13],
  [40.71, -74.01],
  [37.77, -122.42],
  [-23.55, -46.63],
  [19.08, 72.88],
  [1.35, 103.82],
  [35.68, 139.69],
  [-33.87, 151.21],
  [6.52, 3.38],
  [59.33, 18.07],
];

const markers = edges.map(([lat, lng]) => ({ lat, lng }));
const arcs: GlobeArc[] = edges.slice(0, 7).map((to) => ({ from: origin, to }));

const stats = [
  { value: "310+", label: "Edge cities" },
  { value: "< 50 ms", label: "To 95% of users" },
  { value: "99.99%", label: "Uptime SLA" },
];

export default function GlobeEdgeNetworkDemo() {
  return (
    <section className="grid w-full items-center gap-8 md:grid-cols-2">
      <div className="space-y-5">
        <p className="text-sm font-medium text-brand">Global edge network</p>
        <h2 className="text-3xl font-semibold tracking-tight text-balance">
          Served from the city next door, wherever that is.
        </h2>
        <p className="text-muted-foreground">
          Deploy once and every request is answered by the closest edge,
          with origin traffic routed over our private backbone.
        </p>
        <dl className="grid grid-cols-3 gap-4 border-t pt-5">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-xs text-muted-foreground">{s.label}</dt>
              <dd className="mt-1 text-xl font-semibold tabular-nums">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <Globe
        markers={markers}
        arcs={arcs}
        center={[35, 20]}
        speed={4}
        label="Globe showing 10 edge locations connected to the Frankfurt origin"
        className="max-w-md"
      />
    </section>
  );
}
