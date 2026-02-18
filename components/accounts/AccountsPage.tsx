"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ChevronRight, LayoutGrid, List } from "lucide-react";
import icnHomeWhite from "@/assets/images/icons/icn_home_white.svg";
import styles from "./AccountsPage.module.css";

// Mock account data
const CURRENT_ACCOUNTS = [
  {
    id: 1,
    name: "ABC Supplier Account",
    number: "6785 0454 7632",
    currency: "ZAR",
    type: "Current Account",
    latest: "12 638 345.00",
    available: "11 630 000.00",
    icon: "/assets/images/icons/icn_wallet.svg",
  },
  {
    id: 2,
    name: "MyMoBiz Account",
    number: "4988 0454 7632",
    currency: "ZAR",
    type: "Current Account",
    latest: "712 566.00",
    available: "712 566.00",
    icon: "/assets/images/icons/icn_wallet.svg",
  },
  {
    id: 3,
    name: "ABC Expense Account",
    number: "3821 0454 7632",
    currency: "ZAR",
    type: "Current Account",
    latest: "3 438 280.00",
    available: "3 438 280.00",
    icon: "/assets/images/icons/icn_wallet.svg",
  },
  {
    id: 4,
    name: "Business Current Account",
    number: "4656 0454 7632",
    currency: "ZAR",
    type: "Current Account",
    latest: "1 153 600.00",
    available: "1 153 600.00",
    icon: "/assets/images/icons/icn_wallet.svg",
  },
];

const SAVINGS_ACCOUNTS = [
  {
    id: 5,
    name: "Business MarketLink",
    number: "3822 0454 7690",
    currency: "ZAR",
    type: "Savings Account",
    latest: "470 500.00",
    available: "470 500.00",
    icon: "/assets/images/icons/icn_cash_coins_and_note.svg",
  },
  {
    id: 6,
    name: "Business PureSave Account",
    number: "4722 0454 7685",
    currency: "ZAR",
    type: "Savings Account",
    latest: "7 600 400.00",
    available: "7 600 400.00",
    icon: "/assets/images/icons/icn_cash_coins_and_note.svg",
  },
];

type ViewMode = "list" | "grid";

export default function AccountsPage() {
  const [currency, setCurrency] = useState("ZAR");
  const [accountType, setAccountType] = useState("All Accounts");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const totalAccounts = CURRENT_ACCOUNTS.length + SAVINGS_ACCOUNTS.length;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerSection}>
        <div className={styles.container}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb}>
            <Link href="/dashboard" className={styles.breadcrumbLink}>
              <Image 
                src={icnHomeWhite} 
                alt="Home" 
                width={16} 
                height={16}
                className={styles.homeIcon}
              />
              Dashboard
            </Link>
            <ChevronRight className={styles.breadcrumbIcon} />
            <span className={styles.breadcrumbCurrent}>Accounts</span>
          </nav>

          {/* Page Header */}
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Accounts</h1>
            <p className={styles.pageSubtitle}>Get your accounts and balances</p>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.container}>
        {/* Filters and Controls */}
        <div className={styles.controls}>
          <div className={styles.filters}>
            {/* Currency Dropdown */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className={styles.select}
            >
              <option value="ZAR">ZAR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>

            {/* Account Type Dropdown */}
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className={styles.select}
            >
              <option value="All Accounts">All Accounts</option>
              <option value="Current Account">Current Account</option>
              <option value="Savings Account">Savings Account</option>
              <option value="Credit Card">Credit Card</option>
            </select>

            {/* Search */}
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search accounts"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          {/* View Toggle */}
          <div className={styles.viewToggle}>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? styles.viewButtonActive : styles.viewButton}
              aria-label="List view"
            >
              <List size={20} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? styles.viewButtonActive : styles.viewButton}
              aria-label="Grid view"
            >
              <LayoutGrid size={20} />
            </button>
          </div>
        </div>

        {/* Current Accounts Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Current Accounts
              <span className={styles.badge}>{CURRENT_ACCOUNTS.length}</span>
            </h2>
          </div>

          <div className={viewMode === "list" ? styles.accountsList : styles.accountsGrid}>
            {CURRENT_ACCOUNTS.map((account) => (
              <div key={account.id} className={viewMode === "list" ? styles.accountCard : styles.accountCardGrid}>
                <div className={styles.accountIcon}>
                  <Image
                    src={account.icon}
                    alt="Account"
                    width={24}
                    height={24}
                  />
                </div>
                <div className={styles.accountDetails}>
                  {viewMode === "list" ? (
                    <>
                      <div className={styles.accountRow}>
                        <div>
                          <Link href={`/accounts/${account.id}`} className={styles.accountNameLink}>
                            <h3 className={styles.accountName}>{account.name}</h3>
                          </Link>
                          <p className={styles.accountNumber}>{account.number}</p>
                        </div>
                        <div className={styles.accountBalances}>
                          <div className={styles.balanceItem}>
                            <span className={styles.balanceLabel}>Latest</span>
                            <span className={styles.balanceAmount}>{account.latest}</span>
                          </div>
                          <div className={styles.balanceItem}>
                            <span className={styles.balanceLabel}>Available</span>
                            <span className={styles.balanceAmount}>{account.available}</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.accountMeta}>
                        <span className={styles.metaItem}>{account.type}</span>
                        <span className={styles.metaDivider}>•</span>
                        <span className={styles.metaItem}>{account.currency}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link href={`/accounts/${account.id}`} className={styles.accountNameLink}>
                        <h3 className={styles.accountName}>{account.name}</h3>
                      </Link>
                      <p className={styles.accountNumber}>{account.number}</p>
                      <div className={styles.accountMeta}>
                        <span className={styles.metaItem}>{account.type}</span>
                        <span className={styles.metaDivider}>•</span>
                        <span className={styles.metaItem}>{account.currency}</span>
                      </div>
                      <div className={styles.balanceItemGrid}>
                        <span className={styles.balanceLabel}>Latest</span>
                        <span className={styles.balanceAmount}>{account.latest}</span>
                      </div>
                      <div className={styles.balanceItemGrid}>
                        <span className={styles.balanceLabel}>Available</span>
                        <span className={styles.balanceAmount}>{account.available}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Savings Accounts Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Savings Accounts
              <span className={styles.badge}>{SAVINGS_ACCOUNTS.length}</span>
            </h2>
          </div>

          <div className={viewMode === "list" ? styles.accountsList : styles.accountsGrid}>
            {SAVINGS_ACCOUNTS.map((account) => (
              <div key={account.id} className={viewMode === "list" ? styles.accountCard : styles.accountCardGrid}>
                <div className={styles.accountIcon}>
                  <Image
                    src={account.icon}
                    alt="Account"
                    width={24}
                    height={24}
                  />
                </div>
                <div className={styles.accountDetails}>
                  {viewMode === "list" ? (
                    <>
                      <div className={styles.accountRow}>
                        <div>
                          <Link href={`/accounts/${account.id}`} className={styles.accountNameLink}>
                            <h3 className={styles.accountName}>{account.name}</h3>
                          </Link>
                          <p className={styles.accountNumber}>{account.number}</p>
                        </div>
                        <div className={styles.accountBalances}>
                          <div className={styles.balanceItem}>
                            <span className={styles.balanceLabel}>Latest</span>
                            <span className={styles.balanceAmount}>{account.latest}</span>
                          </div>
                          <div className={styles.balanceItem}>
                            <span className={styles.balanceLabel}>Available</span>
                            <span className={styles.balanceAmount}>{account.available}</span>
                          </div>
                        </div>
                      </div>
                      <div className={styles.accountMeta}>
                        <span className={styles.metaItem}>{account.type}</span>
                        <span className={styles.metaDivider}>•</span>
                        <span className={styles.metaItem}>{account.currency}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link href={`/accounts/${account.id}`} className={styles.accountNameLink}>
                        <h3 className={styles.accountName}>{account.name}</h3>
                      </Link>
                      <p className={styles.accountNumber}>{account.number}</p>
                      <div className={styles.accountMeta}>
                        <span className={styles.metaItem}>{account.type}</span>
                        <span className={styles.metaDivider}>•</span>
                        <span className={styles.metaItem}>{account.currency}</span>
                      </div>
                      <div className={styles.balanceItemGrid}>
                        <span className={styles.balanceLabel}>Latest</span>
                        <span className={styles.balanceAmount}>{account.latest}</span>
                      </div>
                      <div className={styles.balanceItemGrid}>
                        <span className={styles.balanceLabel}>Available</span>
                        <span className={styles.balanceAmount}>{account.available}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div className={styles.footer}>
          <p className={styles.footerCount}>
            Displaying {totalAccounts} of {totalAccounts}
          </p>
          <button type="button" className={styles.viewAllButton}>
            VIEW ALL
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}
