"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ConditionsOfAccessModal from "./ConditionsOfAccessModal";

import icnLogoLinkedIn from "@/assets/images/landing/icn_logo_linkedin.svg";
import icnLogoYouTube from "@/assets/images/landing/icn_logo_YouTube.svg";
import icnLogoTwitter from "@/assets/images/landing/icn_logo_twitter.svg";
import icnLogoFB from "@/assets/images/landing/icn_logo_FB.svg";

interface FooterLink {
  label: string;
  href: string;
  openInModal?: boolean;
}

interface FooterProps {
  links?: FooterLink[];
  disclaimerText?: string;
  backgroundColor?: string;
  textColor?: string;
}

const defaultLinks: FooterLink[] = [
  {
    label: "REGULATORY",
    href: process.env.NEXT_PUBLIC_FOOTER_REGULATORY ?? "/",
  },
  {
    label: "CONDITIONS OF ACCESS",
    href: process.env.NEXT_PUBLIC_FOOTER_CONDITIONS_OF_ACCESS ?? "/",
    openInModal: true,
  },
  {
    label: "SECURITY CENTRE",
    href: process.env.NEXT_PUBLIC_FOOTER_SECURITY_CENTRE ?? "/",
  },
  {
    label: "PRIVACY STATEMENT",
    href: process.env.NEXT_PUBLIC_FOOTER_PRIVACY_STATEMENT ?? "/",
  },
];

const socialLinks = [
  {
    href: process.env.NEXT_PUBLIC_FOOTER_SOCIAL_LINKEDIN ?? "/",
    label: "LinkedIn",
    icon: icnLogoLinkedIn,
  },
  {
    href: process.env.NEXT_PUBLIC_FOOTER_SOCIAL_YOUTUBE ?? "/",
    label: "YouTube",
    icon: icnLogoYouTube,
  },
  {
    href: process.env.NEXT_PUBLIC_FOOTER_SOCIAL_X ?? "/",
    label: "X (Twitter)",
    icon: icnLogoTwitter,
  },
  {
    href: process.env.NEXT_PUBLIC_FOOTER_SOCIAL_FACEBOOK ?? "/",
    label: "Facebook",
    icon: icnLogoFB,
  },
];

const Footer: React.FC<FooterProps> = ({
  links = defaultLinks,
  disclaimerText = "Standard Bank is a licensed financial services provider in terms of the Financial Advisory and Intermediary Services Act and a registered credit provider in terms of the National Credit Act, registration number NCRCP15.",
  backgroundColor = "bg-[#003FCA]",
  textColor = "text-white",
}) => {
  const [conditionsModalOpen, setConditionsModalOpen] = useState(false);

  const linkClassName = `${textColor} text-xs font-medium text-blue-200 hover:text-gray-200 transition-colors duration-200 uppercase tracking-wide hover:underline underline-offset-4`;

  return (
    <>
      <footer className={`w-full ${backgroundColor} py-9`}>
        <div className="page-container flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          {/* Left: Legal Links + Disclaimer */}
          <div className="flex-1 min-w-0">
            {/* Legal Links */}
            <nav
              className="flex flex-wrap items-center gap-12 mb-3"
              aria-label="Legal links"
            >
              {links.map((link, index) =>
                link.openInModal ? (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setConditionsModalOpen(true)}
                    className={`${linkClassName} bg-transparent border-none cursor-pointer font-inherit p-0`}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClassName}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Disclaimer Text */}
            <div className={`${textColor} text-xs leading-relaxed max-w-3xl`}>
              <p>{disclaimerText}</p>
            </div>
          </div>

          {/* Right: Social Icons */}
          <div className="flex items-center gap-3 shrink-0" aria-label="Social links">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1E5AF9] hover:bg-[#2563ff] transition-colors"
                aria-label={social.label}
              >
                <Image
                  src={social.icon}
                  alt=""
                  width={24}
                  height={24}
                  className="brightness-0 invert w-6 h-6"
                />
              </a>
            ))}
          </div>
        </div>
      </footer>

      <ConditionsOfAccessModal
        open={conditionsModalOpen}
        onOpenChange={setConditionsModalOpen}
      />
    </>
  );
};

export default Footer;
