"use client";

import AuthLayout from "./shared/AuthLayout";
import AuthCard from "./shared/AuthCard";
import { Button } from "@/shared/components/ui/button";
import Image from "next/image";
import icnAlert from "@/assets/images/icons/icn_alert_lg.svg";

export default function Declined() {
  const handleDone = () => {
    // Navigate to dashboard or home
  };

  return (
    <AuthLayout>
      <AuthCard className="w-full max-w-lg mx-auto mb-4">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <Image src={icnAlert} alt="Alert" width={100} height={100} />
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-secondary mb-4">Declined</h1>
          <p className="text-sm sm:text-base text-secondary leading-relaxed mb-3 w-full max-w-sm mx-auto">
            Your decline has been noted and access will not be granted to the requester
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">They will be notified soon</p>
        </div>

        {/* Action Button */}
        <Button onClick={handleDone} className="w-full">
          DONE
        </Button>
      </AuthCard>
    </AuthLayout>
  );
}
