"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Check, X, Pencil, AlertCircle } from "lucide-react";
import {
  FloatingSelect,
  SelectOption,
} from "@/components/ui/FloatingReactSelect";
import { Button } from "@/components/ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

type UserStatus = "Active" | "In Progress" | "Pending";

type ActiveUser = {
  id: string;
  initials: string;
  name: string;
  email: string;
  role: string;
  accountsAssigned: number;
  status: UserStatus;
};

type PendingApproval = {
  id: string;
  initials: string;
  name: string;
  email: string;
  role: string;
  accountsAssigned: number;
};

type Invite = {
  id: string;
  initials: string;
  name: string;
  email: string;
  role: string;
  accountsAssigned: number;
  status: UserStatus;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const roleOptions: SelectOption[] = [
  { value: "all", label: "All Roles" },
  { value: "admin", label: "Admin/Owner" },
  { value: "approver", label: "Approver" },
  { value: "viewer", label: "Viewer" },
];

const activeUsers: ActiveUser[] = [
  {
    id: "u1",
    initials: "KM",
    name: "Kobus Marais",
    email: "kobas.marais@abcarchitects.co.za",
    role: "Admin/Owner",
    accountsAssigned: 6,
    status: "Active",
  },
];

const pendingApprovals: PendingApproval[] = [
  {
    id: "p1",
    initials: "JK",
    name: "Jonathan Khumalo",
    email: "jonathan.khumalo@abcarchitects.co.za",
    role: "Admin/Owner",
    accountsAssigned: 6,
  },
  {
    id: "p2",
    initials: "SN",
    name: "Seth Naidoo",
    email: "seth.naidoo@abcarchitects.co.za",
    role: "Approver",
    accountsAssigned: 6,
  },
];

const invites: Invite[] = [
  {
    id: "i1",
    initials: "TR",
    name: "Tasmin Reilly",
    email: "tasmin.reilly@abcarchitects.co.za",
    role: "Approver",
    accountsAssigned: 6,
    status: "In Progress",
  },
];

// ─── Shared sub-components ────────────────────────────────────────────────────

function Avatar({
  initials,
  color = "bg-primary",
}: {
  initials: string;
  color?: string;
}) {
  return (
    <div
      className={`w-10 h-10 rounded-full ${color} flex items-center justify-center flex-shrink-0`}
    >
      <span className="text-xs font-semibold text-white">{initials}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: UserStatus }) {
  const config: Record<
    UserStatus,
    { dotColor: string; bgColor: string; borderColor: string }
  > = {
    Active: {
      dotColor: "bg-green-500",
      bgColor: "bg-green-50",
      borderColor: "border border-green-200",
    },
    "In Progress": {
      dotColor: "bg-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border border-blue-200",
    },
    Pending: {
      dotColor: "bg-yellow-500",
      bgColor: "bg-yellow-50",
      borderColor: "border border-yellow-200",
    },
  };

  const { dotColor, bgColor, borderColor } = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs ${bgColor} ${borderColor}`}
    >
      <span className={`w-2 h-2 rounded-full ${dotColor}`} />
      {status}
    </span>
  );
}

function SectionCount({ count }: { count: number }) {
  return (
    <span className="bg-blue-100 text-primary text-xs font-medium px-2.5 py-1 rounded ml-2">
      {count}
    </span>
  );
}

// ─── Table header ─────────────────────────────────────────────────────────────

function TableHeader({
  columns,
  gridCols,
}: {
  columns: { label: string; align?: "center" | "left" }[];
  gridCols: string;
}) {
  return (
    <div className="bg-[#3D5068] text-white rounded-t-lg">
      <div
        className="grid px-4 md:px-6 py-4 h-14 items-center text-xs font-medium uppercase tracking-wider"
        style={{ gridTemplateColumns: gridCols }}
      >
        {columns.map((col) => (
          <span
            key={col.label}
            className={col.align === "center" ? "text-center" : ""}
          >
            {col.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function RolesPermissionsPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<SelectOption | null>(
    roleOptions[0]
  );

  return (
    <div className="page-container py-8 space-y-10">
      {/* ── Disclaimer banner ── */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-secondary leading-relaxed">
          Roles &amp; Permissions are only for the Business Hub platform and do
          not translate to other banking platforms like Online Banking for
          Business, Trade Suite, Business Online etc. The Business Hub team is
          working on improving your experience with a universal roles &amp;
          permissions service. You will be notified when it becomes available and
          prompted on how to merge and consolidate roles and permissions.
        </p>
      </div>

      {/* ── Current active users ── */}
      <section>
        <h2 className="text-xl md:text-2xl font-medium text-secondary mb-6 flex items-center">
          Current active users
          <SectionCount count={activeUsers.length} />
        </h2>

        {/* Filter + invite */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="w-full sm:w-72">
            <FloatingSelect
              label="All Roles"
              options={roleOptions}
              value={selectedRole}
              onChange={(opt) => setSelectedRole(opt)}
            />
          </div>
          <Button onClick={() => router.push("/roles-and-permissions/invite-team-member")}>INVITE A TEAM MEMBER</Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            <TableHeader
              columns={[
                { label: "Name" },
                { label: "Role" },
                { label: "Accounts Assigned" },
                { label: "Status" },
                { label: "Edit", align: "center" },
              ]}
              gridCols="minmax(200px, 1.5fr) 1fr 1fr 200px 100px"
            />
            <div className="bg-white border-x border-b border-gray-200 rounded-b-lg divide-y divide-gray-100">
              {activeUsers.map((user) => (
                <div
                  key={user.id}
                  className="grid px-4 md:px-6 py-4 items-center"
                  style={{
                    gridTemplateColumns:
                      "minmax(200px, 1.5fr) 1fr 1fr 200px 100px",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Avatar initials={user.initials} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-secondary">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-secondary">{user.role}</p>
                  <p className="text-sm text-secondary">
                    {user.accountsAssigned} accounts
                  </p>
                  <div>
                    <StatusBadge status={user.status} />
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                      aria-label={`Edit ${user.name}`}
                    >
                      <Pencil
                        className="w-5 h-5 text-secondary"
                        strokeWidth={1.5}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pending approvals ── */}
      <section>
        <h2 className="text-xl md:text-2xl font-medium text-secondary mb-6 flex items-center">
          Pending approvals
          <SectionCount count={pendingApprovals.length} />
        </h2>

        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            <TableHeader
              columns={[
                { label: "Name" },
                { label: "Role" },
                { label: "Accounts Assigned" },
                { label: "View", align: "center" },
                { label: "Approve", align: "center" },
                { label: "Decline", align: "center" },
              ]}
              gridCols="minmax(200px, 1.5fr) 1fr 1fr 100px 100px 100px"
            />
            <div className="bg-white border-x border-b border-gray-200 rounded-b-lg divide-y divide-gray-100">
              {pendingApprovals.map((user) => (
                <div
                  key={user.id}
                  className="grid px-4 md:px-6 py-4 items-center"
                  style={{
                    gridTemplateColumns:
                      "minmax(200px, 1.5fr) 1fr 1fr 100px 100px 100px",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Avatar initials={user.initials} color="bg-blue-400" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-secondary">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-secondary">{user.role}</p>
                  <p className="text-sm text-secondary">
                    {user.accountsAssigned} accounts
                  </p>
                  <div className="flex justify-center">
                    <button
                      className="p-2 hover:bg-blue-50 rounded-md transition-colors"
                      aria-label={`View ${user.name}`}
                    >
                      <Eye
                        className="w-5 h-5 text-blue-400"
                        strokeWidth={1.5}
                      />
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="w-9 h-9 rounded-md bg-green-500 hover:bg-green-600 flex items-center justify-center transition-colors"
                      aria-label={`Approve ${user.name}`}
                    >
                      <Check
                        className="w-5 h-5 text-white"
                        strokeWidth={2}
                      />
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="w-9 h-9 rounded-md bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors"
                      aria-label={`Decline ${user.name}`}
                    >
                      <X className="w-5 h-5 text-white" strokeWidth={2} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Invites ── */}
      <section>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl md:text-2xl font-medium text-secondary flex items-center">
            Invites
            <SectionCount count={invites.length} />
          </h2>
          <Button variant="outline" onClick={() => router.push("/roles-and-permissions/invite-team-member")}>INVITE ANOTHER USER</Button>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[700px]">
            <TableHeader
              columns={[
                { label: "Name" },
                { label: "Role" },
                { label: "Accounts Assigned" },
                { label: "Status" },
              ]}
              gridCols="minmax(200px, 1.5fr) 1fr 1fr 1fr"
            />
            <div className="bg-white border-x border-b border-gray-200 rounded-b-lg divide-y divide-gray-100">
              {invites.map((user) => (
                <div
                  key={user.id}
                  className="grid px-4 md:px-6 py-4 items-center"
                  style={{
                    gridTemplateColumns:
                      "minmax(200px, 1.5fr) 1fr 1fr 1fr",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Avatar initials={user.initials} color="bg-blue-400" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-secondary">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-secondary">{user.role}</p>
                  <p className="text-sm text-secondary">
                    {user.accountsAssigned} accounts
                  </p>
                  <div>
                    <StatusBadge status={user.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer count */}
        <p className="mt-4 text-sm text-primary font-medium">
          Displaying {invites.length} of {invites.length}
        </p>
      </section>
    </div>
  );
}
