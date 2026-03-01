"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { STORAGE_KEYS } from "@/config";
import OutstandingActions from "./OutstandingActions";
import FaceVerificationStep from "./FaceVerificationStep";
import VerificationInstructions from "./VerificationInstructions";
import QRMobileVerification from "./QRMobileVerification";
import VerifyStatus from "./VerifyStatus";
import Toolbar from "./Toolbar";

type Step = 1 | 2 | 3 | 4 | 5;

type Props = {};

function IdentityVerification({ }: Props) {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    try {
      const selectedCustomerStr = localStorage.getItem(STORAGE_KEYS.SELECTED_CUSTOMER);
      if (!selectedCustomerStr) {
        throw new Error("Missing company object");
      }

      const parsed = JSON.parse(selectedCustomerStr);
      if (!parsed || !parsed.bpid) {
        throw new Error("Missing BPID in selected company");
      }

      setIsValidating(false);
    } catch (e) {
      console.error("Selected company validation failed:", e);
      // Fallback redirect
      router.push("/business-profiles");
    }
  }, [router]);

  const goTo = (s: Step) => setStep(s);

  if (isValidating) return null;

  return (
    <>
      {step === 1 && <OutstandingActions onIdentityVerificationClick={() => goTo(2)} />}
      {step !== 1 && (
        <div className="bg-primary-dark">
          <div className="page-container">
            <Toolbar
              userName="Identity Verification"
              action={{
                type: "button",
                label: "Exit",
              }}
            />
          </div>
        </div>
      )}

      {step === 2 && <FaceVerificationStep onContinue={() => goTo(3)} onCancel={() => goTo(1)} />}

      {step === 3 && (
        <VerificationInstructions onStartScan={() => goTo(4)} onCancel={() => goTo(1)} />
      )}

      {step === 4 && (
        <QRMobileVerification onContinueOnDevice={() => goTo(5)} onCancel={() => goTo(1)} />
      )}

      {step === 5 && <VerifyStatus />}
    </>
  );
}

export default IdentityVerification;
