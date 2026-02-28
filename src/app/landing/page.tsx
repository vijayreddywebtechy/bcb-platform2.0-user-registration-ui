import LandingLayout from "@/shared/components/landing-page/LandingLayout";
import Banner from "@/shared/components/landing-page/Banner";
import DemoVideo from "@/shared/components/landing-page/DemoVideo";
import FoundationalFeatures from "@/shared/components/landing-page/FoundationalFeatures";
import GetStarted from "@/shared/components/landing-page/GetStarted";
import AppDownload from "@/shared/components/landing-page/AppDownload";
import SuccessStories from "@/shared/components/landing-page/SuccessStories";
import AccountsAndServices from "@/shared/components/landing-page/AccountsAndServices";
import HelpAndSupport from "@/shared/components/landing-page/HelpAndSupport";
import FAQ from "@/shared/components/landing-page/FAQ";
import SwitchNow from "@/shared/components/landing-page/SwitchNow";
import FooterInfo from "@/shared/components/landing-page/FooterInfo";

function LandingPage() {
  return (
    <LandingLayout>
      <Banner />
      <DemoVideo />
      <FoundationalFeatures />
      <GetStarted />
      <AppDownload />
      <SuccessStories />
      <AccountsAndServices />
      <HelpAndSupport />
      <FAQ />
      <SwitchNow />
      <FooterInfo />
    </LandingLayout>
  );
}

export default LandingPage;
