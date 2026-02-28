"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import icnResponsive from "@/assets/images/icons/icn_responsive.svg";
import icnTradeFinance from "@/assets/images/icons/icn_trade_finance.svg";
import icnScreen from "@/assets/images/icons/icn_screen.svg";
import CardSlider from "@/shared/components/shared/CardSlider";

type LinkCard = {
  id: string;
  icon: string;
  label: string;
  title: string;
  description: string;
  url: string;
};

const links: LinkCard[] = [
  {
    id: "1",
    icon: icnResponsive,
    label: "I want to transact on",
    title: "Online Banking for Business",
    description: "Sign in automatically",
    url: "#",
  },
  {
    id: "2",
    icon: icnTradeFinance,
    label: "Submit trade instructions",
    title: "Trade Suite",
    description: "Sign in automatically",
    url: "#",
  },
  {
    id: "3",
    icon: icnScreen,
    label: "I want to transact on",
    title: "Business Online",
    description: "You will need to sign in again",
    url: "#",
  },
  {
    id: "4",
    icon: icnScreen,
    label: "I want to transact on",
    title: "Business Online",
    description: "You will need to sign in again",
    url: "#",
  },
];

function LinkCard({ link }: { link: LinkCard }) {
  return (
    <Link
      href={link.url}
      className="relative flex flex-col bg-gradient-to-br from-[#0047BB] to-[#003A9B] rounded-2xl p-4 md:px-6 md:py-8 text-white hover:shadow-xl transition-all duration-300 group overflow-hidden h-full"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Top: external link icon */}
        <div className="flex justify-end mb-2">
          <ExternalLink
            className="w-5 h-5 md:w-6 md:h-6 opacity-70 group-hover:opacity-100 transition-opacity"
            strokeWidth={2}
          />
        </div>

        {/* Icon box */}
        <div className="w-12 h-12 mb-6 rounded-lg bg-primary-medium backdrop-blur-sm flex items-center justify-center">
          <Image
            src={link.icon}
            alt={link.title}
            width={24}
            height={24}
            className="w-6 h-6 md:w-7 md:h-7"
          />
        </div>

        {/* Text */}
        <div className="mt-auto">
          <p className="text-sm mb-2 opacity-90">{link.label}</p>
          <h3 className="text-xl md:text-2xl font-medium mb-4 md:mb-5 leading-tight">
            {link.title}
          </h3>
          <p className="text-sm md:text-base font-normal opacity-80">{link.description}</p>
        </div>
      </div>
    </Link>
  );
}

function DigitalHubLinks() {
  const slides = links.map((link) => <LinkCard key={link.id} link={link} />);

  return (
    <CardSlider
      title="Digital hub links"
      icon={<ExternalLink className="w-5 h-5 text-primary-dark" strokeWidth={2} />}
      slides={slides}
    />
  );
}

export default DigitalHubLinks;
