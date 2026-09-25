"use client";

import { useId, useState } from "react";
import {
  ArrowRightIcon,
  BatteryFullIcon,
  CheckIcon,
  CoffeeIcon,
  HomeIcon,
  LockIcon,
  PieChartIcon,
  PiggyBankIcon,
  PlaneIcon,
  RepeatIcon,
  SignalIcon,
  SmartphoneIcon,
  SparklesIcon,
  UserIcon,
  WalletIcon,
  WifiIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BlurFade } from "@/components/velora/blur-fade";
import { IphoneMockup } from "@/components/velora/iphone-mockup";
import { Ripple } from "@/components/velora/ripple";

const PERKS = [
  { icon: LockIcon, text: "Bank-grade encryption" },
  { icon: RepeatIcon, text: "Rules that run themselves" },
  { icon: SmartphoneIcon, text: "iOS and Android" },
];

const RULES = [
  {
    icon: SparklesIcon,
    name: "Round up purchases",
    detail: "+$84.20 this month",
    on: true,
  },
  {
    icon: PiggyBankIcon,
    name: "Save 10% of payday",
    detail: "Next: Friday",
    on: true,
  },
  {
    icon: CoffeeIcon,
    name: "Cap dining at $300",
    detail: "$212 spent",
    on: false,
  },
];

const RECENT = [
  { icon: PlaneIcon, name: "Japan trip fund", amount: "+$150.00" },
  { icon: CoffeeIcon, name: "Blue Door Café", amount: "−$4.80" },
];

/** The app screen, drawn with Tailwind so it follows your theme. */
function AppScreen() {
  return (
    <div
      role="img"
      aria-label="Halcyon app home screen: a $12,480 balance and three autopilot savings rules"
      className="flex h-full flex-col bg-background text-[11px] text-foreground"
    >
      <div className="flex items-center justify-between px-6 pt-3.5 text-[11px] font-semibold">
        <span>9:41</span>
        <span className="flex items-center gap-1">
          <SignalIcon className="size-3" />
          <WifiIcon className="size-3" />
          <BatteryFullIcon className="size-3.5" />
        </span>
      </div>

      <div className="flex items-center justify-between px-4 pt-6">
        <div>
          <div className="text-muted-foreground">Good morning</div>
          <div className="text-sm font-semibold">Maya Lindqvist</div>
        </div>
        <span className="grid size-8 place-items-center rounded-full bg-muted font-semibold">
          ML
        </span>
      </div>

      <div className="mx-4 mt-4 rounded-2xl bg-gradient-to-br from-brand-from via-brand-via to-brand-to p-4 text-brand-foreground shadow-lg shadow-brand/25">
        <div className="opacity-80">Total balance</div>
        <div className="mt-1 text-2xl font-semibold tracking-tight">
          $12,480.52
        </div>
        <div className="mt-3 flex items-end justify-between">
          <span className="rounded-full bg-white/20 px-2 py-0.5 font-medium">
            +$1,240 this month
          </span>
          <svg
            viewBox="0 0 64 24"
            className="h-6 w-16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 20 12 15l8 3 11-9 9 4L52 5l11 1" />
          </svg>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between px-4">
        <span className="text-xs font-semibold">Autopilot</span>
        <span className="text-brand">Edit</span>
      </div>
      <div className="mx-4 mt-2 divide-y rounded-xl border bg-card">
        {RULES.map(({ icon: Icon, name, detail, on }) => (
          <div key={name} className="flex items-center gap-2.5 px-3 py-2.5">
            <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
              <Icon className="size-3.5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-medium">{name}</span>
              <span className="block text-[10px] text-muted-foreground">
                {detail}
              </span>
            </span>
            <span
              className={`flex h-4 w-7 shrink-0 items-center rounded-full p-0.5 ${on ? "justify-end bg-brand" : "bg-muted"}`}
            >
              <span className="size-3 rounded-full bg-background shadow-sm" />
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 px-4 text-xs font-semibold">Recent</div>
      <div className="mt-2 space-y-2.5 px-4">
        {RECENT.map(({ icon: Icon, name, amount }) => (
          <div key={name} className="flex items-center gap-2.5">
            <span className="grid size-7 place-items-center rounded-full bg-muted">
              <Icon className="size-3.5" />
            </span>
            <span className="flex-1 font-medium">{name}</span>
            <span className="font-medium tabular-nums">{amount}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto border-t bg-card/80 px-6 pt-2.5 pb-5">
        <div className="flex justify-between text-muted-foreground">
          <HomeIcon className="size-4 text-brand" />
          <PieChartIcon className="size-4" />
          <WalletIcon className="size-4" />
          <UserIcon className="size-4" />
        </div>
        <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-foreground/80" />
      </div>
    </div>
  );
}

/**
 * Mobile-app launch hero: copy and an email waitlist on the left, the app in
 * an iPhone frame on the right with two floating highlight cards. Wire the
 * form's submit handler to your list provider.
 */
export function HeroSplitPhone() {
  const id = useId();
  const [joined, setJoined] = useState(false);

  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <div className="max-w-xl">
          <BlurFade>
            <p className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-sm text-muted-foreground backdrop-blur">
              <span className="size-1.5 rounded-full bg-brand" />
              Early access opens in June
            </p>
          </BlurFade>

          <BlurFade delay={0.1}>
            <h1 className="mt-8 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
              Your savings, <span className="text-brand">on autopilot.</span>
            </h1>
          </BlurFade>

          <BlurFade delay={0.2}>
            <p className="mt-6 text-lg text-pretty text-muted-foreground">
              Halcyon rounds up every purchase, sets aside part of each payday
              and nudges you before you overspend. Set your rules once — the app
              does the rest.
            </p>
          </BlurFade>

          <BlurFade delay={0.3}>
            <form
              className="mt-10 max-w-md"
              onSubmit={(e) => {
                e.preventDefault();
                setJoined(true);
              }}
            >
              <div className="flex flex-col gap-2 sm:flex-row">
                <Label htmlFor={`${id}-email`} className="sr-only">
                  Email address
                </Label>
                <Input
                  id={`${id}-email`}
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-describedby={`${id}-hint`}
                  className="h-11 rounded-full bg-background px-4"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="h-11 shrink-0 rounded-full px-5"
                >
                  {joined ? (
                    <>
                      <CheckIcon /> You&apos;re in
                    </>
                  ) : (
                    <>
                      Join the waitlist <ArrowRightIcon />
                    </>
                  )}
                </Button>
              </div>
              <p
                id={`${id}-hint`}
                className="mt-3 px-1 text-sm text-muted-foreground"
              >
                Join 18,000 people on the list. No spam — one email when your
                invite is ready.
              </p>
              <p
                role="status"
                className="mt-2 px-1 text-sm font-medium text-brand"
              >
                {joined ? "Thanks! Check your inbox to confirm your spot." : ""}
              </p>
            </form>
          </BlurFade>

          <BlurFade delay={0.4}>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
              {PERKS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2">
                  <Icon className="size-4 text-foreground" />
                  {text}
                </li>
              ))}
            </ul>
          </BlurFade>
        </div>

        <div className="relative flex justify-center py-6">
          <Ripple circles={5} baseSize={340} />

          <BlurFade delay={0.2} offset={40}>
            <IphoneMockup>
              <AppScreen />
            </IphoneMockup>
          </BlurFade>

          {/* Floating highlights — hidden on narrow screens where they would crowd the phone */}
          <div className="absolute bottom-32 left-1/2 hidden -translate-x-[calc(100%+8rem)] md:block">
            <BlurFade delay={0.6} direction="right">
              <div
                aria-hidden
                className="w-52 rounded-2xl border bg-card/90 p-3.5 text-sm shadow-xl backdrop-blur"
              >
                <div className="flex items-center gap-2 font-medium">
                  <PlaneIcon className="size-4 text-brand" /> Japan trip
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  $3,600 of $4,000 saved
                </div>
                <div className="mt-2.5 h-1.5 rounded-full bg-muted">
                  <div className="h-full w-[90%] rounded-full bg-gradient-to-r from-brand-from to-brand-to" />
                </div>
              </div>
            </BlurFade>
          </div>
          <div className="absolute top-20 left-1/2 hidden translate-x-14 md:block">
            <BlurFade delay={0.8} direction="left">
              <div
                aria-hidden
                className="flex w-56 items-center gap-3 rounded-2xl border bg-card/90 p-3.5 shadow-xl backdrop-blur"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand text-brand-foreground">
                  <SparklesIcon className="size-4" />
                </span>
                <div className="text-sm">
                  <div className="font-medium">+$2.40 rounded up</div>
                  <div className="text-xs text-muted-foreground">
                    Blue Door Café · just now
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
