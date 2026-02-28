import VerificationLayout from "@/shared/components/VerificationDashboard/shared/VerificationLayout";
import IdentityVerification from "@/shared/components/VerificationDashboard/IdentityVerification";

type Props = {};

function page({}: Props) {
  return (
    <VerificationLayout>
      <IdentityVerification />
    </VerificationLayout>
  );
}

export default page;
