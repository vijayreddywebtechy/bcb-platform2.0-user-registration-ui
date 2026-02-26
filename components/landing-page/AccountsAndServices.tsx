import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import accountsServicesBg from "@/assets/images/landing/accounts_services_bg.jpg";
import icnLinkOut from "@/assets/images/icons/icn_link_out.svg";

function AccountsAndServices() {
  return (
    <section className="relative w-full min-h-[400px] md:min-h-[480px] lg:min-h-[592px] overflow-hidden">
      {/* Background Image */}
      <Image
        src={accountsServicesBg}
        alt="Business professional working on laptop"
        fill
        className="object-cover object-center"
        sizes="100vw"
        quality={90}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/60 via-neutral-950/60 to-neutral-950/20" />

      {/* Content */}
      <div className="relative z-10 page-container flex items-center h-full min-h-[400px] md:min-h-[480px] lg:min-h-[540px]">
        <div className="max-w-lg lg:max-w-[398px] py-12 md:py-16">
          <p className="text-sm md:text-base font-medium text-primary-light tracking-wide">
            Accounts &amp; Services
          </p>

          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl xl:leading-tight text-white tracking-tight mt-16">
            Boost your business with reliable solutions
          </h2>

          <p className="mt-8 text-sm md:text-base lg:text-lg text-neutral-300 leading-relaxed max-w-md">
            Explore our wide range of financial offerings and solutions tailored to meet your unique
            needs
          </p>

          <div className="mt-8">
            <Link href="/" target="_blank">
              <Button className="px-6">
                Explore Solutions
                <Image src={icnLinkOut} alt="" width={16} height={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccountsAndServices;
