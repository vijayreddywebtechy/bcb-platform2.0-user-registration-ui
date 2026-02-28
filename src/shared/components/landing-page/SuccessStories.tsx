import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import SectionHeader from "@/shared/components/shared/SectionHeader";

import transportCard from "@/assets/images/landing/transportCard.png";
import agriculture from "@/assets/images/landing/agriculture.png";
import logistics from "@/assets/images/landing/logistics.png";
import icnPlayW33 from "@/assets/images/icons/icn_play_w33.svg";
import icnLinkW33 from "@/assets/images/icons/icn_link_w33.svg";
import icnLinkOut from "@/assets/images/icons/icn_link_out.svg";

interface Story {
  image: StaticImageData;
  category: string;
  date: string;
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
    icon: StaticImageData;
  };
}

const stories: Story[] = [
  {
    image: transportCard,
    category: "Transport & Logistics",
    date: "29 Jul 2025",
    title:
      "Partnering with Jacobs Transport helped them expand operations and embrace sustainability.",
    description:
      "See how our partnership with Jacobs Transport helped them expand their operations, embrace sustainability, and take bold steps into the future.",
    cta: {
      label: "WATCH VIDEO",
      href: "/",
      icon: icnPlayW33,
    },
  },
  {
    image: agriculture,
    category: "Agriculture",
    date: "23 Sep 2024",
    title: "Standard Bank's first hydro plant financing to power up Lowmar Farm.",
    description:
      "We partnered with Lowmar Farm by providing a financial solution comprising a multi-product structure to finance the new hydro project.",
    cta: {
      label: "READ MORE",
      href: "/",
      icon: icnLinkW33,
    },
  },
  {
    image: logistics,
    category: "Logistics",
    date: "19 Nov 2025",
    title:
      "GALXBOY Growth story from Mamelodi to the world, from one rebellious t-shirt to a fashion empire.",
    description:
      "See how GALXBOY rose from local hustle to global legacy. When you lift your community, your story becomes theirs.",
    cta: {
      label: "READ MORE",
      href: "/",
      icon: icnPlayW33,
    },
  },
];

function StoryCard({ image, category, date, title, description, cta }: Story) {
  return (
    <div className="flex flex-col">
      {/* Image with icon overlay */}
      <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
        <Image src={image} alt={title} fill className="object-cover" />
        <div className="absolute bottom-0 left-0 w-16 h-16 rounded-tr-md bg-primary flex items-center justify-center">
          <Image src={cta.icon} alt="" width={33} height={33} />
        </div>
      </div>

      {/* Content */}
      <div className="mt-6 flex flex-col flex-1">
        <p className="text-xs md:text-sm text-white">
          {category}
          <span className="mx-2">|</span>
          {date}
        </p>

        <h3 className="mt-2 text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-white leading-snug">
          {title}
        </h3>

        <p className="mt-3 text-sm md:text-base text-white leading-relaxed flex-1">{description}</p>

        <Link
          href={cta.href}
          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary-light hover:text-primary transition-colors uppercase tracking-wide"
        >
          {cta.label}
          <svg
            width="10"
            height="14"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 1L6.5 6L1.5 11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

function SuccessStories() {
  return (
    <section className="py-10 md:py-12 lg:py-16 bg-neutral-900">
      <div className="page-container">
        <SectionHeader
          title="Client success stories"
          description="Find out how our solutions are positively impacting clients"
          titleClassName="text-white"
          descriptionClassName="text-neutral-500"
        />

        <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {stories.map((story) => (
            <StoryCard key={story.title} {...story} />
          ))}
        </div>

        <div className="mt-10 md:mt-12 flex justify-center">
          <Link href="/" target="_blank">
            <Button className="px-6">
              View More Stories
              <Image src={icnLinkOut} alt="" width={14} height={14} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SuccessStories;
