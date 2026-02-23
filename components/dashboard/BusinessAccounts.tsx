"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LayoutGrid, List, ChevronRight, Wallet } from "lucide-react";
import { Card, CardHeader, CardBody } from "./Card";
import { FloatingSelect, SelectOption } from "@/components/ui/FloatingReactSelect";
import SearchBox from "@/components/dynamic/SearchBox";
import { Button } from "../ui/button";
import icnWallet from "@/assets/images/icons/icn_wallet.svg";
import icnSavings from "@/assets/images/icons/icn_cash_coins_and_note.svg";
import DigitalHubLinks from "./DigitalHubLinks";

type Props = {};

export type Account = {
  id: string;
  name: string;
  number: string;
  currency: string;
  type: string;
  latest: string;
  available: string;
  accountType: "current" | "savings";
  dateOpened?: string;
};

const accounts: Account[] = [
  {
    id: "1",
    name: "ABC Supplier Account",
    number: "6785 0454 7632",
    currency: "ZAR",
    type: "Current Account",
    latest: "12 638 345.00",
    available: "11 630 000.00",
    accountType: "current",
    dateOpened: "14 March 2018",
  },
  {
    id: "2",
    name: "MyMoBiz Account",
    number: "4988 0454 7632",
    currency: "ZAR",
    type: "Current Account",
    latest: "712 566.00",
    available: "712 566.00",
    accountType: "current",
    dateOpened: "2 August 2019",
  },
  {
    id: "3",
    name: "ABC Expense Account",
    number: "3821 0454 7632",
    currency: "ZAR",
    type: "Current Account",
    latest: "3 438 280.00",
    available: "3 438 280.00",
    accountType: "current",
    dateOpened: "7 January 2020",
  },
  {
    id: "4",
    name: "Business Current Account",
    number: "4656 0454 7632",
    currency: "ZAR",
    type: "Current Account",
    latest: "1 153 600.00",
    available: "1 153 600.00",
    accountType: "current",
    dateOpened: "22 November 2017",
  },
  {
    id: "5",
    name: "Business MarketLink",
    number: "3822 0454 7690",
    currency: "ZAR",
    type: "Savings Account",
    latest: "470 500.00",
    available: "470 500.00",
    accountType: "savings",
    dateOpened: "10 May 2021",
  },
  {
    id: "6",
    name: "Business PureSave Account",
    number: "4722 0454 7685",
    currency: "ZAR",
    type: "Savings Account",
    latest: "7 600 400.00",
    available: "7 600 400.00",
    accountType: "savings",
    dateOpened: "1 June 2021",
  },
];

const currencyOptions: SelectOption[] = [
  { value: "zar", label: "ZAR" },
  { value: "usd", label: "USD" },
  { value: "eur", label: "EUR" },
  { value: "gbp", label: "GBP" },
];

const accountTypeOptions: SelectOption[] = [
  { value: "all", label: "All Accounts" },
  { value: "current", label: "Current Accounts" },
  { value: "savings", label: "Savings Accounts" },
];

export function BusinessAccountsContent({ onAccountSelect }: { onAccountSelect?: (account: Account) => void }) {
  const [selectedCurrency, setSelectedCurrency] = useState<SelectOption | null>(
    currencyOptions.find((opt) => opt.value === "zar") || null
  );
  const [selectedAccountType, setSelectedAccountType] = useState<SelectOption | null>(
    accountTypeOptions.find((opt) => opt.value === "all") || null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Filter accounts
  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.number.includes(searchQuery);
    const matchesType =
      selectedAccountType?.value === "all" ||
      account.accountType === selectedAccountType?.value;
    return matchesSearch && matchesType;
  });

  const currentAccounts = filteredAccounts.filter((a) => a.accountType === "current");
  const savingsAccounts = filteredAccounts.filter((a) => a.accountType === "savings");

  return (
    <>
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10 bg-neutral-50 p-4 md:p-6 rounded-lg">
          <div className="md:col-span-2">
            <FloatingSelect
              label="Currency"
              options={currencyOptions}
              value={selectedCurrency}
              onChange={(option) => setSelectedCurrency(option)}
            />
          </div>

          <div className="md:col-span-4">
            <FloatingSelect
              label="Account Type"
              options={accountTypeOptions}
              value={selectedAccountType}
              onChange={(option) => setSelectedAccountType(option)}
            />
          </div>

          <div className="md:col-span-4">
            <SearchBox
              placeholder="Search accounts"
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>

          <div className="md:col-span-2 flex items-center gap-2 justify-end">
            <button
              onClick={() => setViewMode("list")}
              className={`p-3 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-primary text-white"
                  : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
              aria-label="List view"
            >
              <List className="w-5 h-5" strokeWidth={2} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-3 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-primary text-white"
                  : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Current Accounts */}
        {currentAccounts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-medium text-secondary mb-3 flex items-center gap-2">
              Current accounts
              <span className="bg-blue-100 text-primary text-xs font-medium px-2.5 py-1.5 rounded">
                {currentAccounts.length}
              </span>
            </h3>

            {viewMode === "list" ? (
              <div>
                {currentAccounts.map((account) => (
                  <div key={account.id} className="py-4 border-b border-neutral-200 last:border-b-0">
                    <div
                      className="flex items-center p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
                      onClick={() => onAccountSelect?.(account)}
                    >
                      <div className="flex items-center gap-4 w-[35%]">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                          <Image src={icnWallet} alt="Current Account" width={20} height={20} className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm md:text-base font-medium text-secondary mb-1">{account.name}</h4>
                          <p className="text-sm text-secondary">{account.number}</p>
                        </div>
                      </div>
                      <div className="flex items-center w-[65%]">
                        <div className="w-[25%]">
                          <p className="text-sm text-secondary mb-1">{account.currency}</p>
                          <p className="text-base text-secondary">{account.type}</p>
                        </div>
                        <div className="w-[37.5%] pl-8 border-l border-gray-200">
                          <p className="text-xs text-secondary mb-1">Latest</p>
                          <p className="text-base font-medium text-secondary">{account.latest}</p>
                        </div>
                        <div className="w-[37.5%] pl-8 border-l border-gray-200 flex items-center justify-between">
                          <div>
                            <p className="text-xs text-secondary mb-1">Available</p>
                            <p className="text-base font-medium text-secondary">{account.available}</p>
                          </div>
                          <button type="button" className="p-1 opacity-0 hover:bg-blue-100 group-hover:opacity-100 transition-opacity ml-4 rounded-md" onClick={(e) => { e.stopPropagation(); onAccountSelect?.(account); }}>
                            <ChevronRight className="w-7 h-7 text-secondary" strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {currentAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer group hover:bg-neutral-50"
                    onClick={() => onAccountSelect?.(account)}
                  >
                    {/* Top row: icon + arrow */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-full bg-blue-50 group-hover:bg-white flex items-center justify-center">
                        <Image src={icnWallet} alt="Current Account" width={20} height={20} className="w-5 h-5" />
                      </div>
                      <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-200 transition-all"
                        onClick={(e) => { e.stopPropagation(); onAccountSelect?.(account); }}
                      >
                        <ChevronRight className="w-6 h-6 text-secondary" strokeWidth={1.5} />
                      </button>
                    </div>
                    {/* Account info */}
                    <h4 className="text-sm md:text-base font-semibold text-secondary mb-1">{account.name}</h4>
                    <p className="text-sm text-neutral-500 mb-1">{account.number}</p>
                    <p className="text-sm text-neutral-500">
                      {account.type}&nbsp;&nbsp;{account.currency}
                    </p>
                    {/* Amounts */}
                    <div className="mt-6 mb-3">
                      <p className="text-xs text-neutral-500 mb-1">Latest</p>
                      <p className="text-base font-bold text-secondary">{account.latest}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-neutral-500 mb-1">Available</p>
                      <p className="text-base font-bold text-secondary">{account.available}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Savings Accounts */}
        {savingsAccounts.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-medium text-secondary mb-3 flex items-center gap-2">
              Savings accounts
              <span className="bg-blue-100 text-primary text-xs font-medium px-2.5 py-1.5 rounded">
                {savingsAccounts.length}
              </span>
            </h3>

            {viewMode === "list" ? (
              <div>
                {savingsAccounts.map((account) => (
                  <div key={account.id} className="py-4 border-b border-neutral-200 last:border-b-0">
                    <div
                      className="flex items-center p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
                      onClick={() => onAccountSelect?.(account)}
                    >
                      <div className="flex items-center gap-4 w-[35%]">
                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                          <Image src={icnSavings} alt="Savings Account" width={20} height={20} className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm md:text-base font-medium text-secondary mb-1">{account.name}</h4>
                          <p className="text-sm text-secondary">{account.number}</p>
                        </div>
                      </div>
                      <div className="flex items-center w-[65%]">
                        <div className="w-[25%]">
                          <p className="text-sm text-secondary mb-1">{account.currency}</p>
                          <p className="text-base text-secondary">{account.type}</p>
                        </div>
                        <div className="w-[37.5%] pl-8 border-l border-gray-200">
                          <p className="text-xs text-secondary mb-1">Latest</p>
                          <p className="text-base font-medium text-secondary">{account.latest}</p>
                        </div>
                        <div className="w-[37.5%] pl-8 border-l border-gray-200 flex items-center justify-between">
                          <div>
                            <p className="text-xs text-secondary mb-1">Available</p>
                            <p className="text-base font-medium text-secondary">{account.available}</p>
                          </div>
                          <button type="button" className="p-1 opacity-0 hover:bg-blue-100 group-hover:opacity-100 transition-opacity ml-4 rounded-md" onClick={(e) => { e.stopPropagation(); onAccountSelect?.(account); }}>
                            <ChevronRight className="w-7 h-7 text-secondary" strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {savingsAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-all cursor-pointer group hover:bg-neutral-50"
                    onClick={() => onAccountSelect?.(account)}
                  >
                    {/* Top row: icon + arrow */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-10 h-10 rounded-full bg-green-50 group-hover:bg-white flex items-center justify-center">
                        <Image src={icnSavings} alt="Savings Account" width={20} height={20} className="w-5 h-5" />
                      </div>
                      <button
                        type="button"
                        className="w-8 h-8 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 hover:bg-gray-200 transition-all"
                        onClick={(e) => { e.stopPropagation(); onAccountSelect?.(account); }}
                      >
                        <ChevronRight className="w-5 h-5 text-secondary" strokeWidth={1.5} />
                      </button>
                    </div>
                    {/* Account info */}
                    <h4 className="text-sm md:text-base font-semibold text-secondary mb-1">{account.name}</h4>
                    <p className="text-sm text-neutral-500 mb-1">{account.number}</p>
                    <p className="text-sm text-neutral-500">
                      {account.type}&nbsp;&nbsp;{account.currency}
                    </p>
                    {/* Amounts */}
                    <div className="mt-6 mb-3">
                      <p className="text-xs text-neutral-500 mb-1">Latest</p>
                      <p className="text-base font-bold text-secondary">{account.latest}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-neutral-500 mb-1">Available</p>
                      <p className="text-base font-bold text-secondary">{account.available}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 mt-2">
          <p className="text-sm sm:text-base md:text-lg text-secondary">
            Displaying <span className="font-medium">{filteredAccounts.length}</span> of{" "}
            <span className="font-medium">{accounts.length}</span>
          </p>
          <Button variant="outline" onClick={() => console.log("Export accounts")}>
            VIEW ALL
          </Button>
        </div>

    </>
  );
}

function BusinessAccounts({}: Props) {
  const router = useRouter();

  return (
    <Card>
      <CardHeader
        icon={<Wallet className="w-5 h-5 text-primary-dark" strokeWidth={2} />}
        title="Business accounts"
      />
      <CardBody>
        <BusinessAccountsContent
          onAccountSelect={() => router.push("/accounts")}
        />
      </CardBody>
    </Card>
  );
}

export default BusinessAccounts;
