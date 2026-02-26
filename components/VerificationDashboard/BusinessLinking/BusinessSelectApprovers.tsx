"use client";

import React, { useState } from "react";
import { Link2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import SearchBox from "@/components/dynamic/SearchBox";

interface Director {
  id: string;
  name: string;
  role: string;
  initials: string;
  mobile: string;
  email: string;
  profile: string;
}

interface BusinessSelectApprovalProps {
  onCaptureDetails?: () => void;
  onBack?: () => void;
}

function BusinessSelectApprovers({ onCaptureDetails, onBack }: BusinessSelectApprovalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDirectors, setSelectedDirectors] = useState<string[]>(["1", "2"]);

  // Mock data for directors
  const allDirectors: Director[] = [
    {
      id: "1",
      name: "Jonathan Khumalo",
      role: "Director, Member",
      initials: "JK",
      mobile: "*** *** 4567",
      email: "jo*****.kh*****@abc******tects.co.za",
      profile: "Digital ID, Active",
    },
    {
      id: "2",
      name: "Seth Naidoo",
      role: "Director, Member",
      initials: "SN",
      mobile: "*** *** 4567",
      email: "se**.na*****@abc******tects.co.za",
      profile: "Digital ID, Active",
    },
    {
      id: "3",
      name: "Tasmin Reilly",
      role: "Director, Member",
      initials: "TR",
      mobile: "*** *** 4567",
      email: "ta*****.re*****@abc******tects.co.za",
      profile: "Digital ID, Active",
    },
  ];

  // Filter directors based on search query
  const filteredDirectors = allDirectors.filter((director) =>
    director.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckboxChange = (directorId: string) => {
    setSelectedDirectors((prev) =>
      prev.includes(directorId) ? prev.filter((id) => id !== directorId) : [...prev, directorId]
    );
  };

  const handleCaptureDetails = () => {
    onCaptureDetails?.();
  };

  const handleBack = () => {
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
      <h1 className="text-xl md:text-2xl font-bold text-secondary mb-2">Select Approvers</h1>

      {/* Subtitle */}
      <p className="text-sm text-secondary mb-6 leading-relaxed">
        Details will be validated against our latest client records. A minimum of [2]
        directors/owners with active digital IDs are required to approve.
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
          Search results{" "}
          <span className="font-semibold text-primary">{filteredDirectors.length}</span>
        </p>
        <p className="text-xs text-secondary">
          Directors/Related Parties Found{" "}
          <span className="font-semibold text-primary">{allDirectors.length}</span>
        </p>
      </div>

      {/* Directors List */}
      <div className="divide-y divide-gray-200 mb-6">
        {filteredDirectors.map((director) => {
          const isChecked = selectedDirectors.includes(director.id);
          return (
            <div key={director.id} className="flex items-start gap-4 py-5">
              {/* Checkbox */}
              <Checkbox
                id={`director-${director.id}`}
                checked={isChecked}
                onCheckedChange={() => handleCheckboxChange(director.id)}
                className="mt-3.5 shrink-0"
              />

              {/* Avatar */}
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-secondary font-medium text-lg">{director.initials}</span>
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <Label
                  htmlFor={`director-${director.id}`}
                  className="text-secondary font-medium text-lg cursor-pointer block mb-0.5"
                >
                  {director.name}
                </Label>
                <p className="text-xs font-medium text-secondary mb-3">{director.role}</p>

                {/* Info grid */}
                <div className="space-y-2">
                  <div className="flex gap-6">
                    <span className="text-xs text-secondary w-32 shrink-0">Mobile Number</span>
                    <span className="text-xs font-medium text-secondary">{director.mobile}</span>
                  </div>
                  <div className="flex gap-6">
                    <span className="text-xs text-secondary w-32 shrink-0">Email Address</span>
                    <span className="text-xs font-medium text-secondary">{director.email}</span>
                  </div>
                  <div className="flex gap-6">
                    <span className="text-xs text-secondary w-32 shrink-0">Profile</span>
                    <span className="text-xs font-medium text-green-600">{director.profile}</span>
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
          <p className="text-sm text-secondary leading-relaxed">
            If director details have changed, please ask them to reach out to their relationship
            manager/or call centre to update them accordingly before proceeding.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" onClick={handleBack} className="sm:flex-1">
          BACK
        </Button>
        <Button onClick={handleCaptureDetails} className="sm:flex-1">
          CAPTURE ROLES
        </Button>
      </div>
    </div>
  );
}

export default BusinessSelectApprovers;
