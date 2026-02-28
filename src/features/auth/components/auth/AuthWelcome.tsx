"use client";

import { useState } from "react";
import Link from "next/link";
import RegisterForm from "./register/RegisterForm";
import InviteForm from "./invite/InviteForm";
import AuthWelcomeLayout from "./shared/AuthWelcomeLayout";
import { Button } from "@/shared/components/ui/button";
import SignInForm from "./signin/SignInForm";
import OTPInput from "./signin/OTPInput";
import BusinessProfiles from "./BusinessProfiles";
import { usePingAuthFlow } from "../../hooks/usePingAuthFlow";
import { useOtpValidation, getOtpMessage } from "../../hooks/useOtpValidation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

type ViewType = "welcome" | "signin" | "register" | "invite" | "otp" | "business";

export default function AuthWelcome() {
  const [currentView, setCurrentView] = useState<ViewType>("welcome");
  const [otpCell, setOtpCell] = useState<string>("");
  const [otpQname, setOtpQname] = useState<string>("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const {
    otpLoading,
    otpError,
    setOtpError,
    validateAndFetchAccounts,
    resendOtp
  } = useOtpValidation();

  // Handle Ping authorization callback: exchange ?code= for an access token
  const { tokenError } = usePingAuthFlow({
    onOtpReady: (cellNumber, qname, mappedErrorCode) => {
      setOtpCell(cellNumber);
      setOtpQname(qname);
      setCurrentView("otp");
      if (mappedErrorCode) {
        setOtpError(getOtpMessage(mappedErrorCode));
      }
    },
    onCustomerFetchError: () => setShowErrorPopup(true),
  });

  if (currentView === "signin") {
    return <SignInForm />;
  }

  if (currentView === "register") {
    return <RegisterForm />;
  }

  if (currentView === "invite") {
    return <InviteForm />;
  }

  if (currentView === "business") {
    return <BusinessProfiles />;
  }

  if (currentView === "otp") {
    const masked = otpCell && otpCell.length >= 4
      ? `******${otpCell.slice(-4)}`
      : "******0000";

    return (
      <OTPInput
        length={5}
        maskedDestination={masked}
        resendCooldownSeconds={30}
        isLoading={otpLoading}
        errorMessage={otpError}
        onComplete={(otpCode) => {
          console.log("[OTP] Entered OTP is:", otpCode);
          validateAndFetchAccounts(otpCell, otpCode, otpQname, () => {
            console.log("[OTP] Fully Validated! Continuing to business profile selection...");
            setCurrentView("business");
          });
        }}
        onResend={() => {
          resendOtp(otpCell, (newQname) => {
            setOtpQname(newQname);
          });
        }}
      />
    );
  }

  return (
    <AuthWelcomeLayout>
      <Dialog open={showErrorPopup} onOpenChange={setShowErrorPopup}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-center mt-4">Oops! something went wrong.</DialogTitle>
            <DialogDescription className="text-center pt-2 pb-6">
              Try Again
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center w-full">
            <Button onClick={() => window.location.href = "/"} className="w-1/2 py-6 font-medium text-lg">
              ok
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex-1 flex flex-col justify-center w-full max-w-md mx-auto px-2">
        <div className="text-center">
          <p className="text-white text-xl mb-0.5">Welcome to the</p>
          <h1 className="text-white text-[32px] font-medium mb-5">Business Hub</h1>
          <p className="text-blue-100/90 text-xs leading-relaxed md:px-10 mb-3.5">
            Sign in with your Online Banking for Business credentials. If you are new to the bank or
            on Business Online, please register first.
          </p>
        </div>
        <div className="space-y-4">
          <Link href="/signin" className="block">
            <Button className="w-full">SIGN IN</Button>
          </Link>

          <Link href="/register" className="block">
            <Button variant="outline" className="w-full">
              REGISTER
            </Button>
          </Link>

          <Link href="/invite" className="block">
            <Button
              variant="outline"
              className="w-full bg-transparent text-white border-white hover:text-white hover:bg-primary-dark hover:border-primary-dark"
            >
              USE INVITE
            </Button>
          </Link>
        </div>

        <div className="text-center px-8 mt-6">
          <p className="text-white text-xs max-w-64 mx-auto leading-relaxed">
            By signing in, I agree to the{" "}
            <Link href="/terms" className="text-blue-500 font-bold hover:underline">
              T&Cs
            </Link>{" "}
            on behalf of all the legal entities I represent
          </p>
        </div>
      </div>

      <div className="mt-auto">
        <p className="w-full sm:max-w-3xl mx-auto text-center text-blue-100/90 text-xs leading-relaxed">
          Standard Bank is a licensed financial services provider in terms of the Financial Advisory
          and Intermediary Services Act and a registered credit provider in terms of the National
          Credit Act, registration number NCRCP15.
        </p>
      </div>
    </AuthWelcomeLayout>
  );
}
