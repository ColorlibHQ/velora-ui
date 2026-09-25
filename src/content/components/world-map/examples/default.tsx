import { WorldMap, type WorldMapArc } from "@/components/velora/world-map";

const markers = [
  { lat: 37.77, lng: -122.42, label: "San Francisco", pulse: true },
  { lat: 40.71, lng: -74.01 },
  { lat: 51.51, lng: -0.13 },
  { lat: -23.55, lng: -46.63 },
  { lat: 1.35, lng: 103.82 },
  { lat: 35.68, lng: 139.69 },
];

const arcs: WorldMapArc[] = [
  { from: [37.77, -122.42], to: [40.71, -74.01] },
  { from: [37.77, -122.42], to: [-23.55, -46.63] },
  { from: [40.71, -74.01], to: [51.51, -0.13] },
  { from: [51.51, -0.13], to: [1.35, 103.82] },
  { from: [1.35, 103.82], to: [35.68, 139.69] },
];

export default function WorldMapDemo() {
  return <WorldMap markers={markers} arcs={arcs} className="max-w-3xl" />;
}
