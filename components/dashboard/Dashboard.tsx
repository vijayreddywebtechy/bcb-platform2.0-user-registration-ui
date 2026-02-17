/**
 * Dashboard Component
 * 
 * Main dashboard content following the Business Hub design system.
 * Layout structure matches the reference design:
 * 1. Hero Section (Welcome + Next best actions cards)
 * 2. Main Content (Cash flows + My links side by side)
 * 3. Business Accounts Section
 * 4. Bigger Nail Links Section
 * 5. Formal Statements Section
 * 6. Bottom Cards Section
 * 
 * All typography uses Benton Sans Pro font family
 * 
 * @returns {JSX.Element} The dashboard content
 */
"use client";

import DashboardHero from "./DashboardHero";
import DashboardCashFlow from "./DashboardCashFlow";
import DashboardAccounts from "./DashboardAccounts";
import DashboardDigitalLinks from "./DashboardDigitalLinks";
import DashboardStatements from "./DashboardStatements";
import DashboardMyLinks from "./DashboardMyLinks";
import DashboardBottomCards from "./DashboardBottomCards";
import styles from "./DashboardContent.module.css";

export default function Dashboard() {
  return (
    <>
      {/* Hero Section - Welcome + Next best actions */}
      <DashboardHero />

      {/* Main Content Section - Cash Flow + My Links */}
      <section className={styles.mainSection}>
        <div className={styles.contentContainer}>
          {/* Left: Cash Flow (929px width) */}
          <div className={styles.cashFlowWrapper}>
            <DashboardCashFlow />
          </div>
          
          {/* Right: My Links */}
          <div className={styles.myLinksWrapper}>
            <div className={styles.myLinksWithActions}>
              <DashboardMyLinks />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ADDITIONAL SECTIONS ==================== */}
      <div className={styles.additionalSections}>
        
        {/* Business Accounts Section */}
        <div className={styles.fullWidthSection}>
          <div className={styles.businessAccountsWrapper}>
            <div className={styles.businessAccountsContent}>
              <DashboardAccounts />
            </div>
          </div>
        </div>

        {/* Digital Hub Links Section */}
        <div className={styles.fullWidthSection}>
          <DashboardDigitalLinks />
        </div>

        {/* Formal Statements Section */}
        <div className={styles.fullWidthSection}>
          <DashboardStatements />
        </div>

        {/* Bottom Cards Section */}
        <div className={styles.fullWidthSection}>
          <DashboardBottomCards />
        </div>
      </div>
    </>
  );
}
