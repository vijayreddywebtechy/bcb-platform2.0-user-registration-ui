"use client";

import { FileText, Settings, Users, Headphones, Shirt, ChevronRight } from "lucide-react";
import Image from "next/image";
import styles from "./DashboardMyLinks.module.css";

const MY_LINKS = [
  { label: "Documents", sub: "Statements & Bank Letters", icon: FileText },
  { label: "Query Tracker", sub: "Track Queries", icon: Settings },
  { label: "Roles & Permissions", sub: "Invite & Set User Access", icon: Users },
  { label: "Help Centre", sub: "Contacts & Support Services", icon: Headphones },
  { label: "Customise Appearance", sub: "Personalise Layout & Look", icon: Shirt },
];

export default function DashboardMyLinks() {
  return (
    <section className={styles.myLinksSection}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <Image
            src="/assets/images/icons/icn_click.svg"
            alt=""
            width={24}
            height={24}
            className={styles.titleIcon}
          />
          <h2 className={styles.sectionTitle}>My links</h2>
        </div>
        <button
          type="button"
          className={styles.editButton}
        >
          EDIT LINKS
        </button>
      </div>
      <ul className={styles.linksList}>
        {MY_LINKS.map((item) => (
          <li key={item.label}>
            <a href="#" className={styles.linkItem}>
              <div className={styles.linkContent}>
                <item.icon className={styles.linkIcon} />
                <div className={styles.linkTextWrapper}>
                  <p className={styles.linkLabel}>{item.label}</p>
                  <p className={styles.linkSub}>{item.sub}</p>
                </div>
              </div>
              <ChevronRight className={styles.chevronIcon} />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
