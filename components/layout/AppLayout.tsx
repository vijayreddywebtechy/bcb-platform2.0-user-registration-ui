/**
 * AppLayout Component
 * 
 * Common layout wrapper for all dashboard pages with:
 * - Header (navigation with top bar and main nav)
 * - Main content area (scrollable)
 * - Footer
 * - Floating Action Buttons (Contact Book & Chat)
 * 
 * @returns {JSX.Element} The common layout wrapper
 */
"use client";

import DashboardHeader from "../dashboard/DashboardHeader";
import Footer from "./Footer";
import DashboardFloatingActions from "../dashboard/DashboardFloatingActions";
import { DashboardCustomizationProvider } from "@/contexts/DashboardCustomizationContext";

interface AppLayoutProps {
  children: React.ReactNode;
  backgroundColor?: string;
  showFooter?: boolean;
}

export default function AppLayout({ children, backgroundColor = "#F2F6FF", showFooter = true }: AppLayoutProps) {
  return (
    <DashboardCustomizationProvider>
      <div className="min-h-screen font-bspro flex flex-col" style={{ background: backgroundColor }}>
        {/* ==================== HEADER (Full Navigation) ==================== */}
        <DashboardHeader />

        {/* ==================== SCROLLABLE CONTENT ==================== */}
        <div className="flex-1">
          {children}
        </div>

        {/* ==================== FOOTER (OPTIONAL) ==================== */}
        {showFooter && <Footer />}

        {/* ==================== FLOATING ACTION BUTTONS ==================== */}
        <DashboardFloatingActions />
      </div>
    </DashboardCustomizationProvider>
  );
}
