"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import sbBrandIcon from "@/assets/sb_brand_icon.png";
import icnSaLang from "@/assets/images/icons/icn_sa_lang_icon.png";
import icnTelescope from "@/assets/images/icons/icn_telescope_white.svg";
import icnCallCentre from "@/assets/images/icons/icn_call-centre_white.svg";
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
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = () => {
    console.log("Sign out clicked from dashboard");
    // Navigate to sign in page
    router.push("/auth/signin");
  };

  const handleProfileClick = () => {
    router.push("/manage-profile");
  };

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
              Explore Solutions
              <Image
                src={icnTelescope}
                alt="Explore Solutions"
                width={14}
                height={14}
                className={styles.topBarIcon}
              />
            </Link>
            <Link href="#" className={styles.topBarLink}>
              Help Centre
              <Image
                src={icnCallCentre}
                alt="Help Centre"
                width={16}
                height={16}
                className={styles.topBarIcon}
              />
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
            <Link 
              href="/dashboard" 
              className={pathname === '/dashboard' ? styles.navLinkActive : styles.navLink}
            >
              Dashboard <ChevronDown className={styles.chevronIcon} />
            </Link>
            <Link 
              href="/accounts" 
              className={pathname === '/accounts' ? styles.navLinkActive : styles.navLink}
            >
              Accounts
            </Link>
            <Link 
              href="/documents" 
              className={pathname === '/documents' ? styles.navLinkActive : styles.navLink}
            >
              Documents
            </Link>
            <Link 
              href="/query-tracker" 
              className={pathname === '/query-tracker' ? styles.navLinkActive : styles.navLink}
            >
              Query Tracker
            </Link>
            <Link 
              href="/business-profile" 
              className={`${styles.navLinkWithIcon} ${pathname === '/business-profile' ? styles.navLinkActive : styles.navLink}`}
            >
              Business Profile <ChevronDown className={styles.chevronIcon} />
            </Link>
          </div>
          <div className={styles.navActions}>
            <IconButtonWithTooltip
              icon="/assets/images/icons/icn_people_profile.svg"
              tooltip="Profile"
              onClick={handleProfileClick}
            />
            <IconButtonWithTooltip
              icon="/assets/images/icons/icn_building.svg"
              tooltip="Switch Profile"
            />
            <IconButtonWithTooltip
              icon="/assets/images/icons/icn_lock_closed.svg"
              hoverIcon="/assets/images/icons/icn_lock_open.svg"
              tooltip="Sign Out"
              onClick={handleSignOut}
            />
          </div>
        </div>
      </nav>
    </>
  );
}
