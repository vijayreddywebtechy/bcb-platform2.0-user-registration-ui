"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

function VerifyStatus({
  status: initialStatus,
  estimatedHours = 12,
  onDone,
}: VerifyStatusProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get status from URL query params or use initial status
  const urlStatus = searchParams.get("status") as VerifyStatusType | null;
  const [status, setStatus] = useState<VerifyStatusType>(
    urlStatus || initialStatus || "pending"
  );

  useEffect(() => {
    if (urlStatus) {
      setStatus(urlStatus);
    }
  }, [urlStatus]);

  const handleDone = () => {
    console.log("Done clicked");
    onDone?.();
    // OLD: No navigation was implemented
    // REASON: Updated per flow requirements - should navigate back to ConfirmIdentity
    router.push("/verification/confirm-identity");
  };

  // OLD: Loading icon was not clickable
  // REASON: Updated per flow requirements - clicking the loading icon should simulate verification completion
  const handleLoadingIconClick = () => {
    if (status === "pending") {
      console.log("Simulating verification completion...");
      setStatus("verified");
      // Update URL without navigation
      router.push("/verification/status?status=verified", { scroll: false });
    }
  };

  const renderContent = () => {
    if (status === "verified") {
      return (
        <>
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24">
              <Image
                src={icnSuccessLg}
                alt="Success"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-xl font-medium text-neutral-950 mb-4 text-center">
            Identity verified
          </h1>

          {/* Description */}
          <p className="text-neutral-950 text-center mb-8 leading-relaxed">
            Your identity has been verified successfully. Proceed with the
            registration
          </p>

          {/* Done Button */}
          <Button
            variant="outline"
            onClick={handleDone}
            className="w-full max-w-xs mx-auto block"
          >
            DONE
          </Button>
        </>
      );
    }

    // Pending status
    return (
      <>
        {/* Loading Icon - Clickable to simulate verification */}
        <div className="flex justify-center mb-6">
          <div 
            className="relative w-24 h-24 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleLoadingIconClick}
            title="Click to simulate verification completion"
          >
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

        {/* Demo Helper Text */}
        <p className="text-xs text-gray-500 text-center mt-4 italic">
          (Click the loading icon to simulate verification completion)
        </p>
      </>
    );
  };

  return (
    <div className="page-container py-40">
      <div className="w-full md:max-w-md mx-auto py-10">
        {renderContent()}
      </div>
    </div>
  );
}

export default VerifyStatus;
