import React from "react";
import Link from "next/link";
import Image from "next/image";
import icnTelescope from "@/assets/images/icons/icn_telescope.svg";
import icnCallCentre from "@/assets/images/icons/icn_call_centre.svg";
import icnLanguage from "@/assets/images/icons/icn_sa_lang_icon.png"
import icnLinkOut from "@/assets/images/icons/icn_link_out.svg"

const MiniNavbar: React.FC = () => {
  return (
    <nav className="w-full bg-primary-deep h-10 flex items-center">
      <div className="page-container flex items-center justify-between gap-6 py-2">

        <div className="flex items-center gap-4">
          {/* Personal */}
          <Link
            href="/solutions"
            className="flex items-center gap-2 text-white text-xs hover:text-gray-200 transition-colors"
          >
            <span>Personal</span>
            <Image src={icnLinkOut} alt="Personal Icon" width={12} height={12} />
          </Link>

          {/* Corporate */}
          <Link
            href="/contact"
            className="flex items-center gap-2 text-white text-xs hover:text-gray-200 transition-colors"
          >
            <span>Corporate</span>
            <Image src={icnLinkOut} alt="Corporate Icon" width={12} height={12} />
          </Link>
        </div>


        <div className="flex items-center gap-4">
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
            <Image src={icnCallCentre} alt="Phone Icon" width={16} height={16} />
          </Link>

          {/* Country Flag */}
          <button type="button">
            <Image src={icnLanguage} alt="Language Icon" width={16} height={16} />
          </button>
        </div>

      </div>
    </nav>
  );
};

export default MiniNavbar;
