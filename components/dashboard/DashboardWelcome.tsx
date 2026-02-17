"use client";

import Image from "next/image";
import icnHome from "@/assets/images/icons/icn_home_white.svg";
import icnBuilding from "@/assets/images/icons/icn_building.svg";
import icnClockPast from "@/assets/images/icons/icn_clock_past.svg";
import styles from "./DashboardWelcome.module.css";

const DUMMY = {
  breadcrumb: "Dashboard",
  greeting: "Welcome, Kobus",
  role: "ABC Architects (Pty) Ltd - Profile Administrator",
  lastSignIn: "Last Signed In - 27 Oct 2025, 12:35 PM",
};

export default function DashboardWelcome() {
  return (
    <div className={styles.dashboardHeader}>
      <div>
        <div className={styles.breadcrumb}>
          <Image
            src={icnHome}
            alt="Home"
            width={16}
            height={16}
            className={styles.homeIcon}
          />
          {DUMMY.breadcrumb}
        </div>
        <h1 className={styles.greeting}>{DUMMY.greeting}</h1>
        <div className={styles.role}>
          <Image
            src={icnBuilding}
            alt="Building"
            width={16}
            height={16}
            className={styles.buildingIcon}
          />
          {DUMMY.role}
        </div>
      </div>
      <div className={styles.lastSignIn}>
        <Image
          src={icnClockPast}
          alt="Clock"
          width={16}
          height={16}
          className={styles.clockIcon}
        />
        {DUMMY.lastSignIn}
      </div>
    </div>
  );
}
