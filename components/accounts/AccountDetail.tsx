"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, Info } from "lucide-react";
import { Account } from "@/components/dashboard/BusinessAccounts";
import {
  StatementsTable,
  defaultStatements,
} from "@/components/shared/StatementsTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";
import icnMail from "@/assets/images/icons/icn_mail.svg";
import icnPrinter from "@/assets/images/icons/icn_printer.svg";
import DigitalHubLinks from "@/components/dashboard/DigitalHubLinks";
import icnCashandNotes from "@/assets/images/icons/icn_cash_and_notes.svg"
import icnCloseBtn from "@/assets/images/icons/icn_close_blue.svg"

// ─── Tab content ──────────────────────────────────────────────────────────────

function TransactionHistoryTab() {
  return (
    <div className="py-12 text-center text-gray-400 text-sm">
      Transaction history will appear here.
    </div>
  );
}

function AccountDocumentsTab() {
  return (
    <div className="md:px-4">
      <StatementsTable statements={defaultStatements} />
    </div>
  );
}

function AccountDetailsTab({ account }: { account: Account }) {
  const fields = [
    { label: "Account name", value: account.name },
    { label: "Account type", value: account.type },
    { label: "Account number", value: account.number },
    { label: "Date account opened", value: account.dateOpened ?? "—" },
    { label: "Currency", value: account.currency },
  ];

  return (
    <div className="md:px-4">
      {/* Fields grid — 1 col mobile, 2 col tablet, 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
        {fields.map(({ label, value }) => (
          <div key={label}>
            <p className="text-sm font-medium text-secondary mb-1">{label}</p>
            <p className="text-base text-secondary font-normal">{value}</p>
          </div>
        ))}
      </div>

      {/* Action icon buttons */}
      <div className="flex items-center gap-4 md:gap-6 mt-10">
        <button
          className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors"
          aria-label="Email account details"
        >
          <Image src={icnMail} alt="Email" width={28} height={28} />
        </button>
        <button
          className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center hover:bg-blue-100 transition-colors"
          aria-label="Print account details"
        >
          <Image src={icnPrinter} alt="Print" width={28} height={28} />
        </button>
      </div>

      {/* Footer disclaimer */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-center gap-2 text-sm text-gray-500">
        <Info className="w-4 h-4 text-primary flex-shrink-0" />
        <span>
          Details displayed are based on available account data at the moment.
        </span>
      </div>
    </div>
  );
}

// ─── Main AccountDetail component ────────────────────────────────────────────

type Tab = "history" | "documents" | "details";

type Props = {
  account: Account;
  onBack: () => void;
};

function AccountDetail({ account, onBack }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("documents");
  const [transactOpen, setTransactOpen] = useState(false);

  const tabs: { id: Tab; label: string }[] = [
    { id: "history", label: "Transaction History" },
    { id: "documents", label: "Account Documents" },
    { id: "details", label: "Account Details" },
  ];

  return (
    <>
      {/* ── Blue header ── */}
      <div className="bg-primary-dark w-full">
        <div className="page-container py-6">
          {/* Back */}
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-blue-200 hover:text-white transition-colors text-sm mb-6"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={2} />
            Back
          </button>

          {/* Account info row */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="text-white">
              <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-2">
                {account.name}
              </h1>
              <p className="text-sm text-blue-100 font-normal">
                {account.type}&nbsp;&nbsp;{account.number}
              </p>

              {/* Balances */}
              <div className="flex items-end gap-10 mt-6">
                <div>
                  <p className="text-xs text-blue-200 mb-1">Latest</p>
                  <p className="text-xl md:text-2xl font-medium">
                    R {account.latest}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-blue-200 mb-1">Available</p>
                  <p className="text-xl md:text-2xl font-medium">
                    R {account.available}
                  </p>
                </div>
              </div>
            </div>

            {/* TRANSACT button */}
            <Button className="px-8" onClick={() => setTransactOpen(true)}>
              TRANSACT
            </Button>
          </div>
        </div>
      </div>

      {/* ── Tabs + Content ── */}
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
          <div className="p-6">
            {activeTab === "history" && <TransactionHistoryTab />}
            {activeTab === "documents" && <AccountDocumentsTab />}
            {activeTab === "details" && <AccountDetailsTab account={account} />}
          </div>
        </div>
      </div>
      <div className="mt-8 bg-blue-50 py-20">
                <div className="page-container">
          <DigitalHubLinks />
        </div>
      </div>

      {/* Exit Business Hub Modal */}
      <Dialog open={transactOpen} onOpenChange={setTransactOpen}>
        <DialogContent className="max-w-[590px] !rounded-2xl p-0 gap-0 [&>button]:hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <DialogTitle className="text-base font-medium text-secondary">
              Exit Business Hub
            </DialogTitle>
            <DialogClose asChild>
            <button type="button">
              <Image src={icnCloseBtn} alt="modal close" className="w-6 h-6" />
            </button>
            </DialogClose>
          </div>

          {/* Body */}
          <div className="flex flex-col items-center text-center px-8 py-6">
            <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center mb-6">
              <Image
                src={icnCashandNotes}
                alt="Transact"
                width={96}
                height={96}
              />
            </div>

            <h3 className="text-base md:text-lg font-medium text-primary-dark mb-3">
              Need to transact?
            </h3>

            <DialogDescription className="text-sm text-gray-500 leading-relaxed">
              Please note: You&apos;ll be redirected to Online Banking for
              Business and automatically logged out of the Business Hub
            </DialogDescription>
          </div>

          {/* Footer buttons */}
          <div className="flex flex-wrap gap-4 px-8 pb-8">
            <Button
              variant="outline"
              className="flex-1 h-12 text-base"
              onClick={() => setTransactOpen(false)}
            >
              STAY
            </Button>
            <Button
              className="flex-1 h-12 text-base"
              onClick={() => {
                setTransactOpen(false);
                window.open(
                  "https://www.standardbank.co.za/southafrica/business/products-and-services/business-solutions/online-banking",
                  "_blank"
                );
              }}
            >
              LEAVE
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AccountDetail;
