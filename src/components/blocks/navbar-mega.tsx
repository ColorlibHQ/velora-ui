import {
  ArrowRightIcon,
  BarChart3Icon,
  BellRingIcon,
  ChevronDownIcon,
  MenuIcon,
  PlugIcon,
  SearchIcon,
  ShieldCheckIcon,
  WorkflowIcon,
  ZapIcon,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const BRAND = "Northwind";

const PRODUCT = [
  { title: "Automations", description: "Trigger workflows from any event", icon: WorkflowIcon },
  { title: "Analytics", description: "Dashboards your team will read", icon: BarChart3Icon },
  { title: "Integrations", description: "120+ apps, two-way sync", icon: PlugIcon },
  { title: "Alerts", description: "Page the right person, once", icon: BellRingIcon },
  { title: "Edge runtime", description: "Runs in 30 regions, under 50ms", icon: ZapIcon },
  { title: "Security", description: "SSO, audit logs and SOC 2", icon: ShieldCheckIcon },
];

const LINKS = ["Customers", "Pricing", "Docs"];

const FEATURED = {
  badge: "New",
  title: "Northwind 3.0",
  description: "Branching workflows, a faster editor and live collaboration.",
  cta: "Read the launch notes",
};

function Logo() {
  return (
    <a
      href="#"
      className="flex shrink-0 items-center gap-2 rounded-md font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <svg aria-hidden viewBox="0 0 32 32" className="size-7">
        <rect width="32" height="32" rx="9" className="fill-primary" />
        <path d="M10 22V10l12 12V10" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="stroke-primary-foreground" />
      </svg>
      {BRAND}
    </a>
  );
}

const linkClass =
  "rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/**
 * Classic top bar: logo, links with a "Product" mega menu (a Radix menu, so
 * arrow keys, Escape and focus return work out of the box), search, sign-in
 * and a primary CTA. Below `md` the links move into a slide-over sheet. The
 * faded page underneath is placeholder content — delete it when you use the
 * navbar.
 */
export function NavbarMega() {
  return (
    <div className="relative isolate">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
        <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-6 lg:px-8">
          <Logo />

          <ul className="hidden items-center gap-0.5 md:flex">
            <li>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button type="button" className={`group/product inline-flex items-center gap-1 data-[state=open]:bg-muted data-[state=open]:text-foreground ${linkClass}`}>
                    Product
                    <ChevronDownIcon aria-hidden className="size-3.5 transition-transform duration-200 group-data-[state=open]/product:rotate-180 motion-reduce:transition-none" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  sideOffset={14}
                  className="w-152 max-w-(--radix-dropdown-menu-content-available-width) rounded-2xl p-2 shadow-xl shadow-foreground/5"
                >
                  <div className="grid grid-cols-[1fr_13rem] gap-2">
                    <div>
                      <DropdownMenuLabel className="px-2.5 pt-2 pb-1">Platform</DropdownMenuLabel>
                      <div className="grid grid-cols-2">
                        {PRODUCT.map(({ title, description, icon: Icon }) => (
                          <DropdownMenuItem key={title} asChild className="items-start gap-3 rounded-xl p-2.5">
                            <a href="#">
                              <span className="grid size-9 shrink-0 place-items-center rounded-lg border bg-background text-primary shadow-xs">
                                <Icon className="size-4" />
                              </span>
                              <span className="grid gap-0.5">
                                <span className="font-medium text-foreground">{title}</span>
                                <span className="text-xs leading-snug text-muted-foreground">{description}</span>
                              </span>
                            </a>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </div>

                    <div className="relative flex flex-col overflow-hidden rounded-xl border bg-linear-to-br from-brand-from/15 via-brand-via/5 to-brand-to/15 p-4">
                      {/* Mini release chart */}
                      <div aria-hidden className="flex h-16 items-end gap-1">
                        {[30, 45, 38, 60, 52, 74, 66, 90].map((h, i) => (
                          <span key={i} className="flex-1 rounded-sm bg-primary/30 last:bg-primary" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                      <span className="mt-4 w-fit rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        {FEATURED.badge}
                      </span>
                      <p className="mt-2 font-medium">{FEATURED.title}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{FEATURED.description}</p>
                      <DropdownMenuItem asChild className="-mx-1.5 mt-auto rounded-lg px-1.5 pt-3 font-medium text-primary">
                        <a href="#">
                          {FEATURED.cta} <ArrowRightIcon className="size-3.5" />
                        </a>
                      </DropdownMenuItem>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            {LINKS.map((label) => (
              <li key={label}>
                <a href="#" className={`block ${linkClass}`}>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" className="hidden h-9 w-52 justify-start gap-2 rounded-lg px-3 font-normal text-muted-foreground lg:inline-flex">
              <SearchIcon />
              Search…
              <kbd aria-hidden className="ml-auto rounded border bg-muted px-1.5 font-mono text-[0.7rem] text-muted-foreground">
                ⌘K
              </kbd>
            </Button>
            <Button variant="ghost" size="icon-lg" aria-label="Search" className="lg:hidden">
              <SearchIcon />
            </Button>
            <Button variant="ghost" className="hidden h-9 px-3 md:inline-flex" asChild>
              <a href="#">Sign in</a>
            </Button>
            <Button className="hidden h-9 px-3.5 sm:inline-flex" asChild>
              <a href="#">Get started</a>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon-lg" aria-label="Open menu" className="md:hidden">
                  <MenuIcon />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full gap-0 overflow-y-auto sm:max-w-sm">
                <SheetHeader className="border-b px-6 py-4">
                  <SheetTitle>{BRAND}</SheetTitle>
                  <SheetDescription className="sr-only">Site navigation</SheetDescription>
                </SheetHeader>
                <nav aria-label="Mobile" className="px-4 py-3">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="product" className="border-b-0">
                      <AccordionTrigger className="rounded-lg px-2 py-3 text-base hover:bg-muted hover:no-underline">
                        Product
                      </AccordionTrigger>
                      <AccordionContent className="pb-2 [&_a]:no-underline">
                        <ul className="grid gap-0.5 pl-2">
                          {PRODUCT.map(({ title, icon: Icon }) => (
                            <li key={title}>
                              <SheetClose asChild>
                                <a href="#" className="flex items-center gap-3 rounded-lg px-2 py-2 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                                  <Icon aria-hidden className="size-4 text-primary" />
                                  {title}
                                </a>
                              </SheetClose>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <ul>
                    {LINKS.map((label) => (
                      <li key={label}>
                        <SheetClose asChild>
                          <a href="#" className="block rounded-lg px-2 py-3 text-base font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                            {label}
                          </a>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </nav>
                <SheetFooter className="grid grid-cols-2 border-t px-6 py-4">
                  <Button variant="outline" size="lg" asChild>
                    <a href="#">Sign in</a>
                  </Button>
                  <Button size="lg" asChild>
                    <a href="#">Get started</a>
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>

      {/* Placeholder page content — replace with your own */}
      <div aria-hidden className="relative overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[3rem_3rem] mask-[radial-gradient(ellipse_at_50%_0%,black,transparent_70%)] opacity-60" />
        <div className="mx-auto max-w-7xl">
          <div className="h-6 w-40 rounded-full bg-primary/15" />
          <div className="mt-6 h-10 w-full max-w-2xl rounded-xl bg-muted sm:h-12" />
          <div className="mt-3 h-10 w-3/5 max-w-lg rounded-xl bg-muted sm:h-12" />
          <div className="mt-8 h-3 w-full max-w-xl rounded-full bg-muted/70" />
          <div className="mt-3 h-3 w-2/3 max-w-md rounded-full bg-muted/70" />
          <div className="mt-10 flex gap-3">
            <div className="h-10 w-32 rounded-lg bg-primary/25" />
            <div className="h-10 w-28 rounded-lg border bg-background/60" />
          </div>
        </div>
      </div>
    </div>
  );
}
