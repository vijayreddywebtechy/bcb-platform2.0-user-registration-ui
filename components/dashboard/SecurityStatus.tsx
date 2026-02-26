"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import iconSecure from "@/assets/images/icons/icn_people_1_secure.svg";
import securityImage from "@/assets/images/cards/security_upgrade_app.png";

type Props = {};

function SecurityStatus({}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center gap-3 p-4 shadow-sm">
        <Image
          src={iconSecure}
          alt="Security Status"
          width={40}
          height={40}
          className="w-10 h-10"
        />
        <h2 className="text-base md:text-lg font-medium text-secondary">Security Status</h2>
      </div>
      <div className="p-4 md:p-6 flex-1">
        <div className="p-4 bg-blue-50 rounded-2xl">
          {/* Security Illustration */}
          <div className="flex-1 flex items-center justify-center">
            <Image
              src={securityImage}
              alt="Security devices"
              width={300}
              height={300}
              className="w-full max-w-[250px] md:max-w-[300px] h-auto"
            />
          </div>

          {/* Content */}
          <div className="text-center py-6">
            <p className="text-sm md:text-base text-secondary mb-1">Manage your trusted devices</p>
            <h3 className="text-xl md:text-2xl font-medium text-secondary">
              Add or remove devices
            </h3>
          </div>

          {/* Button */}
          <Button variant="outline" className="w-full">
            CHECK MY DEVICES
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SecurityStatus;
