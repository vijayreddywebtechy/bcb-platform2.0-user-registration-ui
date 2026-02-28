"use client";

import { TrendingUp, Info } from "lucide-react";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FloatingSelect, SelectOption } from "@/shared/components/ui/FloatingReactSelect";
import { Card, CardHeader, CardBody } from "./Card";

type Props = {};

const monthlyData = [
  { month: "Jan", inflows: 75, outflows: 45 },
  { month: "Feb", inflows: 135, outflows: 25 },
  { month: "Mar", inflows: 180, outflows: 95 },
  { month: "Apr", inflows: 200, outflows: 35 },
  { month: "May", inflows: 120, outflows: 65 },
  { month: "Jun", inflows: 130, outflows: 15 },
  { month: "Jul", inflows: 190, outflows: 60 },
  { month: "Aug", inflows: 115, outflows: 25 },
  { month: "Sep", inflows: 140, outflows: 75 },
  { month: "Oct", inflows: 185, outflows: 35 },
  { month: "Nov", inflows: 130, outflows: 70 },
  { month: "Dec", inflows: 70, outflows: 25 },
];

const periodOptions: SelectOption[] = [
  { value: "this-week", label: "This week" },
  { value: "this-month", label: "This month" },
  { value: "this-year", label: "This year" },
  { value: "last-week", label: "Last week" },
  { value: "last-month", label: "Last month" },
  { value: "last-year", label: "Last year" },
  { value: "last-30-days", label: "Last 30 days" },
  { value: "last-90-days", label: "Last 90 days" },
];

const accountOptions: SelectOption[] = [
  { value: "all", label: "All Accounts" },
  { value: "4690", label: "Business PureSav... Savings Account **** 4690" },
  { value: "1234", label: "Business Cheque Account **** 1234" },
  { value: "5678", label: "Corporate Savings Account **** 5678" },
];

function CashFlows({}: Props) {
  const [selectedPeriod, setSelectedPeriod] = useState<SelectOption | null>(
    periodOptions.find((opt) => opt.value === "last-year") || null
  );
  const [selectedAccount, setSelectedAccount] = useState<SelectOption | null>(
    accountOptions.find((opt) => opt.value === "all") || null
  );

  return (
    <Card>
      <CardHeader
        icon={<TrendingUp className="w-5 h-5 text-primary" strokeWidth={2} />}
        title="Cash flows"
      />
      <CardBody>
        {/* Filters */}
        <div className="w-full flex flex-col md:flex-row gap-x-4 gap-y-6 mb-6 bg-neutral-50 p-4 md:p-6 rounded-lg">
          <div className="w-full md:w-4/12">
            <FloatingSelect
              label="Period"
              options={periodOptions}
              value={selectedPeriod}
              onChange={(option) => setSelectedPeriod(option)}
            />
          </div>
          <div className="w-full md:w-5/12">
            <FloatingSelect
              label="Account"
              options={accountOptions}
              value={selectedAccount}
              onChange={(option) => setSelectedAccount(option)}
            />
          </div>
        </div>

        {/* Chart Title */}
        <h3 className="text-sm font-medium text-secondary mb-6">
          Track your business financial flows
        </h3>

        {/* Chart */}
        <div className="mb-6 bg-blue-50 p-4 rounded-lg">
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6b7280", fontSize: 12 }} />
              <Tooltip
                cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "8px 12px",
                }}
              />
              <Legend
                wrapperStyle={{ paddingTop: "20px" }}
                iconType="circle"
                formatter={(value) => (
                  <span className="text-sm text-gray-700">
                    {value === "inflows" ? "Inflows" : "Outflows"}
                  </span>
                )}
              />
              <Bar dataKey="inflows" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={13} />
              <Bar dataKey="outflows" fill="#1f2937" radius={[4, 4, 0, 0]} barSize={13} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
          <div className="bg-blue-800 rounded-lg px-4 py-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-white/90">Net Cash Flow</span>
              <Info className="w-4 h-4 text-white/70" strokeWidth={2} />
            </div>
            <p className="text-2xl font-medium text-white">R234,400,698.00</p>
          </div>

          <div className="bg-blue-600 rounded-lg p-4">
            <span className="text-sm text-white/90 mb-2 block">Total Money In</span>
            <p className="text-2xl font-medium text-white">R512,105,821.00</p>
          </div>

          <div className="bg-primary-deep rounded-lg p-4">
            <span className="text-sm text-white/90 block mb-2">Total Money Out</span>
            <p className="text-2xl font-medium text-white">R182,821.00</p>
          </div>
        </div>

        {/* Info Note */}
        <div className="flex items-center md:justify-center gap-2 text-xs text-gray-600">
          <Info className="w-4 h-4 text-primary" strokeWidth={2} />
          <span>Details displayed are based on available account data.</span>
        </div>
      </CardBody>
    </Card>
  );
}

export default CashFlows;
