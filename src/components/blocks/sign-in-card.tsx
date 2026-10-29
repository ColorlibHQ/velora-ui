"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";

/**
 * A sign-in card with the details that are usually wrong.
 *
 * The heading is an `<h1>`, not a styled `<div>`. On an auth page this is the only heading, so
 * without it a screen-reader user landing on the page has nothing to navigate to and no statement
 * of what the page is.
 *
 * `autoComplete="current-password"` (not just "password") is what tells a password manager this is
 * a sign-in rather than a registration, and it is why "new-password" belongs on the sign-up form
 * instead. Getting these two backwards is why managers offer to generate a password on login.
 *
 * The reveal toggle sets `aria-pressed` and changes its accessible name, so its state is knowable
 * without seeing the icon. It stays a `<button type="button">` — inside a form, a bare `<button>`
 * submits.
 */
export function SignInCard() {
  const [visible, setVisible] = useState(false);

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent className="space-y-5 p-6">
        <div className="space-y-1.5 text-center">
          <h1 className="text-xl font-bold tracking-tight">Sign in</h1>
          <p className="text-sm text-muted-foreground">Welcome back. Pick up where you left off.</p>
        </div>

        <form className="space-y-4" onSubmit={(event) => event.preventDefault()}>
          <div className="space-y-2">
            <Label htmlFor="signin-email">Email</Label>
            <Input
              id="signin-email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="signin-password">Password</Label>
              <a
                href="/reset-password"
                className="text-xs font-medium text-primary hover:underline"
              >
                Forgot?
              </a>
            </div>
            <div className="relative">
              <Input
                id="signin-password"
                type={visible ? "text" : "password"}
                autoComplete="current-password"
                required
                className="pe-10"
              />
              <button
                type="button"
                onClick={() => setVisible((prev) => !prev)}
                aria-pressed={visible}
                aria-label={visible ? "Hide password" : "Show password"}
                className="absolute top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground ltr:right-1 rtl:left-1"
              >
                {visible ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox id="signin-remember" />
            <Label htmlFor="signin-remember" className="text-sm font-normal">
              Keep me signed in
            </Label>
          </div>

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          No account?{" "}
          <a href="/register" className="font-medium text-primary hover:underline">
            Create one
          </a>
        </p>
      </CardContent>
    </Card>
  );
}
