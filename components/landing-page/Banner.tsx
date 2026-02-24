"use client";

import Image from "next/image";
import Link from "next/link";
import bannerBg from "@/assets/images/landing/welcome_bnr_bg.jpg";
import icnPlay from "@/assets/images/icons/icn_play.svg";
import { Button } from "@/components/ui/button";

function Banner() {
  return (
    <section id="banner" className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[940px] overflow-hidden">
      {/* Background Image */}
      <Image
        src={bannerBg}
        alt="Business professional using tablet"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        quality={90}
      />

      {/* Gradient Overlay for text readability */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent md:from-white/85 md:via-white/50 md:to-transparent" /> */}

      {/* Content */}
      <div className="relative z-10 page-container flex items-center h-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[944px]">
        <div className="max-w-xl lg:max-w-2xl py-12 md:py-16 lg:py-20">
          {/* Heading */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight xl:leading-[1.15] text-primary-dark tracking-tight">
            We&rsquo;re on a journey to bring our most popular business banking
            services onto one convenient business hub.
          </h1>

          {/* Subtitle */}
          <p className="mt-5 md:mt-6 text-sm sm:text-base md:text-lg text-secondary leading-relaxed max-w-md lg:max-w-lg">
            We will be releasing key functionality periodically until we&rsquo;re
            ready to launch officially, try out our limited version now.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6">
            {/* Watch Demo */}
            <Link
              href="#demo-video"
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector("#demo-video");
                if (target) {
                  target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="inline-flex items-center gap-3 px-6 py-2 h-12 bg-blue-200 rounded-md text-primary hover:text-primary-dark text-sm font-medium
                transition-all duration-200 group md:min-w-48"
            >
              <span className="w-8 h-8 flex items-center justify-center bg-primary rounded-full group-hover:bg-primary-dark transition-colors">
                <Image src={icnPlay} alt="" width={32} height={32} />
              </span>
              WATCH DEMO
            </Link>

            {/* Try It Now */}
            <Link
              href="/"
              className=""
            >
              <Button className="md:min-w-48">TRY NOW</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
