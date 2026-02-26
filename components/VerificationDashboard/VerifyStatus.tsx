"use client";

import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import icnLoadLg from "@/assets/images/icons/icn_load_lg.svg";
import icnSuccessLg from "@/assets/images/icons/icn_success_lg.svg";

type VerifyStatusType = "pending" | "verified";

interface VerifyStatusProps {
  status?: VerifyStatusType;
  estimatedHours?: number;
  onDone?: () => void;
}

function VerifyStatus({ status = "pending", estimatedHours = 12, onDone }: VerifyStatusProps) {
  const handleDone = () => {
    onDone?.();
  };

  const renderContent = () => {
    if (status === "verified") {
      return (
        <>
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24">
              <Image src={icnSuccessLg} alt="Success" fill className="object-contain" priority />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-xl font-medium text-neutral-950 mb-4 text-center">
            Identity verified
          </h1>

          {/* Description */}
          <p className="text-neutral-950 text-center mb-8 leading-relaxed">
            Your identity has been verified successfully. Proceed with the registration
          </p>

          {/* Done Button */}
          <Button variant="outline" onClick={handleDone} className="w-full max-w-xs mx-auto block">
            DONE
          </Button>
        </>
      );
    }

    // Pending status
    return (
      <>
        {/* Loading Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative w-24 h-24">
            <Image
              src={icnLoadLg}
              alt="Loading"
              fill
              className="object-contain animate-spin"
              priority
            />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-xl font-medium text-neutral-950 mb-4 text-center">
          Identity information sent
        </h1>

        {/* Description */}
        <p className="text-neutral-950 text-center mb-2 leading-relaxed">
          You can use the app as usual while we confirm your identity
        </p>

        {/* Estimated Time */}
        <p className="text-neutral-950 text-center font-medium">
          This could take up to {estimatedHours} hours
        </p>
      </>
    );
  };

  return (
    <div className="page-container py-40">
      <div className="w-full md:max-w-md mx-auto py-10">{renderContent()}</div>
    </div>
  );
}

export default VerifyStatus;
