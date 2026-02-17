import BusinessRoleDefinition from "@/components/VerificationDashboard/BusinessRoleDefinition";
import BusinessLinkingLayout from "@/components/VerificationDashboard/shared/BusinessLinkingLayout";

export default function RoleDefinitionPage() {
  const steps = [
    { label: "Role Definition", status: "active" as const },
    { label: "Select Approvers", status: "pending" as const },
    { label: "Capture Approver Details", status: "pending" as const },
    { label: "Verify Details & Send Invite", status: "pending" as const },
    { label: "Approval Status", status: "pending" as const },
  ];

  return (
    <BusinessLinkingLayout currentStep={1} steps={steps}>
      <BusinessRoleDefinition />
    </BusinessLinkingLayout>
  );
}
