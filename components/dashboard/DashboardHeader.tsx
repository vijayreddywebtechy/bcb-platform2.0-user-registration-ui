"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ExternalLink,
  Lightbulb,
  Headphones,
  ChevronDown,
} from "lucide-react";
import sbBrandIcon from "@/assets/sb_brand_icon.png";
import icnSaLang from "@/assets/images/icons/icn_sa_lang_icon.png";
import styles from "./DashboardHeader.module.css";

// Icon button component with tooltip
function IconButtonWithTooltip({ 
  icon, 
  hoverIcon, 
  tooltip,
  onClick 
}: { 
  icon: string; 
  hoverIcon?: string; 
  tooltip: string;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={styles.iconButtonWrapper}>
      <button
        type="button"
        aria-label={tooltip}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        className={styles.iconButton}
      >
        <Image
          src={hoverIcon && isHovered ? hoverIcon : icon}
          alt={tooltip}
          width={24}
          height={24}
          className={styles.iconImage}
        />
      </button>
      
      {/* Tooltip */}
      {isHovered && (
        <div className={styles.tooltip}>
          <span className={styles.tooltipText}>
            {tooltip}
          </span>
        </div>
      )}
    </div>
  );
}

export default function DashboardHeader() {
  return (
    <>
      {/* Top bar - dark blue */}
      <header className={styles.header}>
        <div className={styles.topBar}>
          <div className={styles.topBarLeft}>
            <Link href="#" className={styles.topBarLink}>
              Personal <ExternalLink className={styles.topBarIconSmall} />
            </Link>
            <Link href="#" className={styles.topBarLink}>
              Corporate <ExternalLink className={styles.topBarIconSmall} />
            </Link>
          </div>
          <div className={styles.topBarRight}>
            <Link href="#" className={styles.topBarLink}>
              <Lightbulb className={styles.topBarIcon} />
              Explore Solutions
            </Link>
            <Link href="#" className={styles.topBarLink}>
              <Headphones className={styles.topBarIcon} />
              Help Centre
            </Link>
            <button type="button" className={styles.languageButton} aria-label="Language / Region">
              <Image
                src={icnSaLang}
                alt="South Africa"
                width={28}
                height={28}
                className={styles.languageImage}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Main nav - royal blue */}
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.navBrand}>
            <Image
              src={sbBrandIcon}
              alt="Business Hub"
              width={40}
              height={46}
              className={styles.brandLogo}
            />
            <span className={styles.brandText}>
              Business Hub
            </span>
          </div>
          <div className={styles.navLinks}>
            <Link href="#" className={styles.navLinkActive}>
              Dashboard <ChevronDown className={styles.chevronIcon} />
            </Link>
            <Link href="#" className={styles.navLink}>
              Accounts
            </Link>
            <Link href="#" className={styles.navLink}>
              Documents
            </Link>
            <Link href="#" className={styles.navLink}>
              Query Tracker
            </Link>
            <Link href="#" className={`${styles.navLinkWithIcon} ${styles.navLink}`}>
              Business Profile <ChevronDown className={styles.chevronIcon} />
            </Link>
          </div>
          <div className={styles.navActions}>
            <IconButtonWithTooltip
              icon="/assets/images/icons/icn_people_profile.svg"
              tooltip="Profile"
            />
            <IconButtonWithTooltip
              icon="/assets/images/icons/icn_building.svg"
              tooltip="Switch Profile"
            />
            <IconButtonWithTooltip
              icon="/assets/images/icons/icn_lock_closed.svg"
              hoverIcon="/assets/images/icons/icn_lock_open.svg"
              tooltip="Sign Out"
            />
          </div>
        </div>
      </nav>
    </>
  );
}
