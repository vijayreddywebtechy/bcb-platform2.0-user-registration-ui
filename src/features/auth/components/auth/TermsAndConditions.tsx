"use client";

import { useState, FormEvent } from "react";
import AuthLayout from "./shared/AuthLayout";
import AuthCard from "./shared/AuthCard";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";

export default function TermsAndConditions() {
  const [agreePersonalInfo, setAgreePersonalInfo] = useState(false);
  const [consentProcessing, setConsentProcessing] = useState(false);
  const [acknowledgeLiability, setAcknowledgeLiability] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!agreePersonalInfo || !consentProcessing || !acknowledgeLiability) {
      alert("Please accept all terms and conditions to continue");
      return;
    }
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  const handleBack = () => {};

  const allAccepted = agreePersonalInfo && consentProcessing && acknowledgeLiability;

  return (
    <AuthLayout>
      <AuthCard className="w-full max-w-lg mx-auto mb-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-secondary mb-2">
            Terms & Conditions
          </h1>
          <p className="text-neutral-900 text-sm sm:text-base leading-relaxed">
            Review the details below to approve or decline
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Checkbox 1 */}
          <div className="flex gap-3">
            <Checkbox
              id="agree-personal-info"
              checked={agreePersonalInfo}
              onCheckedChange={(checked) => setAgreePersonalInfo(checked === true)}
            />
            <label
              htmlFor="agree-personal-info"
              className="text-sm text-secondary leading-relaxed cursor-pointer"
            >
              <span className="font-medium">I agree and confirm that:</span> If I give Standard Bank
              personal information about or on behalf of another person (including, but not limited
              to, account signatories and shareholders), I confirm that I am authorised to: (a) give
              their personal information; (b) consent on their behalf to the processing of their
              personal information; and (c) receive any privacy notices on their behalf.
            </label>
          </div>

          {/* Checkbox 2 */}
          <div className="flex gap-3">
            <Checkbox
              id="consent-processing"
              checked={consentProcessing}
              onCheckedChange={(checked) => setConsentProcessing(checked === true)}
            />
            <label
              htmlFor="consent-processing"
              className="text-sm text-secondary leading-relaxed cursor-pointer"
            >
              <span className="font-medium">
                I consent to Standard Bank collecting and processing my personal information:
              </span>{" "}
              From external and public sources, where lawful and reasonable, for identity, address,
              and compliance purposes.
              <br />
              <br />
              To analyse my interactions and create personalised client communications based on my
              interactions in the approval process, including operational notifications.
              <br />
              <br />
              To share my personal information within the Group and/or with third-party service
              providers, including third parties who are not within the jurisdiction of the provided
              services.
            </label>
          </div>

          {/* Checkbox 3 */}
          <div className="flex gap-3">
            <Checkbox
              id="acknowledge-liability"
              checked={acknowledgeLiability}
              onCheckedChange={(checked) => setAcknowledgeLiability(checked === true)}
            />
            <label
              htmlFor="acknowledge-liability"
              className="text-sm text-secondary leading-relaxed cursor-pointer"
            >
              <span className="font-medium">Acknowledgment of Liability:</span> By authorising this
              applicant, I confirm that I am duly authorised to grant access to the business's
              banking profile. I acknowledge that Standard Bank shall not be held liable for any
              loss, damage, or fraudulent activity resulting from the applicant's access or
              transactions. The business assumes full responsibility for all actions performed by
              this user under the assigned permissions.
            </label>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button type="submit" className="w-full" disabled={!allAccepted || loading}>
              {loading ? "APPROVING..." : "APPROVE"}
            </Button>
            <Button type="button" variant="outline" onClick={handleBack} className="w-full">
              BACK
            </Button>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
