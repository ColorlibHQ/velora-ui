// Velora Pro templates: full Next.js apps sold with All-Access. Source lives in
// the private velora-templates repo; live demos are served at /demos/<slug>/
// (functions/demos proxies them) and screenshots in public/templates/<slug>/.

export interface ProTemplate {
  slug: string;
  name: string;
  /** What kind of app it is, used as the card label */
  niche: string;
  tagline: string;
  description: string;
  /** Routes in the demo, relative to /demos/<slug> */
  pages: { title: string; path: string; description: string }[];
  highlights: string[];
  /** Screenshot names in public/templates/<slug>/ after the overview shot */
  gallery: { file: string; alt: string }[];
}

export const proTemplates: ProTemplate[] = [
  {
    slug: "insight",
    name: "Insight",
    niche: "SaaS analytics",
    tagline: "MRR, customers, retention and acquisition for a subscription business.",
    description:
      "A SaaS metrics dashboard with revenue movements, a customer table with detail pages, cohort retention, a trial funnel, channel economics, and billing, team and settings pages.",
    pages: [
      { title: "Overview", path: "/", description: "KPI tiles, MRR growth, plan mix, MRR movements, top accounts" },
      { title: "Revenue", path: "/revenue/", description: "ARR, LTV:CAC, payback, monthly movement breakdown" },
      { title: "Customers", path: "/customers/", description: "Data Grid with search, filters, selection and export" },
      { title: "Customer detail", path: "/customers/cus_rs/", description: "MRR history, activity timeline, account details" },
      { title: "Retention", path: "/retention/", description: "Cohort heatmap and trial funnel" },
      { title: "Acquisition", path: "/acquisition/", description: "Trials by source and channel unit economics" },
      { title: "Billing", path: "/billing/", description: "Plan, usage meters, payment methods, invoices" },
      { title: "Team", path: "/team/", description: "Roles, pending invitations, audit log" },
      { title: "Settings", path: "/settings/", description: "Workspace, notifications, API keys, sessions, danger zone" },
      { title: "Sign in", path: "/login/", description: "Split auth layout with an aurora panel" },
      { title: "Sign up", path: "/signup/", description: "Trial sign-up with live password rules" },
    ],
    highlights: ["60 static pages", "48 customer detail pages", "⌘K command menu", "Light and dark", "Collapsible sidebar", "Seeded demo data in one file"],
    gallery: [
      { file: "customers", alt: "Insight customers table with filters" },
      { file: "retention", alt: "Insight cohort retention heatmap and trial funnel" },
      { file: "billing", alt: "Insight billing page with plans and invoices" },
    ],
  },
];

export const proTemplateBySlug = (slug: string) => proTemplates.find((t) => t.slug === slug);

/** Shared by every template */
export const templateStack = ["Next.js 16", "React 19", "Tailwind CSS 4", "shadcn/ui", "TypeScript", "Recharts", "TanStack Table", "Motion"];
