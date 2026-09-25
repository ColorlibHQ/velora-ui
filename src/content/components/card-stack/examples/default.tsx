import { CardStack } from "@/components/velora/card-stack";

const quotes = [
  {
    quote:
      "Swapped three separate animation libraries for Velora and the bundle got smaller.",
    name: "Dana Whitfield",
    role: "Staff engineer, Corvine",
  },
  {
    quote:
      "The size on every docs page is the reason we shipped it without a review meeting.",
    name: "Marco Elias",
    role: "Design engineer, Halyard",
  },
  {
    quote: "Reduced-motion worked out of the box. That never happens.",
    name: "Priya Raman",
    role: "Accessibility lead, Northbeam",
  },
];

export default function CardStackDemo() {
  return (
    <CardStack
      className="h-44 max-w-xs"
      offset={10}
      items={quotes.map((q) => ({
        id: q.name,
        content: (
          <>
            <p className="text-sm leading-relaxed">&ldquo;{q.quote}&rdquo;</p>
            <p className="text-xs text-muted-foreground">{q.name}</p>
          </>
        ),
      }))}
    />
  );
}
