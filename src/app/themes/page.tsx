import type { Metadata } from "next";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHeader } from "@/components/page-header";
import { BlurFade } from "@/components/velora/blur-fade";
import { ThemePicker } from "@/components/template/theme-picker";

export const metadata: Metadata = {
  title: "Themes",
  alternates: { canonical: "/themes" },
  description:
    "Six ready-made brand ramps for Velora UI. Preview live, copy seven CSS variables, rebrand your whole landing page.",
};

export default function ThemesPage() {
  return (
    <main className="relative">
      <SiteHeader />

      <PageHeader
        eyebrow="Themes"
        title={
          <>
            Rebrand in <span className="text-primary">seven variables</span>
          </>
        }
        description="Velora components never hardcode a color — they read your brand ramp from CSS tokens. Pick a preset, watch every effect follow, then copy the block into globals.css."
      />

      <section className="pb-28">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          <BlurFade>
            <ThemePicker />
          </BlurFade>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
