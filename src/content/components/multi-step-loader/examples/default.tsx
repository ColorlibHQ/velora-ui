"use client";

import { useState } from "react";

import { MultiStepLoader } from "@/components/velora/multi-step-loader";

const steps = [
  { text: "Creating your workspace" },
  { text: "Inviting your team" },
  { text: "Importing projects" },
  { text: "Setting up permissions" },
  { text: "Applying your theme" },
  { text: "Almost there" },
];

export default function MultiStepLoaderDemo() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setLoading(true)}
        className="h-10 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        Show loader
      </button>
      <MultiStepLoader
        loading={loading}
        steps={steps}
        duration={1400}
        loop
        onClose={() => setLoading(false)}
      />
    </>
  );
}
