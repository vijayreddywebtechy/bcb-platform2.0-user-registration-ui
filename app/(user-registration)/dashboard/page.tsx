import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/dynamic/PageHeader";
import NextActions from "@/components/dashboard/NextActions";
import CashFlows from "@/components/dashboard/CashFlows";
import MyLinks from "@/components/dashboard/MyLinks";

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CashFlows />
            </div>
            <div className="lg:col-span-1">
              <MyLinks />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default page;
