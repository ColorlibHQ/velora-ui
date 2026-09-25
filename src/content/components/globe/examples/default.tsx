import { Globe, type GlobeArc } from "@/components/velora/globe";

const markers = [
  { lat: 51.51, lng: -0.13, label: "London" },
  { lat: 40.71, lng: -74.01, label: "New York" },
  { lat: -23.55, lng: -46.63, label: "São Paulo" },
  { lat: 25.2, lng: 55.27, label: "Dubai" },
  { lat: 1.35, lng: 103.82, label: "Singapore" },
];

const arcs: GlobeArc[] = [
  { from: [51.51, -0.13], to: [40.71, -74.01] },
  { from: [51.51, -0.13], to: [25.2, 55.27] },
  { from: [40.71, -74.01], to: [-23.55, -46.63] },
];

export default function GlobeDemo() {
  return (
    <Globe
      markers={markers}
      arcs={arcs}
      center={[30, -25]}
      className="max-w-sm"
    />
  );
}
