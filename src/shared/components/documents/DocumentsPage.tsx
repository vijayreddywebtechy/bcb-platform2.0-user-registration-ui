"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { FileText, Mail, Download, Eye, ChevronDown } from "lucide-react";
import { FloatingSelect, SelectOption } from "@/shared/components/ui/FloatingReactSelect";
import { Button } from "@/shared/components/ui/button";
import { FloatingDatePicker } from "@/shared/components/ui/FloatingDatePicker";
import icnDocCertificate from "@/assets/images/icons/icn_doc_certificate.svg";
import icnDocumentSuccess from "@/assets/images/icons/icn_document_success.svg";
import icnAlertCircleSolid from "@/assets/images/icons/icn_alert_circle_solid.svg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const accountOptions: SelectOption[] = [
  { value: "4690", label: "Select Account •••• 4690" },
  { value: "7632", label: "ABC Supplier Account •••• 7632" },
  { value: "7685", label: "Business MarketLink •••• 7685" },
];

const MONTHS = ["Dec", "Nov", "Oct", "Sep", "Aug", "Jul", "Jun", "May", "Apr", "Mar", "Feb", "Jan"];

const monthlyStatements = MONTHS.map((month, i) => ({
  id: String(12 - i),
  date: `26 ${month} 2025`,
  statementNo: 12 - i,
}));

// ─── Document cards ───────────────────────────────────────────────────────────

function FeaturedCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-primary rounded-2xl p-6 flex flex-col min-h-[420px]">
      <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mb-5 flex-shrink-0">
        <Image
          src={icnDocCertificate}
          alt="Bank account confirmation letter"
          width={112}
          height={112}
        />
      </div>
      <div className="mt-auto">
        <h3 className="text-2xl text-white mb-3 leading-snug transition-colors">{title}</h3>
        <p className="text-sm text-blue-100 flex-1">{description}</p>
        <div className="flex items-center gap-3 mt-5">
          <button
            className="p-2 bg-white rounded-md flex items-center justify-center  transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </button>
          <button
            className="p-2 bg-white rounded-md flex items-center justify-center transition-colors"
            aria-label="Download"
          >
            <Download className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

function StampedCard({
  title,
  dateRange,
  description,
}: {
  title: string;
  dateRange: string;
  description: string;
}) {
  return (
    <div className="group bg-blue-50 border border-gray-100 hover:bg-primary hover:border-primary rounded-2xl p-6 flex flex-col min-h-[420px] transition-colors duration-300 cursor-pointer">
      <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mb-5 flex-shrink-0">
        <Image src={icnDocumentSuccess} alt="Stamped bank statement" width={112} height={112} />
      </div>
      <div className="mt-auto">
        <h3 className="text-2xl text-secondary group-hover:text-white mb-3 leading-snug transition-colors">
          {title}
        </h3>
        <p className="text-sm font-medium text-primary-dark group-hover:text-white transition-colors mb-3">
          {dateRange}
        </p>
        <p className="text-sm text-gray-500 group-hover:text-white flex-1 transition-colors">
          {description}
        </p>
        <div className="flex items-center gap-3 mt-4">
          <button className="p-2 bg-white rounded-md transition-colors" aria-label="Email">
            <Mail className="w-5 h-5 text-primary transition-colors" strokeWidth={1.5} />
          </button>
          <button className="p-2 bg-white rounded-md transition-colors" aria-label="Download">
            <Download className="w-5 h-5 text-primary transition-colors" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

function DisclaimerCard({ description }: { description: string }) {
  return (
    <div className="group bg-neutral-50 border border-gray-100 hover:bg-primary hover:border-primary rounded-2xl p-6 flex flex-col min-h-[420px] transition-colors duration-300 cursor-pointer">
      <div className="w-28 h-28 flex items-center justify-center mb-5 flex-shrink-0">
        <Image src={icnAlertCircleSolid} alt="Statements disclaimer" width={112} height={112} />
      </div>
      <div className="mt-auto">
        <h3 className="text-base font-medium text-secondary group-hover:text-white mb-3 transition-colors">
          Statements Disclaimer
        </h3>
        <p className="text-xs text-gray-500 group-hover:text-blue-100 leading-relaxed transition-colors whitespace-pre-line">
          {description}
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function DocumentsPage() {
  const [selectedAccount, setSelectedAccount] = useState<SelectOption | null>(accountOptions[0]);
  const [fromDate, setFromDate] = useState<Date | undefined>(new Date(2020, 11, 26));
  const [toDate, setToDate] = useState<Date | undefined>(new Date(2025, 11, 26));
  const [selectedYear, setSelectedYear] = useState("2025");
  const generatedStatements = [
    {
      id: "1",
      dateRange:
        fromDate && toDate
          ? `${format(fromDate, "dd/MM/yyyy")}-${format(toDate, "dd/MM/yyyy")}`
          : "",
      type: "Provisional Statement",
    },
  ];

  return (
    <div>
      <div className="page-container py-8 space-y-12">
        {/* ── Account selector ── */}
        <section>
          <h2 className="text-xl md:text-2xl font-medium text-secondary mb-4">
            Select an account to filter your documents
          </h2>
          <div className="max-w-xs">
            <FloatingSelect
              label="Select Account"
              options={accountOptions}
              value={selectedAccount}
              onChange={(opt) => setSelectedAccount(opt)}
            />
          </div>
        </section>

        {/* ── Document cards ── */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            <FeaturedCard
              title="Bank account confirmation letter"
              description="Download or email your official bank account confirmation letter in PDF"
            />
            <StampedCard
              title="3-Month stamped bank statement"
              dateRange="9 Nov 2025 - 7 Feb 2026"
              description="Download or email your official stamped bank statement in PDF"
            />
            <StampedCard
              title="6-Month stamped bank statement"
              dateRange="9 Aug 2025 - 7 Feb 2026"
              description="Download or email your official stamped bank statement in PDF"
            />
            <DisclaimerCard
              description={
                "Statements are not password protected. Standard Bank is not responsible for any loss or damage you may suffer if any information is accessed or used by any unauthorised party.\n\nA service fee of R10 will be charged for each retrieval, email and download of statements older than 2 years or stamped statements older than 6 months."
              }
            />
          </div>
        </section>

        {/* ── Statements greater than 6 months ── */}
        <section>
          <h2 className="text-xl md:text-2xl font-medium text-secondary mb-4">
            Statements greater than 6 months
          </h2>

          {/* Date filter + generate button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-y-6 mb-6">
            <div className="w-full sm:w-56">
              <FloatingDatePicker label="From Date" value={fromDate} onChange={setFromDate} />
            </div>
            <div className="border border-gray-400 h-0 w-5"></div>
            <div className="w-full sm:w-56">
              <FloatingDatePicker label="To Date" value={toDate} onChange={setToDate} />
            </div>
            <Button className="w-full sm:w-auto whitespace-nowrap px-8 ml-6">
              GENERATE STATEMENT
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <div className="min-w-[480px]">
              {/* Header */}
              <div className="bg-[#3D5068] text-white rounded-t-lg">
                <div className="grid grid-cols-[440px_1fr_100px] px-4 py-3 h-16 items-center text-sm font-medium uppercase tracking-wider">
                  <span>Date</span>
                  <span className="pl-6">Statement Type</span>
                  <span className="text-center">Save</span>
                </div>
              </div>
              {/* Body */}
              <div className="bg-white border-x border-b border-gray-200 rounded-b-lg divide-y divide-gray-100">
                {generatedStatements.map((stmt) => (
                  <div
                    key={stmt.id}
                    className="grid grid-cols-[440px_1fr_100px] px-4 h-16 items-stretch hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2 py-4 text-sm md:text-base font-medium text-secondary">
                      <FileText
                        className="w-5 h-5 text-secondary flex-shrink-0"
                        strokeWidth={1.5}
                      />
                      {stmt.dateRange}
                    </div>
                    <div className="flex items-center py-4 border-l border-gray-200 pl-6 text-sm text-secondary">
                      {stmt.type}
                    </div>
                    <div className="flex items-center justify-center border-l border-gray-200">
                      <button
                        className="p-2 hover:bg-blue-50 rounded-md transition-colors"
                        aria-label="Download statement"
                      >
                        <Download className="w-5 h-5 text-primary" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Un-stamped monthly statements ── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-secondary">Un-stamped monthly statements</h2>
            {/* Year selector */}
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm text-secondary bg-white focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <div className="min-w-[580px]">
              {/* Header */}
              <div className="bg-[#3D5068] text-white rounded-t-lg">
                <div className="grid grid-cols-[440px_1fr_100px_100px_100px] px-4 py-3 h-16 items-center text-sm font-medium uppercase tracking-wider">
                  <span>Date</span>
                  <span className="pl-6">Statement No.</span>
                  <span className="text-center">View</span>
                  <span className="text-center">Email</span>
                  <span className="text-center">Save</span>
                </div>
              </div>
              {/* Body */}
              <div className="bg-white border-x border-b border-gray-200 rounded-b-lg divide-y divide-gray-100">
                {monthlyStatements.map((stmt) => (
                  <div
                    key={stmt.id}
                    className="grid grid-cols-[440px_1fr_100px_100px_100px] px-4 items-stretch hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2 py-4 text-sm md:text-base font-medium text-secondary">
                      <FileText
                        className="w-5 h-5 text-secondary flex-shrink-0"
                        strokeWidth={1.5}
                      />
                      {stmt.date}
                    </div>
                    <div className="flex flex-col justify-center py-4 border-l border-gray-200 pl-6">
                      <p className="text-sm font-medium text-secondary">
                        Statement No. {stmt.statementNo}
                      </p>
                      <p className="text-sm text-secondary">Official monthly bank statement PDF</p>
                    </div>
                    <div className="flex items-center justify-center border-l border-gray-200">
                      <button
                        className="p-2 hover:bg-blue-50 rounded-md transition-colors"
                        aria-label="View statement"
                      >
                        <Eye className="w-5 h-5 text-primary" strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        className="p-2 hover:bg-blue-50 rounded-md transition-colors"
                        aria-label="Email statement"
                      >
                        <Mail className="w-5 h-5 text-primary" strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        className="p-2 hover:bg-blue-50 rounded-md transition-colors"
                        aria-label="Download statement"
                      >
                        <Download className="w-5 h-5 text-primary" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm text-secondary">
            Displaying <span className="font-medium">{monthlyStatements.length}</span> of{" "}
            <span className="font-medium">{monthlyStatements.length}</span>
          </p>
        </section>
      </div>
    </div>
  );
}
