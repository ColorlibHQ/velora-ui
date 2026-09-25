import { ArrowRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ResizableNavbar } from "@/components/velora/resizable-navbar";

const BRAND = "Lumen";

const LINKS = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Customers", href: "#customers" },
  { label: "Changelog", href: "#changelog" },
];

function Logo() {
  return (
    <a
      href="#"
      className="flex items-center gap-2 rounded-full pr-1 text-[0.95rem] font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span
        aria-hidden
        className="grid size-7 place-items-center rounded-lg bg-linear-to-br from-brand-from via-brand-via to-brand-to text-brand-foreground shadow-sm shadow-brand/30"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="size-4">
          <circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none" />
          <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M6 18l1.4-1.4M16.6 7.4 18 6" />
        </svg>
      </span>
      {BRAND}
    </a>
  );
}

/**
 * Full-width navbar that shrinks into a centred, blurred pill once the page
 * scrolls, with sign-in and sign-up actions. Below a 48rem container width
 * the links fold into a disclosure menu. The faded page underneath is
 * placeholder content — delete it and drop the navbar into your layout.
 */
export function NavbarFloating() {
  return (
    <div className="relative isolate overflow-x-clip">
      {/* Soft brand glow at the top of the page */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-144 bg-radial-[ellipse_at_50%_0%] from-brand/15 via-brand/5 via-40% to-transparent to-70%"
      />

      <ResizableNavbar
        items={LINKS}
        logo={<Logo />}
        className="pt-3"
        cta={
          <div className="grid grid-cols-2 gap-2 @3xl/navbar:flex @3xl/navbar:items-center @3xl/navbar:gap-1">
            <Button variant="ghost" className="h-9 rounded-full px-4 @max-3xl/navbar:border-border" asChild>
              <a href="#">Sign in</a>
            </Button>
            <Button className="h-9 rounded-full px-4" asChild>
              <a href="#">
                Get started <ArrowRightIcon data-icon="inline-end" />
              </a>
            </Button>
          </div>
        }
      />

      {/* Placeholder page content, so there is something to scroll past */}
      <div aria-hidden className="px-6 pt-20 pb-24 sm:pt-28 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <div className="h-7 w-48 rounded-full border bg-background/60" />
          <div className="mt-8 h-10 w-full max-w-xl rounded-xl bg-muted sm:h-14" />
          <div className="mt-3 h-10 w-4/5 max-w-md rounded-xl bg-muted sm:h-14" />
          <div className="mt-8 h-3 w-full max-w-lg rounded-full bg-muted/70" />
          <div className="mt-3 h-3 w-3/4 max-w-sm rounded-full bg-muted/70" />
          <div className="mt-10 flex gap-3">
            <div className="h-10 w-32 rounded-full bg-primary/25" />
            <div className="h-10 w-28 rounded-full border bg-background/60" />
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-5xl rounded-2xl border bg-card/60 p-2 shadow-2xl shadow-foreground/5 sm:mt-20">
          <div className="grid h-72 grid-cols-[10rem_1fr] gap-2 overflow-hidden rounded-xl border bg-background/70 p-3 max-sm:grid-cols-1 sm:h-96">
            <div className="space-y-2 max-sm:hidden">
              <div className="h-6 w-3/4 rounded-md bg-muted" />
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="h-4 rounded-md bg-muted/60" style={{ width: `${90 - i * 8}%` }} />
              ))}
            </div>
            <div className="grid grid-rows-[auto_1fr] gap-2">
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 3 }, (_, i) => (
                  <div key={i} className="h-20 rounded-lg border bg-muted/40 sm:h-24" />
                ))}
              </div>
              <div className="flex items-end gap-2 rounded-lg border bg-muted/30 p-4">
                {[40, 65, 50, 80, 60, 92, 72, 58, 85, 68, 95, 76].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-linear-to-t from-brand/10 to-brand/30"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
