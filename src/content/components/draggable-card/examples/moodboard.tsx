import { DraggableCard, DraggableCardContainer } from "@/components/velora/draggable-card";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=600&q=70&auto=format&fit=crop`;

const pins = [
  { caption: "Warm oak, soft linen", note: "Living room", src: photo("1586023492125-27b2c045efd7") },
  { caption: "Morning light", note: "Bedroom", src: photo("1522708323590-d24dbb6b0267") },
  { caption: "Terracotta & sage", note: "Palette", src: photo("1555041469-a586c61ea9bc") },
  { caption: "Open shelving", note: "Kitchen", src: photo("1556909114-f6e7ad7d3136") },
  { caption: "Arched doorways", note: "Details", src: photo("1600607687939-ce8a6c25118c") },
  { caption: "A reading nook", note: "Study", src: photo("1524758631624-e2822e304c36") },
];

export default function DraggableCardMoodboardDemo() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border bg-muted/40 bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] bg-size-[18px_18px]">
      <div className="flex items-baseline justify-between px-5 pt-4">
        <h3 className="text-sm font-semibold">Cabin refresh — moodboard</h3>
        <p className="text-xs text-muted-foreground">Drag to rearrange</p>
      </div>
      <DraggableCardContainer className="h-[28rem]">
        {pins.map((pin) => (
          <DraggableCard key={pin.caption} label={`${pin.caption}, ${pin.note}`} className="w-36 sm:w-44">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pin.src}
              alt=""
              draggable={false}
              className="pointer-events-none aspect-[4/5] w-full rounded-md object-cover"
            />
            <p className="mt-2.5 text-sm font-medium leading-snug">{pin.caption}</p>
            <p className="text-xs text-muted-foreground">{pin.note}</p>
          </DraggableCard>
        ))}
      </DraggableCardContainer>
    </div>
  );
}
