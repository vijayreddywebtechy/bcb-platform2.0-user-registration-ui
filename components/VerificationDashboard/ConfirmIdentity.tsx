"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ActionCard from "../dynamic/cards/ActionCard";
import Toolbar from "./Toolbar";
import Header from "./shared/Header";
import MiniNavbar from "./shared/MiniNavbar";
import Footer from "@/components/layout/Footer";
import { User, ScanFace, Link2 } from "lucide-react";
type Props = {};

function ConfirmIdentity({}: Props) {
  const router = useRouter();
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
    // OLD: No navigation was implemented
    // REASON: Updated per flow requirements - navigate based on which card is clicked
    if (stepNumber === 2) {
      // Identity Verification - navigate to FaceVerificationStep
      router.push("/verification/face-scan");
    } else if (stepNumber === 3) {
      // Business Linking - navigate to BusinessLinkingLayout
      router.push("/business/linking/role-definition");
    }
  };

  const handleClose = (stepNumber: number) => {
    console.log(`Step ${stepNumber} dismissed`);
    setVisibleCards(visibleCards.filter((id) => id !== stepNumber));
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50">
        <MiniNavbar />
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-1">
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
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ConfirmIdentity;
