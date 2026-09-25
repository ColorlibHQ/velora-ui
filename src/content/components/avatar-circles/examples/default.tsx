import { AvatarCircles } from "@/components/velora/avatar-circles";

export default function AvatarCirclesDemo() {
  return (
    <AvatarCircles
      people={["Maya Chen", "Tom Okafor", "Sofia Lindqvist", "Dan Romero"]}
      extra={2400}
    />
  );
}
