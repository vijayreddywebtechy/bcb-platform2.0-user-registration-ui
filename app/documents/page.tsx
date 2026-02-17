import AppLayout from "@/components/layout/AppLayout";
import DocumentsPage from "@/components/documents/DocumentsPage";

export default function Documents() {
  return (
    <AppLayout backgroundColor="linear-gradient(180deg, #0033AA 0%, #00164E 100%)">
      <DocumentsPage />
    </AppLayout>
  );
}
