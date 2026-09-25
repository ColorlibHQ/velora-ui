import { RocketIcon } from "lucide-react";

import { ShimmerButton } from "@/components/velora/shimmer-button";

export default function ShimmerButtonDemo() {
  return (
    <ShimmerButton>
      <RocketIcon className="size-4" />
      Get started
    </ShimmerButton>
  );
}
