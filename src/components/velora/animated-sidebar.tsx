"use client";

import { createContext, useContext, useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const SidebarContext = createContext<{
  pinned: boolean;
  setPinned: (pinned: boolean) => void;
  closeDrawer: () => void;
  drawerRef: React.RefObject<HTMLDialogElement | null>;
}>({ pinned: false, setPinned: () => {}, closeDrawer: () => {}, drawerRef: { current: null } });

// Labels stay in the DOM (and in the accessible name) while the rail is
// collapsed; they only fade in once the nav is hovered, keyboard-focused or pinned.
const reveal =
  "truncate opacity-0 transition-opacity duration-200 motion-reduce:transition-none group-hover/sidebar:opacity-100 group-has-[:focus-visible]/sidebar:opacity-100 group-data-expanded/sidebar:opacity-100";

const icon = (d: string) => (
  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <path d={d} />
  </svg>
);

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controlled pinned-open state of the desktop rail */
  pinned?: boolean;
  /** Initial pinned state when uncontrolled */
  defaultPinned?: boolean;
  /** Called when the pin toggle is pressed */
  onPinnedChange?: (pinned: boolean) => void;
}

/**
 * App shell with a rail that expands from icons to labels on hover or keyboard
 * focus. Below a 42rem container width it becomes a top bar whose menu button
 * opens a full-height drawer. Put `SidebarBody` and your page content inside.
 */
export function Sidebar({
  pinned: pinnedProp,
  defaultPinned = false,
  onPinnedChange,
  className,
  children,
  ...props
}: SidebarProps) {
  const [inner, setInner] = useState(defaultPinned);
  const drawerRef = useRef<HTMLDialogElement>(null);
  const pinned = pinnedProp ?? inner;
  const setPinned = (next: boolean) => {
    if (pinnedProp === undefined) setInner(next);
    onPinnedChange?.(next);
  };

  return (
    <SidebarContext.Provider
      value={{ pinned, setPinned, drawerRef, closeDrawer: () => drawerRef.current?.close() }}
    >
      <div {...props} data-slot="sidebar" className={cn("@container/sidebar", className)}>
        <div className="flex h-full flex-col @2xl/sidebar:flex-row">{children}</div>
      </div>
    </SidebarContext.Provider>
  );
}

interface SidebarBodyProps {
  /** Icon-sized mark, always visible */
  logo?: React.ReactNode;
  /** Product name next to the logo; fades in with the labels */
  title?: React.ReactNode;
  /** Links pinned to the bottom (e.g. settings or the account) */
  footer?: React.ReactNode;
  /** Accessible name of the navigation landmark */
  label?: string;
  /** Show the "Keep expanded" toggle at the bottom of the rail */
  pinnable?: boolean;
  /** Classes for the navigation panel (rail and drawer) */
  className?: string;
  /** SidebarLink elements */
  children: React.ReactNode;
}

/** The rail on wide containers, the top bar and drawer on narrow ones. */
export function SidebarBody({
  logo,
  title,
  footer,
  label = "Main",
  pinnable = true,
  className,
  children,
}: SidebarBodyProps) {
  const { pinned, setPinned, drawerRef } = useContext(SidebarContext);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    if (!drawerOpen) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [drawerOpen]);

  const head = (extra?: React.ReactNode) => (
    <div className="flex h-12 w-full shrink-0 items-center gap-3 px-1">
      <span className="grid size-8 shrink-0 place-items-center">{logo}</span>
      <span className={cn(reveal, "flex-1 font-semibold")}>{title}</span>
      {extra}
    </div>
  );
  const panel = "flex flex-col gap-1 bg-card p-3 text-card-foreground";
  const links = (
    <div className="-mx-1 flex flex-1 flex-col gap-1 overflow-x-hidden overflow-y-auto px-1 py-2">
      {children}
    </div>
  );
  const control =
    "grid size-9 shrink-0 cursor-pointer place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <>
      <div data-expanded className="group/sidebar flex h-14 shrink-0 items-center border-b bg-card px-3 @2xl/sidebar:hidden">
        {head(
          <button
            ref={menuRef}
            type="button"
            aria-label="Open navigation"
            aria-expanded={drawerOpen}
            aria-controls={id}
            onClick={() => {
              drawerRef.current?.showModal();
              setDrawerOpen(true);
            }}
            className={control}
          >
            {icon("M4 6h16M4 12h16M4 18h16")}
          </button>
        )}
      </div>

      <div
        data-expanded={pinned || undefined}
        className="relative hidden w-16 shrink-0 transition-[width] duration-300 ease-out motion-reduce:transition-none data-expanded:w-60 @2xl/sidebar:block"
      >
        <nav
          aria-label={label}
          data-slot="sidebar-body"
          data-expanded={pinned || undefined}
          className={cn(
            panel,
            "group/sidebar absolute inset-y-0 left-0 z-20 w-16 overflow-hidden border-r transition-[width,box-shadow] duration-300 ease-out motion-reduce:transition-none hover:w-60 hover:shadow-xl has-[:focus-visible]:w-60 has-[:focus-visible]:shadow-xl data-expanded:w-60 data-expanded:shadow-none",
            className
          )}
        >
          {head()}
          {links}
          {footer}
          {pinnable && (
            <button
              type="button"
              aria-pressed={pinned}
              onClick={() => setPinned(!pinned)}
              className="flex h-10 cursor-pointer items-center gap-3 rounded-lg px-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className={cn("shrink-0 transition-transform duration-300 motion-reduce:transition-none", pinned && "rotate-180")}>
                {icon("m9 6 6 6-6 6")}
              </span>
              <span className={reveal}>Keep expanded</span>
            </button>
          )}
        </nav>
      </div>

      <dialog
        ref={drawerRef}
        id={id}
        aria-label={label}
        onClose={() => {
          setDrawerOpen(false);
          menuRef.current?.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="fixed inset-y-0 left-0 m-0 h-dvh max-h-none w-72 max-w-[85vw] -translate-x-full border-r bg-card p-0 text-foreground transition-[translate,display,overlay] transition-discrete duration-300 ease-out backdrop:bg-background/60 backdrop:opacity-0 backdrop:backdrop-blur-sm backdrop:transition-[opacity,display,overlay] backdrop:transition-discrete backdrop:duration-300 open:translate-x-0 open:backdrop:opacity-100 motion-reduce:transition-none motion-reduce:backdrop:transition-none starting:open:-translate-x-full starting:open:backdrop:opacity-0"
      >
        <nav data-expanded className={cn(panel, "group/sidebar size-full", className)}>
          {head(
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => drawerRef.current?.close()}
              className={control}
            >
              {icon("M18 6 6 18M6 6l12 12")}
            </button>
          )}
          {links}
          {footer}
        </nav>
      </dialog>
    </>
  );
}

interface SidebarLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Icon shown in both collapsed and expanded states */
  icon: React.ReactNode;
  /** Link text; stays the accessible name while the rail is collapsed */
  label: string;
  /** Marks the current page (sets aria-current="page") */
  active?: boolean;
}

/** A navigation link: icon plus a label that fades in as the rail expands. */
export function SidebarLink({
  icon,
  label,
  active = false,
  className,
  onClick,
  ...props
}: SidebarLinkProps) {
  const { closeDrawer } = useContext(SidebarContext);
  return (
    <a
      aria-current={active ? "page" : undefined}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        closeDrawer();
      }}
      className={cn(
        "flex h-10 shrink-0 items-center gap-3 rounded-lg px-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[current=page]:bg-primary/10 aria-[current=page]:font-medium aria-[current=page]:text-foreground [&_svg]:size-5 [&_svg]:shrink-0",
        className
      )}
    >
      <span className="grid shrink-0 place-items-center" aria-hidden>
        {icon}
      </span>
      <span className={reveal}>{label}</span>
    </a>
  );
}
