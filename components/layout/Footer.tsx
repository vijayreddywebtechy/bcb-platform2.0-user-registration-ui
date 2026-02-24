import React from "react";
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  links?: FooterLink[];
  disclaimerText?: string;
  backgroundColor?: string;
  textColor?: string;
}

const Footer: React.FC<FooterProps> = ({
  links = [
    { label: "CONDITIONS OF ACCESS", href: "/conditions-of-access" },
    { label: "DISCLAIMER", href: "/disclaimer" },
    { label: "PRIVACY STATEMENT", href: "/privacy-statement" },
  ],
  disclaimerText = "Standard Bank is a licensed financial services provider in terms of the Financial Advisory and Intermediary Services Act and a registered credit provider in terms of the National Credit Act, registration number NCRCP15.",
  backgroundColor = "bg-[#003FCA]",
  textColor = "text-white",
}) => {
  return (
    <footer className={`w-full ${backgroundColor} py-9`}>
      <div className="page-container">
        {/* Legal Links */}
        <nav
          className="flex flex-wrap items-center gap-12 mb-3"
          aria-label="Legal links"
        >
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`${textColor} text-xs font-medium text-blue-200 hover:text-gray-200 transition-colors duration-200 uppercase tracking-wide hover:underline underline-offset-4`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Disclaimer Text */}
        <div className={`${textColor} text-xs leading-relaxed max-w-3xl`}>
          <p>{disclaimerText}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
