"use client";

import { useState } from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is the Standard Bank Business Hub?",
    answer:
      "The Business Hub is a single home for all of your Standard Bank accounts and solutions. It connects you to a variety of products and services, as well as experts to take your business further.\n\nAccess tools to better manage your business\u2019s finances. You will also have access to industry experts and resources to help your business grow.",
  },
  {
    question:
      "How do I sign in or register for the Standard Bank Business Hub?",
    answer:
      "You can sign in or register through the Online Banking for Business App. Download the app from the App Store or Google Play, then follow the registration steps to create your account and access the Business Hub.",
  },
  {
    question: "How can I stay informed of new solution updates?",
    answer:
      "Subscribe to our newsletter to receive the latest updates on new solutions and features. You can also follow our social media channels for real-time announcements and news.",
  },
];

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "transition-transform duration-300 flex-shrink-0 text-neutral-800",
        isOpen && "rotate-180"
      )}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-10 md:py-12 lg:py-16 bg-blue-50">
      <div className="page-container">
        <SectionHeader
          title="Frequently asked questions"
          align="left"
          titleClassName="text-secondary"
        />

        <div className="mt-8 md:mt-10 rounded-2xl border border-neutral-200 bg-white overflow-hidden">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={cn(
                // "border-l-[3px] transition-colors",
                // openIndex === index
                //   ? "border-l-primary"
                //   : "border-l-transparent",
                index > 0 && "border-t border-t-neutral-200"
              )}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between gap-4 py-5 px-5 md:px-8 text-left cursor-pointer"
              >
                <span className="text-sm md:text-base lg:text-lg font-medium text-secondary">
                  {faq.question}
                </span>
                <ChevronIcon isOpen={openIndex === index} />
              </button>

              <div
                className={cn(
                  "grid transition-all duration-300",
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="px-5 md:px-8 pb-6 sm:max-w-[90%]">
                    {faq.answer.split("\n\n").map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="text-sm md:text-base text-secondary leading-relaxed mb-4 last:mb-0"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
