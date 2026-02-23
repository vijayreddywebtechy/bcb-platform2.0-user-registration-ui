import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/dynamic/PageHeader";
import { QueryTrackerPage } from "@/components/query-tracker/QueryTrackerPage";

export default function Page() {
  return (
    <DashboardLayout>
      <PageHeader
        variant="page"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Query Tracker", href: "/query-tracker" },
        ]}
        pageTitle="Query Tracker"
        pageDescription="Track and monitor queries"
      />
      <QueryTrackerPage />
    </DashboardLayout>
  );
}
