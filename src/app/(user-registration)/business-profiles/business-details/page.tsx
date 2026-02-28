import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import PageHeader from "@/shared/components/dynamic/PageHeader";
import { BusinessDetailsPage } from "@/shared/components/business-details/BusinessDetailsPage";

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
