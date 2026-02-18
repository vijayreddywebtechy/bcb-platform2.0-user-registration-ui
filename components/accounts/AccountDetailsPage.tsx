"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Search, Calendar, ChevronRight, ChevronLeft, Mail, Download, FileText, Printer, Info } from "lucide-react";
import icnLinkOut from "@/assets/images/icons/icn_link_out.svg";
import icnLinkOutWhite from "@/assets/images/icons/icn_link_out_white.svg";
import icnResponsiveWhite from "@/assets/images/icons/icn_responsive_white.svg";
import icnTradeFinanceWhite from "@/assets/images/icons/icn_trade_finance_white.svg";
import icnScreenWhite from "@/assets/images/icons/icn_screen_white.svg";
import styles from "./AccountDetailsPage.module.css";

interface AccountDetailsPageProps {
  accountId: string;
}

// Mock account data - in real app, fetch based on accountId
const ACCOUNT_DATA: Record<string, {
  name: string;
  accountNumber: string;
  type: string;
  latest: string;
  available: string;
}> = {
  "1": {
    name: "ABC Supplier Account",
    accountNumber: "6785 0454 7632",
    type: "Current Account",
    latest: "12 638 345.00",
    available: "11 630 000.00",
  },
  "2": {
    name: "MyMoBiz Account",
    accountNumber: "4988 0454 7632",
    type: "Current Account",
    latest: "712 566.00",
    available: "712 566.00",
  },
  "3": {
    name: "ABC Expense Account",
    accountNumber: "3821 0454 7632",
    type: "Current Account",
    latest: "3 438 280.00",
    available: "3 438 280.00",
  },
  "4": {
    name: "Business Current Account",
    accountNumber: "4656 0454 7632",
    type: "Current Account",
    latest: "1 153 600.00",
    available: "1 153 600.00",
  },
  "5": {
    name: "Business MarketLink",
    accountNumber: "3822 0454 7690",
    type: "Savings Account",
    latest: "470 500.00",
    available: "470 500.00",
  },
  "6": {
    name: "Business PureSave Account",
    accountNumber: "4722 0454 7685",
    type: "Savings Account",
    latest: "7 600 400.00",
    available: "7 600 400.00",
  },
};

// Mock transactions
const TRANSACTIONS = [
  { id: 1, date: "12 Jan 2026", description: "CELLPHONE :INSTANTMON CASH TO 0631237654 16149 308179069", amount: "1 200 000.00", type: "credit" },
  { id: 2, date: "12 Jan 2026", description: "CELLPHONE :INSTANTMON CASH TO 0631237654 16149 308179069", amount: "350 000.00", type: "credit" },
  { id: 3, date: "12 Jan 2026", description: "CELLPHONE :INSTANTMON CASH TO 0631237654 16149 308179069", amount: "8 000.00", type: "credit" },
  { id: 4, date: "12 Jan 2026", description: "CELLPHONE :INSTANTMON CASH TO 0631237654 16149 308179069", amount: "1 200.00", type: "credit" },
  { id: 5, date: "12 Jan 2026", description: "CELLPHONE :INSTANTMON CASH TO 0631237654 16149 308179069", amount: "- 1 200.00", type: "debit" },
  { id: 6, date: "12 Jan 2026", description: "CELLPHONE :INSTANTMON CASH TO 0631237654 16149 308179069", amount: "78 000.00", type: "credit" },
  { id: 7, date: "12 Jan 2026", description: "CELLPHONE :INSTANTMON CASH TO 0631237654 16149 308179069", amount: "30 000.00", type: "credit" },
  { id: 8, date: "12 Jan 2026", description: "CELLPHONE :INSTANTMON CASH TO 0631237654 16149 308179069", amount: "- 1 200.00", type: "debit" },
];

const DIGITAL_LINKS = [
  {
    id: 1,
    title: "Online Banking for Business",
    subtitle: "I want to transact on",
    status: "Sign in automatically",
    icon: icnResponsiveWhite,
  },
  {
    id: 2,
    title: "TradeOnline",
    subtitle: "Submit trade instructions",
    status: "Sign in automatically",
    icon: icnTradeFinanceWhite,
  },
  {
    id: 3,
    title: "Business Online",
    subtitle: "I want to transact on",
    status: "You will need to sign in again",
    icon: icnScreenWhite,
  },
];

const DOCUMENTS = [
  {
    id: 1,
    name: "3-Month Statement",
    description: "Official bank statement stamped PDF",
    dateRange: "9 Nov 2025 - 7 Feb 2026",
  },
  {
    id: 2,
    name: "6-Month Statement",
    description: "Official bank statement stamped PDF",
    dateRange: "11 Aug 2025 - 7 Feb 2026",
  },
  {
    id: 3,
    name: "12-Month Statement",
    description: "Official bank statement stamped PDF",
    dateRange: "8 Feb 2025 - 7 Feb 2026",
  },
  {
    id: 4,
    name: "24-Month Statement",
    description: "Official bank statement stamped PDF",
    dateRange: "11 Feb 2024 - 7 Feb 2026",
  },
];

export default function AccountDetailsPage({ accountId }: AccountDetailsPageProps) {
  const [activeTab, setActiveTab] = useState<"history" | "documents" | "details">("history");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("Last year");
  const [documentType, setDocumentType] = useState("");

  const account = ACCOUNT_DATA[accountId] || ACCOUNT_DATA["1"];

  return (
    <div className={styles.pageWrapper}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.container}>
          {/* Back Button */}
          <Link href="/accounts" className={styles.backButton}>
            <ArrowLeft className={styles.backIcon} />
            Back
          </Link>

          {/* Account Header */}
          <div className={styles.accountHeader}>
            <div className={styles.accountInfo}>
              <h1 className={styles.accountTitle}>{account.name}</h1>
              <p className={styles.accountSubtitle}>{account.type} {account.accountNumber}</p>
              
              <div className={styles.balances}>
                <div className={styles.balanceItem}>
                  <span className={styles.balanceLabel}>Latest</span>
                  <span className={styles.balanceAmount}>R {account.latest}</span>
                </div>
                <div className={styles.balanceItem}>
                  <span className={styles.balanceLabel}>Available</span>
                  <span className={styles.balanceAmount}>R {account.available}</span>
                </div>
              </div>
            </div>

            <button type="button" className={styles.transactButton}>
              TRANSACT
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className={styles.contentSection}>
        <div className={styles.container}>
          {/* Tabs */}
          <div className={styles.tabs}>
            <button
              type="button"
              className={activeTab === "history" ? styles.tabActive : styles.tab}
              onClick={() => setActiveTab("history")}
            >
              Transaction History
            </button>
            <button
              type="button"
              className={activeTab === "documents" ? styles.tabActive : styles.tab}
              onClick={() => setActiveTab("documents")}
            >
              Account Documents
            </button>
            <button
              type="button"
              className={activeTab === "details" ? styles.tabActive : styles.tab}
              onClick={() => setActiveTab("details")}
            >
              Account Details
            </button>
          </div>

          {/* Transaction History Tab */}
          {activeTab === "history" && (
            <div className={styles.transactionSection}>
              {/* Search and Filters */}
              <div className={styles.filters}>
                <div className={styles.searchWrapper}>
                  <Search className={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Search transactions"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>
                <div className={styles.dateFilter}>
                  <Calendar className={styles.calendarIcon} />
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className={styles.dateSelect}
                  >
                    <option>Last year</option>
                    <option>Last 6 months</option>
                    <option>Last 3 months</option>
                    <option>Last month</option>
                  </select>
                </div>
                <button type="button" className={styles.exportButton}>
                  EXPORT
                </button>
              </div>

              {/* Transactions Table */}
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr className={styles.tableHeaderRow}>
                      <th className={styles.tableHeader}>
                        <input type="checkbox" className={styles.checkbox} />
                      </th>
                      <th className={styles.tableHeader}>DATE</th>
                      <th className={styles.tableHeader}>DESCRIPTION</th>
                      <th className={styles.tableHeader}>AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TRANSACTIONS.map((transaction) => (
                      <tr key={transaction.id} className={styles.tableRow}>
                        <td className={styles.tableCell}>
                          <input type="checkbox" className={styles.checkbox} />
                        </td>
                        <td className={styles.tableCell}>
                          <div className={styles.dateCell}>
                            {transaction.type === "credit" ? (
                              <ChevronRight className={styles.iconCredit} />
                            ) : (
                              <ChevronLeft className={styles.iconDebit} />
                            )}
                            {transaction.date}
                          </div>
                        </td>
                        <td className={styles.tableCell}>{transaction.description}</td>
                        <td className={`${styles.tableCell} ${styles.amountCell} ${transaction.type === "debit" ? styles.debitAmount : ""}`}>
                          {transaction.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className={styles.pagination}>
                <p className={styles.paginationText}>Displaying 8 of 234</p>
                <button type="button" className={styles.loadMoreButton}>
                  LOAD MORE
                </button>
              </div>
            </div>
          )}

          {/* Account Documents Tab */}
          {activeTab === "documents" && (
            <div className={styles.documentsSection}>
              {/* Document Type Filter */}
              <div className={styles.documentFilter}>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                  className={styles.documentSelect}
                >
                  <option value="">Select document type</option>
                  <option value="3month">3-Month Statement</option>
                  <option value="6month">6-Month Statement</option>
                  <option value="12month">12-Month Statement</option>
                  <option value="24month">24-Month Statement</option>
                </select>
              </div>

              {/* Documents Table */}
              <div className={styles.documentsTable}>
                <div className={styles.documentsHeader}>
                  <span className={styles.documentsHeaderText}>DESCRIPTION</span>
                  <span className={styles.documentsHeaderText}>DATE RANGE</span>
                  <span className={styles.documentsHeaderText}>EMAIL</span>
                  <span className={styles.documentsHeaderText}>SAVE</span>
                </div>
                {DOCUMENTS.map((doc) => (
                  <div key={doc.id} className={styles.documentRow}>
                    <div className={styles.documentInfo}>
                      <FileText className={styles.documentIcon} />
                      <div>
                        <p className={styles.documentName}>{doc.name}</p>
                        <p className={styles.documentDescription}>{doc.description}</p>
                      </div>
                    </div>
                    <div className={styles.documentDate}>{doc.dateRange}</div>
                    <div className={styles.documentActions}>
                      <button
                        type="button"
                        className={styles.documentActionButton}
                        aria-label="Email document"
                      >
                        <Mail className={styles.actionIcon} />
                      </button>
                    </div>
                    <div className={styles.documentActions}>
                      <button
                        type="button"
                        className={styles.documentActionButton}
                        aria-label="Download document"
                      >
                        <Download className={styles.actionIcon} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Disclaimer */}
              <div className={styles.documentsDisclaimer}>
                <Info className={styles.disclaimerIcon} />
                <p className={styles.disclaimerText}>
                  <strong>Statements Disclaimer:</strong> Statements are not password protected. Standard Bank is not responsible 
                  for any loss or damage you may suffer if any information is accessed or used by any unauthorised party. 
                  A service fee of R10 will be charged for each retrieval, email and download of statements older than 2 years 
                  or stamped statements older than 6 months
                </p>
              </div>
            </div>
          )}

          {/* Account Details Tab */}
          {activeTab === "details" && (
            <div className={styles.detailsSection}>
              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Account name</span>
                  <span className={styles.detailValue}>{account.name}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Account type</span>
                  <span className={styles.detailValue}>{account.type}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Account number</span>
                  <span className={styles.detailValue}>{account.accountNumber}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Date account opened</span>
                  <span className={styles.detailValue}>1 June 2021</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Currency</span>
                  <span className={styles.detailValue}>ZAR</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className={styles.detailsActions}>
                <button type="button" className={styles.detailsActionButton}>
                  <Mail className={styles.detailsActionIcon} />
                </button>
                <button type="button" className={styles.detailsActionButton}>
                  <Printer className={styles.detailsActionIcon} />
                </button>
              </div>

              {/* Info Notice */}
              <div className={styles.detailsNotice}>
                <Info className={styles.noticeIcon} />
                <p className={styles.noticeText}>
                  Details displayed are based on available account data at the moment.
                </p>
              </div>
            </div>
          )}

          {/* Digital Hub Links */}
          <div className={styles.digitalHubSection}>
            <div className={styles.digitalHubHeader}>
              <div className={styles.digitalHubTitleWrapper}>
                <Image 
                  src={icnLinkOut} 
                  alt="Link" 
                  width={24} 
                  height={24}
                  className={styles.digitalHubTitleIcon}
                />
                <h2 className={styles.digitalHubTitle}>Digital hub links</h2>
              </div>
              <div className={styles.digitalHubNav}>
                <button type="button" className={styles.navButton}>
                  <ChevronLeft size={20} />
                </button>
                <button type="button" className={styles.navButton}>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className={styles.digitalHubGrid}>
              {DIGITAL_LINKS.map((link) => (
                <div key={link.id} className={styles.digitalHubCard}>
                  <div className={styles.digitalHubIcon}>
                    <Image 
                      src={link.icon} 
                      alt={link.title}
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className={styles.digitalHubContent}>
                    <p className={styles.digitalHubSubtitle}>{link.subtitle}</p>
                    <h3 className={styles.digitalHubCardTitle}>{link.title}</h3>
                    <p className={styles.digitalHubStatus}>{link.status}</p>
                  </div>
                  <Image 
                    src={icnLinkOutWhite} 
                    alt="Link" 
                    width={20} 
                    height={20}
                    className={styles.linkIcon}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
