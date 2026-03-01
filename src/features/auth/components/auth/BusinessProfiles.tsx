"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import AuthLayout from "./shared/AuthLayout";
import AuthCard from "./shared/AuthCard";
import SearchBox from "@/shared/components/dynamic/SearchBox";
import { Button } from "@/shared/components/ui/button";
import Image from "next/image";
import companyIcon from "@/assets/images/icons/icn_company.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { STORAGE_KEYS } from "@/config";

interface CustomerDetail {
  bpId: string;
  customerName: string;
  relationshipType: string;
  accountDetails: any[];
}

function BusinessProfiles() {
  const [allProfiles, setAllProfiles] = useState<CustomerDetail[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState<CustomerDetail[]>([]);
  const router = useRouter();

  useEffect(() => {
    const accountListStr = sessionStorage.getItem(STORAGE_KEYS.ACCOUNT_LIST);
    if (accountListStr) {
      try {
        const parsed = JSON.parse(accountListStr);
        if (parsed?.customerDetails && Array.isArray(parsed.customerDetails)) {
          setAllProfiles(parsed.customerDetails);
          setFilteredProfiles(parsed.customerDetails);
        }
      } catch (e) {
        console.error("Failed to parse account list from session storage", e);
      }
    }
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredProfiles(allProfiles);
    } else {
      const filtered = allProfiles.filter(
        (profile) =>
          profile.customerName.toLowerCase().includes(query.toLowerCase()) ||
          profile.bpId.includes(query)
      );
      setFilteredProfiles(filtered);
    }
  };

  const handleProfileSelect = (bpId: string) => {
    const profile = allProfiles.find((p) => p.bpId === bpId);
    if (profile) {
      const selectedCompany = {
        companyName: profile.customerName,
        bpid: profile.bpId,
        accountList: profile.accountDetails || [],
      };
      localStorage.setItem(STORAGE_KEYS.SELECTED_COMPANY, JSON.stringify(selectedCompany));
      // In a real app we might also set React state, but here we just navigate.
      router.push("/identity-verification");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem(STORAGE_KEYS.SELECTED_COMPANY);
    localStorage.removeItem(STORAGE_KEYS.USER_ROLES);
    sessionStorage.clear();
    router.push("/");
  };

  const displayProfiles = filteredProfiles.slice(0, 2);

  return (
    <AuthLayout>
      <AuthCard className="w-full max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl text-secondary mb-2">Business Profiles</h1>
          <p className="text-neutral-900 text-base leading-relaxed">
            Select a business banking profile
          </p>
        </div>

        {/* Search Box */}
        <div className="mb-6">
          <SearchBox placeholder="Search businesses" value={searchQuery} onChange={handleSearch} />
        </div>

        {/* Search Results Info */}
        <div className="flex justify-between items-center mb-4 text-sm">
          <span className="text-secondary text-xs">
            Search results{" "}
            <span className="font-medium text-primary-dark">{filteredProfiles.length}</span>
          </span>
          <span className="text-secondary text-xs">
            Companies found{" "}
            <span className="font-medium text-primary-dark">{allProfiles.length}</span>
          </span>
        </div>

        {/* Profiles List */}
        <div className="space-y-4 mb-12 max-h-80 overflow-y-auto">
          {displayProfiles.map((profile) => (
            <button
              key={profile.bpId}
              onClick={() => handleProfileSelect(profile.bpId)}
              className="w-full bg-blue-50 hover:bg-blue-100 transition-colors rounded-xl p-4 md:pl-6 flex items-center justify-between group"
            >
              <div className="flex items-center gap-4 flex-1">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <Image src={companyIcon} alt="Company Icon" width={40} height={40} />
                </div>

                {/* Text Content */}
                <div className="text-left flex-1">
                  <h3 className="text-neutral-900 font-medium text-sm leading-normal mb-1">
                    {profile.customerName}
                  </h3>
                  <p className="text-secondary text-xs leading-normal mb-1">
                    BPID: <span className="text-green-600">{profile.bpId}</span>
                  </p>
                  <div className="flex flex-wrap space-y-1">
                    <p className="text-xs leading-normal flex flex-wrap gap-1">
                      <span>Business Profile</span>
                      <Link
                        href="#"
                        className="text-primary-dark hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Needs Verification
                      </Link>
                    </p>
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
          {allProfiles.length === 0 && (
            <div className="text-center text-sm text-neutral-500 py-4">
              No business profiles found.
            </div>
          )}
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

