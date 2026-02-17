"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "./shared/AuthLayout";
import AuthCard from "./shared/AuthCard";
import { Button } from "@/components/ui/button";
import { FloatingTextField } from "@/components/ui/FloatingTextField";
import { FloatingSelect, SelectOption } from "@/components/ui/FloatingReactSelect";
import { Mail, Info } from "lucide-react";

export default function CaptureInvitationDetails() {
  const router = useRouter();
  const [invitationType, setInvitationType] = useState<SelectOption | null>(null);
  const [idPassport, setIdPassport] = useState("");
  const [referenceCode, setReferenceCode] = useState("");
  const [loading, setLoading] = useState(false);

  // Invitation type options
  const invitationTypeOptions: SelectOption[] = [
    { value: "approve", label: "Approve Access" },
    { value: "get-access", label: "Get Access" },
    { value: "business-hub", label: "Business Hub Access" },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Form submitted:", { invitationType, idPassport, referenceCode });
    
    // Simulate API call to validate invitation details
    setTimeout(() => {
      setLoading(false);
      // Navigate to approval details page after validation
      router.push("/approval/details");
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    // Navigate back to home/welcome page
    router.push("/");
  };

  return (
    <AuthLayout>
      <AuthCard className="w-full max-w-lg mx-auto mb-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl text-secondary mb-2">Capture Invitation Details</h1>
          <p className="text-neutral-900 text-base leading-relaxed">
            Enter the details below as they appear on the invitation
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8">
          <div className="flex gap-3 items-center">
            <div className="flex-shrink-0 mt-0.5">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-base font-medium text-secondary mb-1">
                I received an invitation to approve or get access to the Business Hub
              </h3>
              <p className="text-sm text-secondary leading-relaxed">
                You will use the credentials you received to approve, decline or complete a
                request.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Invitation Type Dropdown */}
          <FloatingSelect
            label="Invitation type"
            options={invitationTypeOptions}
            value={invitationType}
            onChange={(newValue) => setInvitationType(newValue)}
            helperText="*Required"
            placeholder="Select invitation type"
            required
          />

          {/* South African ID/Passport Field */}
          <FloatingTextField
            label="South African ID/Passport"
            type="text"
            value={idPassport}
            onChange={(e) => setIdPassport(e.target.value)}
            helperText="*Required"
            required
          />

          {/* Reference Code Field */}
          <FloatingTextField
            label="Reference code"
            type="text"
            value={referenceCode}
            onChange={(e) => setReferenceCode(e.target.value)}
            helperText="*Required"
            required
          />

          {/* Info Note */}
          <div className="flex gap-2">
            <div className="flex-shrink-0">
              <Info className="w-5 h-5 text-white fill-primary-dark" />
            </div>
            <div className="text-sm text-secondary leading-relaxed">
              Please ensure all information is correct before continuing
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "PROCESSING..." : "NEXT"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="w-full"
            >
              CANCEL
            </Button>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
