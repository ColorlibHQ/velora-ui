import { DraggableCard, DraggableCardContainer } from "@/components/velora/draggable-card";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=600&q=70&auto=format&fit=crop`;

const cards = [
  { title: "Moraine Lake", src: photo("1493246507139-91e8fad9978e") },
  { title: "Above the clouds", src: photo("1506905925346-21bda4d32df4") },
  { title: "Northern lights", src: photo("1531366936337-7c912a4589a7") },
  { title: "Red rock road", src: photo("1500530855697-b586d89ba3ee") },
  { title: "Forest light", src: photo("1441974231531-c6227db76b6e") },
];

export default function DraggableCardDemo() {
  return (
    <DraggableCardContainer className="h-[26rem]">
      {cards.map((card) => (
        <DraggableCard key={card.title} label={card.title} className="w-40 sm:w-48">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.src}
            alt=""
            draggable={false}
            className="pointer-events-none aspect-square w-full rounded-md object-cover"
          />
          <p className="mt-3 text-center text-sm font-medium">{card.title}</p>
        </DraggableCard>
      ))}
    </DraggableCardContainer>
  );
}
