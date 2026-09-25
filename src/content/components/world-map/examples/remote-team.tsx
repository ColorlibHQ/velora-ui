import { WorldMap, type WorldMapArc } from "@/components/velora/world-map";

const team = [
  { name: "Maya Chen", city: "Toronto", lat: 43.65, lng: -79.38, utc: "UTC−4" },
  { name: "Leo Ortiz", city: "Mexico City", lat: 19.43, lng: -99.13, utc: "UTC−6" },
  { name: "Ines Moreau", city: "Lisbon", lat: 38.72, lng: -9.14, utc: "UTC+1" },
  { name: "Tomas Berg", city: "Berlin", lat: 52.52, lng: 13.4, utc: "UTC+2" },
  { name: "Aarav Shah", city: "Bengaluru", lat: 12.97, lng: 77.59, utc: "UTC+5:30" },
  { name: "Hana Sato", city: "Tokyo", lat: 35.68, lng: 139.69, utc: "UTC+9" },
];

const hq = team[3];
const markers = team.map((m) => ({
  lat: m.lat,
  lng: m.lng,
  label: m.city,
  pulse: m === hq,
}));
const arcs: WorldMapArc[] = team
  .filter((m) => m !== hq)
  .map((m) => ({ from: [hq.lat, hq.lng], to: [m.lat, m.lng] }));

export default function WorldMapRemoteTeamDemo() {
  return (
    <div className="w-full max-w-2xl rounded-2xl border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">Design team</h3>
          <p className="text-sm text-muted-foreground">
            6 people across 6 timezones, HQ in Berlin
          </p>
        </div>
        <span className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand">
          4 online
        </span>
      </div>
      <WorldMap markers={markers} arcs={arcs} className="mt-8" />
      <ul className="mt-5 grid grid-cols-2 gap-3 border-t pt-5 sm:grid-cols-3">
        {team.map((m) => (
          <li key={m.name} className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="grid size-8 shrink-0 place-items-center rounded-full bg-linear-to-br from-brand-from to-brand-to text-xs font-semibold text-brand-foreground"
            >
              {m.name
                .split(" ")
                .map((p) => p[0])
                .join("")}
            </span>
            <span className="min-w-0 text-sm leading-tight">
              <span className="block truncate font-medium">{m.name}</span>
              <span className="text-xs text-muted-foreground">
                {m.city} · {m.utc}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
