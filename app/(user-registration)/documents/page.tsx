import DashboardLayout from "@/components/layout/DashboardLayout";
import PageHeader from "@/components/dynamic/PageHeader";
import { DocumentsPage } from "@/components/documents/DocumentsPage";

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
