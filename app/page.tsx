import AuthWelcome from "@/components/auth/AuthWelcome";
import BusinessProfiles from "@/components/auth/BusinessProfiles";
import OTPInput from "@/components/auth/signin/OTPInput";
import SignInWithQR from "@/components/auth/signin/SignInWithQR";
import SignInForm from "@/components/auth/signin/SignInForm";
import IdentityVerification from "@/components/VerificationDashboard/IdentityVerification";
import BusinessLinking from "@/components/VerificationDashboard/BusinessLinking";
import ApprovalDetails from "@/components/auth/ApprovalDetails";
import TermsAndConditions from "@/components/auth/TermsAndConditions";
import CaptureInvitationDetails from "@/components/auth/CaptureInvitationDetails";
import ApprovalSent from "@/components/auth/ApprovalSent";
import DeclineReasons from "@/components/auth/DeclineReasons";
import Declined from "@/components/auth/Declined";

export default function Home() {
  return <AuthWelcome />;
}
