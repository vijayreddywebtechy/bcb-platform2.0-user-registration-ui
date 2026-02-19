"use client";

import { useState } from "react";
import ActionCard from "@/components/dynamic/cards/ActionCard";
import Toolbar from "./Toolbar";
import { User, ScanFace, Link2 } from "lucide-react";
type Props = {
  onIdentityVerificationClick?: () => void;
};

function OutstandingActions({ onIdentityVerificationClick }: Props) {
  const [visibleCards, setVisibleCards] = useState([1, 2, 3]);

  const steps = [
    {
      stepNumber: 1,
      title: "Profile Registration",
      description:
        "Create or confirm a new digital profile to access the Business Hub.",
      icon: User,
      status: "completed" as const,
      bgColor: "bg-green-700",
    },
    {
      stepNumber: 2,
      title: "Identity Verification",
      description:
        "Scan your face to confirm your identity and link yourself to your Business Hub profile.",
      icon: ScanFace,
      status: "active" as const,
      bgColor: "bg-blue-700",
    },
    {
      stepNumber: 3,
      title: "Business Linking",
      description:
        "Get authorisation to link and access your business's accounts on the Business Hub.",
      icon: Link2,
      status: "pending" as const,
      bgColor: "bg-neutral-800",
    },
  ];

  const handleStepClick = (stepNumber: number) => {
    console.log(`Step ${stepNumber} clicked`);
    if (stepNumber === 2) {
      onIdentityVerificationClick?.();
    }
  };

  const handleClose = (stepNumber: number) => {
    console.log(`Step ${stepNumber} dismissed`);
    setVisibleCards(visibleCards.filter((id) => id !== stepNumber));
  };

  return (
    <>
      <div className="bg-primary-dark">
        <div className="page-container">
          <Toolbar
            userName="Welcome, Kobus"
            organizationName="ABC Architects (Pty) Ltd"
            lastSignedIn="27 Oct 2025, 12:35 PM"
          />
          <div className="py-14">
            <h4 className="text-lg text-blue-50 mb-5">Outstanding Actions</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {steps
                .filter((step) => visibleCards.includes(step.stepNumber))
                .map((step) => (
                  <ActionCard
                    key={step.stepNumber}
                    {...step}
                    showClose={false}
                    onActionClick={() => handleStepClick(step.stepNumber)}
                    onClose={() => handleClose(step.stepNumber)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="page-container py-12">
        <div className="w-full max-w-md">
          <h6 className="text-lg text-neutral-900 font-medium py-2">
            Let's get you set up
          </h6>
          <p className="text-neutral-800 mb-3">
            Great job setting up your sign in details. Since security is our top
            priority, we need to complete a quick verification process before
            unlocking your business dashboard.
          </p>
          <p className="text-neutral-800 font-medium">
            Next, you'll complete a quick facial recognition scan. After that,
            you'll be able to send secure approval invites to your business
            directors to finalise your access.
          </p>
        </div>
      </div>
    </>
  );
}

export default OutstandingActions;
