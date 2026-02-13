"use client";

import DashboardHeader from "./DashboardHeader";
import DashboardWelcome from "./DashboardWelcome";
import DashboardActions from "./DashboardActions";
import DashboardCashFlow from "./DashboardCashFlow";
import DashboardAccounts from "./DashboardAccounts";
import DashboardDigitalLinks from "./DashboardDigitalLinks";
import DashboardStatements from "./DashboardStatements";
import DashboardMyLinks from "./DashboardMyLinks";
import DashboardBottomCards from "./DashboardBottomCards";
import DashboardFooter from "./DashboardFooter";
import DashboardFAB from "./DashboardFAB";

export default function Dashboard() {
  return (
    <div className="h-screen bg-dashboard-content font-bspro flex flex-col overflow-hidden">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <DashboardHeader />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pt-[104px] pb-[120px]">
        <DashboardWelcome />

        <main className="px-6 py-5 max-w-[1400px] w-full mx-auto">
          <DashboardActions />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
            <div className="lg:col-span-2 space-y-5">
              <DashboardCashFlow />
              <DashboardAccounts />
              <DashboardDigitalLinks />
              <DashboardStatements />
            </div>
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-5">
                <DashboardMyLinks />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <DashboardBottomCards />
          </div>
        </main>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <DashboardFooter />
      </div>

      <DashboardFAB />
    </div>
  );
}
