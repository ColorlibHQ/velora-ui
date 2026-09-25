import { ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function BentoGrid({ className, children, ...props }: BentoGridProps) {
  return (
    <div
      data-slot="bento-grid"
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 gap-4 md:grid-cols-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  description: string;
  /** Visual filling the card behind the text (chart, image, animation…) */
  background?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  cta?: string;
}

export function BentoCard({
  name,
  description,
  background,
  icon,
  href,
  cta = "Learn more",
  className,
  ...props
}: BentoCardProps) {
  return (
    <div
      data-slot="bento-card"
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden rounded-2xl border bg-card transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/5",
        className
      )}
      {...props}
    >
      {background && (
        <div className="absolute inset-0 overflow-hidden transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
          {background}
        </div>
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent"
      />
      <div
        className={cn(
          "pointer-events-none relative z-10 flex flex-col gap-1 p-6 transition-transform duration-300 ease-out motion-reduce:transition-none",
          href &&
            "group-focus-within:-translate-y-7 group-hover:-translate-y-7 motion-reduce:-translate-y-7"
        )}
      >
        {icon && (
          <div className="mb-2 w-fit text-primary [&_svg]:size-8">{icon}</div>
        )}
        <h3 className="text-lg font-semibold text-card-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {href && (
        <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full p-6 pt-0 transition-transform duration-300 ease-out group-focus-within:translate-y-0 group-hover:translate-y-0 motion-reduce:translate-y-0">
          <a
            href={href}
            className="inline-flex items-center gap-1 rounded-sm text-sm font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {cta}
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      )}
    </div>
  );
}
