import BusinessSelectApprovers from "@/components/VerificationDashboard/BusinessSelectApprovers";
import BusinessLinkingLayout from "@/components/VerificationDashboard/shared/BusinessLinkingLayout";

export default function SelectApproversPage() {
  const steps = [
    { label: "Role Definition", status: "completed" as const },
    { label: "Select Approvers", status: "active" as const },
    { label: "Capture Approver Details", status: "pending" as const },
    { label: "Verify Details & Send Invite", status: "pending" as const },
    { label: "Approval Status", status: "pending" as const },
  ];

  return (
    <BusinessLinkingLayout currentStep={2} steps={steps}>
      <BusinessSelectApprovers />
    </BusinessLinkingLayout>
  );
}
