"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InviteLayout, { InviteStep } from "./InviteLayout";
import InviteType from "./InviteType";
import SelectUsers from "./SelectUsers";
import CaptureDetails from "./CaptureDetails";
import ConfigurePermissions from "./ConfigurePermissions";
import ReviewAndSend from "./ReviewAndSend";
import InviteSuccess from "./InviteSuccess";

type Step = 1 | 2 | 3 | 4 | 5 | "success";

const stepLabels = [
  "Invite Type",
  "Select Users",
  "Capture Details",
  "Configure Permissions",
  "Review & Send",
];

function getSteps(current: Step): InviteStep[] {
  return stepLabels.map((label, i) => {
    const stepNum = (i + 1) as 1 | 2 | 3 | 4 | 5;
    let status: InviteStep["status"] = "pending";
    if (current === "success" || stepNum < (current as number)) {
      status = "completed";
    } else if (stepNum === current) {
      status = "active";
    }
    return { label, status };
  });
}

export default function InviteTeamMemberPage() {
  const [step, setStep] = useState<Step>(1);
  const router = useRouter();

  const goTo = (s: Step) => setStep(s);

  const handleExit = () => {
    router.push("/roles-and-permissions");
  };

  const handleCancel = () => {
    router.push("/roles-and-permissions");
  };

  const isSuccess = step === "success";
  const currentStepNum = isSuccess ? 5 : (step as number);

  return (
    <InviteLayout
      currentStep={currentStepNum}
      steps={getSteps(step)}
      onBack={
        isSuccess
          ? undefined
          : step === 1
          ? handleCancel
          : () => goTo((step as number - 1) as Step)
      }
      onExit={handleExit}
      hideBack={isSuccess}
      hideProgress={isSuccess}
    >
      {step === 1 && (
        <InviteType onNext={() => goTo(2)} />
      )}
      {step === 2 && (
        <SelectUsers onNext={() => goTo(3)} onBack={() => goTo(1)} />
      )}
      {step === 3 && (
        <CaptureDetails onNext={() => goTo(4)} onBack={() => goTo(2)} />
      )}
      {step === 4 && (
        <ConfigurePermissions onNext={() => goTo(5)} onBack={() => goTo(3)} />
      )}
      {step === 5 && (
        <ReviewAndSend
          onNext={() => goTo("success")}
          onBack={() => goTo(4)}
        />
      )}
      {isSuccess && (
        <InviteSuccess
          onAddAnother={() => goTo(1)}
          onDone={handleExit}
        />
      )}
    </InviteLayout>
  );
}
