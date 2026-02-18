import AppLayout from "@/components/layout/AppLayout";
import AccountsPage from "@/components/accounts/AccountsPage";

export default function Accounts() {
  return (
    <AppLayout backgroundColor="#F2F6FF" showFooter={true}>
      <AccountsPage />
    </AppLayout>
  );
}
