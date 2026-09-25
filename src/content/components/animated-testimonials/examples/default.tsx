import { AnimatedTestimonials } from "@/components/velora/animated-testimonials";

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

export default function AnimatedTestimonialsDemo() {
  return <AnimatedTestimonials testimonials={quotes} className="max-w-sm" />;
}
