"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ChevronDown, ChevronRight } from "lucide-react";
import icnAvatarAlert from "@/assets/images/icons/icn_avatar_alert.svg";
import icnHome from "@/assets/images/icons/icn_home_white.svg";
import styles from "./QueryTrackerPage.module.css";

interface Query {
  id: string;
  date: string;
  description: string;
  status: "Resolved" | "In Progress";
  expanded?: boolean;
}

interface QueryTrackerPageProps {
  hasQueries?: boolean;
}

const MOCK_QUERIES: Query[] = [
  {
    id: "1",
    date: "13/04/2026, 13:15PM",
    description: "Unable to view all my business banking accounts",
    status: "Resolved",
    expanded: false,
  },
  {
    id: "2",
    date: "18/03/2026, 08:27AM",
    description: "Need two year statements and official bank account confirmation letters off one of my savings accounts",
    status: "Resolved",
    expanded: false,
  },
  {
    id: "3",
    date: "08/02/2026, 12:00PM",
    description: "I'm unable to view some balances on my business banking current accounts",
    status: "In Progress",
    expanded: false,
  },
];

/**
 * QueryTrackerPage Component
 * Displays query tracker with empty state or list of queries
 * 
 * @param {boolean} hasQueries - Whether queries exist to display
 */
export default function QueryTrackerPage({ hasQueries = true }: QueryTrackerPageProps) {
  const [showQueries, setShowQueries] = useState(hasQueries);
  const [queries, setQueries] = useState<Query[]>(MOCK_QUERIES);
  const [sortBy, setSortBy] = useState("Most Recent");
  const [filterBy, setFilterBy] = useState("All Queries");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const toggleQueryExpansion = (queryId: string) => {
    setQueries(
      queries.map((q) =>
        q.id === queryId ? { ...q, expanded: !q.expanded } : q
      )
    );
  };

  // Empty State
  if (!showQueries || queries.length === 0) {
    return (
      <>
        {/* Header Section */}
        <div className={styles.headerSection}>
          <div className={styles.headerContainer}>
            {/* Breadcrumb */}
            <div className={styles.breadcrumb}>
              <Image
                src={icnHome}
                alt="Home"
                width={16}
                height={16}
                className={styles.homeIcon}
              />
              <Link href="/dashboard" className={styles.breadcrumbLink}>
                Dashboard
              </Link>
              <ChevronRight className={styles.breadcrumbSeparator} />
              <span className={styles.breadcrumbCurrent}>Query Tracker</span>
            </div>

            {/* Title and Subtitle */}
            <h1 className={styles.pageTitle}>Query Tracker</h1>
            <p className={styles.pageSubtitle}>Track and monitor queries</p>
          </div>
        </div>

        {/* Empty State Content */}
        <div className={styles.pageWrapper}>
          {/* Toggle Button for Testing */}
          <div className={styles.toggleContainer}>
            <button
              type="button"
              onClick={() => setShowQueries(!showQueries)}
              className={styles.toggleButton}
            >
              {showQueries ? "Show Empty State" : "Show Queries"}
            </button>
          </div>

          <div className={styles.emptyState}>
            <div className={styles.emptyIconWrapper}>
              <Image
                src={icnAvatarAlert}
                alt="No queries"
                width={64}
                height={64}
                className={styles.emptyIcon}
              />
            </div>
            <h2 className={styles.emptyTitle}>No queries available</h2>
            <p className={styles.emptyDescription}>
              You currently don't have any active or resolved query requests<br />
              Contact your relationship manager to raise a query
            </p>
            <Link href="/dashboard" className={styles.backButton}>
              BACK TO DASHBOARD
            </Link>
          </div>
        </div>
      </>
    );
  }

  // List State
  return (
    <>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.headerContainer}>
          {/* Breadcrumb */}
          <div className={styles.breadcrumb}>
            <Image
              src={icnHome}
              alt="Home"
              width={16}
              height={16}
              className={styles.homeIcon}
            />
            <Link href="/dashboard" className={styles.breadcrumbLink}>
              Dashboard
            </Link>
            <ChevronRight className={styles.breadcrumbSeparator} />
            <span className={styles.breadcrumbCurrent}>Query Tracker</span>
          </div>

          {/* Title and Subtitle */}
          <h1 className={styles.pageTitle}>Query Tracker</h1>
          <p className={styles.pageSubtitle}>Track and monitor queries</p>
        </div>
      </div>

      {/* Content Section */}
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
        {/* Toggle Button for Testing */}
        <div className={styles.toggleContainer}>
          <button
            type="button"
            onClick={() => setShowQueries(!showQueries)}
            className={styles.toggleButton}
          >
            {showQueries ? "Show Empty State" : "Show Queries"}
          </button>
        </div>

        {/* Content Header */}
        <div className={styles.contentHeader}>
          <div>
            <h2 className={styles.viewAllTitle}>View all your queries in one place</h2>
            <p className={styles.viewAllDescription}>
              Track their status and stay updated on progress
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className={styles.controlsSection}>
          <div className={styles.filters}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="Most Recent">Most Recent</option>
              <option value="Oldest First">Oldest First</option>
            </select>

            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className={styles.filterSelect}
            >
              <option value="All Queries">All Queries</option>
              <option value="Resolved">Resolved</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>

          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search queries"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* Queries Table */}
        <div className={styles.tableWrapper}>
          <div className={styles.tableHeader}>
            <div className={styles.tableHeaderCell}>DATE</div>
            <div className={styles.tableHeaderCell}>DESCRIPTION</div>
            <div className={styles.tableHeaderCell}>STATUS</div>
          </div>

          <div className={styles.tableBody}>
            {queries.map((query) => (
              <div key={query.id} className={styles.queryItem}>
                <div 
                  className={styles.tableRow}
                  onClick={() => toggleQueryExpansion(query.id)}
                >
                  <div className={styles.tableCell}>{query.date}</div>
                  <div className={styles.tableCell}>{query.description}</div>
                  <div className={styles.tableCell}>
                    <span
                      className={
                        query.status === "Resolved"
                          ? styles.statusResolved
                          : styles.statusInProgress
                      }
                    >
                      ● {query.status}
                    </span>
                  </div>
                  <div className={styles.expandButtonCell}>
                    <ChevronDown
                      className={`${styles.expandIcon} ${
                        query.expanded ? styles.expandIconRotated : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Expanded Content */}
                {query.expanded && (
                  <div className={styles.expandedContent}>
                    <div className={styles.commentsSection}>
                      <h4 className={styles.commentsTitle}>Comments/Responses</h4>
                      
                      {query.id === "1" && (
                        <div className={styles.responseItem}>
                          <p className={styles.responseDate}>13/04/2026, 11:23AM</p>
                          <p className={styles.responseText}>
                            As part of our journey to improve your digital banking services, we are gradually adding different account types to your profile. The Business Hub currently supports current, savings and investment accounts. You will be notified as we roll out more account types. Apologies for any inconvenience caused - Business Hub Team
                          </p>
                        </div>
                      )}

                      {query.id === "2" && (
                        <div className={styles.responseItem}>
                          <p className={styles.responseDate}>18/03/2026, 08:40AM</p>
                          <p className={styles.responseText}>
                            You can now get statements of up to two years and more in PDF format right on the Business Hub. Simply navigate to documents on the top menu bar, where you can find official bank confirmation letters, stamped statements and more.
                          </p>
                        </div>
                      )}

                      {query.id === "3" && (
                        <div className={styles.responseItem}>
                          <p className={styles.responseDate}>08/02/2026, 12:05PM</p>
                          <p className={styles.responseText}>
                            There may not have been enough time for deposits to clear (be paid by the issuing bank to the bank). The deposits might be on hold until the deposit clears and there is actual funds in the account to pay out withdrawals.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            <span className={styles.resultsCount}>3 Results Found</span>
            <span className={styles.displayingCount}>Displaying 3 of 3</span>
          </div>
          <div className={styles.paginationControls}>
            <button
              type="button"
              className={styles.paginationArrow}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              aria-label="Previous page"
            >
              ‹
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                type="button"
                className={
                  page === currentPage
                    ? styles.paginationButtonActive
                    : styles.paginationButton
                }
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              className={styles.paginationArrow}
              disabled={currentPage === 5}
              onClick={() => setCurrentPage(currentPage + 1)}
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        </div>

        {/* Info Notice */}
        <div className={styles.infoNotice}>
          <span className={styles.infoIcon}>ⓘ</span>
          <p className={styles.infoText}>
            Your requests help us serve you better and improve your overall experience. If your query is not reflected please contact your relationship manager to follow up.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
