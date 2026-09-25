"use client";

import { useId, useState } from "react";
import { CheckIcon, CircleIcon, EyeIcon, EyeOffIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BackgroundBeams } from "@/components/velora/background-beams";
import { GridPattern } from "@/components/velora/grid-pattern";
import { cn } from "@/lib/utils";

const BRAND = "Acme";
const TITLE = "Create your account";
const SUBTITLE = "Start a 14-day free trial. No credit card required.";
const LINKS = { login: "#", terms: "#", privacy: "#", home: "#" };

const RULES = [
  { label: "At least 8 characters", test: (value: string) => value.length >= 8 },
  { label: "One uppercase letter", test: (value: string) => /[A-Z]/.test(value) },
  { label: "One number", test: (value: string) => /\d/.test(value) },
  { label: "One symbol", test: (value: string) => /[^A-Za-z0-9]/.test(value) },
];

/**
 * Centered sign-up card over a grid and slow light beams. Password rules
 * tick off as you type. Submitting does nothing — wire `handleSubmit` to
 * your auth provider.
 */
export function AuthSignupCard() {
  const id = useId();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const passed = RULES.filter((rule) => rule.test(password)).length;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section className="relative isolate overflow-hidden bg-background px-6 py-20 sm:py-24 lg:px-8">
      <GridPattern
        width={44}
        height={44}
        squares={[
          [3, 2],
          [5, 4],
          [9, 1],
          [11, 6],
          [15, 3],
          [18, 8],
        ]}
        className="-z-10 fill-primary/5 [mask-image:radial-gradient(ellipse_70%_60%_at_top,black,transparent)]"
      />
      <BackgroundBeams className="-z-10 opacity-70" />
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -z-10 h-80 w-2xl -translate-x-1/2 rounded-full bg-brand/10 blur-3xl"
      />

      <div className="mx-auto flex min-h-[44rem] max-w-md flex-col justify-center">
        <div className="text-center">
          <a
            href={LINKS.home}
            aria-label={`${BRAND} home`}
            className="inline-flex rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <LogoMark />
          </a>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight">{TITLE}</h2>
          <p className="mt-2 text-pretty text-muted-foreground">{SUBTITLE}</p>
        </div>

        <div className="mt-10 rounded-2xl border bg-card/80 p-6 shadow-xl shadow-brand/5 backdrop-blur sm:p-8">
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

          <div className="my-7 flex items-center gap-4 text-xs text-muted-foreground uppercase">
            <span aria-hidden className="h-px flex-1 bg-border" />
            or with email
            <span aria-hidden className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor={`${id}-name`}>Full name</Label>
              <Input
                id={`${id}-name`}
                name="name"
                required
                autoComplete="name"
                placeholder="Ada Lovelace"
                className="h-10 px-3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`${id}-email`}>Work email</Label>
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
              <Label htmlFor={`${id}-password`}>Password</Label>
              <div className="relative">
                <Input
                  id={`${id}-password`}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  aria-describedby={`${id}-rules`}
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

              <div aria-hidden className="grid grid-cols-4 gap-1.5 pt-1">
                {RULES.map((rule, i) => (
                  <span
                    key={rule.label}
                    className={cn(
                      "h-1 rounded-full bg-muted transition-colors",
                      i < passed && "bg-gradient-to-r from-brand-from to-brand-to"
                    )}
                  />
                ))}
              </div>

              <ul id={`${id}-rules`} className="grid grid-cols-1 gap-x-4 gap-y-1.5 pt-1 text-xs sm:grid-cols-2">
                {RULES.map((rule) => {
                  const met = rule.test(password);
                  return (
                    <li
                      key={rule.label}
                      className={cn(
                        "flex items-center gap-1.5 transition-colors",
                        met ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {met ? (
                        <CheckIcon aria-hidden className="size-3.5 text-primary" />
                      ) : (
                        <CircleIcon aria-hidden className="size-3.5" />
                      )}
                      {rule.label}
                      <span className="sr-only">{met ? " (done)" : " (required)"}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex items-start gap-2.5">
              <input
                id={`${id}-terms`}
                name="terms"
                type="checkbox"
                required
                className="mt-0.5 size-4 shrink-0 cursor-pointer accent-primary dark:scheme-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              />
              <Label htmlFor={`${id}-terms`} className="block leading-snug font-normal text-muted-foreground">
                I agree to the{" "}
                <a
                  href={LINKS.terms}
                  className="rounded-sm font-medium text-foreground underline underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href={LINKS.privacy}
                  className="rounded-sm font-medium text-foreground underline underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  Privacy Policy
                </a>
                .
              </Label>
            </div>

            <Button type="submit" size="lg" className="h-10 w-full">
              Create account
            </Button>
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <a
            href={LINKS.login}
            className="rounded-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            Log in
          </a>
        </p>
      </div>
    </section>
  );
}

function LogoMark() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-11">
      <rect width="24" height="24" rx="7" className="fill-primary" />
      <path
        d="M7 16.5 12 7l5 9.5"
        fill="none"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-primary-foreground"
      />
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
