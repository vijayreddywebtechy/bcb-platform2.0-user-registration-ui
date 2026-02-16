"use client";

import { useState } from "react";
import AuthLayout from "./shared/AuthLayout";
import AuthCard from "./shared/AuthCard";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

interface Approver {
  name: string;
  mobileNumber: string;
  email: string;
  role: string;
}

export default function ApprovalDetails() {
  const [loading, setLoading] = useState(false);

  // Sample data
  const requester = {
    name: "Kobus Marais",
    mobileNumber: "079 123 4567",
    email: "jonathan.khumalo@company.com",
    role: "Administrator (Full Access)",
  };

  const approvers: Approver[] = [
    {
      name: "Jonathan Khumalo",
      mobileNumber: "079 123 4567",
      email: "jonathan.khumalo@company.com",
      role: "Administrator (Full Access)",
    },
    {
      name: "Seth Naidoo",
      mobileNumber: "079 123 4567",
      email: "seth.naidoo@company.com",
      role: "Approver",
    },
  ];

  const handleApprove = () => {
    setLoading(true);
    console.log("Approved");
    setTimeout(() => setLoading(false), 2000);
  };

  const handleDecline = () => {
    console.log("Declined");
  };

  const handleCancel = () => {
    console.log("Cancelled");
  };

  return (
    <AuthLayout>
      <AuthCard className="w-full max-w-lg mx-auto mb-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-secondary mb-2">Approval Details</h1>
          <p className="text-neutral-900 text-sm sm:text-base leading-relaxed">
            Review the details below to approve or decline
          </p>
        </div>

        {/* Requester Section */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-secondary mb-3">Requester</h2>
          <div className="border-b border-neutral-300 pb-4">
            <h3 className="text-base font-medium text-secondary mb-2">{requester.name}</h3>
            <p className="text-sm text-secondary mb-2">
              Mobile Number -
              <span className="font-medium">{requester.mobileNumber}</span>
            </p>
            <p className="text-sm text-secondary mb-2">
              Email Address -
              <span className="font-medium">{requester.email}</span>
            </p>
            <p className="text-sm text-primary-dark">
              Requested Role/Permissions -
              <span className="font-medium">{requester.role}</span>
            </p>
          </div>
        </div>

        {/* Approvers Section */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-secondary mb-3">Approvers</h2>
          {approvers.map((approver, index) => (
            <div
              key={index}
              className={`${index < approvers.length - 1 ? "border-b border-neutral-300" : ""
                } pb-4 mb-4`}
            >
              <h3 className="text-base font-medium text-secondary mb-2">{approver.name}</h3>
              <p className="text-sm text-secondary mb-2">
                Mobile Number -
                <span className="font-medium">{approver.mobileNumber}</span>
              </p>
              <p className="text-sm text-secondary mb-2">
                Email Address -
                <span className="font-medium">{approver.email}</span>
              </p>
              <p className="text-sm text-secondary">
                Requested Role/Permissions -
                <span className="font-medium">{approver.role}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="py-4 mb-6">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <Info className="w-5 h-5 text-white fill-primary-dark" />
            </div>
            <div className="text-sm text-secondary leading-relaxed">
              Admins have full account access to move money, accept offers, statements,
              balances, transactions, security settings, manage team access and permissions.
              Please note that roles and permissions can be customised or revoked by your
              admin after profile is fully setup. You can also add more team members who need
              to access later.
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleApprove}
            className="w-full"
            disabled={loading}
          >
            {loading ? "APPROVING..." : "APPROVE"}
          </Button>
          <Button
            onClick={handleDecline}
            variant="destructive"
            className="w-full bg-red-700 hover:bg-red-800"
          >
            DECLINE REQUEST
          </Button>
          <Button
            variant="outline"
            onClick={handleCancel}
            className="w-full"
          >
            CANCEL
          </Button>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
