import { FocusCards } from "@/components/velora/focus-cards";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&q=70&auto=format&fit=crop`;

const cards = [
  { title: "Forest light", src: photo("1441974231531-c6227db76b6e") },
  { title: "Canopy walk", src: photo("1447752875215-b2761acb3c5d") },
  { title: "Moraine Lake", src: photo("1493246507139-91e8fad9978e") },
  { title: "Highland morning", src: photo("1470071459604-3b5ec3a7fe05") },
  { title: "Night summit", src: photo("1485470733090-0aae1788d5af") },
  { title: "Valley of mist", src: photo("1469474968028-56623f02e42e") },
];

export default function FocusCardsDemo() {
  return <FocusCards cards={cards} className="w-full max-w-3xl" />;
}
