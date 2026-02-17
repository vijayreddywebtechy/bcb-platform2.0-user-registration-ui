import CaptureApproverDetails from "@/components/VerificationDashboard/CaptureApproverDetails";
import BusinessLinkingLayout from "@/components/VerificationDashboard/shared/BusinessLinkingLayout";

export default function CaptureDetailsPage() {
  const steps = [
    { label: "Role Definition", status: "completed" as const },
    { label: "Select Approvers", status: "completed" as const },
    { label: "Capture Approver Details", status: "active" as const },
    { label: "Verify Details & Send Invite", status: "pending" as const },
    { label: "Approval Status", status: "pending" as const },
  ];

  return (
    <BusinessLinkingLayout currentStep={3} steps={steps}>
      <CaptureApproverDetails />
    </BusinessLinkingLayout>
  );
}
