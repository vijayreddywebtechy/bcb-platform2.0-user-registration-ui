"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import iconBox from "@/assets/images/icons/icn_box_track.svg";
import manWithTab from "@/assets/images/cards/man_with_tab.png";

type Props = {};

function BusinessOffers({}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center gap-3 p-4 shadow-sm">
        <Image src={iconBox} alt="Business Offers" width={40} height={40} className="w-10 h-10" />
        <h2 className="text-base md:text-lg font-medium text-secondary">Business Offers</h2>
      </div>
      <div className="p-4 md:p-6 flex flex-col flex-1">
        {/* Available Offers Badge */}
        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-secondary font-medium">Available offers</span>
            <span className="bg-blue-100 text-primary text-sm font-medium px-2 py-0.5 rounded">
              1
            </span>
          </div>
        </div>

        <div className="p-4 bg-neutral-50 rounded-2xl">
          {/* Image */}
          <div className="mb-6 rounded-xl overflow-hidden">
            <Image
              src={manWithTab}
              alt="Power your business"
              width={352}
              height={232}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 py-6">
            <h3 className="text-base md:text-lg font-medium text-secondary">
              Power your business the right way, without interruptions.
            </h3>
            <p className="text-sm text-secondary leading-relaxed mt-2">
              Protect your business from load shedding and get the solar solutions you need with a
              business solar loan.
            </p>
          </div>

          {/* Button */}
          <Button className="w-full">TELL ME MORE</Button>
        </div>
      </div>
    </div>
  );
}

export default BusinessOffers;
