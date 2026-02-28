"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import Image from "next/image";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Label } from "@/shared/components/ui/label";
import SearchBox from "@/shared/components/dynamic/SearchBox";
import StepActions from "./StepActions";
import icnPeopleSecure from "@/assets/images/icons/icn_people_1_secure.svg";

interface User {
  id: string;
  name: string;
  role: string;
  initials: string;
  mobile: string;
  email: string;
  profile: string;
}

interface SelectUsersProps {
  onNext?: () => void;
  onBack?: () => void;
}

const allUsers: User[] = [
  {
    id: "1",
    name: "Jonathan Khumalo",
    role: "Director, Member",
    initials: "JK",
    mobile: "*** *** 4567",
    email: "jo*****.kh*****@abc*****tects.co.za",
    profile: "Digital ID, Active",
  },
  {
    id: "2",
    name: "Seth Naidoo",
    role: "Director, Member",
    initials: "SN",
    mobile: "*** *** 4567",
    email: "se**.na*****@abc*****tects.co.za",
    profile: "Digital ID, Active",
  },
  {
    id: "3",
    name: "Tasmin Reilly",
    role: "Director, Member",
    initials: "TR",
    mobile: "*** *** 4567",
    email: "ta****.re*****@abc*****tects.co.za",
    profile: "Digital ID, Active",
  },
];

export default function SelectUsers({ onNext, onBack }: SelectUsersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>(["1", "2", "3"]);

  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleUser = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
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
      <h1 className="text-xl md:text-2xl font-bold text-secondary mb-2">Related Parties</h1>

      {/* Subtitle */}
      <p className="text-sm text-secondary mb-6 leading-relaxed">
        Invite someone from related party
      </p>

      {/* Search Box */}
      <div className="mb-3">
        <SearchBox
          placeholder="Search directors and related parties"
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </div>

      {/* Search Results Header */}
      <div className="flex justify-between items-center mb-2">
        <p className="text-xs text-secondary">
          Search results <span className="font-semibold text-primary">{filteredUsers.length}</span>
        </p>
        <p className="text-xs text-secondary">
          Directors/Related Parties Found{" "}
          <span className="font-semibold text-primary">{allUsers.length}</span>
        </p>
      </div>

      {/* Users List */}
      <div className="divide-y divide-gray-200 mb-6">
        {filteredUsers.map((user) => {
          const isChecked = selectedUsers.includes(user.id);
          return (
            <div key={user.id} className="flex items-start gap-4 py-5">
              <Checkbox
                id={`user-${user.id}`}
                checked={isChecked}
                onCheckedChange={() => toggleUser(user.id)}
                className="mt-3.5 shrink-0"
              />

              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-semibold text-sm">{user.initials}</span>
              </div>

              <div className="flex-1 min-w-0">
                <Label
                  htmlFor={`user-${user.id}`}
                  className="text-secondary font-semibold text-base cursor-pointer block mb-0.5"
                >
                  {user.name}
                </Label>
                <p className="text-xs font-bold text-secondary mb-3">{user.role}</p>

                <div className="space-y-2">
                  <div className="flex gap-6">
                    <span className="text-xs text-gray-500 w-32 shrink-0">Mobile Number</span>
                    <span className="text-xs font-medium text-secondary">{user.mobile}</span>
                  </div>
                  <div className="flex gap-6">
                    <span className="text-xs text-gray-500 w-32 shrink-0">Email Address</span>
                    <span className="text-xs font-medium text-secondary">{user.email}</span>
                  </div>
                  <div className="flex gap-6">
                    <span className="text-xs text-gray-500 w-32 shrink-0">Profile</span>
                    <span className="text-xs font-medium text-green-600">{user.profile}</span>
                  </div>
                </div>
              </div>
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
            <p>
              <span className="font-bold">Active Banking Digital Profile:</span> If you already have
              an active Banking Digital Profile, you can sign in using your existing username and
              password.
            </p>
            <p className="mt-2 text-gray-500 italic">
              No Active Banking Digital Profile: If you don&apos;t have an active Banking Digital
              Profile, you&apos;ll need to complete a quick registration to create one before you
              can continue.
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <StepActions onBack={onBack} onNext={onNext} nextDisabled={selectedUsers.length === 0} />
    </div>
  );
}
