"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProgressCard from "@/components/VerificationDashboard/shared/ProgressCard";

export type StepStatus = "completed" | "active" | "pending";

export interface InviteStep {
  label: string;
  status: StepStatus;
}

interface InviteLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  steps: InviteStep[];
  onBack?: () => void;
  onExit?: () => void;
  /** Hide back button (e.g. on success screen) */
  hideBack?: boolean;
  /** Hide progress sidebar (e.g. on success screen) */
  hideProgress?: boolean;
}

export default function InviteLayout({
  children,
  currentStep,
  steps,
  onBack,
  onExit,
  hideBack = false,
  hideProgress = false,
}: InviteLayoutProps) {
  const totalSteps = steps.length;
  const progressPercentage = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);

  return (
    <>
      {/* ── Dark header bar ── */}
      <div className="bg-primary-dark w-full">
        <div className="page-container py-6">
          {/* Back button */}
          {!hideBack && onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-blue-200 hover:text-white transition-colors text-sm mb-4"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={2} />
              Back
            </button>
          )}

          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Invite Team Members
            </h1>
            {onExit && (
              <Button
                variant="outline"
                size="default"
                onClick={onExit}
                className="text-white border-white bg-transparent hover:bg-white hover:text-primary-dark px-6"
              >
                EXIT
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* ── Content + progress sidebar ── */}
      <div className="page-container py-10">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Main content */}
          <div className="flex-1 w-full">{children}</div>

          {/* Progress sidebar */}
          {!hideProgress && (
            <ProgressCard
              currentStep={currentStep}
              totalSteps={totalSteps}
              progressPercentage={progressPercentage}
              steps={steps}
              title="Invite Team Members"
            />
          )}
        </div>
      </div>
    </>
  );
}
