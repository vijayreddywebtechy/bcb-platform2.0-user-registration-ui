"use client";

import { useState } from "react";
import ApprovalDetails from "@/features/auth/components/auth/ApprovalDetails";
import CaptureInvitationDetails from "@/features/auth/components/auth/CaptureInvitationDetails";
import TermsAndConditions from "@/features/auth/components/auth/TermsAndConditions";
import { Button } from "@/shared/components/ui/button";

export default function AuthComponentsDemo() {
  const [activeComponent, setActiveComponent] = useState<"approval" | "invitation" | "terms">(
    "approval"
  );

  const renderComponent = () => {
    switch (activeComponent) {
      case "approval":
        return <ApprovalDetails />;
      case "invitation":
        return <CaptureInvitationDetails />;
      case "terms":
        return <TermsAndConditions />;
      default:
        return <ApprovalDetails />;
    }
  };

  return (
    <div className="relative">
      {/* Navigation Overlay */}
      <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-xl p-4 space-y-2">
        <h3 className="text-sm font-medium text-secondary mb-2">Component Switcher</h3>
        <Button
          onClick={() => setActiveComponent("approval")}
          variant={activeComponent === "approval" ? "default" : "outline"}
          size="sm"
          className="w-full"
        >
          Approval Details
        </Button>
        <Button
          onClick={() => setActiveComponent("invitation")}
          variant={activeComponent === "invitation" ? "default" : "outline"}
          size="sm"
          className="w-full"
        >
          Capture Invitation
        </Button>
        <Button
          onClick={() => setActiveComponent("terms")}
          variant={activeComponent === "terms" ? "default" : "outline"}
          size="sm"
          className="w-full"
        >
          Terms & Conditions
        </Button>
      </div>

      {/* Active Component */}
      {renderComponent()}
    </div>
  );
}
