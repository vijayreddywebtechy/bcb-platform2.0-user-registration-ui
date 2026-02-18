"use client";

import { useState } from "react";
import Image from "next/image";
import icnClick from "@/assets/images/icons/icn_click.svg";
import icnDocumentMoney from "@/assets/images/icons/icn_document_money.svg";
import icnTools from "@/assets/images/icons/icn_tools.svg";
import icnPeopleSecure from "@/assets/images/icons/icn_people_1_secure.svg";
import icnCallCentre from "@/assets/images/icons/icn_call-centre.svg";
import icnPaint from "@/assets/images/icons/icn_paint.svg";
import icnChevronRight from "@/assets/images/icons/icn_chevron_right.svg";
import styles from "./DashboardMyLinks.module.css";
import CustomizeAppearanceModal from "./CustomizeAppearanceModal";

/**
 * Quick action links configuration
 * Each link represents a key action available in the dashboard
 */
const QUICK_ACTIONS = [
  {
    id: 1,
    key: "documents",
    label: "Documents",
    description: "Statements & Bank Letters",
    icon: icnDocumentMoney,
  },
  {
    id: 2,
    key: "queryTracker",
    label: "Query Tracker",
    description: "Track Queries",
    icon: icnTools,
  },
  {
    id: 3,
    key: "accounts",
    label: "Roles & Permissions",
    description: "Invite & Set User Access",
    icon: icnPeopleSecure,
  },
  {
    id: 4,
    key: "helpCenter",
    label: "Help Centre",
    description: "Contacts & Support Services",
    icon: icnCallCentre,
  },
  {
    id: 5,
    key: "customizeAppearance",
    label: "Customise Appearance",
    description: "Personalise Layout & Look",
    icon: icnPaint,
  },
];

/**
 * DashboardMyLinks Component
 * 
 * Displays a card-based list of quick action links for the user.
 * Each link includes an icon, title, description, and navigation chevron.
 * Features an "Edit Links" button for customization.
 * 
 * @returns {JSX.Element} The My Links section component
 */
export default function DashboardMyLinks() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditLinks = () => {
    console.log("Edit Links clicked");
    setIsModalOpen(true);
  };

  return (
    <>
      <section className={styles.quickActionsSection}>
      {/* Header Section - Contains title with icon */}
      <div className={styles.header}>
        <div className={styles.headerItems}>
          <Image
            src={icnClick}
            alt="Quick actions icon"
            width={24}
            height={24}
            className={styles.titleIcon}
          />
          <div className={styles.headerDescriptions}>
            <h2 className={styles.sectionTitle}>My links</h2>
          </div>
        </div>
      </div>

      {/* Content Area - Contains all quick action links */}
      <div className={styles.contentArea}>
        <ul className={styles.linksList}>
          {QUICK_ACTIONS.map((action) => (
            <li key={action.id}>
              <a 
                href="#" 
                className={styles.quickAction}
                onClick={(e) => {
                  e.preventDefault();
                  if (action.key === "customizeAppearance") {
                    handleEditLinks();
                  } else {
                    console.log(`Clicked: ${action.label}`);
                  }
                }}
              >
                {/* Icon and text content */}
                <div className={styles.actionContent}>
                  <Image
                    src={action.icon}
                    alt={`${action.label} icon`}
                    width={24}
                    height={24}
                    className={styles.actionIcon}
                  />
                  <div className={styles.textArea}>
                    <p className={styles.actionTitle}>{action.label}</p>
                    <p className={styles.actionDescription}>{action.description}</p>
                  </div>
                </div>
                {/* Navigation chevron */}
                <Image
                  src={icnChevronRight}
                  alt="Navigate"
                  width={20}
                  height={20}
                  className={styles.chevronIcon}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Edit Links Button */}
        <div className={styles.editLinksContainer}>
          <button type="button" className={styles.textLink} onClick={handleEditLinks}>
            <span className={styles.editLinksText}>EDIT LINKS</span>
            <Image
              src={icnChevronRight}
              alt="Edit"
              width={14}
              height={14}
              className={styles.editChevron}
            />
          </button>
        </div>
      </div>
    </section>

    {/* Customize Appearance Modal */}
    <CustomizeAppearanceModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    />
    </>
  );
}
