"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

const DUMMY = {
  breadcrumb: "Dashboard",
  greeting: "Welcome, Kobus",
  role: "ABC Architects (Pty) Ltd - Profile Administrator",
  lastSignIn: "Last Signed In - 27 Oct 2025, 12:35 PM",
};

export default function DashboardWelcome() {
  return (
    <div className="bg-dashboard-header text-white font-bspro px-6 py-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between max-w-[1400px] mx-auto gap-4">
        <div>
          <p className="text-[13px] font-normal opacity-90 leading-tight">{DUMMY.breadcrumb}</p>
          <h1 className="text-[24px] sm:text-[28px] font-bold mt-1 leading-tight tracking-tight">{DUMMY.greeting}</h1>
          <p className="text-[13px] font-normal opacity-90 mt-1 leading-tight">{DUMMY.role}</p>
        </div>
        <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
          <span className="text-[13px] font-normal">{DUMMY.lastSignIn}</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="w-9 h-9 rounded-full border border-white/50 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Back"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="w-9 h-9 rounded-full border border-white/50 flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Forward"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
