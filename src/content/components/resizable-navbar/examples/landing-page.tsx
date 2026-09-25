"use client";

import { useRef } from "react";
import { Gauge, Layers, ShieldCheck, Sparkles } from "lucide-react";

import { ResizableNavbar } from "@/components/velora/resizable-navbar";

const items = [
  { label: "Product", href: "#product" },
  { label: "Customers", href: "#customers" },
  { label: "Pricing", href: "#pricing" },
];

const features = [
  { icon: Gauge, title: "Instant sync", body: "Edits reach every device in under 100ms." },
  { icon: Layers, title: "Nested views", body: "Boards, lists and timelines over the same data." },
  { icon: ShieldCheck, title: "Private by default", body: "End-to-end encryption on every plan." },
  { icon: Sparkles, title: "Smart triage", body: "Sort incoming requests before you open them." },
];

export default function ResizableNavbarLandingDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className="relative h-[32rem] w-full overflow-y-auto rounded-xl border bg-background"
    >
      <ResizableNavbar
        container={scrollRef}
        threshold={40}
        compactWidth={640}
        items={items}
        logo={
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid size-7 place-items-center rounded-lg bg-linear-to-br from-brand-from via-brand-via to-brand-to text-xs font-bold text-brand-foreground">
              L
            </span>
            Loom &amp; Ledger
          </a>
        }
        cta={
          <a
            href="#trial"
            className="inline-flex h-9 items-center rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground"
          >
            Start free
          </a>
        }
      />

      <section className="relative overflow-hidden px-6 pt-16 pb-20 text-center">
        <div
          aria-hidden
          className="absolute inset-x-0 -top-24 mx-auto h-64 max-w-xl rounded-full bg-linear-to-r from-brand-from/25 via-brand-via/25 to-brand-to/25 blur-3xl"
        />
        <p className="relative mx-auto w-fit rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground">
          New — timelines are here
        </p>
        <h2 className="relative mx-auto mt-5 max-w-xl text-4xl font-semibold tracking-tight text-balance">
          Plan the work.{" "}
          <span className="bg-linear-to-r from-brand-from via-brand-via to-brand-to bg-clip-text text-transparent">
            Skip the meetings.
          </span>
        </h2>
        <p className="relative mx-auto mt-4 max-w-md text-muted-foreground">
          One calm place for roadmaps, requests and releases — built for teams
          of five to five hundred.
        </p>
        <div className="relative mt-8 flex justify-center gap-3">
          <a
            href="#trial"
            className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground"
          >
            Start free
          </a>
          <a
            href="#demo"
            className="inline-flex h-10 items-center rounded-full border bg-card px-5 text-sm font-medium"
          >
            Book a demo
          </a>
        </div>
      </section>

      <section id="customers" className="border-y bg-muted/30 px-6 py-6">
        <ul className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm font-semibold tracking-wide text-muted-foreground">
          {["Northwind", "Umbra", "Keystone", "Halcyon", "Brightline"].map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </section>

      <section id="product" className="mx-auto grid max-w-3xl gap-4 px-6 py-16 sm:grid-cols-2">
        {features.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-2xl border bg-card p-5">
            <Icon className="size-5 text-brand" aria-hidden />
            <h3 className="mt-3 font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{body}</p>
          </div>
        ))}
      </section>

      <section id="pricing" className="px-6 pb-16">
        <div className="mx-auto max-w-3xl rounded-2xl bg-linear-to-br from-brand-from via-brand-via to-brand-to p-8 text-center text-brand-foreground">
          <h2 className="text-2xl font-semibold">Free for teams under ten</h2>
          <p className="mt-2 text-sm opacity-90">No card required. Upgrade when you outgrow it.</p>
        </div>
      </section>

      <footer className="border-t px-6 py-6 text-center text-xs text-muted-foreground">
        © 2026 Loom &amp; Ledger
      </footer>
    </div>
  );
}
