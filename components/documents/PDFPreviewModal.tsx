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

import { X, Menu, Minus, Plus, Download, Printer, MoreVertical, Maximize2, RotateCw } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import sbBrandIcon from "@/assets/sb_brand_icon.png";
import styles from "./PDFPreviewModal.module.css";

interface PDFPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle?: string;
  documentId?: string;
  currentPage?: number;
  totalPages?: number;
}

export default function PDFPreviewModal({ 
  isOpen, 
  onClose, 
  documentTitle = "Bank Statement",
  documentId = "8cff6faa-b891-4d91-b043-acfaa2b3924",
  currentPage = 1,
  totalPages = 1
}: PDFPreviewModalProps) {
  const [zoom, setZoom] = useState(100);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const handleDownload = () => {
    console.log("Download PDF");
  };
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        {/* Close Button - Above PDF Header */}
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close preview"
        >
          CLOSE
          <X className={styles.closeIcon} />
        </button>

        {/* PDF Viewer Header */}
        <div className={styles.pdfHeader}>
          <div className={styles.pdfHeaderLeft}>
            <button className={styles.headerIconButton} aria-label="Menu">
              <Menu className={styles.headerIcon} />
            </button>
            <span className={styles.documentId}>{documentId}</span>
          </div>

          <div className={styles.pdfHeaderCenter}>
            <span className={styles.pageNavigation}>
              {currentPage} / {totalPages}
            </span>
          </div>

          <div className={styles.pdfHeaderRight}>
            <button 
              className={styles.headerIconButton} 
              onClick={handleZoomOut}
              aria-label="Zoom out"
            >
              <Minus className={styles.headerIcon} />
            </button>
            <span className={styles.zoomPercentage}>{zoom}%</span>
            <button 
              className={styles.headerIconButton} 
              onClick={handleZoomIn}
              aria-label="Zoom in"
            >
              <Plus className={styles.headerIcon} />
            </button>
            <button className={styles.headerIconButton} aria-label="Fit to page">
              <Maximize2 className={styles.headerIcon} />
            </button>
            <button className={styles.headerIconButton} aria-label="Rotate">
              <RotateCw className={styles.headerIcon} />
            </button>
            
            <div className={styles.headerDivider} />
            
            <button 
              className={styles.headerIconButton} 
              onClick={handleDownload}
              aria-label="Download"
              title="Download"
            >
              <Download className={styles.headerIcon} />
            </button>
            <button 
              className={styles.headerIconButton} 
              onClick={handlePrint}
              aria-label="Print"
              title="Print"
            >
              <Printer className={styles.headerIcon} />
            </button>
            <button className={styles.headerIconButton} aria-label="More options" title="More options">
              <MoreVertical className={styles.headerIcon} />
            </button>
          </div>
        </div>

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
            <p className={styles.customerName}>MR J DULAMINI</p>
            <p className={styles.statementDate}>1 June 2024</p>
          </div>

          {/* Statement Details */}
          <div className={styles.statementDetails}>
            <div className={styles.statementLeft}>
              <p className={styles.statementBranch}>STANBIC HEIGHTS 9953</p>
              <p className={styles.statementType}>QUARTERLY NO PRINT</p>
            </div>
            <div className={styles.statementRight}>
              <p className={styles.statementNo}>Statement No: 1</p>
              <p className={styles.pageInfo}>Page 1 of 1</p>
              <p className={styles.frequency}>Statement Frequency: Quarterly</p>
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
