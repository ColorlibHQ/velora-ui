import { Marquee3D } from "@/components/velora/3d-marquee";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&q=70&auto=format&fit=crop`;

const images = [
  "1506905925346-21bda4d32df4",
  "1441974231531-c6227db76b6e",
  "1507525428034-b723cf961d3e",
  "1493246507139-91e8fad9978e",
  "1531366936337-7c912a4589a7",
  "1470071459604-3b5ec3a7fe05",
  "1500530855697-b586d89ba3ee",
  "1518509562904-e7ef99cdcc86",
  "1469474968028-56623f02e42e",
  "1476514525535-07fb3b4ae5f1",
  "1447752875215-b2761acb3c5d",
  "1485470733090-0aae1788d5af",
].map(photo);

export default function Marquee3DDemo() {
  return <Marquee3D images={images} className="h-96 rounded-2xl" />;
}
