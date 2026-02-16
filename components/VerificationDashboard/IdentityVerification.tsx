import ConfirmIdentity from "./ConfirmIdentity";
import FaceVerificationStep from "./FaceVerificationStep";
import QRMobileVerification from "./QRMobileVerification";
import VerificationLayout from "./shared/VerificationLayout";
import VerificationInstructions from "./VerificationInstructions";
import VerifyStatus from "./VerifyStatus";

type Props = {};

function IdentityVerification({}: Props) {
  return (
    <VerificationLayout>
       {/* <ConfirmIdentity /> */}
       {/* <FaceVerificationStep /> */}
       {/* <VerificationInstructions/> */}
       {/* <VerifyStatus /> */}
       <QRMobileVerification />
    </VerificationLayout>
  );
}

export default IdentityVerification;
