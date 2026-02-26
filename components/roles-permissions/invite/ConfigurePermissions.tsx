"use client";

import { useState } from "react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FloatingTextField } from "@/components/ui/FloatingTextField";
import StepActions from "./StepActions";
import icnPeopleSecure from "@/assets/images/icons/icn_people_1_secure.svg";
import icnWallet from "@/assets/images/icons/icn_wallet.svg";
import icnCash from "@/assets/images/icons/icn_cash_coins_and_note.svg";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PermissionGroup {
  id: string;
  label: string;
  items: { id: string; label: string }[];
}

interface Account {
  id: string;
  name: string;
  number: string;
  icon: string;
  dailyLimit: string;
  monthlyLimit: string;
}

interface AccountSection {
  id: string;
  label: string;
  accounts: Account[];
}

interface ConfigurePermissionsProps {
  onNext?: () => void;
  onBack?: () => void;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const permissionGroups: PermissionGroup[] = [
  {
    id: "operations",
    label: "Manage Operations",
    items: [
      { id: "ops-accounting", label: "Manage accounting software integrations" },
      { id: "ops-team", label: "Manage team access and permissions" },
      { id: "ops-queries", label: "Track queries" },
      { id: "ops-chatbot", label: "Access ChatBot" },
    ],
  },
  {
    id: "accounts",
    label: "Manage Accounts",
    items: [
      { id: "acc-balances", label: "View balances and transaction history" },
      { id: "acc-documents", label: "View, share and download documents" },
      { id: "acc-cashflows", label: "View cash flows" },
      { id: "acc-relationship", label: "Contact relationship manager" },
    ],
  },
];

const accountSections: AccountSection[] = [
  {
    id: "current",
    label: "Current Accounts",
    accounts: [
      {
        id: "ca1",
        name: "ABC Supplier Account",
        number: "6785 0454 7632",
        icon: "wallet",
        dailyLimit: "R 30 000.00",
        monthlyLimit: "R 300 000.00",
      },
      {
        id: "ca2",
        name: "MyMoBiz Account",
        number: "4988 0454 7632",
        icon: "wallet",
        dailyLimit: "R 30 000.00",
        monthlyLimit: "R 300 000.00",
      },
      {
        id: "ca3",
        name: "ABC Expense Account",
        number: "3821 0454 7632",
        icon: "wallet",
        dailyLimit: "R 30 000.00",
        monthlyLimit: "R 300 000.00",
      },
      {
        id: "ca4",
        name: "Business Current Account",
        number: "4656 0454 7632",
        icon: "wallet",
        dailyLimit: "R 30 000.00",
        monthlyLimit: "R 300 000.00",
      },
    ],
  },
  {
    id: "savings",
    label: "Savings Accounts",
    accounts: [
      {
        id: "sa1",
        name: "Business MarketLink",
        number: "3822 0454 7690",
        icon: "cash",
        dailyLimit: "R 30 000.00",
        monthlyLimit: "R 300 000.00",
      },
      {
        id: "sa2",
        name: "Business PureSave Account",
        number: "4722 0454 7685",
        icon: "cash",
        dailyLimit: "R 30 000.00",
        monthlyLimit: "R 300 000.00",
      },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ConfigurePermissions({ onNext, onBack }: ConfigurePermissionsProps) {
  // Permissions state – some pre-selected as in design
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([
    "ops-queries",
    "ops-chatbot",
    "acc-balances",
    "acc-documents",
    "acc-cashflows",
    "acc-relationship",
  ]);

  // Account selection state – all pre-selected
  const allAccountIds = accountSections.flatMap((s) => s.accounts.map((a) => a.id));
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>(allAccountIds);

  // Account limits state
  const [accountLimits, setAccountLimits] = useState<
    Record<string, { dailyLimit: string; monthlyLimit: string }>
  >(
    Object.fromEntries(
      accountSections.flatMap((s) =>
        s.accounts.map((a) => [a.id, { dailyLimit: a.dailyLimit, monthlyLimit: a.monthlyLimit }])
      )
    )
  );

  const togglePermission = (id: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleGroup = (group: PermissionGroup) => {
    const allIds = group.items.map((i) => i.id);
    const allSelected = allIds.every((id) => selectedPermissions.includes(id));
    if (allSelected) {
      setSelectedPermissions((prev) => prev.filter((p) => !allIds.includes(p)));
    } else {
      setSelectedPermissions((prev) => [...prev, ...allIds.filter((id) => !prev.includes(id))]);
    }
  };

  const toggleAccount = (id: string) => {
    setSelectedAccounts((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const updateLimit = (accountId: string, field: "dailyLimit" | "monthlyLimit", value: string) => {
    setAccountLimits((prev) => ({
      ...prev,
      [accountId]: { ...prev[accountId], [field]: value },
    }));
  };

  return (
    <div className="w-full lg:max-w-[900px]">
      {/* Icon */}
      <div className="mb-4">
        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
          <Image src={icnPeopleSecure} alt="" width={28} height={28} />
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-xl md:text-2xl font-bold text-secondary mb-2">Configure permissions</h1>

      {/* Subtitle */}
      <p className="text-sm text-secondary mb-8 leading-relaxed">
        Add new team member(s) or third-party collaborator.
      </p>

      {/* ── Permission groups – 2-column layout ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {permissionGroups.map((group) => {
          const allIds = group.items.map((i) => i.id);
          const allSelected = allIds.every((id) => selectedPermissions.includes(id));

          return (
            <div key={group.id}>
              {/* Group header */}
              <div className="flex items-center gap-3 bg-gray-700 rounded-t-lg px-6 py-5">
                <Checkbox
                  id={`group-${group.id}`}
                  checked={allSelected}
                  onCheckedChange={() => toggleGroup(group)}
                  className="border-white data-[state=checked]:bg-white data-[state=checked]:text-primary-dark"
                />
                <Label
                  htmlFor={`group-${group.id}`}
                  className="text-white font-medium text-sm cursor-pointer"
                >
                  {group.label}
                </Label>
              </div>

              {/* Permission items */}
              <div>
                {group.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 border-b p-6">
                    <Checkbox
                      id={item.id}
                      checked={selectedPermissions.includes(item.id)}
                      onCheckedChange={() => togglePermission(item.id)}
                    />
                    <Label htmlFor={item.id} className="text-sm text-secondary cursor-pointer">
                      {item.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Account sections ── */}
      {accountSections.map((section) => (
        <div key={section.id} className="mb-10">
          <h2 className="text-xl md:text-2xl font-medium text-secondary mb-1 flex items-center gap-2">
            {section.label}
            <span className="bg-blue-100 text-primary text-xs font-medium px-2.5 py-1 rounded">
              {section.accounts.length}
            </span>
          </h2>

          <div className="divide-y divide-gray-100 mt-4">
            {section.accounts.map((account) => {
              const isSelected = selectedAccounts.includes(account.id);
              const limits = accountLimits[account.id];
              const iconSrc = account.icon === "wallet" ? icnWallet : icnCash;

              return (
                <div key={account.id} className="grid sm:grid-cols-2 gap-4 gap-y-10 py-5">
                  {/* Checkbox + icon + name */}
                  <div className="flex items-center gap-3 sm:min-w-[260px]">
                    <Checkbox
                      id={`acc-${account.id}`}
                      checked={isSelected}
                      onCheckedChange={() => toggleAccount(account.id)}
                      className="shrink-0"
                    />
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Image src={iconSrc} alt="" width={24} height={24} />
                    </div>
                    <div className="min-w-0">
                      <Label
                        htmlFor={`acc-${account.id}`}
                        className="text-sm font-semibold text-secondary cursor-pointer block"
                      >
                        {account.name}
                      </Label>
                      <p className="text-xs text-gray-500">{account.number}</p>
                    </div>
                  </div>

                  {/* Limits */}
                  <div className="flex flex-1 gap-4">
                    <div className="w-full">
                      <FloatingTextField
                        label="Daily Limit*"
                        value={limits?.dailyLimit ?? ""}
                        onChange={(e) => updateLimit(account.id, "dailyLimit", e.target.value)}
                      />
                      <p className="text-xs text-secondary mt-1">*Required</p>
                    </div>
                    <div className="w-full">
                      <FloatingTextField
                        label="Monthly Limit*"
                        value={limits?.monthlyLimit ?? ""}
                        onChange={(e) => updateLimit(account.id, "monthlyLimit", e.target.value)}
                      />
                      <p className="text-xs text-secondary mt-1">*Required</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Actions */}
      <StepActions onBack={onBack} onNext={onNext} />
    </div>
  );
}
