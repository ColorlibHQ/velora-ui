import { FollowingPointer } from "@/components/velora/following-pointer";

const posts = [
  {
    title: "Shipping motion that respects reduced-motion users",
    tag: "Accessibility",
    date: "Sep 18, 2026",
    minutes: 6,
    cover: "from-brand-from via-brand-via to-brand-to",
  },
  {
    title: "Why our components weigh less than 3 KB",
    tag: "Performance",
    date: "Sep 4, 2026",
    minutes: 4,
    cover: "from-brand-to via-brand-via to-brand-from",
  },
  {
    title: "Theming a whole library with seven CSS variables",
    tag: "Design systems",
    date: "Aug 21, 2026",
    minutes: 8,
    cover: "from-brand-via to-brand-to",
  },
];

export default function FollowingPointerBlogGridDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      {posts.map((post) => (
        <FollowingPointer key={post.title} label="Read post" className="rounded-2xl">
          <a
            href="#"
            className="group/post flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <div
              aria-hidden
              className={`relative h-28 bg-linear-to-br ${post.cover} transition-transform duration-500 group-hover/post:scale-105 motion-reduce:transition-none`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(255_255_255/0.35),transparent_55%)]" />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
              <span className="text-xs font-medium text-primary">{post.tag}</span>
              <h3 className="text-sm leading-snug font-semibold">{post.title}</h3>
              <p className="mt-auto text-xs text-muted-foreground">
                {post.date} · {post.minutes} min read
              </p>
            </div>
          </a>
        </FollowingPointer>
      ))}
    </div>
  );
}
