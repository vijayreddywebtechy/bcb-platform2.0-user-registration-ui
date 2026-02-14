import BusinessRoleDefinition from './BusinessRoleDefinition'
import CaptureApproverDetails from './CaptureApproverDetails'
import BusinessVerifyDetails from './BusinessVerifyDetails'
import BusinessApprovalStatus from './BusinessApprovalStatus'
import BusinessLinkingLayout from './shared/BusinessLinkingLayout'
import BusinessSelectApprovers from './BusinessSelectApprovers'

type Props = {}

function BusinessLinking({ }: Props) {
  // Define the steps for the business linking flow
  const steps = [
    { label: "Role Definition", status: "completed" as const },
    { label: "Select Approvers", status: "completed" as const },
    { label: "Capture Approver Details", status: "completed" as const },
    { label: "Verify Details & Send Invite", status: "completed" as const },
    { label: "Approval Status", status: "active" as const },
  ];

  return (
    <BusinessLinkingLayout currentStep={1} steps={steps}>
      {/* <BusinessRoleDefinition /> */}
      {/* <BusinessSelectApprovers /> */}
      <CaptureApproverDetails />
      {/* <BusinessVerifyDetails /> */}
      {/* <BusinessApprovalStatus /> */}
    </BusinessLinkingLayout>
  )
}

export default BusinessLinking