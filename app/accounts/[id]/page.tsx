import AppLayout from "@/components/layout/AppLayout";
import AccountDetailsPage from "@/components/accounts/AccountDetailsPage";

export default async function AccountDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <AppLayout backgroundColor="#F2F6FF" showFooter={true}>
      <AccountDetailsPage accountId={id} />
    </AppLayout>
  );
}
