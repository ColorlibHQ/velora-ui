import { HoverCards } from "@/components/velora/card-hover-effect";

const items = [
  {
    title: "Quickstart",
    description: "Install the CLI and add your first component in under a minute.",
    href: "#quickstart",
  },
  {
    title: "Theming",
    description: "Re-skin every component by changing seven CSS variables.",
    href: "#theming",
  },
  {
    title: "Accessibility",
    description: "Keyboard support, reduced motion and screen reader notes for each part.",
    href: "#accessibility",
  },
  {
    title: "Registry",
    description: "Pull components straight into your codebase with the shadcn CLI.",
    href: "#registry",
  },
  {
    title: "Examples",
    description: "Copy-paste sections built from the library, ready to adapt.",
    href: "#examples",
  },
  {
    title: "Changelog",
    description: "Every release, what changed, and how to upgrade safely.",
    href: "#changelog",
  },
];

export default function HoverCardsDemo() {
  return <HoverCards items={items} className="max-w-4xl" />;
}
