import { TweetCard } from "@/components/velora/tweet-card";

export default function TweetCardDemo() {
  return (
    <TweetCard
      name="Dana Whitfield"
      handle="danawhit"
      time="2h"
      verified
      content="Velora publishes the gzipped size of every component. Nobody else does this."
    />
  );
}
