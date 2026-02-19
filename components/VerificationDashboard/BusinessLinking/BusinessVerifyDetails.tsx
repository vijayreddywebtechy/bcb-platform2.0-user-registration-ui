"use client";

import React from "react";
import { Link2, Info, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ApproverDetail {
  id: string;
  name: string;
  role: string;
  initials: string;
  mobileNumber: string;
  email: string;
  permissions: string;
}

interface BusinessVerifyDetailsProps {
  onRequestApproval?: () => void;
  onBack?: () => void;
}

function BusinessVerifyDetails({
  onRequestApproval,
  onBack,
}: BusinessVerifyDetailsProps) {
  // Mock data for approvers - in real app, this would come from props or state
  const approvers: ApproverDetail[] = [
    {
      id: "1",
      name: "Jonathan Khumalo",
      role: "Director, Member",
      initials: "JK",
      mobileNumber: "079 123 4567",
      email: "jonathan.khumalo@company.com",
      permissions: "Administrator (Full Access)",
    },
    {
      id: "2",
      name: "Seth Naidoo",
      role: "Director, Member",
      initials: "SN",
      mobileNumber: "079 123 4567",
      email: "seth.naidoo@company.com",
      permissions: "Approver",
    },
  ];

  const handleRequestApproval = () => {
    console.log("Request approval clicked", { approvers });
    onRequestApproval?.();
  };

  const handleBack = () => {
    console.log("Back clicked");
    onBack?.();
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
        Verify Details & Send Invite
      </h1>

      {/* Subtitle */}
      <p className="text-secondary mb-8 leading-relaxed">
        Details will be validated against our records and CIPC.
      </p>

      {/* Approvers List */}
      <div className="space-y-6 mb-6">
        {approvers.map((approver) => (
          <div key={approver.id} className="flex items-center gap-4 border-b border-dashed border-gray-200 pb-6">
            {/* Avatar */}
            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-secondary font-medium text-lg">
                {approver.initials}
              </span>
            </div>

            {/* Details */}
            <div className="flex-1 space-y-1">
              {/* Name and Role */}
              <div>
                <p className="text-secondary font-medium text-base mb-1">
                  {approver.name}
                </p>
                <p className="text-sm text-secondary">Role - {approver.role}</p>
              </div>

              {/* Contact Details */}
              <div className="space-y-1">
                <p className="text-sm text-secondary">
                  Mobile Number - <span className="font-medium">{approver.mobileNumber}</span>
                </p>
                <p className="text-sm text-secondary">
                  Email Address - <span className="font-medium">{approver.email}</span>
                </p>
                <p className="text-sm text-secondary">
                  Role/Permissions - <span className="font-medium">{approver.permissions}</span>
                </p>
              </div>
            </div>

            {/* Status Icon */}
            <div className="flex-shrink-0">
              <Check className="w-6 h-6 text-green-600" strokeWidth={1.5} />
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
        <Button onClick={handleRequestApproval} className="sm:flex-1">
          REQUEST APPROVAL
        </Button>
      </div>
    </>
  );
}

export default BusinessVerifyDetails;