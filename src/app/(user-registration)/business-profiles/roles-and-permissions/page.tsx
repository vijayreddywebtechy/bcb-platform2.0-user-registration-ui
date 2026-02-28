import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import PageHeader from "@/shared/components/dynamic/PageHeader";
import { RolesPermissionsPage } from "@/shared/components/roles-permissions/RolesPermissionsPage";

export default function Page() {
  return (
    <DashboardLayout>
      <PageHeader
        variant="page"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Roles & Permissions", href: "/roles-and-permissions" },
        ]}
        pageTitle="Roles & Permissions"
        pageDescription="Invite & Set User Access"
      />
      <RolesPermissionsPage />
    </DashboardLayout>
  );
}
