"use client";

import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Step {
  label: string;
  status: "completed" | "active" | "pending";
}

interface ProgressCardProps {
  currentStep: number;
  totalSteps: number;
  progressPercentage: number;
  steps: Step[];
  title?: string;
}

export default function ProgressCard({
  currentStep,
  totalSteps,
  progressPercentage,
  steps,
  title = "Link Business & Accounts",
}: ProgressCardProps) {
  const [showSteps, setShowSteps] = useState(true);

  return (
    <div className="block w-full lg:w-80 flex-shrink-0">
      <div className="border border-neutral-200 rounded-lg overflow-hidden">
        <div className="bg-neutral-100 p-4 border-b border-neutral-200">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xs text-gray-500">
                Steps {currentStep} of {totalSteps}
              </h3>
              <h2 className="text-sm font-medium text-neutral-900 my-2">{title}</h2>
              <p className="text-xs text-neutral-800">{progressPercentage}%</p>
            </div>
            <button onClick={() => setShowSteps(!showSteps)} className="flex-shrink-0">
              <ChevronDown
                className={`w-6 h-6 text-secondary transition-transform ${
                  showSteps ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
          <Progress value={progressPercentage} />
        </div>
        <div className="bg-white">
          {showSteps && (
            <div>
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between gap-3 py-2.5 px-4 ${
                    step.status === "active" ? "bg-neutral-100" : ""
                  }`}
                >
                  <p
                    className={`text-sm ${
                      step.status === "pending" ? "text-gray-500" : "text-secondary"
                    }`}
                  >
                    {step.label}
                  </p>
                  {step.status === "completed" ? (
                    <div className="w-4 h-4 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  ) : step.status === "active" ? (
                    <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-gray-300 bg-white flex-shrink-0"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
