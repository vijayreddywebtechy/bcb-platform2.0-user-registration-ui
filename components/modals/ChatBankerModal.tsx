"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./ChatBankerModal.module.css";

interface ChatBankerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatBankerModal({
  isOpen,
  onClose,
}: ChatBankerModalProps) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Sending message:", { subject, message });
    // Reset form
    setSubject("");
    setMessage("");
    onClose();
  };

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
          {/* Icon Section */}
          <div className={styles.iconSection}>
            <div className={styles.iconWrapper}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M4 9C4 7.34315 5.34315 6 7 6H25C26.6569 6 28 7.34315 28 9V23C28 24.6569 26.6569 26 25 26H7C5.34315 26 4 24.6569 4 23V9ZM7 8C6.44772 8 6 8.44772 6 9V9.8L16 16.15L26 9.8V9C26 8.44772 25.5523 8 25 8H7ZM26 11.8L16.9091 17.3L16 17.9L15.0909 17.3L6 11.8V23C6 23.5523 6.44772 24 7 24H25C25.5523 24 26 23.5523 26 23V11.8Z" fill="white"/>
              </svg>
            </div>
            <h3 className={styles.heading}>Get in touch</h3>
            <p className={styles.description}>
              Provide details about what you need and a banker will get in touch with you shortly.
            </p>
          </div>

          {/* Banker Profile */}
          <div className={styles.bankerProfile}>
            <div className={styles.avatar}>JK</div>
            <div className={styles.bankerInfo}>
              <h4 className={styles.bankerName}>Jonathan Khumalo</h4>
              <p className={styles.bankerRole}>Relationship manager</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Subject Field */}
            <div className={styles.formGroup}>
              <label htmlFor="subject" className={styles.label}>
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Add a subject"
                className={styles.input}
                required
              />
            </div>

            {/* Message Field */}
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here"
                className={styles.textarea}
                rows={5}
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.submitButton}>
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
