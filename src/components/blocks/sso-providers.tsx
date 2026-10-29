"use client";

import { Button } from "@/components/ui/button";

/**
 * SSO buttons above a divider, with no vendor logos shipped.
 *
 * Deliberately no brand marks: Google, GitHub and Microsoft logos are trademarked and each carries
 * its own usage terms, so bundling them into a resold template hands every customer a licensing
 * problem they did not ask for. Text buttons work everywhere and are trivially replaced with the
 * real assets from each vendor's own brand kit.
 *
 * The "or" divider is `aria-hidden` with the rule drawn by two borders rather than an `<hr>`, since
 * it is decoration — a screen reader announcing "or, separator" between two button groups adds
 * nothing.
 */
export function SsoProviders() {
  const providers = ["Google", "GitHub", "Microsoft"];

  return (
    <div className="mx-auto w-full max-w-sm space-y-4">
      <div className="space-y-2">
        {providers.map((provider) => (
          <Button key={provider} variant="outline" className="w-full">
            Continue with {provider}
          </Button>
        ))}
      </div>

      <div aria-hidden="true" className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <Button variant="ghost" className="w-full">
        Sign in with email instead
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Single sign-on is enforced for members of an organisation with SSO enabled.
      </p>
    </div>
  );
}
