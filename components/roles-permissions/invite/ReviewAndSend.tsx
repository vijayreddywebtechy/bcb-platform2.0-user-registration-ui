"use client";

import { useState } from "react";
import { ChevronUp, CheckCircle2, XCircle } from "lucide-react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import StepActions from "./StepActions";
import icnDocumentSuccess from "@/assets/images/icons/icn_document_success.svg";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PermissionItem {
  label: string;
  granted: boolean;
}

interface PermissionGroup {
  label: string;
  items: PermissionItem[];
}

interface AccountSummary {
  name: string;
  number: string;
  dailyLimit: string;
  monthlyLimit: string;
}

interface AccountSectionSummary {
  label: string;
  accounts: AccountSummary[];
}

interface ReviewAndSendProps {
  onNext?: () => void;
  onBack?: () => void;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const invitee = {
  initials: "TR",
  name: "Tasmin Reilly",
  role: "Approver",
  mobile: "079 123 4567",
  email: "tasmin.reilly@abcarchitects.co.za",
  status: "Active Banking Digital Profile",
};

const permissionGroups: PermissionGroup[] = [
  {
    label: "Manage Operations",
    items: [
      { label: "Manage team access and permissions", granted: false },
      { label: "Manage accounting software integrations", granted: false },
      { label: "Track queries", granted: true },
      { label: "Access ChatBot", granted: true },
    ],
  },
  {
    label: "Manage Accounts",
    items: [
      { label: "View balances and transaction history", granted: true },
      { label: "View, share and download documents", granted: true },
      { label: "View cash flows", granted: true },
      { label: "Contact relationship manager", granted: true },
    ],
  },
];

const accountSections: AccountSectionSummary[] = [
  {
    label: "Current Accounts",
    accounts: [
      {
        name: "ABC Supplier Account",
        number: "6785 0454 7632",
        dailyLimit: "R 300 000.00",
        monthlyLimit: "R 300 000.00",
      },
      {
        name: "MyMoBiz Account",
        number: "4988 0454 7632",
        dailyLimit: "R 300 000.00",
        monthlyLimit: "R 300 000.00",
      },
      {
        name: "ABC Expense Account",
        number: "3821 0454 7632",
        dailyLimit: "R 300 000.00",
        monthlyLimit: "R 300 000.00",
      },
      {
        name: "Business Current Account",
        number: "4656 0454 7632",
        dailyLimit: "R 300 000.00",
        monthlyLimit: "R 300 000.00",
      },
    ],
  },
  {
    label: "Savings Accounts",
    accounts: [
      {
        name: "Business MarketLink",
        number: "3822 0454 7690",
        dailyLimit: "R 300 000.00",
        monthlyLimit: "R 300 000.00",
      },
      {
        name: "Business PureSave Account",
        number: "4722 0454 7685",
        dailyLimit: "R 300 000.00",
        monthlyLimit: "R 300 000.00",
      },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ReviewAndSend({ onNext, onBack }: ReviewAndSendProps) {
  const [expanded, setExpanded] = useState(true);
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="w-full lg:max-w-[900px]">
      {/* Icon */}
      <div className="mb-4">
        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
          <Image src={icnDocumentSuccess} alt="" width={32} height={32} />
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-xl md:text-2xl font-bold text-secondary mb-2">
        Review &amp; Send Invite
      </h1>

      {/* Subtitle */}
      <p className="text-sm text-secondary mb-8 leading-relaxed">
        Review permissions for the below custom user.
      </p>

      {/* ── Invitee Header (always visible) ── */}
      <div className="flex items-start gap-4 mb-2">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-secondary font-medium text-base md:text-lg">
            {invitee.initials}
          </span>
        </div>
        <div className="flex-1 min-w-0 mt-2">
          <p className="text-secondary font-medium text-base md:text-lg leading-tight">
            {invitee.name}
          </p>
          <div className="space-y-2">
            <p className="text-xs text-gray-500">
              Role - <span className="font-medium text-secondary">{invitee.role}</span>
            </p>
            <p className="text-xs text-gray-500">Mobile Number - {invitee.mobile}</p>
            <p className="text-xs text-gray-500">Email Address - {invitee.email}</p>
            <p className="text-xs text-gray-500">
              Status - <span className="text-green-600 font-medium">{invitee.status}</span>
            </p>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-2 hover:bg-gray-100 rounded-md transition-colors flex-shrink-0 self-start"
          aria-label={expanded ? "Collapse details" : "Expand details"}
        >
          <ChevronUp
            strokeWidth={1.5}
            className={`w-7 h-7 text-secondary transition-transform ${
              expanded ? "" : "rotate-180"
            }`}
          />
        </button>
      </div>

      {/* ── Collapsible content: permissions + accounts + acknowledgement ── */}
      {expanded && (
        <>
          {/* Divider */}
          <div className="border-t border-dashed border-gray-300 my-8" />

          {/* ── Permissions Summary – 2-column ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 mb-10">
            {permissionGroups.map((group) => (
              <div key={group.label}>
                <h2 className="text-lg md:text-xl font-bold text-secondary mb-5">{group.label}</h2>
                <div className="space-y-5">
                  {group.items.map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      {item.granted ? (
                        <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                      ) : (
                        <XCircle className="w-6 h-6 text-gray-400 flex-shrink-0" />
                      )}
                      <span
                        className={`text-sm ${item.granted ? "text-secondary" : "text-gray-400"}`}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-dashed border-gray-300 my-8" />

          {/* ── Account Sections – 2-column ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10 mb-10">
            {accountSections.map((section) => (
              <div key={section.label}>
                <h2 className="text-lg md:text-xl font-bold text-secondary mb-5">
                  {section.label}
                </h2>
                <div className="space-y-6">
                  {section.accounts.map((account) => (
                    <div key={account.number} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-secondary">{account.name}</p>
                        <p className="text-xs text-gray-500">{account.number}</p>
                        <p className="text-xs text-secondary mt-1">
                          <span className="font-medium">Daily Limit</span> R{" "}
                          {account.dailyLimit.replace("R ", "")}
                        </p>
                        <p className="text-xs text-secondary">
                          <span className="font-medium">Monthly Limit</span> R{" "}
                          {account.monthlyLimit.replace("R ", "")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Acknowledgement ── */}
          <div className="flex items-start gap-3 mb-8">
            <Checkbox
              id="acknowledge"
              checked={acknowledged}
              onCheckedChange={(checked) => setAcknowledged(checked as boolean)}
              className="mt-0.5"
            />
            <Label
              htmlFor="acknowledge"
              className="text-sm text-secondary leading-relaxed cursor-pointer"
            >
              <span className="font-bold">I acknowledge that:</span> Standard Bank does not accept
              liability for any financial loss to the complainant as a result of any and all misuse
              of the platform by approved team members.
            </Label>
          </div>
        </>
      )}

      {/* Actions */}
      <StepActions
        onBack={onBack}
        onNext={onNext}
        nextLabel="SEND INVITE"
        nextDisabled={!acknowledged}
      />
    </div>
  );
}
