"use client";

import { useState } from "react";
import PageHeader from "@/components/dynamic/PageHeader";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { BusinessAccountsContent, Account } from "@/components/dashboard/BusinessAccounts";
import AccountDetail from "@/components/accounts/AccountDetail";

function AccountsPage() {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  return (
    <DashboardLayout>
      {selectedAccount ? (
        <AccountDetail
          account={selectedAccount}
          onBack={() => setSelectedAccount(null)}
        />
      ) : (
        <>
          <PageHeader
            variant="page"
            breadcrumbs={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Accounts", href: "/accounts" },
            ]}
            pageTitle="Accounts"
            pageDescription="Get your accounts and balances"
          />
          <div className="page-container py-8">
            <BusinessAccountsContent onAccountSelect={setSelectedAccount} />
          </div>
        </>
      )}
    </DashboardLayout>
  );
}

export default AccountsPage;
