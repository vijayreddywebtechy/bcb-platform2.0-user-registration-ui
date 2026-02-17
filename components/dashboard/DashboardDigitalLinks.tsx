/**
 * DashboardDigitalLinks Component
 * 
 * "My digital platforms" section displaying external banking platform links
 * Features three tiles with hover effects and external link icons
 * 
 * All typography uses Benton Sans Pro font family
 * 
 * @returns {JSX.Element} The Digital Hub Links section
 */
"use client";

import Image from "next/image";
import icnLinkOut from "@/assets/images/icons/icn_link_out.svg";
import icnResponsive from "@/assets/images/icons/icn_responsive.svg";
import styles from "./DashboardDigitalLinks.module.css";

/**
 * Digital platform tile data
 * Each represents an external banking platform
 */
const DIGITAL_PLATFORMS = [
  {
    id: 1,
    prefix: "I want to transact on",
    title: "Online Banking for Business",
    status: "Sign in automatically",
    link: "#",
  },
  {
    id: 2,
    prefix: "Submit trade instructions",
    title: "TradeOnline",
    status: "Sign in automatically",
    link: "#",
  },
  {
    id: 3,
    prefix: "I want to transact on",
    title: "Business Online",
    status: "You will need to sign in again",
    link: "#",
  },
];

/**
 * Main DashboardDigitalLinks Component
 */
export default function DashboardDigitalLinks() {
  return (
    <section className={styles.digitalLinksSection}>
      {/* Section Header */}
      <div className={styles.sectionHeader}>
        <div className={styles.titleWrapper}>
          <Image
            src={icnLinkOut}
            alt="Digital links"
            width={24}
            height={24}
            className={styles.titleIcon}
          />
          <h2 className={styles.mainTitle}>My digital platforms</h2>
        </div>
      </div>

      {/* Digital Platforms Grid - 1296px width, 248px height */}
      <div className={styles.platformsContainer}>
        <div className={styles.platformsGrid}>
          {DIGITAL_PLATFORMS.map((platform) => (
            <a
              key={platform.id}
              href={platform.link}
              className={styles.digiHubTile}
              aria-label={`Open ${platform.title}`}
            >
              {/* Top Section - Icons */}
              <div className={styles.tileTop}>
                <Image
                  src={icnLinkOut}
                  alt="External link"
                  width={20}
                  height={20}
                  className={styles.linkIcon}
                />
                <Image
                  src={icnResponsive}
                  alt="Responsive"
                  width={24}
                  height={24}
                  className={styles.responsiveIcon}
                />
              </div>

              {/* Content Section */}
              <div className={styles.tileContent}>
                {/* Prefix Text - "I want to transact on" */}
                <p className={styles.prefixText}>{platform.prefix}</p>
                
                {/* Platform Title - "Online Banking for Business" */}
                <h3 className={styles.platformTitle}>{platform.title}</h3>
              </div>

              {/* Bottom Section - Status */}
              <div className={styles.tileBottom}>
                <p className={styles.statusText}>{platform.status}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
