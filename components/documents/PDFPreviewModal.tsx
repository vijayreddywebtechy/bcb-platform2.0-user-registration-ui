/**
 * PDFPreviewModal Component
 * 
 * Modal popup that displays PDF preview with:
 * - Close button
 * - Bank statement preview
 * - Account details and transactions
 * 
 * @returns {JSX.Element} The PDF preview modal
 */
"use client";

import { X } from "lucide-react";
import Image from "next/image";
import sbBrandIcon from "@/assets/sb_brand_icon.png";
import styles from "./PDFPreviewModal.module.css";

interface PDFPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle?: string;
}

export default function PDFPreviewModal({ 
  isOpen, 
  onClose, 
  documentTitle = "Bank Statement" 
}: PDFPreviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close preview"
        >
          CLOSE
          <X className={styles.closeIcon} />
        </button>

        {/* PDF Preview Content */}
        <div className={styles.pdfContent}>
          {/* Statement Header */}
          <div className={styles.statementHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.bankLogo}>
                <Image
                  src={sbBrandIcon}
                  alt="Stanbic Bank"
                  width={40}
                  height={45}
                />
                <h2 className={styles.bankName}>Stanbic Bank</h2>
              </div>
              <div className={styles.addressBlock}>
                <p className={styles.addressTitle}>STANBIC HEIGHTS</p>
                <p className={styles.addressLine}>PO BOX 0000, ACCRA 0000</p>
              </div>
            </div>
            
            <div className={styles.headerCenter}>
              <p className={styles.centerTitle}>STANBIC HEIGHTS</p>
              <p className={styles.customerCareLabel}>Customer care centre: <span className={styles.customerCareValue}>0302 610 690</span></p>
              <p className={styles.emailText}>email: mybusinesscentre@stanbic.com.gh</p>
            </div>
            
            <div className={styles.headerRight}>
              <p className={styles.addressTitle}>Stanbic Heights</p>
              <p className={styles.addressLine}>215 North Liberation Link</p>
              <p className={styles.addressLine}>Airport City, Accra</p>
              <p className={styles.addressLine}>Ghana</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className={styles.customerInfo}>
            <p className={styles.customerName}>MR J OLAMINI</p>
            <p className={styles.statementDate}>1 June 2024</p>
          </div>

          {/* Statement Details */}
          <div className={styles.statementDetails}>
            <div className={styles.statementLeft}>
              <p className={styles.statementBranch}>Stanbic Heights 9953</p>
              <p className={styles.statementType}>QUARTERLY NO PRINT</p>
            </div>
            <div className={styles.statementRight}>
              <p className={styles.statementNo}>Statement No: 1</p>
              <p className={styles.pageInfo}>Page 1 of 1</p>
              <p className={styles.frequency}>Statement frequency: Quarterly</p>
            </div>
          </div>

          {/* Bank Statement Table */}
          <div className={styles.statementTable}>
            <div className={styles.tableTitle}>BANK STATEMENT/TAX INVOICE</div>
            
            <div className={styles.accountRow}>
              <span className={styles.accountLabel}>BUSINESS CURRENT ACCOUNT</span>
              <span className={styles.accountNumberLabel}>ACCOUNT NUMBER</span>
              <span className={styles.accountNumber}>XXXXXXXXXXXX</span>
            </div>

            <div className={styles.balanceRow}>
              <span className={styles.balanceLabel}>MONTH-END BALANCE</span>
              <span className={styles.balanceValue}>XXXXXXXXXXXX</span>
            </div>

            <table className={styles.transactionsTable}>
              <thead>
                <tr className={styles.tableHeaderRow}>
                  <th className={styles.tableHeader}>DETAILS</th>
                  <th className={styles.tableHeader}>SERVICE FEE</th>
                  <th className={styles.tableHeader}>DEBITS</th>
                  <th className={styles.tableHeader}>CREDITS</th>
                  <th className={styles.tableHeader}>DATE</th>
                  <th className={styles.tableHeader}>BALANCE</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 8 }).map((_, index) => (
                  <tr key={index} className={styles.tableRow}>
                    <td className={styles.tableCell}>Vehicle insurance_Honda</td>
                    <td className={styles.tableCell}>00.000</td>
                    <td className={styles.tableCell}>00.000</td>
                    <td className={styles.tableCell}>00.000</td>
                    <td className={styles.tableCell}>00.000</td>
                    <td className={styles.tableCell}>00.000</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
