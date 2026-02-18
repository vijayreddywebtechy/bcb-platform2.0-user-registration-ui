/**
 * DashboardAccounts Component
 * 
 * Business accounts section with dual view modes:
 * - List View: Horizontal rows showing account details
 * - Grid View: Card-based grid layout
 * 
 * Features:
 * - Toggle between list and grid views
 * - Filter by currency and account type
 * - Search functionality
 * - Displays Current and Savings accounts separately
 * 
 * All typography uses Benton Sans Pro font family
 * 
 * @returns {JSX.Element} The Business Accounts section
 */
"use client";

import { useState } from "react";
import { Search, LayoutGrid, List } from "lucide-react";
import Image from "next/image";
import styles from "./DashboardAccounts.module.css";

/**
 * Account data interface
 */
interface Account {
  name: string;
  number: string;
  type: string;
  currency: string;
  latest: string;
  available: string;
}

/**
 * Current accounts data
 */
const CURRENT_ACCOUNTS: Account[] = [
  { name: "ABC Supplier Account", number: "6785 0454 7632", type: "Current Account", currency: "ZAR", latest: "12 638 345.00", available: "11 630 000.00" },
  { name: "MyMoBiz Account", number: "4988 0454 7632", type: "Current Account", currency: "ZAR", latest: "712 566.00", available: "712 566.00" },
  { name: "ABC Expense Account", number: "3821 0454 7632", type: "Current Account", currency: "ZAR", latest: "3 438 280.00", available: "3 438 280.00" },
  { name: "Business Current Account", number: "4656 0454 7632", type: "Current Account", currency: "ZAR", latest: "1 153 600.00", available: "1 153 600.00" },
];

/**
 * Savings accounts data
 */
const SAVINGS_ACCOUNTS: Account[] = [
  { name: "Business MarketLink", number: "3822 0454 7690", type: "Savings Account", currency: "ZAR", latest: "470 500.00", available: "470 500.00" },
  { name: "Business PureSave Account", number: "4722 0454 7685", type: "Savings Account", currency: "ZAR", latest: "7 600 400.00", available: "7 600 400.00" },
];

/**
 * AccountRow Component - Table Row
 * Renders a single account in table format
 */
function AccountRow({
  name,
  number,
  type,
  currency,
  latest,
  available,
  iconPath,
}: Account & { iconPath: string }) {
  return (
    <tr className={styles.tableRow}>
      <td className={styles.tableCell}>
        <div className={styles.accountIcon}>
          <Image src={iconPath} alt={`${name} icon`} width={24} height={24} />
        </div>
      </td>
      <td className={styles.tableCell}>
        <div className={styles.accountInfo}>
          <p className={styles.accountName}>{name}</p>
          <p className={styles.accountNumber}>{number}</p>
        </div>
      </td>
      <td className={styles.tableCell}>
        <div className={styles.accountTypeInfo}>
          <p className={styles.accountCurrencyText}>{currency}</p>
          <p className={styles.accountType}>{type}</p>
        </div>
      </td>
      <td className={`${styles.tableCell} ${styles.tableCellRight}`}>
        <div className={styles.accountBalanceInfo}>
          <p className={styles.accountLabel}>Latest</p>
          <p className={styles.accountValue}>{latest}</p>
        </div>
      </td>
      <td className={`${styles.tableCell} ${styles.tableCellRight}`}>
        <div className={styles.accountBalanceInfo}>
          <p className={styles.accountLabel}>Available</p>
          <p className={styles.accountValue}>{available}</p>
        </div>
      </td>
    </tr>
  );
}

/**
 * AccountCard Component - Grid View
 * Renders a single account in card format
 */
function AccountCard({
  name,
  number,
  type,
  currency,
  latest,
  available,
  iconPath,
}: Account & { iconPath: string }) {
  return (
    <div className={styles.accountCard}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}>
          <Image src={iconPath} alt={`${name} icon`} width={24} height={24} />
        </div>
      </div>
      <div className={styles.cardBody}>
        <h4 className={styles.cardName}>{name}</h4>
        <p className={styles.cardNumber}>{number}</p>
        <div className={styles.cardType}>
          <span className={styles.cardTypeText}>{type}</span>
          <span className={styles.cardCurrency}>{currency}</span>
        </div>
      </div>
      <div className={styles.cardFooter}>
        <div className={styles.cardAmount}>
          <p className={styles.cardAmountLabel}>Latest</p>
          <p className={styles.cardAmountValue}>{latest}</p>
        </div>
        <div className={styles.cardAmount}>
          <p className={styles.cardAmountLabel}>Available</p>
          <p className={styles.cardAmountValue}>{available}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Main DashboardAccounts Component
 */
export default function DashboardAccounts() {
  // State for managing view mode (list or grid)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  /**
   * Handle view mode toggle
   * @param mode - The view mode to switch to ('list' or 'grid')
   */
  const handleViewChange = (mode: 'list' | 'grid') => {
    setViewMode(mode);
  };

  const totalAccounts = CURRENT_ACCOUNTS.length + SAVINGS_ACCOUNTS.length;

  return (
    <section className={styles.accountsSection}>
      {/* ==================== HEADER SECTION ==================== */}
      <div className={styles.mainHeader}>
        <div className={styles.mainTitleWrapper}>
          <Image
            src="/assets/images/icons/icn_account_tile.svg"
            alt="Business accounts icon"
            width={24}
            height={24}
            className={styles.mainTitleIcon}
          />
          <h2 className={styles.mainSectionTitle}>Business accounts</h2>
        </div>
      </div>

      {/* ==================== FILTER SECTION ==================== */}
      <div className={styles.filterSection}>
        <div className={styles.filterLeft}>
          <select className={styles.selectInput} aria-label="Select currency">
            <option>ZAR</option>
            <option>USD</option>
            <option>EUR</option>
          </select>
          <select className={`${styles.selectInput} ${styles.selectWide}`} aria-label="Filter accounts">
            <option>All Accounts</option>
            <option>Current Accounts</option>
            <option>Savings Accounts</option>
          </select>
        </div>
        <div className={styles.filterRight}>
          {/* Search Input */}
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="search"
              placeholder="Search accounts"
              className={styles.searchInput}
              aria-label="Search accounts"
            />
          </div>
          
          {/* View Toggle Buttons */}
          <div className={styles.viewToggle}>
            <button
              type="button"
              className={`${styles.viewButton} ${viewMode === 'list' ? styles.viewButtonActive : styles.viewButtonInactive}`}
              onClick={() => handleViewChange('list')}
              aria-label="List view"
              title="List view"
            >
              <List className={styles.viewIcon} />
            </button>
            <button
              type="button"
              className={`${styles.viewButton} ${viewMode === 'grid' ? styles.viewButtonActive : styles.viewButtonInactive}`}
              onClick={() => handleViewChange('grid')}
              aria-label="Grid view"
              title="Grid view"
            >
              <LayoutGrid className={styles.viewIcon} />
            </button>
          </div>
        </div>
      </div>

      {/* ==================== CURRENT ACCOUNTS ==================== */}
      <div className={viewMode === 'grid' ? styles.accountSectionGrid : styles.accountSection}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Current accounts</h3>
          <span className={styles.badge}>{CURRENT_ACCOUNTS.length}</span>
        </div>
        
        {viewMode === 'list' ? (
          // Table View
          <table className={styles.accountTable}>
            <tbody>
              {CURRENT_ACCOUNTS.map((acc) => (
                <AccountRow key={acc.number} {...acc} iconPath="/assets/images/icons/icn_wallet.svg" />
              ))}
            </tbody>
          </table>
        ) : (
          // Grid View
          <div className={styles.accountGrid}>
            {CURRENT_ACCOUNTS.map((acc) => (
              <AccountCard key={acc.number} {...acc} iconPath="/assets/images/icons/icn_wallet.svg" />
            ))}
          </div>
        )}
      </div>

      {/* ==================== SAVINGS ACCOUNTS ==================== */}
      <div className={viewMode === 'grid' ? styles.accountSectionGridLast : styles.accountSectionLast}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Savings accounts</h3>
          <span className={styles.badge}>{SAVINGS_ACCOUNTS.length}</span>
        </div>
        
        {viewMode === 'list' ? (
          // Table View
          <table className={styles.accountTable}>
            <tbody>
              {SAVINGS_ACCOUNTS.map((acc) => (
                <AccountRow key={acc.number} {...acc} iconPath="/assets/images/icons/icn_cash_coins_and_note.svg" />
              ))}
            </tbody>
          </table>
        ) : (
          // Grid View
          <div className={styles.accountGrid}>
            {SAVINGS_ACCOUNTS.map((acc) => (
              <AccountCard key={acc.number} {...acc} iconPath="/assets/images/icons/icn_cash_coins_and_note.svg" />
            ))}
          </div>
        )}
      </div>

      {/* ==================== FOOTER ==================== */}
      <div className={styles.footer}>
        <p className={styles.footerText}>
          Displaying {totalAccounts} of {totalAccounts}
        </p>
        <button
          type="button"
          className={styles.viewAllButton}
          aria-label="View all accounts"
        >
          VIEW ALL
        </button>
      </div>
    </section>
  );
}
