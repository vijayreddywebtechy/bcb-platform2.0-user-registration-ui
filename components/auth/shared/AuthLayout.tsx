import Image from "next/image";
import authBg from "@/assets/images/shapes/auth_shape_bg2.png";
import sbBrandIcon from "@/assets/sb_brand_icon.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-10 min-h-screen bg-primary-deep flex flex-col items-center py-6 px-4 overflow-y-auto">
      <Image
        src={authBg}
        alt="auth background"
        className="absolute inset-0 -z-[1] w-auto h-auto object-cover left-1/2 top-0 -translate-x-1/2"
      />
      <Image src={sbBrandIcon} alt="sb brand icon" className="mb-6" width={48} height={56} />
      <div className="w-full flex-1 flex flex-col">
        {children}
        <div className="mt-auto w-full max-w-4xl mx-auto">
          <p className="text-center text-blue-200 text-xs leading-relaxed">
            Standard Bank is a licensed financial services provider in terms of
            the Financial Advisory and Intermediary Services Act and a registered
            credit provider in terms of the National Credit Act. Standard Bank
            is a registered credit provider in terms of the National Credit Act,
            registration number NCRCP15.
          </p>
          </div>  
      </div>
    </div>
  );
}
