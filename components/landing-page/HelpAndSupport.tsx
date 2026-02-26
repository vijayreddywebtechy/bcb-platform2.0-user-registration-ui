import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/shared/SectionHeader";

import icnLinkOut from "@/assets/images/icons/icn_link_out.svg";

function HelpAndSupport() {
  return (
    <section className="py-10 md:py-12 lg:py-16 bg-blue-50">
      <div className="page-container">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left heading */}
          <div className="w-full lg:w-1/3 flex-shrink-0">
            <p className="text-sm md:text-base text-secondary">Help &amp; Support</p>
            <SectionHeader
              title="Reach out to us for additional support"
              align="left"
              className="mt-2"
              titleClassName="!leading-[1.15] text-secondary"
            />
          </div>

          {/* Right cards */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {/* Help & support card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col items-center text-center">
              <h3 className="text-lg md:text-xl font-medium text-secondary">Help &amp; support</h3>
              <p className="mt-6 text-sm md:text-base text-secondary leading-relaxed w-full md:max-w-64 mx-auto">
                We&rsquo;re here to help with your questions or queries
              </p>
              <div className="mt-9">
                <Link href="/" target="_blank">
                  <Button className="px-6">
                    Give Us A Call
                    <Image src={icnLinkOut} alt="" width={14} height={14} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stay informed card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 flex flex-col items-center text-center">
              <h3 className="text-lg md:text-xl font-medium text-secondary">Stay informed</h3>
              <p className="mt-6 text-sm md:text-base text-secondary leading-relaxed w-full md:max-w-64 mx-auto">
                Keep up to date with our latest solutions and more
              </p>
              <div className="mt-9">
                <Link href="/">
                  <Button className="px-6">Subscribe Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HelpAndSupport;
