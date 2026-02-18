/**
 * AppLayout Component
 * 
 * Common layout wrapper for all dashboard pages with:
 * - Fixed Header (navigation)
 * - Main content area (scrollable)
 * - Fixed Footer
 * - Floating Action Buttons (Contact Book & Chat)
 * 
 * @returns {JSX.Element} The common layout wrapper
 */
"use client";

import DashboardHeader from "../dashboard/DashboardHeader";
import DashboardFooter from "../dashboard/DashboardFooter";
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
      <div className="h-screen font-bspro flex flex-col overflow-hidden" style={{ background: backgroundColor }}>
        {/* ==================== FIXED HEADER ==================== */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <DashboardHeader />
        </div>

        {/* ==================== SCROLLABLE CONTENT ==================== */}
        <div className={`flex-1 overflow-y-auto pt-[104px] ${showFooter ? 'pb-[142px]' : 'pb-0'}`}>
          {children}
        </div>

        {/* ==================== FIXED FOOTER (OPTIONAL) ==================== */}
        {showFooter && (
          <div className="fixed bottom-0 left-0 right-0 z-50">
            <DashboardFooter />
          </div>
        )}

        {/* ==================== FLOATING ACTION BUTTONS ==================== */}
        <DashboardFloatingActions />
      </div>
    </DashboardCustomizationProvider>
  );
}
