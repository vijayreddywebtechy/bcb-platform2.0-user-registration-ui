"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import Image from "next/image";
import { FloatingTextField } from "@/shared/components/ui/FloatingTextField";
import { FloatingSelect, SelectOption } from "@/shared/components/ui/FloatingReactSelect";
import StepActions from "./StepActions";
import icnPeopleSecure from "@/assets/images/icons/icn_people_1_secure.svg";

interface UserDetail {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  role: SelectOption | null;
}

interface CaptureDetailsProps {
  onNext?: () => void;
  onBack?: () => void;
}

const roleOptions: SelectOption[] = [
  { value: "admin-owner", label: "Admin/Owner (Full Access)" },
  { value: "initiator", label: "Initiator/Capturer" },
  { value: "approver", label: "Approver" },
  { value: "releaser", label: "Releaser" },
  { value: "viewer", label: "Viewer" },
];

export default function CaptureDetails({ onNext, onBack }: CaptureDetailsProps) {
  const [users, setUsers] = useState<UserDetail[]>([
    {
      id: "1",
      firstName: "Tasmin",
      lastName: "Reilly",
      email: "tasmin.reilly@abcarchitects.co.za",
      phone: "079 123 4567",
      jobTitle: "Finance Manager",
      role: { value: "approver", label: "Approver" },
    },
  ]);

  const updateUser = (id: string, field: keyof UserDetail, value: string | SelectOption | null) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, [field]: value } : u)));
  };

  return (
    <div className="w-full lg:max-w-[640px]">
      {/* Icon */}
      <div className="mb-4">
        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
          <Image src={icnPeopleSecure} alt="" width={28} height={28} />
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-xl md:text-2xl font-bold text-secondary mb-2">Add a team member</h1>

      {/* Subtitle */}
      <p className="text-sm text-secondary mb-8 leading-relaxed">
        Add new team member(s) or third-party collaborator.
      </p>

      {/* Users Form */}
      <div className="divide-y divide-neutral-200 mb-6">
        {users.map((user) => (
          <div key={user.id} className="pb-6">
            {/* Form fields – 2 column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6">
              <div>
                <FloatingTextField
                  label="First Name*"
                  value={user.firstName}
                  onChange={(e) => updateUser(user.id, "firstName", e.target.value)}
                />
                <p className="text-xs text-secondary mt-1">*Required</p>
              </div>
              <div>
                <FloatingTextField
                  label="Last Name*"
                  value={user.lastName}
                  onChange={(e) => updateUser(user.id, "lastName", e.target.value)}
                />
                <p className="text-xs text-secondary mt-1">*Required</p>
              </div>
              <div>
                <FloatingTextField
                  label="Business Email ID*"
                  type="email"
                  value={user.email}
                  onChange={(e) => updateUser(user.id, "email", e.target.value)}
                />
                <p className="text-xs text-secondary mt-1">*Required</p>
              </div>
              <div>
                <FloatingTextField
                  label="Phone Number*"
                  type="tel"
                  value={user.phone}
                  onChange={(e) => updateUser(user.id, "phone", e.target.value)}
                />
                <p className="text-xs text-secondary mt-1">*Required</p>
              </div>
              <div>
                <FloatingTextField
                  label="Job Tittle*"
                  value={user.jobTitle}
                  onChange={(e) => updateUser(user.id, "jobTitle", e.target.value)}
                />
                <p className="text-xs text-secondary mt-1">*Required</p>
              </div>
              <div>
                <FloatingSelect
                  label="Role*"
                  options={roleOptions}
                  value={user.role}
                  onChange={(opt) => updateUser(user.id, "role", opt)}
                  placeholder="Select role"
                />
                <p className="text-xs text-secondary mt-1">*Required</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="flex items-center gap-3 mb-8">
        <Info className="w-5 h-5 text-white fill-primary-dark flex-shrink-0" />
        <p className="text-sm text-secondary leading-relaxed">
          Please ensure all information is correct before continuing
        </p>
      </div>

      {/* Actions */}
      <StepActions onBack={onBack} onNext={onNext} />
    </div>
  );
}
