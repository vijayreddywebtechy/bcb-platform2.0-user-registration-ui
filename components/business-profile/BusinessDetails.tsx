/**
 * BusinessDetails Component
 * 
 * Displays business profile information including:
 * - General business details
 * - Registration information
 * - Contact options
 * 
 * All typography uses Benton Sans Pro font family
 * 
 * @returns {JSX.Element} The Business Details component
 */
"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Printer, Eye, EyeOff } from "lucide-react";
import icnHome from "@/assets/images/icons/icn_home_white.svg";
import styles from "./BusinessDetails.module.css";

interface BusinessInfo {
  businessName: string;
  industrySector: string;
  businessType: string;
  registrationNumber: string;
  tradingName: string;
  businessTaxNumber: string;
  businessTaxNumberMasked: string;
}

const BUSINESS_INFO: BusinessInfo = {
  businessName: "ABC Architects (Pty) Ltd",
  industrySector: "Professional Services",
  businessType: "Private Company",
  registrationNumber: "2007/0345/123",
  tradingName: "ABC Architects",
  businessTaxNumber: "9998 765 432",
  businessTaxNumberMasked: "**** *** ***"
};

export default function BusinessDetails() {
  const [showTaxNumber, setShowTaxNumber] = useState(false);

  const toggleTaxNumberVisibility = () => {
    setShowTaxNumber(!showTaxNumber);
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
        <span className={styles.breadcrumbItem}>Business Details</span>
      </div>

      {/* Page Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Business Details</h1>
        <p className={styles.pageSubtitle}>Confirm and share your business details</p>
      </div>

      {/* Main Content Card */}
      <div className={styles.card}>
        {/* Card Header */}
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>General Details</h2>
        </div>

        {/* Card Content */}
        <div className={styles.cardContent}>
          {/* Business Details Grid */}
          <div className={styles.detailsGrid}>
            {/* Row 1 */}
            <div className={styles.detailItem}>
              <label className={styles.detailLabel}>Business name</label>
              <p className={styles.detailValue}>{BUSINESS_INFO.businessName}</p>
            </div>
            <div className={styles.detailItem}>
              <label className={styles.detailLabel}>Industry/Sector</label>
              <p className={styles.detailValue}>{BUSINESS_INFO.industrySector}</p>
            </div>
            <div className={styles.detailItem}>
              <label className={styles.detailLabel}>Business type</label>
              <p className={styles.detailValue}>{BUSINESS_INFO.businessType}</p>
            </div>

            {/* Row 2 */}
            <div className={styles.detailItem}>
              <label className={styles.detailLabel}>Registration number</label>
              <p className={styles.detailValue}>{BUSINESS_INFO.registrationNumber}</p>
            </div>
            <div className={styles.detailItem}>
              <label className={styles.detailLabel}>Trading name</label>
              <p className={styles.detailValue}>{BUSINESS_INFO.tradingName}</p>
            </div>
            <div className={styles.detailItem}>
              <label className={styles.detailLabel}>Business tax number</label>
              <div className={styles.taxNumberContainer}>
                <p className={styles.detailValue}>
                  {showTaxNumber ? BUSINESS_INFO.businessTaxNumber : BUSINESS_INFO.businessTaxNumberMasked}
                </p>
                <button
                  type="button"
                  className={styles.iconButton}
                  aria-label={showTaxNumber ? "Hide tax number" : "View tax number"}
                  onClick={toggleTaxNumberVisibility}
                >
                  {showTaxNumber ? (
                    <EyeOff className={styles.icon} />
                  ) : (
                    <Eye className={styles.icon} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button
              type="button"
              className={styles.actionButton}
              aria-label="Email details"
            >
              <Mail className={styles.actionIcon} />
            </button>
            <button
              type="button"
              className={styles.actionButton}
              aria-label="Print details"
            >
              <Printer className={styles.actionIcon} />
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className={styles.disclaimer}>
          <div className={styles.disclaimerIcon}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="#0051FF" strokeWidth="2"/>
              <path d="M8 4V8.5" stroke="#0051FF" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="8" cy="11" r="0.5" fill="#0051FF"/>
            </svg>
          </div>
          <p className={styles.disclaimerText}>
            Details displayed are based on available client information. If this is incorrect, please call{" "}
            <span className={styles.phoneNumber}>0860 109 075</span> and speak to a consultant.
          </p>
        </div>
      </div>
    </div>
  );
}
