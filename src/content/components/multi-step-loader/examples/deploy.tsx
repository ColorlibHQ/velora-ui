"use client";

import { useState } from "react";

import { MultiStepLoader } from "@/components/velora/multi-step-loader";

const steps = [
  { text: "Cloning repository" },
  { text: "Installing dependencies" },
  { text: "Building 42 pages" },
  { text: "Optimising images" },
  { text: "Uploading to the edge" },
  { text: "Assigning domain" },
];

export default function MultiStepLoaderDeployDemo() {
  const [deploying, setDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);

  return (
    <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">acme-marketing</h3>
          <p className="mt-1 text-sm text-muted-foreground">main · 3 commits ahead</p>
        </div>
        <span className="rounded-full border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
          {deployed ? "Live" : "Preview"}
        </span>
      </div>
      <p className="mt-5 text-sm text-muted-foreground" aria-live="polite">
        {deployed
          ? "Deployed to acme.example.com just now."
          : "Ship the latest changes to production."}
      </p>
      <button
        type="button"
        onClick={() => {
          setDeployed(false);
          setDeploying(true);
        }}
        className="mt-5 h-10 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {deployed ? "Redeploy" : "Deploy to production"}
      </button>
      <MultiStepLoader
        title="Deploying your site"
        loading={deploying}
        steps={steps}
        duration={1100}
        onComplete={() => {
          setDeploying(false);
          setDeployed(true);
        }}
        onClose={() => setDeploying(false)}
      />
    </div>
  );
}
