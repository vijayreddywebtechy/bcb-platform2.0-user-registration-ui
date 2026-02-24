import LandingLayout from "@/components/landing-page/LandingLayout"
import Banner from "@/components/landing-page/Banner"
import DemoVideo from "@/components/landing-page/DemoVideo"
import FoundationalFeatures from "@/components/landing-page/FoundationalFeatures"
import GetStarted from "@/components/landing-page/GetStarted"
import AppDownload from "@/components/landing-page/AppDownload"
import SuccessStories from "@/components/landing-page/SuccessStories"
import AccountsAndServices from "@/components/landing-page/AccountsAndServices"
import HelpAndSupport from "@/components/landing-page/HelpAndSupport"
import FAQ from "@/components/landing-page/FAQ"
import SwitchNow from "@/components/landing-page/SwitchNow"
import FooterInfo from "@/components/landing-page/FooterInfo"

function LandingPage() {
  return (
    <LandingLayout>
      <Banner />
      <DemoVideo/>
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
  )
}

export default LandingPage
