"use client";

import { useState } from "react";
import BusinessApprovalStatus from "./BusinessLinking/BusinessApprovalStatus";
import BusinessRoleDefinition from "./BusinessLinking/BusinessRoleDefinition";
import BusinessSelectApprovers from "./BusinessLinking/BusinessSelectApprovers";
import BusinessVerifyDetails from "./BusinessLinking/BusinessVerifyDetails";
import CaptureApproverDetails from "./BusinessLinking/CaptureApproverDetails";
import BusinessLinkingLayout from "./shared/BusinessLinkingLayout";

type Step = 1 | 2 | 3 | 4 | 5;

type StepStatus = "completed" | "active" | "pending";

function getSteps(current: Step) {
  const labels = [
    "Role Definition",
    "Select Approvers",
    "Capture Approver Details",
    "Verify Details & Send Invite",
    "Approval Status",
  ];
  return labels.map((label, i) => {
    const stepNum = (i + 1) as Step;
    let status: StepStatus = "pending";
    if (stepNum < current) status = "completed";
    else if (stepNum === current) status = "active";
    return { label, status };
  });
}

type Props = {};

function BusinessLinking({}: Props) {
  const [step, setStep] = useState<Step>(1);

  const goTo = (s: Step) => setStep(s);

  return (
    <BusinessLinkingLayout currentStep={step} steps={getSteps(step)}>
      {step === 1 && <BusinessRoleDefinition onSelectApprovers={() => goTo(2)} />}
      {step === 2 && (
        <BusinessSelectApprovers onCaptureDetails={() => goTo(3)} onBack={() => goTo(1)} />
      )}
      {step === 3 && (
        <CaptureApproverDetails onVerifyDetails={() => goTo(4)} onBack={() => goTo(2)} />
      )}
      {step === 4 && (
        <BusinessVerifyDetails onRequestApproval={() => goTo(5)} onBack={() => goTo(3)} />
      )}
      {step === 5 && <BusinessApprovalStatus />}
    </BusinessLinkingLayout>
  );
}

export default BusinessLinking;
