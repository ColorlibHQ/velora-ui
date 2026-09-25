import { Stepper } from "@/components/velora/stepper";

export default function StepperDemo() {
  return (
    <Stepper
      className="max-w-xs"
      steps={["Account", "Plan", "Done"]}
      current={1}
    />
  );
}
