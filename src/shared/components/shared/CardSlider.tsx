"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Breakpoints = {
  [width: number]: { slidesPerView: number; spaceBetween: number };
};

type Props = {
  title: string;
  icon: React.ReactNode;
  slides: React.ReactNode[];
  breakpoints?: Breakpoints;
};

const defaultBreakpoints: Breakpoints = {
  640: { slidesPerView: 1, spaceBetween: 16 },
  768: { slidesPerView: 2, spaceBetween: 20 },
  1024: { slidesPerView: 3, spaceBetween: 24 },
};

export default function CardSlider({ title, icon, slides, breakpoints }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-medium text-primary-dark flex items-center gap-2">
          {icon}
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={isBeginning}
            className="w-9 h-9 rounded-full border border-gray-300 bg-white flex items-center justify-center disabled:opacity-30 hover:bg-gray-50 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            disabled={isEnd}
            className="w-9 h-9 rounded-full border border-gray-300 bg-white flex items-center justify-center disabled:opacity-30 hover:bg-gray-50 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onReachBeginning={() => setIsBeginning(true)}
        onReachEnd={() => setIsEnd(true)}
        breakpoints={breakpoints ?? defaultBreakpoints}
        slidesPerView={1}
        spaceBetween={16}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className="h-auto">
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
