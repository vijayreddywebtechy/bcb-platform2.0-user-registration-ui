"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Link2, Info, CheckCircle, Clock, Check } from "lucide-react";
import { Button } from "../ui/button";

interface ApproverStatus {
  id: string;
  name: string;
  role: string;
  initials: string;
  mobileNumber: string;
  email: string;
  permissions: string;
  approvalStatus: "approved" | "pending";
}

interface BusinessApprovalStatusProps {
  onDone?: () => void;
}

function BusinessApprovalStatus({ onDone }: BusinessApprovalStatusProps) {
  const router = useRouter();
  
  // Mock data for approvers - in real app, this would come from props or state
  const approvers: ApproverStatus[] = [
    {
      id: "1",
      name: "Jonathan Khumalo",
      role: "Director, Member",
      initials: "JK",
      mobileNumber: "079 123 4567",
      email: "jonathan.khumalo@company.com",
      permissions: "Administrator (Full Access)",
      approvalStatus: "approved",
    },
    {
      id: "2",
      name: "Seth Naidoo",
      role: "Director, Member",
      initials: "SN",
      mobileNumber: "079 123 4567",
      email: "seth.naidoo@company.com",
      permissions: "Approver",
      approvalStatus: "pending",
    },
  ];

  const handleDone = () => {
    console.log("Done clicked");
    // Call callback if provided (for custom logic)
    onDone?.();
    // Navigate to dashboard or home
    router.push("/dashboard");
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
        Approval Status
      </h1>

      {/* Subtitle */}
      <p className="text-secondary mb-8 leading-relaxed">
        Your request has been sent for approval to business director/members
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
            <div className="flex-1 space-y-2">
              {/* Name and Role */}
              <div>
                <p className="text-secondary font-medium text-base">
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
                <p className="text-sm text-secondary">
                  Approval Status -{" "}
                  <span
                    className={`font-medium ${
                      approver.approvalStatus === "approved"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {approver.approvalStatus === "approved" ? "Approved" : "Pending"}
                  </span>
                </p>
              </div>
            </div>

            {/* Status Icon */}
            <div className="flex-shrink-0">
              {approver.approvalStatus === "approved" ? (
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <Check className="text-white w-4 h-4" />
                </div>
              ) : (
                <Clock className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
              )}
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
            Once all directors/members have approved your dashboard will be loaded
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" onClick={handleDone}>
          DONE FOR NOW
        </Button>
      </div>
    </>
  );
}

export default BusinessApprovalStatus;