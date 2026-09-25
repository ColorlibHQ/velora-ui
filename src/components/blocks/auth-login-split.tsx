"use client";

import { useId, useState } from "react";
import { CheckIcon, EyeIcon, EyeOffIcon, StarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuroraBackground } from "@/components/velora/aurora-background";
import { GridPattern } from "@/components/velora/grid-pattern";
import { cn } from "@/lib/utils";

const BRAND = "Acme";
const TITLE = "Welcome back";
const SUBTITLE = "Log in to your Acme workspace to pick up where you left off.";
const LINKS = { forgot: "#", signup: "#", privacy: "#", terms: "#", home: "#" };

const TESTIMONIAL = {
  quote:
    "We moved three teams onto Acme in a week. Planning went from a meeting to a glance, and our release notes finally write themselves.",
  name: "Maya Chen",
  role: "VP Engineering, Northwind",
};
const STATS = [
  { value: "4,000+", label: "teams" },
  { value: "99.99%", label: "uptime" },
  { value: "4.9/5", label: "average rating" },
];
const ACTIVITY = [
  { title: "Release 4.2 deployed", meta: "Production · 2 min ago" },
  { title: "Roadmap synced", meta: "12 issues updated" },
];

/**
 * Split login screen: the form on the left, an aurora panel with a
 * testimonial on the right (hidden below `lg`). Submitting does nothing —
 * wire `handleSubmit` to your auth provider.
 */
export function AuthLoginSplit() {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section className="grid min-h-[48rem] bg-background lg:grid-cols-2">
      <div className="flex flex-col px-6 py-10 sm:px-12 lg:px-16">
        <a
          href={LINKS.home}
          className="inline-flex w-fit items-center gap-2 rounded-md font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <LogoMark />
          {BRAND}
        </a>

        <div className="flex flex-1 items-center py-16">
          <div className="mx-auto w-full max-w-sm">
            <h2 className="text-3xl font-semibold tracking-tight">{TITLE}</h2>
            <p className="mt-2 text-pretty text-muted-foreground">{SUBTITLE}</p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <div className="space-y-2">
                <Label htmlFor={`${id}-email`}>Email</Label>
                <Input
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className="h-10 px-3"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <Label htmlFor={`${id}-password`}>Password</Label>
                  <a
                    href={LINKS.forgot}
                    className="rounded-sm text-sm font-medium text-primary hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id={`${id}-password`}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    className="h-10 pr-11 pl-3"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Show password"
                    aria-pressed={showPassword}
                    aria-controls={`${id}-password`}
                    onClick={() => setShowPassword((shown) => !shown)}
                    className="absolute top-1 right-1 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOffIcon aria-hidden /> : <EyeIcon aria-hidden />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <input
                  id={`${id}-remember`}
                  name="remember"
                  type="checkbox"
                  className="size-4 shrink-0 cursor-pointer accent-primary dark:scheme-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                />
                <Label htmlFor={`${id}-remember`} className="cursor-pointer font-normal">
                  Keep me signed in for 30 days
                </Label>
              </div>

              <Button type="submit" size="lg" className="h-10 w-full">
                Log in
              </Button>
            </form>

            <div className="my-8 flex items-center gap-4 text-xs text-muted-foreground uppercase">
              <span aria-hidden className="h-px flex-1 bg-border" />
              or continue with
              <span aria-hidden className="h-px flex-1 bg-border" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button type="button" variant="outline" size="lg" className="h-10">
                <GitHubMark />
                GitHub
              </Button>
              <Button type="button" variant="outline" size="lg" className="h-10">
                <GoogleMark />
                Google
              </Button>
            </div>

            <p className="mt-10 text-center text-sm text-muted-foreground">
              New to {BRAND}?{" "}
              <a
                href={LINKS.signup}
                className="rounded-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Create an account
              </a>
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          © 2026 {BRAND} Inc. ·{" "}
          <a href={LINKS.privacy} className="hover:text-foreground">
            Privacy
          </a>{" "}
          ·{" "}
          <a href={LINKS.terms} className="hover:text-foreground">
            Terms
          </a>
        </p>
      </div>

      <div className="hidden p-3 lg:block">
        <div className="dark relative isolate flex h-full flex-col justify-between gap-12 overflow-hidden rounded-3xl border bg-card p-12 text-foreground">
          <AuroraBackground intensity="vivid" className="-z-10" />
          <GridPattern
            width={48}
            height={48}
            className="-z-10 fill-transparent stroke-foreground/10 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]"
          />

          <ul aria-label="Recent activity" className="ml-auto w-full max-w-xs space-y-3">
            {ACTIVITY.map((item, i) => (
              <li
                key={item.title}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border bg-background/60 p-3 shadow-lg backdrop-blur",
                  i === 1 && "mr-8"
                )}
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <CheckIcon aria-hidden className="size-4" />
                </span>
                <span className="text-sm">
                  <span className="block font-medium">{item.title}</span>
                  <span className="block text-xs text-muted-foreground">{item.meta}</span>
                </span>
              </li>
            ))}
          </ul>

          <div>
            <figure>
              <div className="flex gap-1 text-brand-to" aria-label="Rated 5 out of 5" role="img">
                {Array.from({ length: 5 }, (_, i) => (
                  <StarIcon key={i} aria-hidden className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-5 text-xl leading-relaxed font-medium text-balance xl:text-2xl">
                “{TESTIMONIAL.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  aria-hidden
                  className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-brand-from to-brand-to text-sm font-semibold text-primary-foreground"
                >
                  {TESTIMONIAL.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </span>
                <span className="text-sm">
                  <span className="block font-medium">{TESTIMONIAL.name}</span>
                  <span className="block text-muted-foreground">{TESTIMONIAL.role}</span>
                </span>
              </figcaption>
            </figure>

            <dl className="mt-10 grid grid-cols-3 gap-6 border-t pt-8">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-xs text-muted-foreground">{stat.label}</dt>
                  <dd className="text-2xl font-semibold tracking-tight">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoMark() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-7">
      <rect width="24" height="24" rx="7" className="fill-primary" />
      <path d="M7 16.5 12 7l5 9.5" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="stroke-primary-foreground" />
    </svg>
  );
}

function GitHubMark() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function GoogleMark() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93l3.66-2.84Z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" />
    </svg>
  );
}
