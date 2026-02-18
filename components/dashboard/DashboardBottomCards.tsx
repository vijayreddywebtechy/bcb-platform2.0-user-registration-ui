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
import styles from "./DashboardBottomCards.module.css";
import icnBoxTrack from "@/assets/images/icons/icn_box_track.svg";
import icnForex from "@/assets/images/icons/icn_forex.svg";
import icnPeopleSecure from "@/assets/images/icons/icn_people_1_secure-1.svg";
import securityUpgradeApp from "@/assets/images/icons/security_upgrade_app.svg";
import solarWorkerImage from "@/assets/images/icons/image 337.png";

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
              <Image 
                src={icnBoxTrack} 
                alt="Business Offers" 
                width={24} 
                height={24} 
                className={styles.headerIcon} 
              />
              <h3 className={styles.cardTitle}>Business Offers</h3>
            </div>
            <span className={styles.badge}>Available offers 1</span>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.imageContainer}>
              <Image 
                src={solarWorkerImage}
                alt="Solar energy worker with tablet"
                fill
                className={styles.cardImage}
              />
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
            <Image 
              src={icnForex} 
              alt="FX Rate Calculator" 
              width={24} 
              height={24} 
              className={styles.headerIcon} 
            />
            <h3 className={styles.cardTitle}>FX Rate Calculator</h3>
          </div>
          <div className={styles.cardBody}>
            <p className={styles.cardText}>
              Need forex? Get an idea of how much it could cost.
            </p>
            <p className={styles.cardSubtext}>
              23:59 UTC - Sunday, 4 April 2026
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
              Applicable Rate<br />
              <strong>15.68 South African Rand</strong><br />
              <strong>1 United States Dollar</strong>
            </p>
            <a href="#" className={styles.link}>
              • View Legal Disclaimer
            </a>
          </div>
        </div>

        {/* ==================== SECURITY STATUS CARD ==================== */}
        <div className={styles.card}>
          <div className={styles.cardHeaderSimple}>
            <Image 
              src={icnPeopleSecure} 
              alt="Security Status" 
              width={24} 
              height={24} 
              className={styles.headerIcon} 
            />
            <h3 className={styles.cardTitle}>Security Status</h3>
          </div>
          <div className={styles.cardBodyCenter}>
            <div className={styles.securityIconWrapper}>
              <Image 
                src={securityUpgradeApp} 
                alt="Security devices illustration" 
                width={180}
                height={180}
                className={styles.securityIllustration} 
              />
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
