import React from "react";
import Link from "next/link";
import { Share2, Phone } from "lucide-react";
import Image from "next/image";
import icnTelescope from "@/assets/images/icons/icn_telescope.png";
import icnPhone from "@/assets/images/icons/icn_phone.png";
import icnLanguage from "@/assets/images/icons/icn_sa_lang_icon.png"

const MiniNavbar: React.FC = () => {
  return (
    <nav className="w-full bg-primary-deep h-10 flex items-center">
      <div className="page-container flex items-center justify-end gap-6 py-2">
        {/* Explore Solutions */}
        <Link
          href="/solutions"
          className="flex items-center gap-2 text-white text-xs hover:text-gray-200 transition-colors"
        >
          <span>Explore Solutions</span>
          <Image src={icnTelescope} alt="Share Icon" width={16} height={16} />
        </Link>

        {/* Contact Us */}
        <Link
          href="/contact"
          className="flex items-center gap-2 text-white text-xs hover:text-gray-200 transition-colors"
        >
          <span>Contact Us</span>
          <Image src={icnPhone} alt="Phone Icon" width={16} height={16} />
        </Link>

        {/* Country Flag */}
        <button type="button">
          <Image src={icnLanguage} alt="Language Icon" width={16} height={16} />
        </button>

      </div>
    </nav>
  );
};

export default MiniNavbar;
