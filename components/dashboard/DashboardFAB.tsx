"use client";

import { User } from "lucide-react";
import Image from "next/image";
import styles from "./DashboardFAB.module.css";

export default function DashboardFAB() {
  return (
    <div className={styles.fabContainer}>
      <button
        type="button"
        className={styles.profileButton}
        aria-label="Accessibility or profile"
      >
        <User className={styles.profileIcon} />
      </button>
      <button
        type="button"
        className={styles.chatButton}
        aria-label="Chat"
      >
        <Image
          src="/assets/images/icons/icn_chat.svg"
          alt="Chat"
          width={24}
          height={24}
          className={styles.chatIcon}
        />
      </button>
    </div>
  );
}
