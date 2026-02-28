import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import SectionHeader from "@/shared/components/shared/SectionHeader";

import icnLinkOut from "@/assets/images/icons/icn_link_out_2.svg";
import icnPeopleSecure from "@/assets/images/icons/icn_people_secure.svg";
import icnPeopleProfile from "@/assets/images/icons/icn_people_profile.svg";
import icnDocCertificate from "@/assets/images/icons/icn_document_certificate.svg";
import icnQuery from "@/assets/images/icons/icn_query.svg";
import icnPaint from "@/assets/images/icons/icn_paint.svg";

interface Feature {
  icon: StaticImageData;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: icnLinkOut,
    title: "Digital Hub",
    description:
      "Never forget a password again. Sign into your digital banking platforms automatically through the Digital Hub.",
  },
  {
    icon: icnPeopleSecure,
    title: "Roles & Permissions",
    description:
      "We're, giving you even more control over your banking profile, with enhanced access management features for business admins/owners.",
  },
  {
    icon: icnPeopleProfile,
    title: "Profile management",
    description:
      "Manage notification preferences and linked devices for better security oversight and piece of mind.",
  },
  {
    icon: icnDocCertificate,
    title: "Documents",
    description:
      "Get official stamped monthly bank statements up to 2 years, account confirmation letters and more.",
  },
  {
    icon: icnQuery,
    title: "Query Tracker",
    description:
      "Track and monitor queries in one place. Track their status and stay updated on the progress of your query.",
  },
  {
    icon: icnPaint,
    title: "Appearance",
    description:
      "Personalise your experience by configuring the layout and look of your dashboard and more.",
  },
];

function FeatureCard({ icon, title, description }: Feature) {
  return (
    <div className="bg-blue-50 hover:bg-primary rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col group">
      <div className="w-28 h-28 mb-6 rounded-full bg-white flex items-center justify-center">
        <Image src={icon} alt={title} width={64} height={64} />
      </div>
      <h3 className="text-lg md:text-xl lg:text-2xl text-primary-dark mb-4 group-hover:text-white">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-secondary group-hover:text-white">{description}</p>
    </div>
  );
}

function FoundationalFeatures() {
  return (
    <section id="foundational-features" className="py-9 md:py-10 lg:py-12">
      <div className="page-container">
        <SectionHeader
          title="Foundational features"
          description="To build amazing experiences of the future, we need to first build a solid foundation. Here are some of the key foundational features we're serving first."
        />

        <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>

        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="text-sm md:text-base text-secondary">
            Are you an existing Standard Bank business client?
          </span>
          <Link href="/">
            <Button
              variant="outline"
              className="uppercase font-medium tracking-wide border-primary text-primary hover:bg-primary hover:text-white"
            >
              Get Early Access
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FoundationalFeatures;
