"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, House } from "lucide-react";
import icnBuilding from "@/assets/images/icons/icn_building.svg";
import icnClockPast from "@/assets/images/icons/icn_clock_past.svg";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

/**
 * "dashboard" variant  →  shows userName, organizationName + role, lastSignedIn
 * "page" variant       →  shows pageTitle and optional pageDescription
 */
type PageHeaderProps =
  | {
      variant: "dashboard";
      breadcrumbs?: BreadcrumbItem[];
      userName: string;
      organizationName?: string;
      role?: string;
      lastSignedIn?: string;
      pageTitle?: never;
      pageDescription?: never;
    }
  | {
      variant: "page";
      breadcrumbs?: BreadcrumbItem[];
      pageTitle: string;
      pageDescription?: string;
      pageDescriptionIcon?: React.ReactNode;
      userName?: never;
      organizationName?: never;
      role?: never;
      lastSignedIn?: never;
    };

// ─── Sub-component: Breadcrumb trail ──────────────────────────────────────────

function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
              {/* Home icon for the very first item */}
              {index === 0 && <House className="w-4 h-4 text-primary shrink-0" />}

              {/* Label */}
              {!isLast && item.href ? (
                <Link
                  href={item.href}
                  className="text-blue-200 text-xs hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`text-xs ${isLast ? "text-white" : "text-blue-200"}`}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}

              {/* Separator */}
              {!isLast && (
                <ChevronRight
                  className="w-4 h-4 text-blue-300 shrink-0"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

function PageHeader(props: PageHeaderProps) {
  const { variant, breadcrumbs } = props;

  return (
    <div className="bg-primary-dark w-full">
      <div className="page-container py-6">
        {/* Breadcrumb trail */}
        {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}

        {/* ── Dashboard variant ── */}
        {variant === "dashboard" && (
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            {/* Left: user greeting + org */}
            <div className="text-white">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                {props.userName}
              </h1>

              {(props.organizationName || props.role) && (
                <div className="flex items-center gap-1.5 mt-2 text-xs font-normal text-blue-100">
                  {props.organizationName && (
                    <>
                      <Image
                        src={icnBuilding}
                        alt="Organisation"
                        width={14}
                        height={14}
                        className="shrink-0"
                      />
                      <span>{props.organizationName}</span>
                    </>
                  )}
                  {props.role && (
                    <>
                      {props.organizationName && <span className="text-blue-300 mx-0.5">·</span>}
                      <span className="font-medium text-white">{props.role}</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Right: last signed in */}
            {props.lastSignedIn && (
              <div className="flex items-center gap-1.5 text-xs font-normal text-blue-100 sm:mb-0.5">
                <Image
                  src={icnClockPast}
                  alt="Last signed in"
                  width={20}
                  height={20}
                  className="shrink-0"
                />
                <p>
                  Last Signed In –{" "}
                  <span className="font-medium text-white">{props.lastSignedIn}</span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── Page variant ── */}
        {variant === "page" && (
          <div className="text-white">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
              {props.pageTitle}
            </h1>
            {props.pageDescription && (
              <div className="flex items-center gap-1.5 mt-1">
                {props.pageDescriptionIcon && (
                  <span className="shrink-0 flex items-center">{props.pageDescriptionIcon}</span>
                )}
                <p className="text-sm text-blue-50 font-normal">{props.pageDescription}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PageHeader;
