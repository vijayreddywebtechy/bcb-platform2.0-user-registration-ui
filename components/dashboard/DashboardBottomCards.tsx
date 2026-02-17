/**
 * DashboardBottomCards Component
 * 
 * Bottom section displaying three cards:
 * - Business Offers
 * - FX Rate Calculator
 * - Security Status
 * 
 * All typography uses Benton Sans Pro font family
 * 
 * @returns {JSX.Element} The Bottom Cards section
 */
"use client";

import Image from "next/image";
import { Package, ArrowLeftRight, Shield, Lock } from "lucide-react";
import styles from "./DashboardBottomCards.module.css";

/**
 * Main DashboardBottomCards Component
 */
export default function DashboardBottomCards() {
  return (
    <section className={styles.bottomSection}>
      <div className={styles.cardsGrid}>
        {/* ==================== BUSINESS OFFERS CARD ==================== */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.headerLeft}>
              <Package className={styles.headerIcon} />
              <h3 className={styles.cardTitle}>Business Offers</h3>
            </div>
            <span className={styles.badge}>Available offers 1</span>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.imagePlaceholder}>
              <span className={styles.placeholderText}>Solar / business image</span>
            </div>
            <p className={styles.cardDescription}>
              Power your business the right way, without interruptions. Protect your business 
              from load shedding and get the solar solutions you need with a business solar loan.
            </p>
            <button type="button" className={styles.primaryButton}>
              TELL ME MORE
            </button>
          </div>
        </div>

        {/* ==================== FX RATE CALCULATOR CARD ==================== */}
        <div className={styles.card}>
          <div className={styles.cardHeaderSimple}>
            <ArrowLeftRight className={styles.headerIcon} />
            <h3 className={styles.cardTitle}>FX Rate Calculator</h3>
          </div>
          <div className={styles.cardBody}>
            <p className={styles.cardText}>
              Need forex? Get an idea of how much it could cost.
            </p>
            <p className={styles.cardSubtext}>
              23:59 UTC Sunday, 4 April 2026
            </p>
            <div className={styles.rateBoxes}>
              <div className={styles.rateBox}>
                <p className={styles.rateLabel}>Buy</p>
                <p className={styles.rateValue}>15.68</p>
                <p className={styles.rateCurrency}>South African Rand</p>
              </div>
              <div className={styles.rateBox}>
                <p className={styles.rateLabel}>Sell</p>
                <p className={styles.rateValue}>1.00</p>
                <p className={styles.rateCurrency}>United States Dollar</p>
              </div>
            </div>
            <p className={styles.applicableRate}>
              Applicable Rate 15.68 South African Rand 1 United States Dollar
            </p>
            <a href="#" className={styles.link}>
              View Legal Disclaimer
            </a>
          </div>
        </div>

        {/* ==================== SECURITY STATUS CARD ==================== */}
        <div className={styles.card}>
          <div className={styles.cardHeaderSimple}>
            <Lock className={styles.headerIcon} />
            <h3 className={styles.cardTitle}>Security Status</h3>
          </div>
          <div className={styles.cardBodyCenter}>
            <div className={styles.securityIcon}>
              <Shield className={styles.shieldIcon} />
            </div>
            <p className={styles.securityTitle}>
              Manage your trusted devices
            </p>
            <p className={styles.securitySubtitle}>
              Add or remove devices
            </p>
            <button type="button" className={styles.secondaryButton}>
              CHECK MY DEVICES
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
