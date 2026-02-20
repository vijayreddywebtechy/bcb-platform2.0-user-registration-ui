"use client";

import Image from "next/image";
import styles from "./ExitBusinessHubModal.module.css";

interface ExitBusinessHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeave: () => void;
}

export default function ExitBusinessHubModal({
  isOpen,
  onClose,
  onLeave,
}: ExitBusinessHubModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Exit Business Hub</h2>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close"
          >
            <Image
              src="/assets/images/icons/icn_close.svg"
              alt="Close"
              width={24}
              height={24}
            />
          </button>
        </div>

        {/* Icon and Content */}
        <div className={styles.content}>
          <div className={styles.iconWrapper}>
            <Image
              src="/assets/images/icons/icn_avatar_alert_blue.svg"
              alt="Alert"
              width={96}
              height={96}
            />
          </div>

          <h3 className={styles.heading}>Need to transact?</h3>
          <p className={styles.description}>
            Please note: You&apos;ll be redirected to Online Banking for Business
            and automatically logged out of the Business Hub
          </p>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            type="button"
            onClick={onClose}
            className={styles.stayButton}
          >
            STAY
          </button>
          <button
            type="button"
            onClick={onLeave}
            className={styles.leaveButton}
          >
            LEAVE
          </button>
        </div>
      </div>
    </div>
  );
}
