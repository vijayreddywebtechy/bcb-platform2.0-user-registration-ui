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

import { useState } from "react";
import Image from "next/image";
import icnContactsBook from "@/assets/images/icons/icn_contacts_book.svg";
import icnChat from "@/assets/images/icons/icn_chat_white.svg";
import ContactBankerModal from "@/components/modals/ContactBankerModal";
import ChatBankerModal from "@/components/modals/ChatBankerModal";
import styles from "./DashboardFloatingActions.module.css";

export default function DashboardFloatingActions() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  return (
    <>
      <div className={styles.floatingActions}>
        {/* Contacts Book Button */}
        <button
          type="button"
          className={`${styles.actionButton} ${styles.actionButtonTop}`}
          aria-label="Open contacts book"
          title="Contacts Book"
          onClick={() => setIsContactModalOpen(true)}
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
          onClick={() => setIsChatModalOpen(true)}
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

      {/* Modals */}
      <ContactBankerModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
      <ChatBankerModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
      />
    </>
  );
}
