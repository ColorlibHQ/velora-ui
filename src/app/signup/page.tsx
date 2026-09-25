import type { Metadata } from "next";

import { AuthForm } from "@/components/template/auth-form";
import { AuthVisual } from "@/components/template/auth-visual";

export const metadata: Metadata = {
  title: "Sign up",
  alternates: { canonical: "/signup" },
  // Demo form page — no real accounts behind it.
  robots: { index: false, follow: true },
  description: "Create your Velora UI account.",
};

export default function SignupPage() {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <AuthForm mode="signup" />
        </div>
      </div>
      <AuthVisual />
    </main>
  );
}
