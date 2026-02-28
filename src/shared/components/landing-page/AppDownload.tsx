import Image from "next/image";
import SectionHeader from "@/shared/components/shared/SectionHeader";

import iphoneMockup from "@/assets/images/landing/iphone_mobile_mocup.png";
import qrCodeOne from "@/assets/images/landing/QRCodeOne.png";
import qrCodeTwo from "@/assets/images/landing/QRCodeTwo.png";
import appStore from "@/assets/images/landing/appstore.svg";
import playStore from "@/assets/images/landing/playstore.svg";
import Link from "next/link";

function AppDownload() {
  return (
    <section id="app-download" className="py-10 md:py-12 lg:py-16 bg-primary-dark overflow-hidden">
      <div className="page-container">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-9 lg:gap-10 w-full md:max-w-[1006px] md:mx-auto">
          {/* Phone Mockup */}
          <div className="relative flex-shrink-0">
            <Image
              src={iphoneMockup}
              alt="Online Banking for Business App"
              width={362}
              height={580}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-white text-sm md:text-base mb-4">
              Don&rsquo;t have the Online Banking for Business App?
            </p>
            <SectionHeader
              title="Download it now to access the Business Hub"
              description="Manage your banking, make payments and access your information and solutions anytime, anywhere."
              align="left"
              className="max-w-xl"
              titleClassName="text-white text-3xl md:text-4xl lg:text-5xl"
              descriptionClassName="text-white"
            />

            {/* QR Codes & Store Badges */}
            <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-6">
              {/* Google Play */}
              <div className="flex flex-col items-center gap-2">
                <div className="bg-white rounded-xl p-2 w-36 h-36 md:w-40 md:h-40 flex items-center justify-center">
                  <Image
                    src={qrCodeOne}
                    alt="Google Play QR Code"
                    width={138}
                    height={138}
                    className="w-full h-full object-contain"
                  />
                </div>
                <Link href="/" className="w-full h-auto">
                  <Image
                    src={playStore}
                    alt="Get it on Google Play"
                    width={138}
                    height={44}
                    className="h-auto w-full"
                  />
                </Link>
              </div>

              {/* App Store */}
              <div className="flex flex-col items-center gap-2">
                <div className="bg-white rounded-xl p-2 w-36 h-36 md:w-40 md:h-40 flex items-center justify-center">
                  <Image
                    src={qrCodeTwo}
                    alt="App Store QR Code"
                    width={138}
                    height={138}
                    className="w-full h-full object-contain"
                  />
                </div>
                <Link href="/" className="w-full h-auto">
                  <Image
                    src={appStore}
                    alt="Download on the App Store"
                    width={138}
                    height={44}
                    className="h-auto w-full"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AppDownload;
