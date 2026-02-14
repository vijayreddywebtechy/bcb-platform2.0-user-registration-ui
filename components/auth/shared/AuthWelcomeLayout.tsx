import Image from "next/image";
import authBg from "@/assets/images/shapes/auth_shape_bg.png";
import sbBrandIcon from "@/assets/sb_brand_icon.png";

export default function AuthWelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-10 min-h-screen bg-primary-deep flex flex-col items-center py-6 px-4">
      <Image
        src={authBg}
        alt="auth background"
        className="absolute inset-0 -z-[1] w-auto h-auto object-cover left-1/2 top-0 -translate-x-1/2"
      />
      <Image src={sbBrandIcon} alt="sb brand icon" className="my-4" width={88} height={103} />
      <span className="text-xs text-blue-500 inline-block mt-1">Version 2.0</span>
      <div className="w-full max-w-4xl flex-1 flex flex-col justify-center">{children}</div>
    </div>
  );
}
