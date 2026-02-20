"use client";

import React, { useState } from "react";
import { Link2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FloatingSelect,
  SelectOption,
} from "@/components/ui/FloatingReactSelect";

interface Approver {
  id: string;
  name: string;
  role: string;
  initials: string;
  mobile: string;
  email: string;
  profile: string;
  permissions: SelectOption | null;
}

interface CaptureApproverDetailsProps {
  onVerifyDetails?: () => void;
  onBack?: () => void;
}

const roleOptions: SelectOption[] = [
  { value: "admin-owner", label: "Admin/Owner (Full Access)" },
  { value: "initiator", label: "Initiator/Capturer" },
  { value: "approver", label: "Approver" },
  { value: "releaser", label: "Releaser" },
  { value: "viewer", label: "Viewer" },
];

function CaptureApproverDetails({
  onVerifyDetails,
  onBack,
}: CaptureApproverDetailsProps) {
  const [approvers, setApprovers] = useState<Approver[]>([
    {
      id: "1",
      name: "Jonathan Khumalo",
      role: "Director, Member",
      initials: "JK",
      mobile: "*** *** 4567",
      email: "jo*****.kh*****@abc******tects.co.za",
      profile: "Digital ID, Active",
      permissions: { value: "admin-owner", label: "Admin/Owner (Full Access)" },
    },
    {
      id: "2",
      name: "Seth Naidoo",
      role: "Director, Member",
      initials: "SN",
      mobile: "*** *** 4567",
      email: "se**.na*****@abc******tects.co.za",
      profile: "Digital ID, Active",
      permissions: { value: "approver", label: "Approver" },
    },
  ]);

  const updatePermissions = (id: string, value: SelectOption | null) => {
    setApprovers((prev) =>
      prev.map((approver) =>
        approver.id === id ? { ...approver, permissions: value } : approver
      )
    );
  };

  const handleVerifyDetails = () => {
    console.log("Confirm details clicked", { approvers });
    onVerifyDetails?.();
  };

  const handleBack = () => {
    console.log("Back clicked");
    onBack?.();
  };

  return (
    <div className="w-full lg:max-w-[640px]">
      {/* Icon */}
      <div className="mb-4">
        <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center">
          <Link2 className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-xl md:text-2xl font-bold text-secondary mb-2">
        Capture Approver Roles
      </h1>

      {/* Subtitle */}
      <p className="text-sm text-secondary mb-6 leading-relaxed">
        Details will be validated against our records and CIPC.
      </p>

      {/* Approvers List */}
      <div className="divide-y divide-neutral-200 mb-6">
        {approvers.map((approver) => (
          <div key={approver.id} className="py-6">
            {/* Avatar + Name */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-secondary font-medium text-lg">
                  {approver.initials}
                </span>
              </div>
              <div>
                <p className="text-secondary font-medium text-lg leading-tight">
                  {approver.name}
                </p>
                <p className="text-xs font-medium text-secondary mt-2">
                  {approver.role}
                </p>

                {/* Info Grid */}
                <div className="space-y-2 mt-3">
                  <div className="flex gap-6">
                    <span className="text-xs text-secondary w-32 shrink-0">
                      Mobile Number
                    </span>
                    <span className="text-xs font-medium text-secondary">
                      {approver.mobile}
                    </span>
                  </div>
                  <div className="flex gap-6">
                    <span className="text-xs text-secondary w-32 shrink-0">
                      Email Address
                    </span>
                    <span className="text-xs font-medium text-secondary">
                      {approver.email}
                    </span>
                  </div>
                  <div className="flex gap-6">
                    <span className="text-xs text-secondary w-32 shrink-0">
                      Profile
                    </span>
                    <span className="text-xs font-medium text-green-600">
                      {approver.profile}
                    </span>
                  </div>
                  {/* Role/Permissions Dropdown */}
                  <div className="!mt-5 w-full md:w-[300px]">
                    <FloatingSelect
                      label="Role/Permissions*"
                      options={roleOptions}
                      value={approver.permissions}
                      onChange={(selectedOption) =>
                        updatePermissions(approver.id, selectedOption)
                      }
                      placeholder="Select role/permissions"
                    />
                    <p className="text-xs text-secondary mt-1">*Required</p>
                  </div>
                </div>
              </div>
            </div>


          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8">
        <div className="flex gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <Info className="w-5 h-5 text-white fill-primary-dark" />
          </div>
          <p className="text-sm text-secondary leading-relaxed">
            Please ensure all information is correct before continuing.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" onClick={handleBack} className="sm:flex-1">
          BACK
        </Button>
        <Button onClick={handleVerifyDetails} className="sm:flex-1">
          CONFIRM DETAILS
        </Button>
      </div>
    </div>
  );
}

export default CaptureApproverDetails;