"use client";

import { useRef, type Ref } from "react";
import {
  BoxIcon,
  CloudIcon,
  CodeIcon,
  DatabaseIcon,
  MailIcon,
  SparklesIcon,
  WalletIcon,
} from "lucide-react";

import { AnimatedBeam } from "@/components/velora/animated-beam";
import { cn } from "@/lib/utils";

function Node({
  ref,
  className,
  children,
}: {
  ref?: Ref<HTMLDivElement>;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-13 items-center justify-center rounded-full border bg-card shadow-lg [&_svg]:size-5",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Six service nodes beaming into a central hub. */
export default function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const left1 = useRef<HTMLDivElement>(null);
  const left2 = useRef<HTMLDivElement>(null);
  const left3 = useRef<HTMLDivElement>(null);
  const right1 = useRef<HTMLDivElement>(null);
  const right2 = useRef<HTMLDivElement>(null);
  const right3 = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex h-80 w-full items-center justify-between px-2 sm:px-8"
    >
      <div className="flex h-full flex-col justify-between py-6">
        <Node ref={left1}>
          <DatabaseIcon className="text-muted-foreground" />
        </Node>
        <Node ref={left2}>
          <CodeIcon className="text-muted-foreground" />
        </Node>
        <Node ref={left3}>
          <CloudIcon className="text-muted-foreground" />
        </Node>
      </div>

      <Node
        ref={centerRef}
        className="size-18 border-primary/40 bg-primary/10 shadow-primary/20 [&_svg]:size-8"
      >
        <SparklesIcon className="text-primary" />
      </Node>

      <div className="flex h-full flex-col justify-between py-6">
        <Node ref={right1}>
          <MailIcon className="text-muted-foreground" />
        </Node>
        <Node ref={right2}>
          <WalletIcon className="text-muted-foreground" />
        </Node>
        <Node ref={right3}>
          <BoxIcon className="text-muted-foreground" />
        </Node>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={left1}
        toRef={centerRef}
        curvature={-60}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={left2}
        toRef={centerRef}
        delay={1}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={left3}
        toRef={centerRef}
        curvature={60}
        delay={2}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={right1}
        toRef={centerRef}
        curvature={-60}
        reverse
        delay={0.5}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={right2}
        toRef={centerRef}
        reverse
        delay={1.5}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={right3}
        toRef={centerRef}
        curvature={60}
        reverse
        delay={2.5}
      />
    </div>
  );
}
