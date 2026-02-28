import Link from "next/link";
import Image from "next/image";
import businessHub from "@/assets/images/logos/business_bub.svg";
import icnSignout from "@/assets/images/icons/icn_lock_closed_w.svg";
import { Button } from "@/shared/components/ui/button";

type Props = {};

function Header({}: Props) {
  return (
    <div className="bg-primary-dark border-b border-blue-800">
      <div className="page-container flex items-center justify-between py-3">
        <Link href="/">
          <Image src={businessHub} alt="BizHub Logo" width={190} height={40} />
        </Link>
        <Button variant="transparent" size="iconOnly" className="p-1 hover:bg-primary w-12 h-12">
          <Image src={icnSignout} alt="Signout Icon" width={16} height={20} />
        </Button>
      </div>
    </div>
  );
}

export default Header;
