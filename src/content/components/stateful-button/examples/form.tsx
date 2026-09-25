"use client";

import { StatefulButton } from "@/components/velora/stateful-button";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function saveProfile() {
  await wait(1400);
}

async function syncToCrm() {
  await wait(1400);
  throw new Error("CRM is unreachable");
}

const field =
  "h-10 w-full rounded-lg border bg-background px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

export default function StatefulButtonFormDemo() {
  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-sm"
    >
      <h3 className="font-semibold">Profile</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Update how your name appears to teammates.
      </p>
      <div className="mt-5 grid gap-4">
        <label className="grid gap-1.5 text-sm font-medium">
          Display name
          <input className={field} defaultValue="Ada Lovelace" />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Email
          <input type="email" className={field} defaultValue="ada@example.com" />
        </label>
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
        {/* This one rejects, to show the error state */}
        <StatefulButton
          onClick={syncToCrm}
          errorText="Sync failed"
          className="text-foreground [--surface:var(--color-muted)]"
        >
          Sync to CRM
        </StatefulButton>
        <StatefulButton type="submit" onClick={saveProfile} successText="Saved">
          Save changes
        </StatefulButton>
      </div>
    </form>
  );
}
