"use client";

import { useState } from "react";
import OutstandingActions from "./OutstandingActions";
import FaceVerificationStep from "./FaceVerificationStep";
import VerificationInstructions from "./VerificationInstructions";
import QRMobileVerification from "./QRMobileVerification";
import VerifyStatus from "./VerifyStatus";
import Toolbar from "./Toolbar";

type Step = 1 | 2 | 3 | 4 | 5;

type Props = {};

function IdentityVerification({ }: Props) {
  const [step, setStep] = useState<Step>(1);

  const goTo = (s: Step) => setStep(s);

  return (
    <>
      {step === 1 && (
        <OutstandingActions onIdentityVerificationClick={() => goTo(2)} />
      )}
      {step !== 1 && (
        <div className="bg-primary-dark">
          <div className="page-container">
            <Toolbar
              userName="Identity Verification"
              action={{
                type: "button",
                label: "Exit",
                onClick: () => console.log("Exit clicked"),
              }}
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <FaceVerificationStep
          onContinue={() => goTo(3)}
          onCancel={() => goTo(1)}
        />
      )}

      {step === 3 && (
        <VerificationInstructions
          onStartScan={() => goTo(4)}
          onCancel={() => goTo(1)}
        />
      )}

      {step === 4 && (
        <QRMobileVerification
          onContinueOnDevice={() => goTo(5)}
          onCancel={() => goTo(1)}
        />
      )}

      {step === 5 && <VerifyStatus />}
    </>
  );
}

export default IdentityVerification;
