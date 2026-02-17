"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Link2, Info, ChevronDown, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import SearchBox from "../dynamic/SearchBox";

interface Director {
  id: string;
  name: string;
  role: string;
  initials: string;
}

interface BusinessSelectApprovalProps {
  onCaptureDetails?: () => void;
  onBack?: () => void;
}

function BusinessSelectApprovers({
  onCaptureDetails,
  onBack,
}: BusinessSelectApprovalProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDirectors, setSelectedDirectors] = useState<string[]>(["1", "2"]);
  const [showDesktopSteps, setShowDesktopSteps] = useState(true);

  // Mock data for directors
  const allDirectors: Director[] = [
    { id: "1", name: "Jonathan Khumalo", role: "Director, Member", initials: "JK" },
    { id: "2", name: "Seth Naidoo", role: "Director, Member", initials: "SN" },
    { id: "3", name: "Tasmin Reilly", role: "Director, Member", initials: "TR" },
  ];

  // Filter directors based on search query
  const filteredDirectors = allDirectors.filter((director) =>
    director.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCheckboxChange = (directorId: string) => {
    setSelectedDirectors((prev) =>
      prev.includes(directorId)
        ? prev.filter((id) => id !== directorId)
        : [...prev, directorId]
    );
  };

  const handleCaptureDetails = () => {
    console.log("Capture details clicked", { selectedDirectors });
    // Call callback if provided (for custom logic)
    onCaptureDetails?.();
    // Navigate to capture approver details page
    router.push("/business/linking/capture-details");
  };

  const handleBack = () => {
    console.log("Back clicked");
    // Call callback if provided (for custom logic)
    onBack?.();
    // Navigate back to role definition page
    router.push("/business/linking/role-definition");
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
        Select Approvers
      </h1>

      {/* Subtitle */}
      <p className="text-secondary mb-6 leading-relaxed">
        Details will be validated against our records and CIPC.
        <br />
        Minimum [2] directors/related parties are required to approve.
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
      <div className="flex justify-between items-center mb-4">
        <p className="text-xs text-secondary">
          Search results <span className="font-medium">{filteredDirectors.length}</span>
        </p>
        <p className="text-xs text-secondary">
          Directors/Related Parties Found{" "}
          <span className="font-medium">{allDirectors.length}</span>
        </p>
      </div>

      {/* Directors List */}
      <div className="space-y-0 mb-6">
        {filteredDirectors.map((director) => (
          <div
            key={director.id}
            className="flex items-center gap-3 py-5"
          >
            <Checkbox
              id={`director-${director.id}`}
              checked={selectedDirectors.includes(director.id)}
              onCheckedChange={() => handleCheckboxChange(director.id)}
            />
            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-secondary font-medium text-lg">
                {director.initials}
              </span>
            </div>
            <div className="flex-1">
              <Label
                htmlFor={`director-${director.id}`}
                className="text-secondary font-medium text-lg cursor-pointer block mb-0.5"
              >
                {director.name}
              </Label>
              <p className="text-xs text-secondary">Role - {director.role}</p>
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
            Details will be validated against our records and CIPC.
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" onClick={handleBack} className="sm:flex-1">
          BACK
        </Button>
        <Button onClick={handleCaptureDetails} className="sm:flex-1">
          CAPTURE DETAILS
        </Button>
      </div>
    </>
  );
}

export default BusinessSelectApprovers;