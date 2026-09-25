"use client";

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const MenuContext = createContext<{
  active: string | null;
  setActive: (value: string | null) => void;
}>({ active: null, setActive: () => {} });

/**
 * Hover-driven navigation menu whose panel morphs between items.
 * Wrap `MenuItem`s in `NavbarMenu`. The panel closes when the pointer or
 * keyboard focus leaves the menu, and on Escape.
 */
export function NavbarMenu({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [active, setActive] = useState<string | null>(null);

  // Escape also dismisses a panel opened by hover, wherever focus is.
  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return (
    <MenuContext.Provider value={{ active, setActive }}>
      <nav
        data-slot="navbar-menu"
        onMouseLeave={() => setActive(null)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setActive(null);
          }
        }}
        className={cn(
          "relative flex items-center gap-1 rounded-full border bg-background/80 px-3 py-1.5 backdrop-blur-md",
          className
        )}
      >
        {children}
      </nav>
    </MenuContext.Provider>
  );
}

export function MenuItem({
  label,
  href,
  children,
  className,
}: {
  label: string;
  /** Renders the item as a link; ignored when the item has a panel */
  href?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const { active, setActive } = useContext(MenuContext);
  const reducedMotion = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const panelId = useId();
  const open = active === label;
  const hasPanel = Boolean(children);

  const triggerClass = cn(
    "relative rounded-full px-3.5 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    open ? "text-foreground" : "text-muted-foreground hover:text-foreground",
    className
  );
  const pill = open && (
    <motion.span
      layoutId="navbar-menu-pill"
      className="absolute inset-0 -z-10 rounded-full bg-muted"
      transition={
        reducedMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 380, damping: 32 }
      }
    />
  );

  return (
    <div
      className="relative"
      onMouseEnter={() => setActive(label)}
      onFocus={(event) => {
        // Only open when focus arrives from outside this item, so Escape
        // can return focus to the trigger without reopening the panel.
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setActive(label);
        }
      }}
      onKeyDown={(event) => {
        if (event.key !== "Escape" || !open) return;
        setActive(null);
        triggerRef.current?.focus();
      }}
    >
      {href && !hasPanel ? (
        <a ref={triggerRef} href={href} className={cn("block", triggerClass)}>
          {pill}
          {label}
        </a>
      ) : (
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={hasPanel ? open : undefined}
          aria-controls={hasPanel && open ? panelId : undefined}
          onClick={() => setActive(label)}
          className={triggerClass}
        >
          {pill}
          {label}
        </button>
      )}

      <AnimatePresence>
        {open && hasPanel && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: reducedMotion ? 0 : 0.18, ease: "easeOut" }}
            className="absolute left-1/2 top-full z-50 mt-3 w-max -translate-x-1/2 rounded-2xl border bg-popover p-3 text-popover-foreground shadow-xl shadow-foreground/5"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
