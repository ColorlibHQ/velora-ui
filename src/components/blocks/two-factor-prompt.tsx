"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ShieldCheck } from "lucide-react";

/**
 * A six-digit verification step.
 *
 * `autoComplete="one-time-code"` is the load-bearing attribute: it is what lets iOS and Android
 * offer the code from the SMS or authenticator app instead of making the user switch apps and
 * memorise six digits. It is one string and it is almost always missing.
 *
 * The resend control is disabled with a visible countdown rather than hidden, so the option is
 * discoverable while the cooldown runs. A control that vanishes reads as a bug.
 */
export function TwoFactorPrompt() {
  const [code, setCode] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(24);

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent className="space-y-5 p-6 text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
          <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-xl font-bold tracking-tight">Two-factor code</h1>
          <p className="text-sm text-muted-foreground">
            Enter the six digits from your authenticator app.
          </p>
        </div>

        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={code}
            onChange={setCode}
            autoComplete="one-time-code"
            aria-label="Six-digit verification code"
          >
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button className="w-full" disabled={code.length < 6}>
          Verify
        </Button>

        <Button
          variant="ghost"
          size="sm"
          disabled={secondsLeft > 0}
          onClick={() => setSecondsLeft(24)}
          className="w-full text-xs"
        >
          {secondsLeft > 0 ? `Resend in ${secondsLeft}s` : "Resend code"}
        </Button>
      </CardContent>
    </Card>
  );
}
