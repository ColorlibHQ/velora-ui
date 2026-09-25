import { DocsSidebar } from "@/components/docs/sidebar";
import { SiteHeader } from "@/components/site-header";

export default function ComponentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto flex w-full min-w-0 max-w-7xl gap-10 px-4 pt-24 pb-20 lg:px-8">
        <aside className="sticky top-24 hidden h-[calc(100vh-8rem)] w-56 shrink-0 overflow-y-auto pr-2 lg:block">
          <DocsSidebar />
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </>
  );
}
