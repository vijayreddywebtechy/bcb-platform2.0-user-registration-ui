"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import sbLogo from "@/assets/images/logos/sb_business_commercial.svg";
import { Button } from "../ui/button";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Demo Video", href: "#demo-video" },
  { label: "Foundational Features", href: "#foundational-features" },
  { label: "Get Started", href: "#get-started" },
  { label: "App Download", href: "#app-download" },
  { label: "Success Stories", href: "#success-stories" },
  { label: "Help & Support", href: "#help-and-support" },
];

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerHeight = headerRef.current?.offsetHeight || 0;
        const miniNavHeight = 40;
        const offset = headerHeight + miniNavHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
      setMobileOpen(false);
    }
  };

  return (
    <div ref={headerRef} className="bg-primary-dark relative z-50">
      <div className="page-container flex items-center justify-between h-14 lg:h-16">
        {/* Logo */}
        <Link href="/landing" className="flex-shrink-0">
          <Image
            src={sbLogo}
            alt="Standard Bank Business & Commercial"
            width={150}
            height={40}
            className="h-8 lg:h-10 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="relative px-3 xl:px-4 py-2 text-white text-sm font-medium whitespace-nowrap transition-colors hover:text-white/80
                after:content-[''] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px]
                after:bg-transparent hover:after:bg-white after:transition-colors after:duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Sign In / Register Button - Desktop */}
        <Link
          href="/"
          className="hidden lg:inline-flex items-center justify-center whitespace-nowrap"
        >
          <Button variant="transparent" className="bg-white text-primary hover:bg-primary hover:text-white">SIGN IN/REGISTER</Button>
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden w-10 h-10 flex items-center justify-center text-white rounded hover:bg-primary-dark transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-primary-dark border-t border-blue-800 px-4 pb-4 max-h-[calc(100vh-96px)] overflow-y-auto">
          <nav className="flex flex-col gap-0.5 pt-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="flex items-center px-3 py-3 text-white text-sm font-medium rounded hover:bg-primary transition-colors"
              >
                {item.label}
              </a>
            ))}

            {/* Sign In / Register - Mobile */}
            <div className="pt-3 mt-2 border-t border-blue-800">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center px-6 py-3 border-2 border-white text-white text-sm font-bold rounded-full
                  hover:bg-white hover:text-primary transition-colors duration-200"
              >
                SIGN IN/REGISTER
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Header;
