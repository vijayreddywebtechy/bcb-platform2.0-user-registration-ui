"use client";

import AuthLayout from "./shared/AuthLayout";
import AuthCard from "./shared/AuthCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import icnSuccess from "@/assets/images/icons/icn_success_lg.svg";

export default function ApprovalSent() {
  const handleDone = () => {
    // Navigate to dashboard or home
  };

  return (
    <AuthLayout>
      <AuthCard className="w-full max-w-lg mx-auto mb-4">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <Image src={icnSuccess} alt="Success" width={100} height={100} />
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h1 className="text-3xl text-secondary mb-4">Approval Sent</h1>
          <p className="text-base text-secondary leading-relaxed mb-3">
            Your approval has been noted and access will be granted once profile creation is
            finalised
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            You will be notified when all approval is complete
          </p>
        </div>

        {/* Action Button */}
        <Button onClick={handleDone} className="w-full">
          DONE
        </Button>
      </AuthCard>
    </AuthLayout>
  );
}
