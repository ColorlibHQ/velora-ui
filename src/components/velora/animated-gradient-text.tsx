import { cn } from "@/lib/utils";

interface AnimatedGradientTextProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export function AnimatedGradientText({
  className,
  children,
  ...props
}: AnimatedGradientTextProps) {
  return (
    <span
      data-slot="animated-gradient-text"
      className={cn(
        "motion-safe:animate-gradient inline-block bg-gradient-to-r from-brand-from via-brand-via to-brand-to bg-[length:300%_auto] bg-clip-text text-transparent",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
