import { AuthForm } from "@/components/template/auth-form";
import { AuthVisual } from "@/components/template/auth-visual";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sign up",
  description: "Create your Velora UI account.",
  path: "/signup",
  noindex: true,
});

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
