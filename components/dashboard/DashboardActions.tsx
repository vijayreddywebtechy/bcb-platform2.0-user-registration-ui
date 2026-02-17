"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import icnPeopleSecure from "@/assets/images/icons/icn_people_1_secure.svg";
import icnPaint from "@/assets/images/icons/icn_paint.svg";
import icnDocumentDown from "@/assets/images/icons/icn_document_down.svg";
import icnBuilding from "@/assets/images/icons/icn_building.svg";
import icnChevronLeft from "@/assets/images/icons/icn_chevron_left.svg";
import icnChevronRight from "@/assets/images/icons/icn_chevron_right.svg";
import styles from "./DashboardActions.module.css";

const ACTIONS = [
  {
    title: "Roles & Permissions",
    description:
      "Invite, configure, approve and manage your teams access to your business profile.",
    icon: icnPeopleSecure,
  },
  {
    title: "Customise Appearance",
    description:
      "Personalise your experience by configuring your dashboards layout, look and more.",
    icon: icnPaint,
  },
  {
    title: "Download Documents",
    description:
      "Download or email your official stamped bank letters and statements in PDF format.",
    icon: icnDocumentDown,
  },
  {
    title: "Confirm Business Details",
    description:
      "Confirm your business details, notification preferences and trust devices.",
    icon: icnBuilding,
  },
];

export default function DashboardActions() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = 322; // card width (306px) + gap (16px)
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = 322; // card width (306px) + gap (16px)
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className={styles.actionsSection}>
      {/* Header with navigation arrows */}
      <div className={styles.header}>
        <h2 className={styles.heading}>Next best actions</h2>
        <div className={styles.navigation}>
          <button
            type="button"
            className={styles.arrowButton}
            aria-label="Previous"
            onClick={handleScrollLeft}
          >
            <Image
              src={icnChevronLeft}
              alt="Previous"
              width={16}
              height={16}
              className={styles.arrowIcon}
            />
          </button>
          <button
            type="button"
            className={styles.arrowButton}
            aria-label="Next"
            onClick={handleScrollRight}
          >
            <Image
              src={icnChevronRight}
              alt="Next"
              width={16}
              height={16}
              className={styles.arrowIcon}
            />
          </button>
        </div>
      </div>

      {/* Cards */}
      <div ref={scrollContainerRef} className={styles.cardsContainer}>
        {ACTIONS.map((item) => (
          <div key={item.title} className={styles.card}>
            <div className={styles.iconContainer}>
              <Image
                src={item.icon}
                alt={item.title}
                width={24}
                height={24}
                className={styles.icon}
              />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDescription}>{item.description}</p>
            </div>
            <div className={styles.cardArrow}>
              <ArrowRight className={styles.cardArrowIcon} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
