"use client";

import { Info } from "lucide-react";
import Image from "next/image";
import styles from "./DashboardCashFlow.module.css";
import calendarIcon from "@/assets/images/icons/icn_calendar.svg";
import icnInfoCircle from "@/assets/images/icons/icn_info_circle_solid-1.svg";

/**
 * Month labels for the cash flow chart
 */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Dummy data for cash inflows (in currency units)
 */
const DUMMY_INFLOWS = [70000, 130000, 170000, 190000, 120000, 130000, 180000, 115000, 140000, 185000, 125000, 70000];

/**
 * Dummy data for cash outflows (in currency units)
 */
const DUMMY_OUTFLOWS = [35000, 20000, 90000, 40000, 60000, 20000, 55000, 25000, 75000, 20000, 80000, 40000];

/**
 * DashboardCashFlow Component
 * 
 * Displays a comprehensive cash flow visualization with:
 * - Time period and account filters
 * - Bar chart showing inflows vs outflows
 * - Summary cards with total calculations
 * 
 * @returns {JSX.Element} The Cash Flow section component
 */
export default function DashboardCashFlow() {
  // Calculate maximum value for chart scaling
  const maxVal = Math.max(...DUMMY_INFLOWS, ...DUMMY_OUTFLOWS);

  return (
    <section className={styles.cashFlowSection}>
      {/* Header Section - Title with icon */}
      <div className={styles.headerSection}>
        <div className={styles.titleWrapper}>
          <Image
            src="/assets/images/icons/icn_graph_bar_arrow.svg"
            alt="Cash flows icon"
            width={24}
            height={24}
            className={styles.titleIcon}
          />
          <h2 className={styles.sectionTitle}>Cash flows</h2>
        </div>
      </div>

      {/* Filter Container - Date range and account selection */}
      <div className={styles.cashFlowOverview}>
        <div className={styles.overviewDataViz}>
          <div className={styles.filterWrapper}>
            <select className={styles.filterSelect}>
              <option>Last year</option>
              <option>Last 6 months</option>
              <option>Last 3 months</option>
              <option>Last month</option>
            </select>
            <button
              type="button"
              className={styles.calendarButton}
              aria-label="Open calendar"
            >
              <Image
                src={calendarIcon}
                alt="Calendar"
                className={styles.calendarIcon}
                width={24}
                height={24}
              />
            </button>
          </div>
          <select className={styles.accountsDropdown}>
            <option>All Accounts</option>
            <option>Business PureSav... Savings Account **** 4690</option>
          </select>
        </div>
      </div>

      {/* Track Text - Description */}
      <p className={styles.trackText}>
        Track your business financial flows
      </p>

      <div className={styles.graphWrapper}>
        <div className={styles.graphOuterContainer}>
          {/* Y-axis labels */}
          <div className={styles.yAxisLabels}>
            <span>250k</span>
            <span>200k</span>
            <span>150k</span>
            <span>100k</span>
            <span>50k</span>
            <span>0k</span>
          </div>
          
          {/* Bar chart */}
          <div className={styles.graphContainer}>
            {MONTHS.map((_, i) => (
              <div key={i} className={styles.monthBar}>
                <div
                  className={styles.inflowBar}
                  style={{
                    height: `${(DUMMY_INFLOWS[i] / maxVal) * 100}%`,
                  }}
                />
                <div
                  className={styles.outflowBar}
                  style={{
                    height: `${(DUMMY_OUTFLOWS[i] / maxVal) * 100}%`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.monthLabels}>
          {MONTHS.map((month) => (
            <span key={month}>{month}</span>
          ))}
        </div>
        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.legendDotInflow}`} />
            Inflows
          </span>
          <span className={styles.legendItem}>
            <span className={`${styles.legendDot} ${styles.legendDotOutflow}`} />
            Outflows
          </span>
        </div>
      </div>

      <div className={styles.summaryBoxes}>
        <div className={styles.summaryBox1}>
          <div>
            <p className={styles.summaryLabel}>Net Cash Flow</p>
            <p className={styles.summaryValue}>R234,400,698.00</p>
          </div>
          <Info className="w-4 h-4" style={{ opacity: 0.8 }} />
        </div>
        <div className={styles.summaryBox2}>
          <p className={styles.summaryLabel}>Total Money In</p>
          <p className={styles.summaryValue}>R512,105,821.00</p>
        </div>
        <div className={styles.summaryBox3}>
          <p className={styles.summaryLabel}>Total Money Out</p>
          <p className={styles.summaryValue}>R182,821.00</p>
        </div>
      </div>

      {/* Button Area / Disclaimer Section */}
      <div className={styles.buttonArea}>
        <div className={styles.disclaimerContent}>
          <Image
            src={icnInfoCircle}
            alt="Information"
            width={16}
            height={16}
            className={styles.infoIcon}
          />
          <p className={styles.disclaimer}>
            Details displayed are based on available account data
          </p>
        </div>
      </div>
    </section>
  );
}
