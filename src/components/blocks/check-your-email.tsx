"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MailCheck } from "lucide-react";

/**
 * The screen after a magic link or reset email is sent.
 *
 * Three things it does that the usual version does not.
 *
 * It shows the address the mail went to. Half of "I never got the email" is a typo in the address,
 * and the user cannot see it once the form is gone.
 *
 * It offers a way back to the form to correct that address, rather than only a resend that would
 * send to the same wrong place again.
 *
 * It names the sender and the subject line, so the mail is findable in a spam folder — the other
 * half of "I never got the email".
 */
export function CheckYourEmail() {
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent className="space-y-5 p-6 text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-success/10">
          <MailCheck className="h-5 w-5 text-success" aria-hidden="true" />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-xl font-bold tracking-tight">Check your email</h1>
          <p className="text-sm text-muted-foreground">
            We sent a sign-in link to{" "}
            <span className="font-medium text-foreground">ana@example.com</span>. It expires in 15
            minutes.
          </p>
        </div>

        <div className="rounded-lg bg-muted/50 p-3 text-start">
          <p className="text-xs text-muted-foreground">
            Not there? Look for{" "}
            <span className="font-medium text-foreground">&ldquo;Your sign-in link&rdquo;</span> from{" "}
            <span className="font-medium text-foreground">no-reply@apex.dev</span>, and check spam.
          </p>
        </div>

        <div className="space-y-2">
          <Button variant="outline" className="w-full">
            Resend link
          </Button>
          <Button variant="ghost" size="sm" className="w-full text-xs">
            Use a different address
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
