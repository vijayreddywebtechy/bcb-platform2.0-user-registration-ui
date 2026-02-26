import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/dynamic/PageHeader";
import NextActions from "@/components/dashboard/NextActions";
import CashFlows from "@/components/dashboard/CashFlows";
import MyLinks from "@/components/dashboard/MyLinks";
import BusinessAccounts from "@/components/dashboard/BusinessAccounts";
import DigitalHubLinks from "@/components/dashboard/DigitalHubLinks";
import FormalStatements from "@/components/dashboard/FormalStatements";
import BusinessOffers from "@/components/dashboard/BusinessOffers";
import FXRateCalculator from "@/components/dashboard/FXRateCalculator";
import SecurityStatus from "@/components/dashboard/SecurityStatus";

type Props = {};

function page({}: Props) {
  return (
    <DashboardLayout>
      <PageHeader
        variant="dashboard"
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }]}
        userName="Welcome, Kobus"
        organizationName="ABC Architects (Pty) Ltd"
        role="Profile Administrator"
        lastSignedIn="2023-10-27 14:32"
      />
      <NextActions />

      {/* Dashboard Content */}
      <div className="bg-[#F2F6FF]">
        <div className="page-container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <CashFlows />
            </div>
            <div className="lg:col-span-1">
              <MyLinks />
            </div>
          </div>

          {/* Business Accounts */}
          <div className="mb-6">
            <BusinessAccounts />
          </div>

          {/* Digital Hub Links */}
          <div className="mb-6">
            <DigitalHubLinks />
          </div>

          {/* Formal Statements */}
          <div className="mb-6">
            <FormalStatements />
          </div>

          {/* Business Offers, FX Rate Calculator, Security Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <BusinessOffers />
            </div>
            <div>
              <FXRateCalculator />
            </div>
            <div>
              <SecurityStatus />
            </div>
          </div>

          {/* Digital Hub Links — end of page */}
          <div className="mb-6">
            <DigitalHubLinks />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default page;
