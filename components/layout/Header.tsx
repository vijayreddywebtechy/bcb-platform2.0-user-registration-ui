"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import sbOneLogo from "@/assets/images/logos/sb_one_logo.svg";
import icnSignout from "@/assets/images/icons/icn_lock_closed_w.svg";
import icnProfile from "@/assets/images/icons/icn_people_profile-w.svg";
import icnBuilding from "@/assets/images/icons/icn_building.svg";

interface DropdownItem {
    label: string;
    href: string;
}

interface NavItem {
    label: string;
    href?: string;
    dropdown?: DropdownItem[];
}

const navItems: NavItem[] = [
    {
        label: "Dashboard",
        href: "/dashboard",
        dropdown: [
            { label: "Overview", href: "/dashboard" },
            { label: "Analytics", href: "/dashboard/analytics" },
        ],
    },
    { label: "Accounts", href: "/accounts" },
    { label: "Documents", href: "/documents" },
    { label: "Query Tracker", href: "/query-tracker" },
    {
        label: "Business Profile",
        dropdown: [
            { label: "Business Details", href: "/business-profile/details" },
            { label: "Roles & Permissions", href: "/business-profile/roles" },
        ],
    },
];

function Header() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
                setOpenDropdown(null);
                setMobileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = (label: string) => {
        setOpenDropdown((prev) => (prev === label ? null : label));
    };

    const toggleMobileDropdown = (label: string) => {
        setMobileDropdown((prev) => (prev === label ? null : label));
    };

    return (
        <div ref={headerRef} className="bg-[#003FCA] border-b border-blue-800 relative z-50">
            <div className="page-container flex items-center justify-between h-16">

                {/* Logo */}
                <Link href="/" className="flex-shrink-0">
                    <Image src={sbOneLogo} alt="SBOne Logo" width={190} height={40} />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-stretch h-full gap-0.5">
                    {navItems.map((item) => {
                        const isOpen = openDropdown === item.label;
                        const hasDropdown = !!item.dropdown;

                        return (
                            <div key={item.label} className="relative flex items-stretch">
                                <button
                                    onClick={() =>
                                        hasDropdown
                                            ? toggleDropdown(item.label)
                                            : undefined
                                    }
                                    className={`flex items-center gap-1 px-3 text-white text-sm transition-colors hover:text-white relative
                    after:content-[''] after:absolute after:bottom-[-0.5] after:left-0 after:w-full after:h-[2px]
                    after:bg-transparent hover:after:bg-white after:transition-colors
                    ${isOpen ? "after:bg-white" : ""}`}
                                >
                                    {item.href && !hasDropdown ? (
                                        <Link href={item.href} className="flex items-center gap-1 h-full">
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <>
                                            {item.label}
                                            <ChevronDown
                                                className={`w-5 h-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                                strokeWidth={1.5}
                                            />
                                        </>
                                    )}
                                </button>

                                {/* Dropdown */}
                                {hasDropdown && isOpen && (
                                    <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-xl min-w-[220px] p-1 z-50 border border-gray-100">
                                        {item.dropdown!.map((sub) => (
                                            <Link
                                                key={sub.label}
                                                href={sub.href}
                                                onClick={() => setOpenDropdown(null)}
                                                className="flex items-center justify-between px-3 py-3.5 rounded text-sm text-primary-dark font-medium hover:bg-blue-50 transition-colors"
                                            >
                                                {sub.label}
                                                <ChevronRight className="w-5 h-5 text-primary-dark" strokeWidth={1.5} />
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Right Icons */}
                <div className="hidden md:flex items-center gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded hover:bg-primary transition-colors">
                        <Image src={icnProfile} alt="Profile" width={20} height={20} />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded hover:bg-primary transition-colors">
                        <Image src={icnBuilding} alt="Business" width={20} height={20} />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded hover:bg-primary transition-colors">
                        <Image src={icnSignout} alt="Sign Out" width={16} height={20} />
                    </button>
                </div>

                {/* Mobile Hamburger */}
                <button
                    className="md:hidden w-10 h-10 flex items-center justify-center text-white rounded hover:bg-primary transition-colors"
                    onClick={() => setMobileOpen((v) => !v)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden bg-primary-dark border-t border-blue-800 px-4 pb-4">
                    <nav className="flex flex-col gap-0.5 pt-2">
                        {navItems.map((item) => {
                            const isOpen = mobileDropdown === item.label;
                            const hasDropdown = !!item.dropdown;

                            return (
                                <div key={item.label}>
                                    {hasDropdown ? (
                                        <button
                                            onClick={() => toggleMobileDropdown(item.label)}
                                            className="w-full flex items-center justify-between px-3 py-3 text-white text-sm font-medium rounded hover:bg-primary transition-colors"
                                        >
                                            {item.label}
                                            <ChevronDown
                                                className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                                strokeWidth={1.5}
                                            />
                                        </button>
                                    ) : (
                                        <Link
                                            href={item.href!}
                                            onClick={() => setMobileOpen(false)}
                                            className="flex items-center px-3 py-3 text-white text-sm font-medium rounded hover:bg-primary transition-colors"
                                        >
                                            {item.label}
                                        </Link>
                                    )}

                                    {/* Mobile Sub-items */}
                                    {hasDropdown && isOpen && (
                                        <div className="ml-4 mt-1 bg-white rounded-lg overflow-hidden">
                                            {item.dropdown!.map((sub) => (
                                                <Link
                                                    key={sub.label}
                                                    href={sub.href}
                                                    onClick={() => setMobileOpen(false)}
                                                    className="flex items-center justify-between px-4 py-3 text-sm text-primary font-medium hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-0"
                                                >
                                                    {sub.label}
                                                    <ChevronRight className="w-4 h-4 text-primary" strokeWidth={1.5} />
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* Mobile Icon Actions */}
                        <div className="flex items-center gap-3 px-3 pt-3 mt-2 border-t border-blue-800">
                            <button className="w-10 h-10 flex items-center justify-center rounded hover:bg-primary transition-colors">
                                <Image src={icnProfile} alt="Profile" width={20} height={20} />
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded hover:bg-primary transition-colors">
                                <Image src={icnBuilding} alt="Business" width={20} height={20} />
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center rounded hover:bg-primary transition-colors">
                                <Image src={icnSignout} alt="Sign Out" width={16} height={20} />
                            </button>
                        </div>
                    </nav>
                </div>
            )}
        </div>
    );
}

export default Header;
