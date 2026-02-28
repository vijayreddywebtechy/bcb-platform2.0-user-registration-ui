import DashboardLayout from "@/shared/components/layout/DashboardLayout";
import PageHeader from "@/shared/components/dynamic/PageHeader";
import { DocumentsPage } from "@/shared/components/documents/DocumentsPage";

export default function Page() {
  return (
    <DashboardLayout>
      <PageHeader
        variant="page"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Documents", href: "/documents" },
        ]}
        pageTitle="Documents"
        pageDescription="Get your official bank letters and statements"
      />
      <DocumentsPage />
    </DashboardLayout>
  );
}
