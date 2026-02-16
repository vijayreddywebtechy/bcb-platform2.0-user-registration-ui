"use client";

import { useState } from "react";
import { ChevronRight, Building } from "lucide-react";
import AuthLayout from "./shared/AuthLayout";
import AuthCard from "./shared/AuthCard";
import SearchBox from "../dynamic/SearchBox";
import { Button } from "../ui/button";
import Image from "next/image";
import companyIcon from "@/assets/images/icons/icn_company.png";

interface BusinessProfile {
  id: string;
  name: string;
  regNo: string;
  needsVerification: boolean;
  needsApproval: boolean;
}

const mockProfiles: BusinessProfile[] = [
  {
    id: "1",
    name: "ABC Architects (Pty) Ltd",
    regNo: "2007/0345/123",
    needsVerification: true,
    needsApproval: true,
  },
  {
    id: "2",
    name: "ABC Logistics (Pty) Ltd",
    regNo: "2003/1145/123",
    needsVerification: true,
    needsApproval: true,
  }

];

function BusinessProfiles() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState(mockProfiles);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredProfiles(mockProfiles);
    } else {
      const filtered = mockProfiles.filter(
        (profile) =>
          profile.name.toLowerCase().includes(query.toLowerCase()) ||
          profile.regNo.includes(query),
      );
      setFilteredProfiles(filtered);
    }
  };

  const handleProfileSelect = (profile: BusinessProfile) => {
    console.log("Profile selected:", profile);
    // Add your navigation or logic here
  };

  const handleSignOut = () => {
    console.log("Sign out clicked");
    // Add your sign out logic here
  };

  return (
    <AuthLayout>
      <AuthCard className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl text-secondary mb-2">Business Profiles</h1>
          <p className="text-neutral-900 text-base leading-relaxed">
            Select a business banking profile
          </p>
        </div>

        {/* Search Box */}
        <div className="mb-6">
          <SearchBox
            placeholder="Search businesses"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {/* Search Results Info */}
        <div className="flex justify-between items-center mb-4 text-sm">
          <span className="text-secondary text-xs">
            Search results <span className="font-medium text-primary-dark">{filteredProfiles.length}</span>
          </span>
          <span className="text-secondary text-xs">
            Companies found <span className="font-medium text-primary-dark">{mockProfiles.length}</span>
          </span>
        </div>

        {/* Profiles List */}
        <div className="space-y-4 mb-12 max-h-80 overflow-y-auto">
          {filteredProfiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => handleProfileSelect(profile)}
              className="w-full bg-blue-50 hover:bg-blue-100 transition-colors rounded-xl p-4 md:pl-6 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4 flex-1">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <Image
                    src={companyIcon}
                    alt="Company Icon"
                    width={40}
                    height={40}
                  />
                </div>

                {/* Text Content */}
                <div className="text-left flex-1">
                  <h3 className="text-neutral-900 font-medium text-sm leading-normal mb-1">
                    {profile.name}
                  </h3>
                  <p className="text-secondary text-xs leading-normal mb-1">
                    Reg No. <span className="text-green-600">{profile.regNo}</span>
                  </p>
                  <div className="flex flex-wrap space-y-1">
                    {profile.needsVerification && (
                      <p className="text-xs leading-normal flex flex-wrap gap-1">
                        <span>Business Profile</span>
                        <a
                          href="#"
                          className="text-primary-dark hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Needs Verification
                        </a>
                      </p>
                    )}
                    {profile.needsApproval && (
                      <p className="text-xs leading-normal flex flex-wrap gap-1">
                        {" "}
                        <span>Role & Access</span>
                        <a
                          href="#"
                          className="text-primary-dark hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Needs Approval
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Chevron */}
              <ChevronRight
                className="w-8 h-8 text-primary-dark flex-shrink-0 ml-2"
                strokeWidth="1.2"
              />
            </button>
          ))}
        </div>

        {/* Sign Out Button */}
        <Button onClick={handleSignOut} variant="outline" className="w-full">
          SIGN OUT
        </Button>
      </AuthCard>
    </AuthLayout>
  );
}

export default BusinessProfiles;
