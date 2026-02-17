import BusinessVerifyDetails from "@/components/VerificationDashboard/BusinessVerifyDetails";
import BusinessLinkingLayout from "@/components/VerificationDashboard/shared/BusinessLinkingLayout";

export default function VerifyDetailsPage() {
  const steps = [
    { label: "Role Definition", status: "completed" as const },
    { label: "Select Approvers", status: "completed" as const },
    { label: "Capture Approver Details", status: "completed" as const },
    { label: "Verify Details & Send Invite", status: "active" as const },
    { label: "Approval Status", status: "pending" as const },
  ];

  return (
    <BusinessLinkingLayout currentStep={4} steps={steps}>
      <BusinessVerifyDetails />
    </BusinessLinkingLayout>
  );
}
