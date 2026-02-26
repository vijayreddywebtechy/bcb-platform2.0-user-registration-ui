"use client";

import { useState } from "react";
import { FileText } from "lucide-react";
import { Card, CardHeader, CardBody } from "./Card";
import { FloatingSelect, SelectOption } from "@/components/ui/FloatingReactSelect";
import { StatementsTable, defaultStatements } from "@/components/shared/StatementsTable";

type Props = {};

const accountOptions: SelectOption[] = [
  { value: "4690", label: "Business PureSav... Savings Account •••• 4690" },
  { value: "7632", label: "ABC Supplier Account •••• 7632" },
  { value: "7685", label: "Business MarketLink •••• 7685" },
];

function FormalStatements({}: Props) {
  const [selectedAccount, setSelectedAccount] = useState<SelectOption | null>(
    accountOptions.find((opt) => opt.value === "4690") || null
  );

  const documentTypeOptions: SelectOption[] = [
    { value: "all", label: "All statements" },
    { value: "bank letter", label: "Official Bank Letter" },
    { value: "stamped", label: "Stamped statements" },
    { value: "unstamped", label: "Un-stamped statements" },
  ];
  const [selectedDocType, setSelectedDocType] = useState<SelectOption | null>(null);

  return (
    <Card>
      <CardHeader
        icon={<FileText className="w-5 h-5 text-primary-dark" strokeWidth={2} />}
        title="Formal statements"
      />

      <CardBody>
        {/* Account filter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          <div className="md:col-span-4">
            <FloatingSelect
              label="Select Account"
              options={accountOptions}
              value={selectedAccount}
              onChange={(option) => setSelectedAccount(option)}
            />
          </div>
          <div className="md:col-span-4">
            <FloatingSelect
              label="Select document type"
              options={documentTypeOptions}
              value={selectedDocType}
              onChange={(opt) => setSelectedDocType(opt)}
            />
          </div>
        </div>

        {/* Shared statements table */}
        <StatementsTable statements={defaultStatements} />
      </CardBody>
    </Card>
  );
}

export default FormalStatements;
