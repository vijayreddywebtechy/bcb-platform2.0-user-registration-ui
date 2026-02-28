"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { Label } from "@/shared/components/ui/label";
import StepActions from "./StepActions";
import icnPeopleSecure from "@/assets/images/icons/icn_people_1_secure.svg";

type PartyType = "related";

interface InviteTypeProps {
  onNext?: () => void;
  onBack?: () => void;
}

const partyOptions: {
  value: PartyType;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "related",
    label: "Related party",
    description: "Someone with an existing business relationship with your company.",
    icon: <Image src={icnPeopleSecure} alt="" width={28} height={28} className="text-primary" />,
  },
];

export default function InviteType({ onNext, onBack }: InviteTypeProps) {
  const [selected, setSelected] = useState<PartyType>("related");

  return (
    <div className="w-full lg:max-w-[640px]">
      {/* Icon */}
      <div className="mb-4">
        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
          <Users className="w-7 h-7 text-primary" strokeWidth={1.5} />
        </div>
      </div>

      {/* Heading */}
      <h1 className="text-xl md:text-2xl font-bold text-secondary mb-2">Add team member(s)</h1>

      {/* Subtitle */}
      <p className="text-sm text-secondary mb-8 leading-relaxed">
        Add new team member(s) or collaborator
      </p>

      {/* Radio options */}
      <RadioGroup
        value={selected}
        onValueChange={(val) => setSelected(val as PartyType)}
        className="space-y-3 mb-10"
      >
        {partyOptions.map((option) => (
          <label key={option.value} className="flex items-center gap-4 cursor-pointer">
            <RadioGroupItem value={option.value} id={option.value} />
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              {option.icon}
            </div>
            <div>
              <Label
                htmlFor={option.value}
                className="text-base font-semibold text-secondary cursor-pointer"
              >
                {option.label}
              </Label>
              <p className="text-sm text-gray-500 mt-0.5">{option.description}</p>
            </div>
          </label>
        ))}
      </RadioGroup>

      {/* Actions */}
      <StepActions onBack={onBack} onNext={onNext} />
    </div>
  );
}
