import { cn } from "@/lib/utils";

/** A 1440×900 demo screenshot in a browser frame; shows the dark capture in dark mode when there is one. */
export function TemplateShot({
  slug,
  file,
  alt,
  dark = false,
  priority = false,
  className,
}: {
  slug: string;
  file: string;
  alt: string;
  /** A `<file>-dark.jpg` capture exists */
  dark?: boolean;
  priority?: boolean;
  className?: string;
}) {
  const img = "block h-auto w-full";
  const loading = priority ? "eager" : "lazy";
  return (
    <div className={cn("overflow-hidden rounded-xl border bg-background shadow-sm", className)}>
      <div className="flex items-center gap-1.5 border-b px-3 py-2" aria-hidden>
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
        <span className="size-2.5 rounded-full bg-muted-foreground/30" />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized captures */}
      <img src={`/templates/${slug}/${file}.jpg`} alt={alt} width={1440} height={900} loading={loading} className={cn(img, dark && "dark:hidden")} />
      {dark && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/templates/${slug}/${file}-dark.jpg`} alt={alt} width={1440} height={900} loading={loading} className={cn(img, "hidden dark:block")} />
      )}
    </div>
  );
}
