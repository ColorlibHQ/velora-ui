import { cn } from "@/lib/utils";

interface TextShimmerProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

/**
 * A soft light sweep across the text — great for "AI thinking"
 * states and subtle emphasis.
 */
export function TextShimmer({ className, children, ...props }: TextShimmerProps) {
  return (
    <span
      data-slot="text-shimmer"
      className={cn(
        "motion-safe:animate-shimmer inline-block bg-[linear-gradient(110deg,var(--color-muted-foreground)_35%,var(--color-foreground)_50%,var(--color-muted-foreground)_65%)] bg-[length:250%_100%] bg-clip-text text-transparent",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
