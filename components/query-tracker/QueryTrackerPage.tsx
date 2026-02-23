"use client";

import { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Info } from "lucide-react";
import {
  FloatingSelect,
  SelectOption,
} from "@/components/ui/FloatingReactSelect";
import SearchBox from "@/components/dynamic/SearchBox";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import avatarAlert from "@/assets/images/icons/avatar_alert.svg"


// ─── Types ────────────────────────────────────────────────────────────────────

type QueryStatus = "Resolved" | "In Progress" | "Pending";

type QueryComment = {
  date: string;
  message: string;
};

type Query = {
  id: string;
  date: string;
  timestamp: number;
  description: string;
  status: QueryStatus;
  comments: QueryComment[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const sortOptions: SelectOption[] = [
  { value: "most_recent", label: "Most Recent" },
  { value: "oldest_first", label: "Oldest First" },
];

const filterOptions: SelectOption[] = [
  { value: "all", label: "All Queries" },
  { value: "resolved", label: "Resolved" },
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
];

const queries: Query[] = [
  {
    id: "1",
    date: "13/04/2026, 1:15PM",
    timestamp: new Date(2026, 3, 13, 13, 15).getTime(),
    description: "Unable to view all my business banking accounts",
    status: "Resolved",
    comments: [
      {
        date: "13/04/2026, 1:23AM",
        message:
          "As part of our journey to improve your digital banking services, we are gradually adding different account types to your profile. The Business Hub currently only supports current, savings and investment accounts. You will be notified as we roll out more account types. Apologises for any inconvenience caused · Business Hub Team",
      },
    ],
  },
  {
    id: "2",
    date: "18/03/2026, 08:27AM",
    timestamp: new Date(2026, 2, 18, 8, 27).getTime(),
    description:
      "Need two year statements and official bank account confirmation letters off one of my savings accounts",
    status: "Resolved",
    comments: [
      {
        date: "18/03/2026, 08:40AM",
        message:
          "You can now get statements of up to two years and more in PDF format right on the Business Hub. Simply navigate to documents on the top menu bar, where you can find official bank confirmation letters, stamped statements and more.",
      },
    ],
  },
  {
    id: "3",
    date: "08/02/2026, 12:00PM",
    timestamp: new Date(2026, 1, 8, 12, 0).getTime(),
    description:
      "I'm unable to view some balances on my business banking current accounts",
    status: "In Progress",
    comments: [
      {
        date: "08/02/2026, 12:05PM",
        message:
          "There may not have been enough time for deposits to clear (be paid by the issuing bank to the bank). The deposits might be on hold until the deposit clears and there is actual funds in the account to pay out withdrawals.",
      },
    ],
  },
];

// ─── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: QueryStatus }) {
  const config: Record<QueryStatus, { dotColor: string; bgColor: string; borderColor: string }> = {
    Resolved: {
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

// ─── Pagination ───────────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 5;

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="flex items-center gap-1">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 flex items-center justify-center rounded-md text-secondary disabled:opacity-30 hover:bg-gray-100 transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-6 h-6" strokeWidth={2} />
      </button>

      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
            page === currentPage
              ? "bg-primary text-white"
              : "text-secondary hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 flex items-center justify-center rounded-md text-secondary disabled:opacity-30 hover:bg-gray-100 transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" strokeWidth={2} />
      </button>
    </nav>
  );
}

// ─── Query row (expandable) ───────────────────────────────────────────────────

function QueryRow({
  query,
  isExpanded,
  onToggle,
}: {
  query: Query;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      {/* Row header */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        className="w-full grid grid-cols-[180px_1fr_140px_48px] md:grid-cols-[200px_1fr_160px_48px] items-center px-4 md:px-6 py-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm text-secondary">{query.date}</span>
        <span className="text-sm font-medium text-secondary pr-4">
          {query.description}
        </span>
        <span className="flex justify-start">
          <StatusBadge status={query.status} />
        </span>
        <span className="flex justify-center">
          {isExpanded ? (
            <ChevronUp className="w-6 h-6 text-secondary" strokeWidth={1.5} />
          ) : (
            <ChevronDown className="w-6 h-6 text-secondary" strokeWidth={1.5} />
          )}
        </span>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-4 md:px-6 py-3">
          <div className="ml-0 md:ml-[200px] space-y-4">
            {query.comments.map((comment, idx) => (
              <div key={idx}>
                <p className="text-xs font-medium text-secondary mb-1">
                  Comments/Responses
                </p>
                <p className="text-xs text-neutral-500 mt-4">
                  {comment.date}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed mt-2">
                  {comment.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function QueryTrackerPage() {
  const [sortBy, setSortBy] = useState<SelectOption | null>(sortOptions[0]);
  const [filterBy, setFilterBy] = useState<SelectOption | null>(filterOptions[0]);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter + sort
  const filtered = useMemo(() => {
    let result = [...queries];

    // Status filter
    if (filterBy && filterBy.value !== "all") {
      const statusMap: Record<string, QueryStatus> = {
        resolved: "Resolved",
        pending: "Pending",
        in_progress: "In Progress",
      };
      const targetStatus = statusMap[filterBy.value];
      if (targetStatus) {
        result = result.filter((q) => q.status === targetStatus);
      }
    }

    // Search
    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter(
        (q) =>
          q.description.toLowerCase().includes(term) ||
          q.date.toLowerCase().includes(term)
      );
    }

    // Sort
    if (sortBy?.value === "oldest_first") {
      result.sort((a, b) => a.timestamp - b.timestamp);
    } else {
      result.sort((a, b) => b.timestamp - a.timestamp);
    }

    return result;
  }, [sortBy, filterBy, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedQueries = filtered.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  const handleFilterChange = (opt: SelectOption | null) => {
    setFilterBy(opt);
    setCurrentPage(1);
  };

  const handleSortChange = (opt: SelectOption | null) => {
    setSortBy(opt);
    setCurrentPage(1);
  };

  const handleSearch = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const hasResults = paginatedQueries.length > 0;

  return (
      <div className="page-container py-8 space-y-8">
        {hasResults ? (
          <>
            {/* ── Section heading ── */}
            <section>
              <h2 className="text-xl md:text-2xl font-medium text-secondary">
                View all your queries in one place
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Track their status and stay updated on progress
              </p>
            </section>

            {/* ── Filters ── */}
            <section className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-gray-50 rounded-lg">
              <div className="w-full sm:w-48">
                <FloatingSelect
                  label="Sort By"
                  options={sortOptions}
                  value={sortBy}
                  onChange={handleSortChange}
                />
              </div>
              <div className="w-full sm:w-48">
                <FloatingSelect
                  label="Filter"
                  options={filterOptions}
                  value={filterBy}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="w-full md:max-w-sm sm:ml-auto">
                <SearchBox
                  placeholder="Search queries"
                  value={search}
                  onChange={handleSearch}
                />
              </div>
            </section>

            {/* ── Table ── */}
            <section>
              <div className="overflow-x-auto">
                <div className="min-w-[640px]">
                  {/* Header */}
                  <div className="bg-[#3D5068] text-white rounded-t-lg">
                    <div className="grid grid-cols-[180px_1fr_140px_48px] md:grid-cols-[200px_1fr_160px_48px] px-4 md:px-6 py-4 h-16 items-center text-sm font-medium uppercase tracking-wider">
                      <span>Date</span>
                      <span>Description</span>
                      <span className="text-start">Status</span>
                      <span />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="bg-white border-x border-b border-gray-200 rounded-b-lg">
                    {paginatedQueries.map((query) => (
                      <QueryRow
                        key={query.id}
                        query={query}
                        isExpanded={expandedId === query.id}
                        onToggle={() =>
                          setExpandedId(expandedId === query.id ? null : query.id)
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer: results count + pagination */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
                <p className="text-sm text-secondary">
                  <span className="font-medium">{filtered.length} Results Found</span>
                  {" · "}Displaying{" "}
                  <span className="font-medium">{paginatedQueries.length}</span> of{" "}
                  <span className="font-medium">{filtered.length}</span>
                </p>
                <Pagination
                  currentPage={safePage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>

              {/* Info note */}
              <div className="flex items-start gap-2 mt-12">
                <Info className="w-5 h-5 text-primary flex-shrink-0" />
                <p className="text-sm text-gray-500">
                  Your requests help us serve you better and improve your overall
                  experience. If your query is not reflected please contact your
                  relationship manager to follow up.
                </p>
              </div>
            </section>
          </>
        ) : (
            <div className="flex-1 flex flex-col gap-4 justify-center items-center text-center w-full max-w-md m-auto p-4">
              <Image
                src={avatarAlert}
                alt="alert"
                width={80}
                height={80}
                className="max-w-full h-auto mx-auto"
              />
              <h2>No queries available</h2>
              <p>
                You currently don't have any active or resolved query requests.{" "}
                Contact your relationship manager to raise a query.
              </p>
              <Button variant="outline">Back to Dashboard</Button>
            </div>
        )}
      </div>
  );
}
