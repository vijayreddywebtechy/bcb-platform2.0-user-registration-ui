"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Toolbar from "./Toolbar";
import { Button } from "../ui/button";
import Image from "next/image";
import Qrmobile from "@/assets/images/qr/qr_mobile.png"

const QRMobileVerification: React.FC = () => {
  const router = useRouter();

  const handleContinueOnDevice = () => {
    console.log("Continue on current device...");
    // OLD: No navigation was implemented
    // REASON: Updated per flow requirements - should navigate to VerifyStatus with pending status
    router.push("/verification/status?status=pending");
  };

  const handleCancel = () => {
    console.log("Verification cancelled");
    // Navigate back to verification instructions
    router.push("/verification/instructions");
  };

  return (
    <>
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

      <div className="page-container py-10">
        <div className="w-full md:max-w-md mx-auto text-center">
 
          {/* Heading */}
          <h1 className="text-lg font-medium text-secondary mb-3">
            Continue verification on your phone
          </h1>

          {/* Instruction Text */}
          <p className="text-secondary mb-6 leading-relaxed">
            Please scan the QR code below using your phone's camera (recommended)
          </p>

          {/* QR Code Image */}
          <div className="flex justify-center mb-6">
            <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm">
              <Image
                src={Qrmobile}
                alt="QR Code for mobile verification"
                width={200}
                height={200}
                className="w-48 h-48"
                priority
              />
            </div>
          </div>

          {/* Alternative Option */}
          <p className="text-secondary text-center mb-8 leading-relaxed">
            Alternatively, continue using your current device with its associated image capture.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <Button onClick={handleContinueOnDevice} className="w-full">
              CONTINUE ON CURRENT DEVICE
            </Button>
            <Button variant="outline" onClick={handleCancel} className="w-full max-w-80 mx-auto mt-10">
              CANCEL
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QRMobileVerification;