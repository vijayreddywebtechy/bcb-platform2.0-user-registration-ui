"use client";

import React from "react";
import { ScanFace, Glasses, Smile, User, Smartphone, AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";

interface VerificationInstructionsProps {
  onStartScan?: () => void;
  onCancel?: () => void;
}

function VerificationInstructions({ onStartScan, onCancel }: VerificationInstructionsProps) {
  const handleStartScan = () => {
    onStartScan?.();
  };

  const handleCancel = () => {
    onCancel?.();
  };

  const instructions = [
    {
      icon: Glasses,
      text: "Remove any hats, headscarves or glasses",
    },
    {
      icon: Smartphone,
      text: "Hold your phone up so that your face is in the middle of the screen",
    },
    {
      icon: User,
      text: "Keep your head still, don't speak and don't smile for a few seconds",
    },
    {
      icon: ScanFace,
      text: "Your screen will start flashing while we scan your face",
    },
  ];

  return (
    <div className="page-container py-10">
      <div className="w-full md:max-w-[526px]">
        {/* Icon */}
        <div className="mb-4">
          <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
            <ScanFace className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-xl font-medium text-secondary mb-2">How to scan your face</h1>

        {/* Subtitle */}
        <p className="text-secondary mb-6 leading-relaxed">
          Please confirm your identity with a quick face scan
        </p>

        {/* Instructions List */}
        <div className="space-y-4 mb-6">
          {instructions.map((instruction, index) => {
            const Icon = instruction.icon;
            return (
              <div key={index} className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 border-2 border-gray-300 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-secondary" strokeWidth={1.5} />
                  </div>
                </div>
                <p className="text-secondary text-sm leading-relaxed pt-2">{instruction.text}</p>
              </div>
            );
          })}
        </div>

        {/* Warning Box */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <div className="flex gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-sm text-secondary leading-relaxed">
              <span className="font-medium">WARNING:</span> Flashing screens may potentially trigger
              seizures for people with photosensitive epilepsy.
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="outline" onClick={handleCancel} className="flex-1">
            CANCEL
          </Button>
          <Button onClick={handleStartScan} className="flex-1">
            START SCAN
          </Button>
        </div>
      </div>
    </div>
  );
}

export default VerificationInstructions;
