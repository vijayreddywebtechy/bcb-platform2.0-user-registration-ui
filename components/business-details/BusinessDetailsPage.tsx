"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff, Info } from "lucide-react";
import icnMail from "@/assets/images/icons/icn_mail.svg";
import icnPrinter from "@/assets/images/icons/icn_printer.svg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const businessDetails = {
  businessName: "ABC Architects (Pty) Ltd",
  industrySector: "Professional Services",
  businessType: "Private Company",
  registrationNumber: "2007/0345/123",
  tradingName: "ABC Architects",
  businessTaxNumber: "9234 567 890",
};

// ─── Tab content ──────────────────────────────────────────────────────────────

function GeneralDetailsTab() {
  const [showTaxNumber, setShowTaxNumber] = useState(false);

  const maskedTax = "**** *** ***";

  const fields = [
    { label: "Business name", value: businessDetails.businessName },
    { label: "Industry/Sector", value: businessDetails.industrySector },
    { label: "Business type", value: businessDetails.businessType },
    { label: "Registration number", value: businessDetails.registrationNumber },
    { label: "Trading name", value: businessDetails.tradingName },
    {
      label: "Business tax number",
      value: showTaxNumber ? businessDetails.businessTaxNumber : maskedTax,
      action: (
        <button
          type="button"
          onClick={() => setShowTaxNumber(!showTaxNumber)}
          className="ml-2 text-primary hover:text-primary-dark transition-colors"
          aria-label={showTaxNumber ? "Hide tax number" : "Show tax number"}
        >
          {showTaxNumber ? (
            <EyeOff className="w-5 h-5" strokeWidth={1.5} />
          ) : (
            <Eye className="w-5 h-5" strokeWidth={1.5} />
          )}
        </button>
      ),
    },
  ];

  return (
    <div className="md:px-4">
      {/* Fields grid — 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
        {fields.map(({ label, value, action }) => (
          <div key={label}>
            <p className="text-sm font-medium text-secondary mb-1">{label}</p>
            <div className="flex items-center">
              <p className="text-base text-secondary font-normal">{value}</p>
              {action}
            </div>
          </div>
        ))}
      </div>

      {/* Action icon buttons */}
      <div className="flex items-center gap-4 md:gap-6 mt-10">
        <button
          className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors"
          aria-label="Email business details"
        >
          <Image src={icnMail} alt="Email" width={28} height={28} />
        </button>
        <button
          className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors"
          aria-label="Print business details"
        >
          <Image src={icnPrinter} alt="Print" width={28} height={28} />
        </button>
      </div>

      {/* Footer disclaimer */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex items-center gap-2 text-sm text-gray-500">
        <Info className="w-4 h-4 text-primary flex-shrink-0" />
        <span>
          Details displayed are based on available client information. If this is incorrect, please
          call <span className="font-semibold text-secondary">0860 109 075</span> and speak to a
          consultant.
        </span>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

type Tab = "general";

export function BusinessDetailsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("general");

  const tabs: { id: Tab; label: string }[] = [{ id: "general", label: "General Details" }];

  return (
    <div className="page-container py-8">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-gray-200 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-6 px-4 text-sm md:text-base font-medium border-b-2 transition-colors mr-2 ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-secondary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="p-6">{activeTab === "general" && <GeneralDetailsTab />}</div>
      </div>
    </div>
  );
}
