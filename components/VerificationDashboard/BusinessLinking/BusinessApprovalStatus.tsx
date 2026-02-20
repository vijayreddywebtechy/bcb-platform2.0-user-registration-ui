"use client";

import { Link2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ApproverStatus {
  id: string;
  name: string;
  role: string;
  initials: string;
  mobile: string;
  email: string;
  profile: string;
  permissions: string;
  approvalStatus: "approved" | "pending";
}

interface BusinessApprovalStatusProps {
  onDone?: () => void;
}

function BusinessApprovalStatus({ onDone }: BusinessApprovalStatusProps) {
  const approvers: ApproverStatus[] = [
    {
      id: "1",
      name: "Jonathan Khumalo",
      role: "Director, Member",
      initials: "JK",
      mobile: "*** *** 4567",
      email: "jo*****.kh*****@abc******tects.co.za",
      profile: "Digital ID, Active",
      permissions: "Admin/Owner (Full Access)",
      approvalStatus: "pending",
    },
    {
      id: "2",
      name: "Seth Naidoo",
      role: "Director, Member",
      initials: "SN",
      mobile: "*** *** 4567",
      email: "se*****.na*****@abc******tects.co.za",
      profile: "Digital ID, Active",
      permissions: "Approver",
      approvalStatus: "pending",
    },
  ];

  const router = useRouter();

  const handleDone = () => {
    console.log("Done clicked");
    onDone?.();
    router.push("/dashboard");
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
        Approval Status
      </h1>

      {/* Subtitle */}
      <p className="text-sm text-secondary mb-6 leading-relaxed">
        Your request has been sent for approval to business director/members
      </p>

      {/* Approvers List */}
      <div className="divide-y divide-neutral-200 mb-6">
        {approvers.map((approver) => (
          <div key={approver.id} className="flex items-start gap-4 py-5">
            {/* Avatar */}
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-secondary font-medium text-lg">
                {approver.initials}
              </span>
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <p className="text-secondary font-medium text-lg leading-tight">
                {approver.name}
              </p>
              <p className="text-xs font-medium text-secondary mt-2 mb-3">
                {approver.role}
              </p>

              {/* Info Grid */}
              <div className="space-y-2">
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
                <div className="flex gap-6">
                  <span className="text-xs text-secondary w-32 shrink-0">
                    Role &amp; Permissions
                  </span>
                  <span className="text-xs font-medium text-secondary">
                    {approver.permissions}
                  </span>
                </div>
                <div className="flex gap-6 items-center">
                  <span className="text-xs text-secondary w-32 shrink-0">
                    Approval Status
                  </span>
                  {approver.approvalStatus === "approved" ? (
                    <span className="text-xs px-3 py-0.5 rounded-full border border-green-500 text-green-600">
                      Approved
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-1 rounded-full border border-orange-300 text-orange-400">
                      Pending
                    </span>
                  )}
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
            Once all directors/members have approved your dashboard will be
            loaded.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" onClick={handleDone} className="sm:flex-1">
          DONE FOR NOW
        </Button>
        <Button onClick={handleDone} className="sm:flex-1">
          LOAD MY DASHBOARD
        </Button>
      </div>
    </div>
  );
}

export default BusinessApprovalStatus;