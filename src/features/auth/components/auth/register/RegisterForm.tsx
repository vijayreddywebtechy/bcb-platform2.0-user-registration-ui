"use client";

import AuthLayout from "@/features/auth/components/auth/shared/AuthLayout";
import AuthCard from "@/features/auth/components/auth/shared/AuthCard";
import { ChevronRight, FileText, Users } from "lucide-react";
import Image from "next/image";
import icnExistingUser from "@/assets/images/icons/icn_existing_user.png";
import icnCreateUser from "@/assets/images/icons/icn_create_user.png";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";

export default function RegisterForm() {
  const handleNewClient = () => {
    // Add your navigation or logic here
  };

  return (
    <AuthLayout>
      <AuthCard className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl text-secondary mb-2">Register</h1>
          <p className="text-neutral-900 text-base leading-relaxed">
            Set up a Business Hub digital banking profile
          </p>
        </div>

        {/* Options */}
        <div className="space-y-4 mb-12">
          {/* Existing Client Option */}
          <Link href="/signin" className="block w-full">
            <button className="w-full bg-blue-50 hover:bg-blue-100 transition-colors rounded-xl p-4 md:pl-6 flex items-center justify-between group">
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <Image src={icnExistingUser} alt="Existing Client Icon" width={40} height={40} />
                </div>

                {/* Text Content */}
                <div className="text-left flex-1">
                  <h3 className="text-neutral-900 font-medium text-sm leading-normal mb-2">
                    I'm an existing client who uses the banking app or internet banking
                  </h3>
                  <p className="text-neutral-900 text-sm leading-normal">
                    Use your existing Online Banking for Business username and password details to
                    register
                  </p>
                </div>
              </div>

              {/* Chevron */}
              <ChevronRight
                className="w-8 h-8 text-primary-dark flex-shrink-0 ml-2"
                strokeWidth="1.5"
              />
            </button>
          </Link>

          {/* New Client Option */}
          <button
            onClick={handleNewClient}
            className="w-full bg-blue-50 hover:bg-blue-100 transition-colors rounded-xl p-4 md:pl-6 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="flex-shrink-0">
                <Image src={icnCreateUser} alt="New Client Icon" width={40} height={40} />
              </div>

              {/* Text Content */}
              <div className="text-left flex-1">
                <h3 className="text-neutral-900 font-medium text-sm leading-normal mb-2">
                  I'm a new client who does not use any banking apps or internet banking
                </h3>
                <p className="text-neutral-900 text-sm leading-normal">
                  You will need to create a new digital profile to register for the Business Hub.
                </p>
              </div>
            </div>

            {/* Chevron */}
            <ChevronRight
              className="w-8 h-8 text-primary-dark flex-shrink-0 ml-2"
              strokeWidth="1.5"
            />
          </button>
        </div>

        {/* Cancel Button */}
        <Link href="/" className="block">
          <Button variant="outline" className="w-full">
            CANCEL
          </Button>
        </Link>
      </AuthCard>
    </AuthLayout>
  );
}
