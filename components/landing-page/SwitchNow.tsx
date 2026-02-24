import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import switchNowImg from "@/assets/images/landing/switchnow_img.png";
import icnLinkOut from "@/assets/images/icons/icn_link_out.svg";

function SwitchNow() {
  return (
    <section className="py-10 md:py-12 lg:py-16 bg-blue-50">
      <div className="page-container">
        <div className="rounded-2xl overflow-hidden flex flex-col lg:flex-row">
          {/* Left content - blue background */}
          <div className="bg-primary-dark flex-1 flex items-center px-6 md:px-10 lg:px-14 py-10 md:py-14 lg:py-16">
            <div className="max-w-md">
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-[42px] xl:leading-tight text-white tracking-tight">
                Ready to move to Standard Bank?
              </h2>

              <p className="mt-4 md:mt-6 text-sm md:text-base text-white/80 leading-relaxed">
                We&rsquo;re serious about where your business is going. Discover
                why we&rsquo;re the trusted choice when it comes to business
                banking.
              </p>

              <div className="mt-6 md:mt-8">
                <Link href="/" target="_blank">
                  <Button className="px-6">
                    Switch Now
                    <Image
                      src={icnLinkOut}
                      alt=""
                      width={14}
                      height={14}
                      className="ml-1.5"
                    />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right image */}
          <div className="relative w-full lg:w-[45%] xl:w-[50%] min-h-[280px] md:min-h-[320px] lg:min-h-0 flex-shrink-0">
            <Image
              src={switchNowImg}
              alt="Business professional on a call"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SwitchNow;
