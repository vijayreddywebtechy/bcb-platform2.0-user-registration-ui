"use client";

import { FileText, Mail, Download, AlertCircle } from "lucide-react";

const STATEMENTS = [
  { desc: "3-Month Statement (Official bank statement stamped PDF)", dateRange: "9 Nov 2025 - 7 Feb 2026" },
  { desc: "6-Month Statement (Official bank statement stamped PDF)", dateRange: "11 Aug 2025 - 7 Feb 2026" },
  { desc: "12-Month Statement (Official bank statement stamped PDF)", dateRange: "8 Feb 2025 - 7 Feb 2026" },
  { desc: "24-Month Statement (Official bank statement stamped PDF)", dateRange: "11 Feb 2024 - 7 Feb 2026" },
];

export default function DashboardStatements() {
  return (
    <section className="bg-white border border-neutral-200 rounded-lg p-5 font-bspro shadow-sm">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-5">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-secondary" />
          <h2 className="text-[18px] font-semibold text-secondary leading-tight">Formal statements</h2>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <select className="border border-neutral-300 rounded px-3 py-2 text-sm text-secondary bg-white">
            <option>Business PureSav... Savings Account **** 4690</option>
          </select>
          <select className="border border-neutral-300 rounded px-3 py-2 text-sm text-secondary bg-white">
            <option>Stamped statements</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-neutral-200 text-left text-neutral-600 uppercase text-[11px] tracking-wide">
              <th className="py-3 font-semibold">Description</th>
              <th className="py-3 font-semibold">Date range</th>
              <th className="py-3 font-semibold w-24">Email</th>
              <th className="py-3 font-semibold w-24">Save</th>
            </tr>
          </thead>
          <tbody>
            {STATEMENTS.map((row, i) => (
              <tr key={i} className="border-b border-neutral-100">
                <td className="py-4 flex items-center gap-2 text-[14px]">
                  <FileText className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                  {row.desc}
                </td>
                <td className="py-4 text-secondary text-[14px]">{row.dateRange}</td>
                <td className="py-3">
                  <button type="button" className="text-primary hover:underline" aria-label="Email">
                    <Mail className="w-4 h-4 inline" />
                  </button>
                </td>
                <td className="py-3">
                  <button type="button" className="text-primary hover:underline" aria-label="Download">
                    <Download className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-start gap-2 mt-4 p-3 bg-amber-50 border border-amber-200 rounded text-sm text-secondary">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <p>
          Statement security, liability and service fees may apply for older statements. Please refer to our terms and conditions.
        </p>
      </div>
      <p className="text-sm text-neutral-500 mt-3">Displaying 4 of 4</p>
      <button
        type="button"
        className="mt-2 text-primary font-medium text-sm hover:underline"
      >
        VIEW ALL
      </button>
    </section>
  );
}
