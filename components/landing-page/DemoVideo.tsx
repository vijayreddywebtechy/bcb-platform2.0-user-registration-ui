import Image from "next/image";
import dashboardviewLaptop from "@/assets/images/landing/dashboardview_laptop.png";
import { Button } from "@/components/ui/button";
import demoVideoBg from "@/assets/images/landing/demoVideoBg.jpg";
import playBtn from "@/assets/images/icons/icn_play.png";

type Props = {};

function DemoVideo({}: Props) {
  return (
    <section
      id="demo-video"
      className="relative w-full flex items-center justify-center p-4 min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[940px] overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src={demoVideoBg}
        alt="Demo video bg"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
        quality={90}
      />

      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/60 to-gray-950/60 " />
      <div className="z-10 relative flex items-center justify-center">
        <Button
          variant="transparent"
          className="p-0 rounded-full h-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:shadow-xl"
        >
          <Image
            src={playBtn}
            alt="play button"
            width={98}
            height={98}
            className="w-full h-auto"
          />
        </Button>
        <Image
          src={dashboardviewLaptop}
          alt="laptop"
          width={1190}
          height={700}
        />
      </div>
    </section>
  );
}

export default DemoVideo;
