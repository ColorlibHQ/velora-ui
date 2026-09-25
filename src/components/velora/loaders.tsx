import { cn } from "@/lib/utils";

type LoaderSize = "sm" | "md" | "lg";

interface LoaderProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Overall size: sm = 16px, md = 24px, lg = 32px */
  size?: LoaderSize;
  /** Text read by screen readers (visually hidden) */
  label?: string;
}

const box: Record<LoaderSize, string> = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
};

// Under reduced motion every loader swaps its movement for a slow fade.
const calm = "motion-reduce:animate-pulse motion-reduce:[animation-duration:2s]!";

// Shared shell: a status region with a visually hidden label.
function Shell({
  label,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { label: string }) {
  return (
    <span
      role="status"
      {...props}
      className={cn("inline-flex shrink-0 items-center justify-center", className)}
    >
      <span className="sr-only">{label}</span>
      {children}
    </span>
  );
}

/**
 * Three dots that hop in turn. Every loader in this file draws with
 * `currentColor`, so colour it with a text utility (`text-brand`).
 */
export function DotsLoader({
  size = "md",
  label = "Loading",
  className,
  ...props
}: LoaderProps) {
  const dot = { sm: "text-[6px]", md: "text-[8px]", lg: "text-[10px]" }[size];
  return (
    <Shell
      label={label}
      className={cn("items-end gap-[0.4em]", dot, className)}
      {...props}
    >
      {[0, 1, 2].map((i) => (
        // The tall wrapper hops; its height sets how far the dot travels.
        <span
          key={i}
          aria-hidden
          className={cn("flex h-[2.4em] items-end motion-safe:animate-bounce", calm)}
          style={{
            animationDuration: "0.9s",
            animationDelay: `${i * 0.15 - 0.9}s`,
          }}
        >
          <span className="size-[1em] rounded-full bg-current" />
        </span>
      ))}
    </Shell>
  );
}

/** A solid dot with a ring that ripples outwards. */
export function PulseLoader({
  size = "md",
  label = "Loading",
  className,
  ...props
}: LoaderProps) {
  return (
    <Shell label={label} className={cn("relative", box[size], className)} {...props}>
      <span
        aria-hidden
        className="absolute inset-1/4 rounded-full bg-current opacity-50 motion-safe:animate-ping motion-reduce:hidden"
      />
      <span aria-hidden className={cn("size-1/2 rounded-full bg-current", calm)} />
    </Shell>
  );
}

/** Two dots circling a faint track in opposite directions. */
export function OrbitLoader({
  size = "md",
  label = "Loading",
  className,
  ...props
}: LoaderProps) {
  const dot = "absolute top-0 left-1/2 size-1/4 -translate-x-1/2 rounded-full bg-current";
  return (
    <Shell label={label} className={cn("relative", box[size], className)} {...props}>
      <span
        aria-hidden
        className="absolute inset-[12%] rounded-full border-2 border-current opacity-20"
      />
      <span
        aria-hidden
        className={cn("absolute inset-0 motion-safe:animate-spin", calm)}
        style={{ animationDuration: "1.2s" }}
      >
        <span className={dot} />
      </span>
      <span
        aria-hidden
        className={cn("absolute inset-0 rotate-180 motion-safe:animate-spin", calm)}
        style={{ animationDuration: "1.8s", animationDirection: "reverse" }}
      >
        <span className={cn(dot, "opacity-60")} />
      </span>
    </Shell>
  );
}

/** Four bars rising and falling from a shared baseline, like a level meter. */
export function BarsLoader({
  size = "md",
  label = "Loading",
  className,
  ...props
}: LoaderProps) {
  return (
    <Shell
      label={label}
      className={cn("items-stretch gap-[12%] overflow-hidden", box[size], className)}
      {...props}
    >
      {[-0.2, -0.6, -0.4, 0].map((delay) => (
        // The shell clips each bar's foot; the bounce changes how much shows.
        <span
          key={delay}
          aria-hidden
          className={cn(
            "relative top-1/2 h-full flex-1 rounded-full bg-current motion-safe:animate-bounce motion-reduce:top-1/4",
            calm
          )}
          style={{ animationDuration: "0.8s", animationDelay: `${delay}s` }}
        />
      ))}
    </Shell>
  );
}

/** A rounded arc turning over a faint track. */
export function SpinnerLoader({
  size = "md",
  label = "Loading",
  className,
  ...props
}: LoaderProps) {
  return (
    <Shell label={label} className={cn(box[size], className)} {...props}>
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        className={cn("size-full motion-safe:animate-spin", calm)}
        style={{ animationDuration: "0.8s" }}
      >
        <circle cx="12" cy="12" r="9.5" opacity="0.2" />
        <path d="M21.5 12A9.5 9.5 0 0 0 12 2.5" strokeLinecap="round" />
      </svg>
    </Shell>
  );
}
