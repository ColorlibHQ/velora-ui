import { LayoutGrid } from "@/components/velora/layout-grid";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&q=70&auto=format&fit=crop`;

function Story({ body, facts }: { body: string; facts: [string, string][] }) {
  return (
    <>
      <p>{body}</p>
      <dl className="grid grid-cols-3 gap-3 border-t pt-4">
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs">{label}</dt>
            <dd className="font-medium text-foreground">{value}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

const stories = [
  {
    title: "Above the clouds in the Dolomites",
    subtitle: "Italy · 6 days",
    src: photo("1506905925346-21bda4d32df4"),
    className: "md:row-span-2",
    content: (
      <Story
        body="We walked hut to hut along the Alta Via 1, starting each morning above a sea of cloud and ending each evening with polenta and a view."
        facts={[["Distance", "74 km"], ["Climb", "4,200 m"], ["Best in", "July"]]}
      />
    ),
  },
  {
    title: "Paris, slowly",
    subtitle: "France · 4 days",
    src: photo("1502602898657-3e91760cbb34"),
    className: "md:col-span-2",
    content: (
      <Story
        body="No museums, no queues — just markets, long lunches and walking the Seine from one end of the city to the other."
        facts={[["Walked", "58 km"], ["Cafés", "19"], ["Best in", "May"]]}
      />
    ),
  },
  {
    title: "Tokyo after dark",
    subtitle: "Japan · 5 days",
    src: photo("1540959733332-eab4deabeeaf"),
    content: (
      <Story
        body="Tiny bars in Golden Gai, late ramen in Shinjuku and the last train home, every night."
        facts={[["Bars", "11"], ["Ramen", "7 bowls"], ["Best in", "Nov"]]}
      />
    ),
  },
  {
    title: "Northern lights",
    subtitle: "Iceland · 3 nights",
    src: photo("1531366936337-7c912a4589a7"),
    content: (
      <Story
        body="Three nights parked by a frozen lake, checking the forecast every hour. On the last night the sky finally turned green."
        facts={[["Temp", "−14 °C"], ["Aurora", "KP 5"], ["Best in", "Feb"]]}
      />
    ),
  },
];

export default function LayoutGridTravelDemo() {
  return (
    <div className="w-full max-w-3xl">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            Field notes
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">Travel stories</h2>
        </div>
        <p className="hidden text-sm text-muted-foreground sm:block">Open a story to read more</p>
      </div>
      <LayoutGrid items={stories} className="md:auto-rows-48" />
    </div>
  );
}
