"use client";

import {
  Children,
  createContext,
  useContext,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

import { cn } from "@/lib/utils";

const noopSubscribe = () => () => {};

interface Board {
  ref: React.RefObject<HTMLDivElement | null>;
  hint: string;
  count: number;
  top: () => number;
}

const BoardContext = createContext<Board | null>(null);
const IndexContext = createContext(0);

// Integer hash → [0, 1). Same result on server and client (no Math.random).
const seeded = (i: number, salt: number) =>
  ((Math.imul(i + 1, 2654435761) ^ Math.imul(salt, 40503)) >>> 0) % 1000 / 1000;

interface DraggableCardContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `DraggableCard` elements */
  children: React.ReactNode;
}

/**
 * The board that scatters its `DraggableCard`s and keeps them inside its
 * bounds. Give it a height (default h-96).
 */
export function DraggableCardContainer({
  children,
  className,
  ...props
}: DraggableCardContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hint = useId();
  const z = useRef(Children.count(children));
  const board: Board = { ref, hint, count: Children.count(children), top: () => ++z.current };

  return (
    <div
      {...props}
      ref={ref}
      data-slot="draggable-card-container"
      className={cn("relative h-96 w-full", className)}
    >
      <p id={hint} hidden>
        Arrow keys move the card; Enter or Space brings it to the front.
      </p>
      <BoardContext value={board}>
        {Children.map(children, (child, i) => (
          <IndexContext value={i}>{child}</IndexContext>
        ))}
      </BoardContext>
    </div>
  );
}

interface DraggableCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"> {
  /** Accessible name for the card, e.g. its caption */
  label?: string;
  /** Resting tilt in degrees (defaults to a seeded ±7° per card) */
  rotate?: number;
}

/**
 * A photo-style card for `DraggableCardContainer`: drag or fling it (it
 * tilts with the motion and springs back inside the board), nudge it with
 * arrow keys, and press Enter or Space to bring it to the front.
 */
export function DraggableCard({
  label,
  rotate,
  className,
  style,
  children,
  ...props
}: DraggableCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const board = useContext(BoardContext);
  const index = useContext(IndexContext);
  const count = board?.count ?? 1;
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const reduced = !!useReducedMotion() && hydrated;
  const [z, setZ] = useState(index + 1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const base = rotate ?? Math.round((seeded(index, 1) - 0.5) * 14);
  // Lean toward the direction of travel, springing upright when released
  const lean = useSpring(useTransform(useVelocity(x), [-2000, 2000], [-12, 12], { clamp: true }), {
    stiffness: 300,
    damping: 30,
  });
  const tilt = useTransform(lean, (v) => base + v);
  // Resting spot as a % of the board, in a loose zigzag. The card is also
  // translated by -p% of its own size, so it always starts fully inside.
  const place = (p: number) => Math.round(Math.min(Math.max(p, 0), 100) * 100) / 100;
  const px = place(((index + 0.5) / count) * 100 + (seeded(index, 2) - 0.5) * 8);
  const py = place(50 + (index % 2 ? 30 : -30) + (seeded(index, 3) - 0.5) * 16);

  const front = () => board && setZ(board.top());

  // Keyboard nudge, clamped to the board. Offsets come from layout (offset*)
  // plus the motion values, so rapid key repeats never read a stale frame.
  const nudge = (dx: number, dy: number) => {
    const card = ref.current;
    const box = board?.ref.current;
    if (!card || !box) return;
    const move = (mv: typeof x, d: number, start: number, size: number, room: number, p: number) => {
      const from = start - (size * p) / 100 + mv.get();
      mv.set(mv.get() + Math.min(Math.max(d, Math.min(0, -from)), Math.max(0, room - size - from)));
    };
    move(x, dx, card.offsetLeft, card.offsetWidth, box.clientWidth, px);
    move(y, dy, card.offsetTop, card.offsetHeight, box.clientHeight, py);
  };

  return (
    <motion.div
      {...props}
      ref={ref}
      tabIndex={0}
      role="group"
      aria-roledescription="draggable card"
      aria-label={label}
      aria-describedby={board?.hint}
      data-slot="draggable-card"
      drag
      dragConstraints={board?.ref}
      dragElastic={reduced ? 0 : 0.25}
      dragMomentum={!reduced}
      dragTransition={{ bounceStiffness: 260, bounceDamping: 22 }}
      whileDrag={reduced ? undefined : { scale: 1.04 }}
      onPointerDown={(e) => {
        front();
        props.onPointerDown?.(e);
      }}
      onKeyDown={(e) => {
        props.onKeyDown?.(e);
        const step = e.shiftKey ? 48 : 12;
        const moves: Record<string, [number, number]> = {
          ArrowLeft: [-step, 0],
          ArrowRight: [step, 0],
          ArrowUp: [0, -step],
          ArrowDown: [0, step],
        };
        if (moves[e.key]) nudge(...moves[e.key]);
        else if (e.key === "Enter" || e.key === " ") front();
        else return;
        e.preventDefault();
      }}
      style={{
        x,
        y,
        rotate: reduced ? base : tilt,
        zIndex: z,
        left: `${px}%`,
        top: `${py}%`,
        translate: `-${px}% -${py}%`,
        ...style,
      }}
      className={cn(
        "absolute w-48 cursor-grab touch-none rounded-lg border bg-card p-2.5 pb-4 text-card-foreground shadow-xl select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:cursor-grabbing sm:w-56",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
