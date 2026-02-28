"use client";

import { RadioGroup } from "@radix-ui/react-radio-group";
import Toolbar from "../Toolbar";
import Header from "./Header";
import MiniNavbar from "./MiniNavbar";
import Footer from "@/shared/components/layout/Footer";
import { RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Label } from "@/shared/components/ui/label";
import ProgressCard from "./ProgressCard";

interface Step {
  label: string;
  status: "completed" | "active" | "pending";
}

interface BusinessLinkingLayoutProps {
  children: React.ReactNode;
  currentStep?: number;
  steps?: Step[];
}

export default function BusinessLinkingLayout({
  children,
  currentStep = 1,
  steps = [
    { label: "Role Definition", status: "active" as const },
    { label: "Select Approvers", status: "pending" as const },
    { label: "Capture Approver Details", status: "pending" as const },
    { label: "Verify Details & Send Invite", status: "pending" as const },
    { label: "Approval Status", status: "pending" as const },
  ],
}: BusinessLinkingLayoutProps) {
  const totalSteps = 5;
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      <div className="sticky top-0 z-50">
        <MiniNavbar />
        <Header />
      </div>
      <main className="flex-1">
        <div className="bg-primary-dark">
          <div className="page-container">
            {/* Toolbar */}
            <Toolbar
              userName="Business Linking"
              action={{
                type: "button",
                label: "Exit",
              }}
            />
          </div>
        </div>

        <div className="page-container">
          {/* Content with Progress Card */}
          <div className="py-10">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              {/* Main Content */}
              <div className="flex-1 w-full">{children}</div>

              {/* Progress Sidebar */}
              <ProgressCard
                currentStep={currentStep}
                totalSteps={totalSteps}
                progressPercentage={progressPercentage}
                steps={steps}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
