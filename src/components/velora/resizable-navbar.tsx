"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

interface ResizableNavbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Links shown in the bar (and in the mobile menu) */
  items: NavItem[];
  /** Brand mark or logo link on the left */
  logo?: React.ReactNode;
  /** Call to action on the right (e.g. a sign-up link) */
  cta?: React.ReactNode;
  /** Pixels scrolled before the bar shrinks into a floating pill */
  threshold?: number;
  /** Maximum width of the floating pill, in px */
  compactWidth?: number;
  /** Maximum width of the full bar, in px */
  maxWidth?: number;
  /** href of the current page; that link gets aria-current="page" */
  activeHref?: string;
  /** Accessible name of the navigation landmark */
  label?: string;
  /** Scrollable element to watch instead of the window */
  container?: React.RefObject<HTMLElement | null>;
}

/**
 * Sticky navbar that shrinks into a centred, blurred pill once the page is
 * scrolled. A highlight glides between links on hover and focus; below a
 * 48rem container width the links move into a disclosure menu.
 */
export function ResizableNavbar({
  items,
  logo,
  cta,
  threshold = 80,
  compactWidth = 760,
  maxWidth = 1152,
  activeHref,
  label = "Main",
  container,
  className,
  ...props
}: ResizableNavbarProps) {
  const [compact, setCompact] = useState(false);
  const [hover, setHover] = useState({ left: 0, width: 0, on: false, moved: false });
  const [menuOpen, setMenuOpen] = useState(false);
  const reduce = useReducedMotion();
  const id = useId();
  const rootRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const spring = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 300, damping: 30 };

  useEffect(() => {
    const el = container?.current;
    const target = el ?? window;
    // Same-value state updates bail out, so no throttling is needed.
    const update = () => setCompact((el ? el.scrollTop : window.scrollY) > threshold);
    update();
    target.addEventListener("scroll", update, { passive: true });
    return () => target.removeEventListener("scroll", update);
  }, [container, threshold]);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [menuOpen]);

  // The highlight glides between links; appearing from nothing it fades in place.
  const show = ({ currentTarget: t }: React.SyntheticEvent<HTMLElement>) =>
    setHover((h) => ({ left: t.offsetLeft, width: t.offsetWidth, on: true, moved: h.on }));
  const hide = () => setHover((h) => ({ ...h, on: false }));
  const glide = reduce || !hover.moved ? { duration: 0 } : spring;

  const link = (item: NavItem, inMenu: boolean) => (
    <a
      href={item.href}
      aria-current={item.href === activeHref ? "page" : undefined}
      onMouseEnter={inMenu ? undefined : show}
      onFocus={inMenu ? undefined : show}
      onClick={() => setMenuOpen(false)}
      className={cn(
        "relative block rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[current=page]:text-foreground",
        inMenu && "rounded-xl px-4 py-2.5 text-base hover:bg-muted"
      )}
    >
      {item.label}
    </a>
  );

  return (
    <header
      {...props}
      ref={rootRef}
      data-slot="resizable-navbar"
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          setMenuOpen(false);
          buttonRef.current?.focus();
        }
        props.onKeyDown?.(event);
      }}
      className={cn("@container/navbar sticky top-0 z-50 w-full px-3", className)}
    >
      <motion.nav
        aria-label={label}
        initial={false}
        animate={{ maxWidth: compact ? compactWidth : maxWidth, y: compact ? 12 : 0 }}
        transition={spring}
        className={cn(
          "relative mx-auto flex h-14 items-center gap-4 rounded-full border px-4 transition-[background-color,border-color,box-shadow] duration-300 motion-reduce:transition-none",
          compact || menuOpen
            ? "border-border bg-background/75 shadow-lg shadow-foreground/5 backdrop-blur-md"
            : "border-transparent"
        )}
      >
        <div className="flex shrink-0 items-center">{logo}</div>
        <div className="hidden flex-1 justify-center @3xl/navbar:flex">
          <div
            onMouseLeave={hide}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) hide();
            }}
            className="relative"
          >
            <motion.span
              aria-hidden
              initial={false}
              animate={{ x: hover.left, width: hover.width, opacity: hover.on ? 1 : 0 }}
              transition={{ x: glide, width: glide, opacity: { duration: reduce ? 0 : 0.15 } }}
              className="absolute inset-y-0 left-0 rounded-full bg-muted"
            />
            <ul className="flex items-center gap-1">
              {items.map((item, i) => (
                <li key={`${i}-${item.label}`}>{link(item, false)}</li>
              ))}
            </ul>
          </div>
        </div>
        {cta && <div className="hidden shrink-0 @3xl/navbar:block">{cta}</div>}
        <button
          ref={buttonRef}
          type="button"
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls={menuOpen ? `${id}-menu` : undefined}
          onClick={() => setMenuOpen((open) => !open)}
          className="group/menu ml-auto grid size-9 cursor-pointer place-items-center rounded-full transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring @3xl/navbar:hidden"
        >
          <span aria-hidden className="relative block h-3 w-4">
            <span className="absolute top-0 left-0 h-0.5 w-4 rounded-full bg-foreground transition-transform duration-200 group-aria-expanded/menu:translate-y-[5px] group-aria-expanded/menu:rotate-45 motion-reduce:transition-none" />
            <span className="absolute bottom-0 left-0 h-0.5 w-4 rounded-full bg-foreground transition-transform duration-200 group-aria-expanded/menu:-translate-y-[5px] group-aria-expanded/menu:-rotate-45 motion-reduce:transition-none" />
          </span>
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id={`${id}-menu`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={reduce ? { duration: 0 } : { duration: 0.2 }}
              className="absolute inset-x-0 top-full mt-2 rounded-2xl border bg-popover p-2 text-popover-foreground shadow-xl @3xl/navbar:hidden"
            >
              <ul>
                {items.map((item, i) => (
                  <li key={`${i}-${item.label}`}>{link(item, true)}</li>
                ))}
              </ul>
              {cta && <div className="mt-2 border-t p-2 pt-3">{cta}</div>}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
