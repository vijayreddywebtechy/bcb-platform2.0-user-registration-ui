import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import PageHeader from "@/shared/components/dynamic/PageHeader";
import { ManageProfilePage } from "@/shared/components/manage-profile/ManageProfilePage";

export default function Page() {
  return (
    <DashboardLayout>
      <PageHeader
        variant="page"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Manage Profile", href: "/manage-profile" },
        ]}
        pageTitle="Manage Profile"
        pageDescription="Set notification preferences and manage linked devices"
      />
      <ManageProfilePage />
    </DashboardLayout>
  );
}
