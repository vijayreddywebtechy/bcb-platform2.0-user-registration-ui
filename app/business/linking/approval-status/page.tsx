import BusinessApprovalStatus from "@/components/VerificationDashboard/BusinessApprovalStatus";
import BusinessLinkingLayout from "@/components/VerificationDashboard/shared/BusinessLinkingLayout";

export default function ApprovalStatusPage() {
  const steps = [
    { label: "Role Definition", status: "completed" as const },
    { label: "Select Approvers", status: "completed" as const },
    { label: "Capture Approver Details", status: "completed" as const },
    { label: "Verify Details & Send Invite", status: "completed" as const },
    { label: "Approval Status", status: "active" as const },
  ];

  return (
    <BusinessLinkingLayout currentStep={5} steps={steps}>
      <BusinessApprovalStatus />
    </BusinessLinkingLayout>
  );
}
