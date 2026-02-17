"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Link2, Info, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingSelect, SelectOption } from "@/components/ui/FloatingReactSelect";
import { FloatingTextField } from "@/components/ui/FloatingTextField";

interface Approver {
  id: string;
  name: string;
  role: string;
  initials: string;
  mobileNumber: string;
  email: string;
  permissions: SelectOption | null;
}

interface CaptureApproverDetailsProps {
  onVerifyDetails?: () => void;
  onBack?: () => void;
}

const roleOptions = [
  { value: "admin-full", label: "Administrator (Full Access)" },
  { value: "admin-limited", label: "Administrator (Limited Access)" },
  { value: "viewer", label: "Viewer (Read Only)" },
  { value: "approver", label: "Approver" },
];

function CaptureApproverDetails({
  onVerifyDetails,
  onBack,
}: CaptureApproverDetailsProps) {
  const router = useRouter();
  const [approvers, setApprovers] = useState<Approver[]>([
    {
      id: "1",
      name: "Jonathan Khumalo",
      role: "Director, Member",
      initials: "JK",
      mobileNumber: "079 123 4567",
      email: "jonathan.khumalo@company.com",
      permissions: { value: "admin-full", label: "Administrator (Full Access)" },
    },
    {
      id: "2",
      name: "Seth Naidoo",
      role: "Director, Member",
      initials: "SN",
      mobileNumber: "",
      email: "",
      permissions: null,
    },
  ]);

  const [expandedApprovers, setExpandedApprovers] = useState<string[]>(["1"]);

  const toggleApprover = (id: string) => {
    setExpandedApprovers((prev) =>
      prev.includes(id) ? prev.filter((appId) => appId !== id) : [...prev, id]
    );
  };

  const updateApprover = (
    id: string,
    field: keyof Approver,
    value: string | { value: string; label: string } | null
  ) => {
    setApprovers((prev) =>
      prev.map((approver) =>
        approver.id === id ? { ...approver, [field]: value } : approver
      )
    );
  };

  const handleVerifyDetails = () => {
    console.log("Verify details clicked", { approvers });
    // Call callback if provided (for custom logic)
    onVerifyDetails?.();
    // Navigate to verify details page
    router.push("/business/linking/verify-details");
  };

  const handleBack = () => {
    console.log("Back clicked");
    // Call callback if provided (for custom logic)
    onBack?.();
    // Navigate back to select approvers page
    router.push("/business/linking/select-approvers");
  };



  return (
    <>
      {/* Icon */}
      <div className="mb-4">
        <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
          <Link2 className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-xl font-medium text-secondary mb-2">
        Capture Approver Details
      </h1>

      {/* Subtitle */}
      <p className="text-secondary mb-8 leading-relaxed">
        Details will be validated against our records and CIPC.
      </p>

      {/* Approvers List */}
      <div className="space-y-4 mb-6">
        {approvers.map((approver) => {
          const isExpanded = expandedApprovers.includes(approver.id);

          return (
            <div
              key={approver.id}
              className="border-b border-neutral-200"
            >
              {/* Approver Header */}
              <button
                onClick={() => toggleApprover(approver.id)}
                className="w-full flex items-center justify-between gap-4 py-4 mb-3 bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-secondary font-medium text-lg">
                      {approver.initials}
                    </span>
                  </div>


                  <div className="text-left">
                    <p className="text-secondary font-medium text-base">
                      {approver.name}
                    </p>
                    <p className="text-sm text-secondary">Role - {approver.role}</p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-6 h-6 text-secondary flex-shrink-0" strokeWidth={1.5} />
                ) : (
                  <ChevronDown className="w-6 h-6 text-secondary flex-shrink-0" strokeWidth={1.5} />
                )}
              </button>

              {/* Approver Details Form */}
              {isExpanded && (
                <div className="py-4 pt-0 space-y-6 bg-white mb-5">
                  {/* Mobile Number */}
                  <FloatingTextField
                    label="Mobile Number"
                    type="tel"
                    placeholder="079 123 4567"
                    value={approver.mobileNumber}
                    onChange={(e) =>
                      updateApprover(approver.id, "mobileNumber", e.target.value)
                    }
                    helperText="*Required"
                  />

                  {/* Email Address */}
                  <FloatingTextField
                    label="Email Address"
                    type="email"
                    placeholder="jonathan.khumalo@company.com"
                    value={approver.email}
                    onChange={(e) =>
                      updateApprover(approver.id, "email", e.target.value)
                    }
                    helperText="*Required"
                  />

                  {/* Role/Permissions */}
                  <div>
                    <FloatingSelect
                      label="Role/Permissions"
                      options={roleOptions}
                      value={approver.permissions}
                      onChange={(selectedOption) =>
                        updateApprover(approver.id, "permissions", selectedOption)
                      }
                      placeholder="Select role/permissions"
                    />
                    <p className="text-xs text-secondary mt-1">*Required</p>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8">
        <div className="flex gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <Info className="w-5 h-5 text-white fill-primary-dark" />
          </div>
          <div className="text-sm text-secondary leading-relaxed">
            Please ensure all information is correct before continuing.
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" onClick={handleBack} className="sm:flex-1">
          BACK
        </Button>
        <Button onClick={handleVerifyDetails} className="sm:flex-1">
          VERIFY DETAILS
        </Button>
      </div>
    </>
  );
}

export default CaptureApproverDetails;