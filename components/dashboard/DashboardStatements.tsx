/**
 * DashboardStatements Component
 * 
 * Formal Statements section displaying downloadable bank statements
 * Includes filtering, email, and download functionality
 * 
 * All typography uses Benton Sans Pro font family
 * 
 * @returns {JSX.Element} The Formal Statements section
 */
"use client";

import Image from "next/image";
import { FileText, Mail, Download } from "lucide-react";
import icnInfoCircle from "@/assets/images/icons/icn_info_circle_solid-1.svg";
import icnDocumentMoney from "@/assets/images/icons/icn_document_money.svg";
import styles from "./DashboardStatements.module.css";

/**
 * Statement data interface
 */
interface Statement {
  description: string;
  dateRange: string;
}

/**
 * Statements data
 */
const STATEMENTS: Statement[] = [
  { 
    description: "3-Month Statement (Official bank statement stamped PDF)", 
    dateRange: "9 Nov 2025 - 7 Feb 2026" 
  },
  { 
    description: "6-Month Statement (Official bank statement stamped PDF)", 
    dateRange: "11 Aug 2025 - 7 Feb 2026" 
  },
  { 
    description: "12-Month Statement (Official bank statement stamped PDF)", 
    dateRange: "8 Feb 2025 - 7 Feb 2026" 
  },
  { 
    description: "24-Month Statement (Official bank statement stamped PDF)", 
    dateRange: "11 Feb 2024 - 7 Feb 2026" 
  },
];

/**
 * Main DashboardStatements Component
 */
export default function DashboardStatements() {
  return (
    <section className={styles.statementsSection}>
      {/* White Container - 1296px x 727px */}
      <div className={styles.whiteContainer}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <Image
              src={icnDocumentMoney}
              alt="Statements icon"
              width={24}
              height={24}
              className={styles.headerIcon}
            />
            <h2 className={styles.sectionTitle}>Formal statements</h2>
          </div>

          {/* Filters */}
          <div className={styles.filters}>
            <select className={styles.accountsDropdown} aria-label="Select account">
              <option>Business PureSav... Savings Account **** 4690</option>
              <option>ABC Supplier Account **** 7632</option>
            </select>
            <select className={styles.statementsDropdown} aria-label="Select statement type">
              <option>Stamped statements</option>
              <option>Unstamped statements</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className={styles.tableWrapper}>
          <div className={styles.tableContent}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableHeaderRow}>
                  <th className={styles.tableHeader}>Description</th>
                  <th className={styles.tableHeader}>Date range</th>
                  <th className={styles.tableHeader}>Email</th>
                  <th className={styles.tableHeader}>Save</th>
                </tr>
              </thead>
              <tbody>
                {STATEMENTS.map((statement, index) => (
                  <tr key={index} className={styles.tableRow}>
                    <td className={styles.tableCell}>
                      <div className={styles.descriptionCell}>
                        <FileText className={styles.fileIcon} />
                        <span>{statement.description}</span>
                      </div>
                    </td>
                    <td className={styles.tableCell}>{statement.dateRange}</td>
                    <td className={styles.tableCellCenter}>
                      <button 
                        type="button" 
                        className={styles.iconButton}
                        aria-label="Email statement"
                      >
                        <Mail className={styles.actionIcon} />
                      </button>
                    </td>
                    <td className={styles.tableCellCenter}>
                      <button 
                        type="button" 
                        className={styles.iconButton}
                        aria-label="Download statement"
                      >
                        <Download className={styles.actionIcon} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Info Box */}
          <div className={styles.infoBox}>
            <Image
              src={icnInfoCircle}
              alt="Information"
              width={16}
              height={16}
              className={styles.infoIcon}
            />
            <p className={styles.infoText}>
              <strong>Statements Disclaimer:</strong> Statements are not password protected. Standard Bank is not responsible for any loss or damage you may suffer if any information is accessed or used by any unauthorised party. 
              A service fee of R10 will be charged for each retrieval, email and download of statements older than 2 years or stamped statements older than 6 months
            </p>
          </div>
        </div>

        {/* Footer / Button Area */}
        <div className={styles.buttonArea}>
          <p className={styles.displayingText}>
            Displaying {STATEMENTS.length} of {STATEMENTS.length}
          </p>
          <button type="button" className={styles.viewAllButton}>
            VIEW ALL
          </button>
        </div>
      </div>
    </section>
  );
}
