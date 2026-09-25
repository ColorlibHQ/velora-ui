import { AnimatedTabs } from "@/components/velora/animated-tabs";

const tabs = [
  {
    value: "design",
    title: "Design",
    heading: "Sketch in the browser",
    body: "Start from tokens, not pixels. Every colour and radius maps to a CSS variable you can re-theme later.",
  },
  {
    value: "build",
    title: "Build",
    heading: "Copy, paste, own it",
    body: "Components land in your repo as plain TSX files. No runtime package to upgrade, no black boxes.",
  },
  {
    value: "ship",
    title: "Ship",
    heading: "Fast by default",
    body: "Each component is a few kilobytes and respects reduced motion out of the box.",
  },
  {
    value: "iterate",
    title: "Iterate",
    heading: "Tweak without fear",
    body: "Props are typed and documented, so changing behaviour is a prop away rather than a rewrite.",
  },
].map((tab) => ({
  value: tab.value,
  title: tab.title,
  content: (
    <div>
      <div className="h-1.5 bg-linear-to-r from-brand-from via-brand-via to-brand-to" />
      <div className="space-y-2 p-8">
        <h3 className="text-xl font-semibold tracking-tight">{tab.heading}</h3>
        <p className="max-w-md text-sm text-muted-foreground">{tab.body}</p>
      </div>
    </div>
  ),
}));

export default function AnimatedTabsDemo() {
  return <AnimatedTabs tabs={tabs} className="max-w-xl" />;
}
