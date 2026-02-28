"use client";

import {
  User,
  ScanFace,
  Link2,
  FileText,
  Building,
  PaintRoller,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ActionCard from "@/shared/components/dynamic/cards/ActionCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";

const actions = [
  {
    stepNumber: 1,
    title: "Roles & Permissions",
    description:
      "Invite, configure, approve and manage your teams access to your business profile.",
    icon: User,
    status: "active" as const,
    bgColor: "bg-blue-700",
  },
  {
    stepNumber: 2,
    title: "Customise Appearance",
    description:
      "Personalise your experience by configuring your dashboards layout, look and more.",
    icon: PaintRoller,
    status: "active" as const,
    bgColor: "bg-blue-700",
  },
  {
    stepNumber: 3,
    title: "Download Documents",
    description:
      "Download or email your official stamped bank letters and statements in PDF format.",
    icon: FileText,
    status: "active" as const,
    bgColor: "bg-blue-700",
  },
  {
    stepNumber: 4,
    title: "Confirm Business Details",
    description: "Confirm your business details, notification preferences and trust devices.",
    icon: Building,
    status: "active" as const,
    bgColor: "bg-blue-700",
  },
  {
    stepNumber: 5,
    title: "Confirm Business Details",
    description: "Confirm your business details, notification preferences and trust devices.",
    icon: Building,
    status: "active" as const,
    bgColor: "bg-blue-700",
  },
];

function NextActions() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="bg-primary-dark py-12">
      <div className="page-container">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-blue-50">
            Next best actions
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-sm transition-all duration-200"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 text-white" strokeWidth={2} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-sm transition-all duration-200"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 text-white" strokeWidth={2} />
            </button>
          </div>
        </div>
        <Swiper
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          modules={[Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {actions.map((action) => (
            <SwiperSlide key={action.stepNumber}>
              <ActionCard {...action} showClose={false} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default NextActions;
