"use client";

import DashboardWelcome from "./DashboardWelcome";
import DashboardActions from "./DashboardActions";
import styles from "./DashboardWelcome.module.css";

export default function DashboardHero() {
  return (
    <div className={styles.gradientContainer}>
      <DashboardWelcome />
      <div className="px-6 md:px-[72px] pt-8 pb-12 max-w-[1440px] mx-auto">
        <DashboardActions />
      </div>
    </div>
  );
}
