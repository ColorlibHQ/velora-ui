import { LayoutGrid } from "@/components/velora/layout-grid";

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1200&q=70&auto=format&fit=crop`;

const items = [
  {
    title: "Glasshaus",
    subtitle: "Office · Rotterdam",
    src: photo("1497366811353-6870744d04b2"),
    className: "md:col-span-2",
    content: (
      <p>
        A converted print works with a glazed sawtooth roof. Daylight reaches
        every desk, so the lights stay off until late afternoon.
      </p>
    ),
  },
  {
    title: "Harbor House",
    subtitle: "Residence · Maine",
    src: photo("1493809842364-78817add7ffb"),
    content: (
      <p>
        Cedar shingles, a deep porch and one long room facing the water. Built
        to weather salt air for the next hundred years.
      </p>
    ),
  },
  {
    title: "Atelier",
    subtitle: "Studio · Lisbon",
    src: photo("1524758631624-e2822e304c36"),
    content: (
      <p>
        A furniture maker&apos;s studio with a gallery wall that doubles as
        storage: every chair on display is also for sale.
      </p>
    ),
  },
  {
    title: "Meridian Tower",
    subtitle: "Commercial · Chicago",
    src: photo("1486406146926-c627a92ad1ab"),
    className: "md:col-span-2",
    content: (
      <p>
        Forty floors of offset glass bands that shade the floor below, cutting
        cooling loads by a third without a single external louvre.
      </p>
    ),
  },
];

export default function LayoutGridDemo() {
  return <LayoutGrid items={items} className="max-w-3xl" />;
}
