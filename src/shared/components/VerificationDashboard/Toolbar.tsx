import Image from "next/image";
import icnBuilding from "@/assets/images/icons/icn_building.svg";
import icnClockPast from "@/assets/images/icons/icn_clock_past.svg";
import { Button } from "@/shared/components/ui/button";
import { ReactNode } from "react";

type ToolbarProps = {
  userName?: string;
  organizationName?: string;
  lastSignedIn?: string;
  action?: {
    type?: "button" | "text";
    label: string;
    onClick?: () => void;
  };
  rightSlot?: ReactNode; // fully custom override (optional)
};

function Toolbar({ userName, organizationName, lastSignedIn, action, rightSlot }: ToolbarProps) {
  return (
    <div className="flex justify-between py-6 items-start">
      {/* Left Section */}
      <div className="text-white">
        {userName && (
          <h1 className="text-xl sm:text-2xl md:text-3xl font-medium md:font-bold">{userName}</h1>
        )}

        {organizationName && (
          <div className="flex items-center gap-1 mt-2 text-xs font-normal">
            <Image src={icnBuilding} alt="Organization" width={16} height={16} />
            <span>{organizationName}</span>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6 mt-auto">
        {lastSignedIn && (
          <div className="flex items-center gap-1 text-xs font-normal text-blue-50">
            <Image src={icnClockPast} alt="Last signed in" width={16} height={16} />
            <p>
              Last Signed In - <span className="font-medium">{lastSignedIn}</span>
            </p>
          </div>
        )}

        {/* Action button or text */}
        {action && action.type === "button" && (
          <Button
            variant="outline"
            size="md"
            onClick={action.onClick}
            className="text-white border-white bg-transparent hover:bg-white hover:text-primary-dark px-6"
          >
            {action.label}
          </Button>
        )}

        {action && action.type === "text" && (
          <span
            onClick={action.onClick}
            className="text-white text-sm cursor-pointer hover:underline"
          >
            {action.label}
          </span>
        )}

        {/* Fully custom slot (optional override) */}
        {rightSlot}
      </div>
    </div>
  );
}

export default Toolbar;
