import { cn } from "@/lib/utils";

interface AvatarCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Names rendered as initials */
  people: string[];
  /** "+N" badge count */
  extra?: number;
}

const tones = [
  "bg-blue-600",
  "bg-slate-600",
  "bg-sky-700",
  "bg-indigo-600",
  "bg-slate-700",
  "bg-blue-800",
];

export function AvatarCircles({
  people,
  extra,
  className,
  ...props
}: AvatarCirclesProps) {
  return (
    <div
      data-slot="avatar-circles"
      className={cn("flex -space-x-3", className)}
      {...props}
    >
      {people.map((name, i) => {
        const initials = name
          .split(" ")
          .map((w) => w[0])
          .slice(0, 2)
          .join("");
        return (
          <span
            key={name}
            title={name}
            className={cn(
              "relative flex size-10 items-center justify-center rounded-full text-xs font-semibold text-white ring-2 ring-background",
              tones[i % tones.length]
            )}
          >
            <span aria-hidden>{initials}</span>
            <span className="sr-only">{name}</span>
          </span>
        );
      })}
      {extra ? (
        <span className="relative flex size-10 items-center justify-center rounded-full bg-muted text-xs font-semibold ring-2 ring-background">
          <span aria-hidden>
            +{extra >= 1000 ? `${Math.floor(extra / 1000)}k` : extra}
          </span>
          <span className="sr-only">
            and {extra.toLocaleString("en-US")} more
          </span>
        </span>
      ) : null}
    </div>
  );
}
