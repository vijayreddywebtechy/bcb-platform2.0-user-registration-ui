"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import businessHub from "@/assets/images/logos/business_bub.svg";
import icnSignOut from "@/assets/images/icons/icn_sign_out_lock.svg";
import { Button } from "@/components/ui/button";

type Props = {};

function Header({}: Props) {
  const router = useRouter();

  const handleSignOut = () => {
    console.log("Sign out clicked");
    // Navigate to sign in page
    router.push("/auth/signin");
  };

  return (
    <div className="bg-primary-dark border-b border-blue-800">
      <div className="page-container flex items-center justify-between py-3">
        <Link href="/">
          <Image src={businessHub} alt="BizHub Logo" width={190} height={40} />
        </Link>
        <Button variant="transparent" size="iconOnly" onClick={handleSignOut}>
          <Image src={icnSignOut} alt="Signout Icon" width={48} height={48} />
        </Button>
      </div>
    </div>
  );
}

export default Header;
