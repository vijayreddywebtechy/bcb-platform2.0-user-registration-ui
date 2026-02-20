"use client";

import Image from "next/image";
import styles from "./ContactBankerModal.module.css";

interface ContactBankerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactBankerModal({
  isOpen,
  onClose,
}: ContactBankerModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Contact your banker</h2>
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

        {/* Content */}
        <div className={styles.content}>
          {/* Banker Profile */}
          <div className={styles.bankerProfile}>
            <div className={styles.avatar}>JK</div>
            <div className={styles.bankerInfo}>
              <h3 className={styles.bankerName}>Jonathan Khumalo</h3>
              <p className={styles.bankerRole}>Relationship manager</p>
            </div>
          </div>

          {/* Contact Options */}
          <div className={styles.contactOptions}>
            {/* Email */}
            <a href="mailto:jane.khumalo@sbg.co.za" className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M3 7C3 5.34315 4.34315 4 6 4H18C19.6569 4 21 5.34315 21 7V17C21 18.6569 19.6569 20 18 20H6C4.34315 20 3 18.6569 3 17V7ZM6 6C5.44772 6 5 6.44772 5 7V7.6L12 12.1L19 7.6V7C19 6.44772 18.5523 6 18 6H6ZM19 9.4L12.7071 13.4L12 13.9L11.2929 13.4L5 9.4V17C5 17.5523 5.44772 18 6 18H18C18.5523 18 19 17.5523 19 17V9.4Z" fill="#0062E1"/>
                </svg>
              </div>
              <div className={styles.contactDetails}>
                <span className={styles.contactText}>jane.khumalo@sbg.co.za</span>
              </div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.chevron}>
                <path d="M9 6L15 12L9 18" stroke="#0062E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Phone */}
            <a href="tel:27277182728281" className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M5 4C5 2.89543 5.89543 2 7 2H9C9.55228 2 10 2.44772 10 3V7C10 7.55228 9.55228 8 9 8H7V9C7 13.4183 10.5817 17 15 17H16V15C16 14.4477 16.4477 14 17 14H21C21.5523 14 22 14.4477 22 15V17C22 18.1046 21.1046 19 20 19H17C9.26801 19 3 12.732 3 5V4H5ZM7 6H8V4H7V6ZM18 16V18H20V16H18Z" fill="#0062E1"/>
                </svg>
              </div>
              <div className={styles.contactDetails}>
                <span className={styles.contactText}>27 277182 72881</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
