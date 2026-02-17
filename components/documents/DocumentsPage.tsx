/**
 * DocumentsPage Component
 * 
 * Displays documents page with:
 * - Account filter dropdown
 * - Document cards (confirmation letter, statements)
 * - Un-stamped monthly statements table
 * 
 * All typography uses Benton Sans Pro font family
 * 
 * @returns {JSX.Element} The Documents page component
 */
"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Download, FileText, AlertCircle } from "lucide-react";
import icnHome from "@/assets/images/icons/icn_home_white.svg";
import PDFPreviewModal from "./PDFPreviewModal";
import styles from "./DocumentsPage.module.css";

interface Statement {
  date: string;
  statementNo: string;
  description: string;
}

const STATEMENTS: Statement[] = [
  { date: "26 Dec 2025", statementNo: "Statement No. 12", description: "Official monthly bank statement PDF" },
  { date: "26 Nov 2025", statementNo: "Statement No. 11", description: "Official monthly bank statement PDF" },
  { date: "26 Oct 2025", statementNo: "Statement No. 10", description: "Official monthly bank statement PDF" },
  { date: "26 Sep 2025", statementNo: "Statement No. 9", description: "Official monthly bank statement PDF" },
  { date: "26 Aug 2025", statementNo: "Statement No. 8", description: "Official monthly bank statement PDF" },
  { date: "26 Jul 2025", statementNo: "Statement No. 7", description: "Official monthly bank statement PDF" },
  { date: "26 Jun 2025", statementNo: "Statement No. 6", description: "Official monthly bank statement PDF" },
  { date: "26 May 2025", statementNo: "Statement No. 5", description: "Official monthly bank statement PDF" },
  { date: "26 Apr 2025", statementNo: "Statement No. 4", description: "Official monthly bank statement PDF" },
  { date: "26 Mar 2025", statementNo: "Statement No. 3", description: "Official monthly bank statement PDF" },
  { date: "26 Feb 2025", statementNo: "Statement No. 2", description: "Official monthly bank statement PDF" },
  { date: "26 Jan 2025", statementNo: "Statement No. 1", description: "Official monthly bank statement PDF" },
];

export default function DocumentsPage() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState("");

  const handleViewDocument = (docTitle: string) => {
    setSelectedDocument(docTitle);
    setIsModalOpen(true);
  };

  const handleDownloadDocument = (docTitle: string) => {
    setSelectedDocument(docTitle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <span className={styles.breadcrumbItem}>
          <Image
            src={icnHome}
            alt="Home"
            width={16}
            height={16}
            className={styles.homeIcon}
          />
          Dashboard
        </span>
        <span className={styles.breadcrumbSeparator}>&gt;</span>
        <span className={styles.breadcrumbItem}>Documents</span>
      </div>

      {/* Page Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Documents</h1>
        <p className={styles.pageSubtitle}>Get your official bank letters and statements</p>
      </div>

      {/* Account Filter */}
      <div className={styles.filterSection}>
        <label htmlFor="accountFilter" className={styles.filterLabel}>
          Select an account to filter your documents
        </label>
        <select id="accountFilter" className={styles.accountDropdown}>
          <option>Select Account **** 4690</option>
          <option>Business PureSav... Savings Account **** 4690</option>
          <option>ABC Supplier Account **** 7632</option>
        </select>
      </div>

      {/* Document Cards */}
      <div className={styles.cardsGrid}>
        {/* Bank Account Confirmation Letter - Large Blue Card */}
        <div className={`${styles.card} ${styles.cardFeatured}`}>
          <div className={styles.cardIcon}>
            <FileText className={styles.iconLarge} />
          </div>
          <h3 className={styles.cardTitle}>Bank account confirmation letter</h3>
          <p className={styles.cardDate}>9 Nov 2025 - 7 Feb 2026</p>
          <p className={styles.cardDescription}>
            Download or email your official bank account confirmation letter in PDF
          </p>
          <div className={styles.cardActions}>
            <button
              type="button"
              className={styles.cardActionButton}
              aria-label="Email confirmation letter"
            >
              <Mail className={styles.cardActionIcon} />
            </button>
            <button
              type="button"
              className={styles.cardActionButton}
              aria-label="Download confirmation letter"
              onClick={() => handleDownloadDocument("Bank account confirmation letter")}
            >
              <Download className={styles.cardActionIcon} />
            </button>
          </div>
        </div>

        {/* 3-Month Stamped Statement */}
        <div className={styles.card}>
          <div className={styles.cardIconSmall}>
            <FileText className={styles.iconSmall} />
          </div>
          <h3 className={styles.cardTitleSmall}>3-Month stamped bank statement</h3>
          <p className={styles.cardDateSmall}>9 Nov 2025 - 7 Feb 2026</p>
          <p className={styles.cardDescriptionSmall}>
            Download or email your official stamped bank statement in PDF
          </p>
          <div className={styles.cardActionsSmall}>
            <button
              type="button"
              className={styles.iconButton}
              aria-label="Email statement"
            >
              <Mail className={styles.iconAction} />
            </button>
            <button
              type="button"
              className={styles.iconButton}
              aria-label="Download statement"
              onClick={() => handleDownloadDocument("3-Month stamped bank statement")}
            >
              <Download className={styles.iconAction} />
            </button>
          </div>
        </div>

        {/* 6-Month Stamped Statement */}
        <div className={styles.card}>
          <div className={styles.cardIconSmall}>
            <FileText className={styles.iconSmall} />
          </div>
          <h3 className={styles.cardTitleSmall}>6-Month stamped bank statement</h3>
          <p className={styles.cardDateSmall}>11 Aug 2025 - 7 Feb 2026</p>
          <p className={styles.cardDescriptionSmall}>
            Download or email your official stamped bank statement in PDF
          </p>
          <div className={styles.cardActionsSmall}>
            <button
              type="button"
              className={styles.iconButton}
              aria-label="Email statement"
            >
              <Mail className={styles.iconAction} />
            </button>
            <button
              type="button"
              className={styles.iconButton}
              aria-label="Download statement"
              onClick={() => handleDownloadDocument("6-Month stamped bank statement")}
            >
              <Download className={styles.iconAction} />
            </button>
          </div>
        </div>

        {/* Statements Disclaimer Card */}
        <div className={`${styles.card} ${styles.cardWarning}`}>
          <div className={styles.warningIcon}>
            <AlertCircle className={styles.iconWarning} />
          </div>
          <h3 className={styles.disclaimerTitle}>Statements Disclaimer</h3>
          <p className={styles.disclaimerText}>
            Statements are not password protected. Standard Bank is not responsible for any loss 
            or damage you may suffer if any information is accessed or used by any unauthorised party.
          </p>
          <p className={styles.disclaimerText}>
            A service fee of R10 will be charged for each retrieval, email and download of statements 
            older than 2 years or stamped statements older than 6 months
          </p>
        </div>
      </div>

      {/* Un-stamped Monthly Statements Section */}
      <div className={styles.tableSection}>
        <div className={styles.tableSectionHeader}>
          <h2 className={styles.tableSectionTitle}>Un-stamped monthly statements</h2>
          <select 
            className={styles.yearDropdown}
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>

        {/* Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeaderRow}>
                <th className={styles.tableHeader}>DATE</th>
                <th className={styles.tableHeader}>STATEMENT NO.</th>
                <th className={styles.tableHeader}>VIEW</th>
                <th className={styles.tableHeader}>EMAIL</th>
                <th className={styles.tableHeader}>SAVE</th>
              </tr>
            </thead>
            <tbody>
              {STATEMENTS.map((statement, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.tableCell}>
                    <div className={styles.dateCell}>
                      <FileText className={styles.fileIcon} />
                      <span>{statement.date}</span>
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.statementInfo}>
                      <p className={styles.statementNo}>{statement.statementNo}</p>
                      <p className={styles.statementDesc}>{statement.description}</p>
                    </div>
                  </td>
                  <td className={styles.tableCellCenter}>
                    <button
                      type="button"
                      className={styles.tableIconButton}
                      aria-label="View statement"
                      onClick={() => handleViewDocument(statement.statementNo)}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7Z" fill="#0033AA"/>
                        <path d="M10 4C5 4 1.73 7.11 1 10C1.73 12.89 5 16 10 16C15 16 18.27 12.89 19 10C18.27 7.11 15 4 10 4Z" stroke="#0033AA" strokeWidth="1.5" fill="none"/>
                      </svg>
                    </button>
                  </td>
                  <td className={styles.tableCellCenter}>
                    <button
                      type="button"
                      className={styles.tableIconButton}
                      aria-label="Email statement"
                    >
                      <Mail className={styles.tableActionIcon} />
                    </button>
                  </td>
                  <td className={styles.tableCellCenter}>
                    <button
                      type="button"
                      className={styles.tableIconButton}
                      aria-label="Download statement"
                      onClick={() => handleDownloadDocument(statement.statementNo)}
                    >
                      <Download className={styles.tableActionIcon} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className={styles.tableFooter}>
          <p className={styles.displayingText}>Displaying {STATEMENTS.length} of {STATEMENTS.length}</p>
        </div>
      </div>

      {/* PDF Preview Modal */}
      <PDFPreviewModal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        documentTitle={selectedDocument}
      />
    </div>
  );
}
