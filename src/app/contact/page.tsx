import { MailIcon, MessageCircleIcon, StarIcon } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHeader } from "@/components/page-header";
import { BlurFade } from "@/components/velora/blur-fade";
import { ContactForm } from "@/components/template/contact-form";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Questions about Velora UI, the registry or the upcoming Pro tier? Get in touch.",
  path: "/contact",
});

const channels = [
  {
    icon: <MailIcon className="size-5" />,
    title: "Email",
    body: "For licensing and Pro questions.",
    detail: "hello@velora.dev",
  },
  {
    icon: <MessageCircleIcon className="size-5" />,
    title: "GitHub discussions",
    body: "Bug reports, component requests and Q&A.",
    detail: "github.com/velora-ui",
  },
  {
    icon: <StarIcon className="size-5" />,
    title: "Feature requests",
    body: "Tell us which component to build next.",
    detail: "Open an issue with the idea label",
  },
];

export default function ContactPage() {
  return (
    <main className="relative">
      <SiteHeader />

      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Talk to a <span className="text-primary">human</span>
          </>
        }
        description="Questions about components, the registry or Pro? Send a message — we read everything."
      />

      <section className="pb-28">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 lg:grid-cols-[1fr_1.3fr] lg:gap-16 lg:px-8">
          <BlurFade direction="right">
            <div className="space-y-4">
              {channels.map((channel) => (
                <div
                  key={channel.title}
                  className="flex items-start gap-4 rounded-2xl border bg-card p-6"
                >
                  <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {channel.icon}
                  </span>
                  <div>
                    <h2 className="font-semibold">{channel.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {channel.body}
                    </p>
                    <p className="mt-2 text-sm font-medium text-primary">
                      {channel.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </BlurFade>
          <BlurFade direction="left" delay={0.12}>
            <ContactForm />
          </BlurFade>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
