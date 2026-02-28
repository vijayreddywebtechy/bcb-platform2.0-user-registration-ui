"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import SectionHeader from "@/shared/components/shared/SectionHeader";
import { FloatingSelect, SelectOption } from "@/shared/components/ui/FloatingReactSelect";

import icnPhoneSecure from "@/assets/images/icons/icn_phone_secure.png";
import icnDocSuccess from "@/assets/images/icons/icn_document_success.png";
import icnPeopleEdit from "@/assets/images/icons/icn_people_edit.png";

import stepSignin from "@/assets/images/landing/step_signin.png";
import stepAccess from "@/assets/images/landing/step_access.png";
import stepPersonalise from "@/assets/images/landing/step_personalise.png";

interface Step {
  icon: StaticImageData;
  image: StaticImageData;
  step: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: icnPhoneSecure,
    image: stepSignin,
    step: 1,
    title: "Sign in with your banking app",
    description:
      "As an existing customer currently using the Online Banking for Business App, simply sign in using the same username and password. Authenticate yourself, then select the business profile you would like to access.",
  },
  {
    icon: icnDocSuccess,
    image: stepAccess,
    step: 2,
    title: "Get your access approved",
    description:
      "Next, you will need to link your business. You will request access to the platform from a list of known directors, related parties or business representatives. We will verify their details and send them an approval invite.",
  },
  {
    icon: icnPeopleEdit,
    image: stepPersonalise,
    step: 3,
    title: "Personalise your experience",
    description:
      "Finally, after your access, role and permissions have been approved, you will then be able to load your business dashboard and be guided to complete recommended 'next best actions'.",
  },
];

const dropdownOptions: SelectOption[] = [
  { value: "existing", label: "Existing client using the business banking app" },
  { value: "new", label: "New to Standard Bank business banking" },
];

function StepCard({ icon, image, step, title, description }: Step) {
  return (
    <div className="bg-neutral-200 rounded-2xl md:rounded-3xl p-5 md:p-6 flex flex-col h-full">
      {/* Icon */}
      <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center mb-7">
        <Image src={icon} alt={title} width={64} height={64} />
      </div>

      {/* Step Image */}
      <div className="relative w-full rounded-xl overflow-hidden mb-7">
        <Image
          src={image}
          alt={`Step ${step} - ${title}`}
          className="object-cover object-top m-auto w-full"
          width={368}
          height={240}
        />
      </div>

      {/* Step Label & Title */}
      <div className="mb-3">
        <p className="text-lg md:text-xl lg:text-2xl font-medium text-secondary">Step {step}</p>
        <h3 className="text-lg md:text-xl lg:text-2xl text-secondary">{title}</h3>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-secondary">{description}</p>
    </div>
  );
}

function GetStarted() {
  const [selected, setSelected] = useState<SelectOption | null>(dropdownOptions[0]);

  return (
    <section id="get-started" className="py-9 md:py-10 lg:py-12 bg-neutral-50">
      <div className="page-container">
        <SectionHeader
          title="Get started in a few easy steps"
          description="We've simplified access to the Business Hub"
          titleClassName="text-secondary"
          descriptionClassName="text-neutral-500"
        />

        {/* Dropdown */}
        <div className="mt-6 md:mt-8 flex justify-center">
          <div className="w-full max-w-md">
            <FloatingSelect
              label="Select client type"
              options={dropdownOptions}
              value={selected}
              onChange={(newValue) => setSelected(newValue)}
              isSearchable={false}
            />
          </div>
        </div>

        {/* Steps Grid */}
        <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {steps.map((step) => (
            <StepCard key={step.step} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default GetStarted;
