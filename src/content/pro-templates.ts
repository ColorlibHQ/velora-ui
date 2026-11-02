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
  {
    slug: "relay",
    name: "Relay",
    niche: "CRM",
    tagline: "A sales CRM with a working pipeline: deals, contacts, companies and tasks.",
    description:
      "A CRM with a drag-and-drop pipeline that also works from the keyboard, deal and contact pages with activity timelines, companies, a task list, sales reports and workspace settings.",
    pages: [
      { title: "Overview", path: "/", description: "Pipeline value, win rate, won vs target, tasks, activity" },
      { title: "Pipeline", path: "/pipeline/", description: "Kanban by stage: drag, or move from the keyboard, with undo" },
      { title: "Deals", path: "/deals/", description: "Every deal with stage, value, owner and close date" },
      { title: "Deal detail", path: "/deals/d-1001/", description: "Stage progress, contacts, activity, notes and tasks" },
      { title: "Contacts", path: "/contacts/", description: "Data Grid with filters, selection and bulk actions" },
      { title: "Contact detail", path: "/contacts/aisha-cohen/", description: "Deals, activity and details for one person" },
      { title: "Companies", path: "/companies/", description: "Accounts with industry, open deals and won revenue" },
      { title: "Tasks", path: "/tasks/", description: "Overdue, today and upcoming, linked to deals" },
      { title: "Reports", path: "/reports/", description: "Win/loss, rep leaderboard, sales cycle, revenue by source" },
      { title: "Settings", path: "/settings/", description: "Pipeline stages, notifications, team, integrations" },
      { title: "Sign in", path: "/login/", description: "Split auth layout with an aurora panel" },
      { title: "Sign up", path: "/signup/", description: "Sign-up with live password rules" },
    ],
    highlights: ["Keyboard-operable kanban", "Moves announced to screen readers", "Undo on every move", "60 deals, 80 contacts", "Light and dark", "Seeded demo data in one file"],
    gallery: [
      { file: "pipeline", alt: "Relay pipeline kanban board" },
      { file: "contacts", alt: "Relay contacts table" },
      { file: "reports", alt: "Relay sales reports" },
    ],
  },
  {
    slug: "prism",
    name: "Prism",
    niche: "AI assistant",
    tagline: "A chat assistant with a workspace behind it: models, usage, keys and team.",
    description:
      "An AI app with streaming chat, citations and tool calls, conversation history, a prompt library, a model catalogue, token and spend analytics, API keys and workspace settings.",
    pages: [
      { title: "Chat", path: "/", description: "Streaming replies with stop, citations, tool calls, model picker" },
      { title: "Conversation", path: "/chats/churn-board/", description: "Any conversation by URL, grouped history alongside" },
      { title: "History", path: "/history/", description: "Data Grid of every conversation with model and token counts" },
      { title: "Prompts", path: "/prompts/", description: "Prompt library with tags; opens a new chat preloaded" },
      { title: "Models", path: "/models/", description: "Context window, price per 1M tokens, latency, capabilities" },
      { title: "Usage", path: "/usage/", description: "Tokens per day by model, spend by member and model, quotas" },
      { title: "API keys", path: "/api-keys/", description: "Create, reveal, copy and revoke keys with per-key usage" },
      { title: "Settings", path: "/settings/", description: "Profile, defaults, data controls, team, danger zone" },
      { title: "Sign in", path: "/login/", description: "Split auth layout with an aurora panel" },
      { title: "Sign up", path: "/signup/", description: "Sign-up with live password rules" },
    ],
    highlights: ["Streaming replies with stop", "Reduced-motion aware", "Enter to send, Shift+Enter for a new line", "Chats persist across pages", "Light and dark", "Seeded demo data in one file"],
    gallery: [
      { file: "usage", alt: "Prism usage analytics with tokens per day by model" },
      { file: "models", alt: "Prism model catalogue" },
      { file: "prompts", alt: "Prism prompt library" },
    ],
  },
  {
    slug: "harbor",
    name: "Harbor",
    niche: "E-commerce admin",
    tagline: "A store admin for orders, products, customers and stock.",
    description:
      "An e-commerce back office with an order queue and order pages whose totals add up, a product editor with margin, customers, inventory with restock, discount codes, sales analytics and store settings.",
    pages: [
      { title: "Overview", path: "/", description: "Revenue, orders, AOV, sales over time, top products, low stock" },
      { title: "Orders", path: "/orders/", description: "Data Grid with payment and fulfilment filters and bulk actions" },
      { title: "Order detail", path: "/orders/1500/", description: "Line items, totals, timeline, customer, shipping, notes" },
      { title: "Products", path: "/products/", description: "Catalogue with thumbnails, stock, status and filters" },
      { title: "Product editor", path: "/products/p001/", description: "Pricing with margin, inventory, variants, status" },
      { title: "Customers", path: "/customers/", description: "Data Grid with segments, orders and total spent" },
      { title: "Customer detail", path: "/customers/cus_1001/", description: "Order history and contact details" },
      { title: "Inventory", path: "/inventory/", description: "Stock by variant with low and out-of-stock states, restock" },
      { title: "Discounts", path: "/discounts/", description: "Codes with type, value, usage against limit and dates" },
      { title: "Analytics", path: "/analytics/", description: "Channels, categories, funnel, new vs returning customers" },
      { title: "Settings", path: "/settings/", description: "Store, payments, shipping zones, notifications, staff" },
      { title: "Sign in", path: "/login/", description: "Split auth layout with an aurora panel" },
      { title: "Sign up", path: "/signup/", description: "Sign-up with live password rules" },
    ],
    highlights: ["500 orders that add up to the cent", "Product editor with live margin", "Fulfilment queue", "No external images", "Light and dark", "Seeded demo data in one file"],
    gallery: [
      { file: "orders", alt: "Harbor orders table" },
      { file: "products", alt: "Harbor product catalogue" },
      { file: "analytics", alt: "Harbor sales analytics" },
    ],
  },
];

export const proTemplateBySlug = (slug: string) => proTemplates.find((t) => t.slug === slug);

/** Shared by every template */
export const templateStack = ["Next.js 16", "React 19", "Tailwind CSS 4", "shadcn/ui", "TypeScript", "Recharts", "TanStack Table", "Motion"];
