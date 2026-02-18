/**
 * DashboardFloatingActions Component
 * 
 * Displays floating action buttons for quick access to:
 * - Contact book
 * - Chat/support
 * 
 * These buttons are positioned to the side of the My Links section
 * 
 * @returns {JSX.Element} The floating action buttons component
 */
"use client";

import Image from "next/image";
import icnContactsBook from "@/assets/images/icons/icn_contacts_book.svg";
import icnChat from "@/assets/images/icons/icn_chat_white.svg";
import styles from "./DashboardFloatingActions.module.css";

export default function DashboardFloatingActions() {
  return (
    <div className={styles.floatingActions}>
      {/* Contacts Book Button */}
      <button
        type="button"
        className={`${styles.actionButton} ${styles.actionButtonTop}`}
        aria-label="Open contacts book"
        title="Contacts Book"
      >
        <Image
          src={icnContactsBook}
          alt="Contacts book"
          width={24}
          height={24}
          className={styles.actionIcon}
        />
      </button>

      {/* Chat Button */}
      <button
        type="button"
        className={`${styles.actionButton} ${styles.actionButtonBottom}`}
        aria-label="Open chat"
        title="Chat"
      >
        <Image
          src={icnChat}
          alt="Chat"
          width={24}
          height={24}
          className={styles.actionIcon}
        />
      </button>
    </div>
  );
}
