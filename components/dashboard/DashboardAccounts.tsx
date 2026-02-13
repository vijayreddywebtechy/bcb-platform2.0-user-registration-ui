"use client";

import { Search, LayoutGrid, List } from "lucide-react";
import Image from "next/image";
import styles from "./DashboardAccounts.module.css";

const CURRENT_ACCOUNTS = [
  { name: "ABC Supplier Account", number: "6785 0454 7632", type: "Current Account", currency: "ZAR", latest: "12 638 345.00", available: "11 630 000.00" },
  { name: "MyMoBiz Account", number: "4988 0454 7632", type: "Current Account", currency: "ZAR", latest: "712 566.00", available: "712 566.00" },
  { name: "ABC Expense Account", number: "3821 0454 7632", type: "Current Account", currency: "ZAR", latest: "3 438 280.00", available: "3 438 280.00" },
  { name: "Business Current Account", number: "4656 0454 7632", type: "Current Account", currency: "ZAR", latest: "1 153 600.00", available: "1 153 600.00" },
];

const SAVINGS_ACCOUNTS = [
  { name: "Business MarketLink", number: "3822 0454 7690", type: "Savings Account", currency: "ZAR", latest: "470 500.00", available: "470 500.00" },
  { name: "Business PureSave Account", number: "4722 0454 7685", type: "Savings Account", currency: "ZAR", latest: "7 600 400.00", available: "7 600 400.00" },
];

function AccountRow({
  name,
  number,
  type,
  currency,
  latest,
  available,
  iconPath,
}: {
  name: string;
  number: string;
  type: string;
  currency: string;
  latest: string;
  available: string;
  iconPath: string;
}) {
  return (
    <div className={styles.accountRow}>
      <div className={styles.accountLeft}>
        <div className={styles.accountIcon}>
          <Image src={iconPath} alt="" width={24} height={24} />
        </div>
        <div className={styles.accountInfo}>
          <p className={styles.accountName}>
            {name}
          </p>
          <p className={styles.accountNumber}>
            {number}
          </p>
        </div>
      </div>
      <div className={styles.accountRight}>
        <div className={styles.accountColumn}>
          <p className={styles.accountLabel}>
            {currency}
          </p>
          <p className={styles.accountValue}>
            {type}
          </p>
        </div>
        <div className={styles.accountColumn}>
          <p className={styles.accountLabel}>
            Latest
          </p>
          <p className={styles.accountValue}>
            {latest}
          </p>
        </div>
        <div className={styles.accountColumn}>
          <p className={styles.accountLabel}>
            Available
          </p>
          <p className={styles.accountValue}>
            {available}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DashboardAccounts() {
  return (
    <section className={styles.accountsSection}>
      {/* Header Section */}
      <div className={styles.mainHeader}>
        <div className={styles.mainTitleWrapper}>
          <Image
            src="/assets/images/icons/icn_account_tile.svg"
            alt=""
            width={24}
            height={24}
            className={styles.mainTitleIcon}
          />
          <h2 className={styles.mainSectionTitle}>Business accounts</h2>
        </div>
      </div>

      {/* Filter Section */}
      <div className={styles.filterSection}>
        <div className={styles.filterLeft}>
          <select className={styles.selectInput}>
            <option>ZAR</option>
          </select>
          <select className={`${styles.selectInput} ${styles.selectWide}`}>
            <option>All Accounts</option>
          </select>
        </div>
        <div className={styles.filterRight}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="search"
              placeholder="Search accounts"
              className={styles.searchInput}
            />
          </div>
          <div className={styles.viewToggle}>
            <button type="button" className={`${styles.viewButton} ${styles.viewButtonActive}`}>
              <List className={styles.viewIcon} />
            </button>
            <button type="button" className={`${styles.viewButton} ${styles.viewButtonInactive}`}>
              <LayoutGrid className={styles.viewIcon} />
            </button>
          </div>
        </div>
      </div>

      {/* Current Accounts Section */}
      <div className={styles.accountSection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>
            Current Accounts
          </h3>
          <span className={styles.badge}>
            {CURRENT_ACCOUNTS.length}
          </span>
        </div>
        {CURRENT_ACCOUNTS.map((acc) => (
          <AccountRow key={acc.number} {...acc} iconPath="/assets/images/icons/icn_wallet.svg" />
        ))}
      </div>

      {/* Savings Accounts Section */}
      <div className={styles.accountSectionLast}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>
            Savings Accounts
          </h3>
          <span className={styles.badge}>
            {SAVINGS_ACCOUNTS.length}
          </span>
        </div>
        {SAVINGS_ACCOUNTS.map((acc) => (
          <AccountRow key={acc.number} {...acc} iconPath="/assets/images/icons/icn_cash_coins_and_note.svg" />
        ))}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <p className={styles.footerText}>
          Displaying {CURRENT_ACCOUNTS.length + SAVINGS_ACCOUNTS.length} of {CURRENT_ACCOUNTS.length + SAVINGS_ACCOUNTS.length}
        </p>
        <button
          type="button"
          className={styles.viewAllButton}
        >
          VIEW ALL
        </button>
      </div>
    </section>
  );
}
