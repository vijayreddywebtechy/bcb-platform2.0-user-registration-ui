import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/dynamic/PageHeader";
import { BusinessDetailsPage } from "@/components/business-details/BusinessDetailsPage";

export default function Page() {
  return (
    <DashboardLayout>
      <PageHeader
        variant="page"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Business Details", href: "/business-details" },
        ]}
        pageTitle="Business Details"
        pageDescription="Confirm and share your business details"
      />
      <BusinessDetailsPage />
    </DashboardLayout>
  );
}
