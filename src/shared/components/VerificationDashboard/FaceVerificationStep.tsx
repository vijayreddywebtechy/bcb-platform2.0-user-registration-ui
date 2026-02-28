"use client";

import React from "react";
import { ScanFace, Info } from "lucide-react";
import VerificationLayout from "./shared/VerificationLayout";
import Toolbar from "./Toolbar";
import { Button } from "@/shared/components/ui/button";

interface FaceVerificationStepProps {
  onContinue?: () => void;
  onCancel?: () => void;
}

const FaceVerificationStep: React.FC<FaceVerificationStepProps> = ({ onContinue, onCancel }) => {
  const handleContinue = () => {
    onContinue?.();
  };

  const handleCancel = () => {
    onCancel?.();
  };

  return (
    <>
      <div className="page-container py-10">
        <div className="w-full md:max-w-[526px]">
          {/* Icon */}
          <div className="mb-4">
            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
              <ScanFace className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-lg font-medium text-secondary mb-3">
            Scan your face to confirm your identity
          </h1>

          {/* Recommended Text */}
          <p className="text-secondary mb-6 leading-relaxed">
            <span className="font-medium">Recommended:</span> You will have the option to continue
            on web or scan a QR code to continue on your mobile phone.
          </p>

          {/* Continue Info */}
          <p className="text-secondary mb-8 leading-relaxed">
            By selecting "<span className="font-medium">Continue</span>", you'll be redirected to
            our trusted partner to verify your identity.
          </p>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-10">
            <div className="flex gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <Info className="w-5 h-5 text-white fill-primary-dark" />
              </div>
              <div className="text-sm text-secondary leading-relaxed">
                <span className="font-medium">By continuing,</span> you give us permission to
                collect and share your personal details with the Department of Home Affairs and a
                third party to confirm your identity. This is something we need to do for compliance
                purposes. Call{" "}
                <a
                  href="tel:0860123000"
                  className="font-medium text-secondary hover:text-blue-600 transition-colors"
                >
                  0860 123 000
                </a>{" "}
                for details.
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" onClick={handleCancel} className="flex-1">
              CANCEL
            </Button>
            <Button onClick={handleContinue} className="flex-1">
              CONTINUE
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FaceVerificationStep;
