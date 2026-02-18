"use client";

import styles from "./DashboardFooter.module.css";

export default function DashboardFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          <a href="#" className={styles.link}>
            CONDITIONS OF ACCESS
          </a>
          <a href="#" className={styles.link}>
            DISCLAIMER
          </a>
          <a href="#" className={styles.link}>
            PRIVACY STATEMENT
          </a>
        </div>
        <p className={styles.text}>
          Standard Bank is a licensed financial services provider in terms of the Financial Advisory and Intermediary Services Act and a registered credit provider in terms of the National Credit Act, registration number NCRCP15.
        </p>
      </div>
    </footer>
  );
}
