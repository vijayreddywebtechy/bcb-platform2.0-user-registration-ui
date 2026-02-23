"use client";

import { useState } from "react";
import { FileText, Mail, Download, AlertCircle } from "lucide-react";
import { FloatingSelect, SelectOption } from "@/components/ui/FloatingReactSelect";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Statement = {
  id: string;
  type: string;
  description: string;
  dateRange: string;
};

// ─── Default data ─────────────────────────────────────────────────────────────

export const defaultStatements: Statement[] = [
  {
    id: "1",
    type: "3-Month Statement",
    description: "Official bank statement stamped PDF",
    dateRange: "9 Nov 2025 - 7 Feb 2026",
  },
  {
    id: "2",
    type: "6-Month Statement",
    description: "Official bank statement stamped PDF",
    dateRange: "11 Aug 2025 - 7 Feb 2026",
  },
  {
    id: "3",
    type: "12-Month Statement",
    description: "Official bank statement stamped PDF",
    dateRange: "8 Feb 2025 - 7 Feb 2026",
  },
  {
    id: "4",
    type: "24-Month Statement",
    description: "Official bank statement stamped PDF",
    dateRange: "11 Feb 2024 - 7 Feb 2026",
  },
];

const documentTypeOptions: SelectOption[] = [
    { value: "all", label: "All statements" },
  { value: "bank letter", label: "Official Bank Letter" },
  { value: "stamped", label: "Stamped statements" },
  { value: "unstamped", label: "Un-stamped statements" },
];

// ─── Component ────────────────────────────────────────────────────────────────

type Props = {
  statements?: Statement[];
  totalCount?: number;
  onEmail?: (statement: Statement) => void;
  onDownload?: (statement: Statement) => void;
  onViewAll?: () => void;
};

export function StatementsTable({
  statements = defaultStatements,
  totalCount,
  onEmail,
  onDownload,
  onViewAll,
}: Props) {
  const [selectedDocType, setSelectedDocType] = useState<SelectOption | null>(null);

  const total = totalCount ?? statements.length;

  return (
    <>
      {/* Document type filter */}
      <div className="mb-6 md:max-w-xs">
        <FloatingSelect
          label="Select document type"
          options={documentTypeOptions}
          value={selectedDocType}
          onChange={(opt) => setSelectedDocType(opt)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {/* Header */}
        <div className="bg-primary-medium text-white rounded-t-lg">
          <div className="grid grid-cols-[1fr_auto_auto_auto] md:grid-cols-[1fr_1fr_auto_auto] gap-4 px-4 md:p-6 font-medium text-xs md:text-sm uppercase tracking-wide">
            <div>Description</div>
            <div className="hidden md:block">Date Range</div>
            <div className="text-center md:min-w-24">Email</div>
            <div className="text-center md:min-w-24">Save</div>
          </div>
        </div>

        {/* Body */}
        <div className="bg-white border-x border-b border-gray-200 rounded-b-lg">
          {statements.map((statement, index) => (
            <div
              key={statement.id}
              className={`grid grid-cols-[1fr_auto_auto_auto] md:grid-cols-[1fr_1fr_auto_auto] gap-4 p-4 md:px-6 md:py-5 hover:bg-gray-50 transition-colors ${
                index !== statements.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              {/* Description */}
              <div className="flex items-center gap-3 min-w-0">
                <FileText
                  className="w-5 h-5 md:w-6 md:h-6 text-secondary flex-shrink-0"
                  strokeWidth={1.5}
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-medium text-secondary mb-0.5">{statement.type}</h4>
                  <p className="text-xs text-secondary truncate">{statement.description}</p>
                </div>
              </div>

              {/* Date Range */}
              <div className="hidden md:flex items-center text-sm text-secondary">
                {statement.dateRange}
              </div>

              {/* Email */}
              <div className="flex items-center justify-center md:min-w-24">
                <button
                  onClick={() => onEmail ? onEmail(statement) : console.log(`Email: ${statement.id}`)}
                  className="p-2 hover:bg-blue-50 rounded-md transition-colors group"
                  aria-label="Email statement"
                >
                  <Mail
                    className="w-5 h-5 md:w-6 md:h-6 text-primary group-hover:text-primary-dark"
                    strokeWidth={1.5}
                  />
                </button>
              </div>

              {/* Download */}
              <div className="flex items-center justify-center md:min-w-24">
                <button
                  onClick={() => onDownload ? onDownload(statement) : console.log(`Download: ${statement.id}`)}
                  className="p-2 hover:bg-blue-50 rounded-md transition-colors group"
                  aria-label="Download statement"
                >
                  <Download
                    className="w-5 h-5 md:w-6 md:h-6 text-primary group-hover:text-primary-dark"
                    strokeWidth={1.5}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 bg-blue-50 p-4 rounded-md">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-gray-700 leading-relaxed">
            <span className="font-medium">Statements Disclaimer:</span> Statements are not password
            protected. Standard Bank is not responsible for any loss or damage you may suffer if any
            information is accessed or used by any unauthorised party. A service fee of R10 will be
            charged for each retrieval, email and download of statements older than 2 years or
            stamped statements older than 6 months.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 mt-2">
        <p className="text-sm sm:text-base md:text-lg text-secondary">
          Displaying <span className="font-medium">{statements.length}</span> of{" "}
          <span className="font-medium">{total}</span>
        </p>
        <Button variant="outline" onClick={onViewAll}>
          VIEW ALL
        </Button>
      </div>
    </>
  );
}

export default StatementsTable;
