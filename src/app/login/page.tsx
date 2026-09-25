import type { Metadata } from "next";

import { AuthForm } from "@/components/template/auth-form";
import { AuthVisual } from "@/components/template/auth-visual";

export const metadata: Metadata = {
  title: "Log in",
  alternates: { canonical: "/login" },
  // Demo form page — no real accounts behind it.
  robots: { index: false, follow: true },
  description: "Log in to your Velora UI account.",
};

export default function LoginPage() {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <AuthForm mode="login" />
        </div>
      </div>
      <AuthVisual />
    </main>
  );
}
