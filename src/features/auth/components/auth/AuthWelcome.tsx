"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import RegisterForm from "./register/RegisterForm";
import InviteForm from "./invite/InviteForm";
import AuthWelcomeLayout from "./shared/AuthWelcomeLayout";
import { Button } from "@/shared/components/ui/button";
import Link from "next/link";
import SignInForm from "./signin/SignInForm";
import OTPInput from "./signin/OTPInput";
import BusinessProfiles from "./BusinessProfiles";
import { fetchPingToken, fetchPingUserInfo } from "@/features/auth/services/auth/pingAuthService";
import { STORAGE_KEYS } from "@/config";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

const OTP_MESSAGES: Record<string, string> = {
  "0000": "Success",
  "2001": "Technical error. Please try again later",
  "1001": "Invalid OTP",
  "1021": "OTP regenerated after 3 invalid attempts",
  "1022": "OTP regenerated after 3 invalid attempts",
  "1023": "Your OTP has expired and a new one has been sent",
  "1025": "No OTP specified",
  "1026": "You have exceeded the number of attempts. Please contact your branch.",
  "1030": "System error",
};

const getOtpMessage = (code: string | null) => {
  if (!code) return "An unexpected error occurred.";
  return OTP_MESSAGES[code] || `An unexpected error occurred. (Code: ${code})`;
};

type ViewType = "welcome" | "signin" | "register" | "invite" | "otp" | "business";

export default function AuthWelcome() {
  const [currentView, setCurrentView] = useState<ViewType>("welcome");
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [otpCell, setOtpCell] = useState<string>("");
  const [otpQname, setOtpQname] = useState<string>("");
  const [otpLoading, setOtpLoading] = useState<boolean>(false);
  const [otpError, setOtpError] = useState<string>("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Handle Ping authorization callback: exchange ?code= for an access token.
  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    if (error) {
      console.error("[PingAuth] Authorization error received:");
      console.error("  error             :", error);
      console.error("  error_description :", errorDescription);
      setTokenError(`Ping auth error: ${error} – ${errorDescription ?? ""}`);
      return;
    }

    if (code) {
      console.log("[PingAuth] Authorization code received:");
      console.log("  code  :", code);
      console.log("  state :", state);

      // STEP 2: Exchange the authorization code for an access token
      fetchPingToken(code)
        .then(async (tokenData) => {
          console.log("[PingAuth] Token exchange successful:");
          console.log("  access_token :", tokenData.access_token);
          console.log("  token_type   :", tokenData.token_type);
          console.log("  expires_in   :", tokenData.expires_in);
          console.log("  scope        :", tokenData.scope);

          // STEP 3: Fetch user info using the obtained access token
          try {
            const userInfo = await fetchPingUserInfo(tokenData.access_token);
            console.log("[PingAuth] UserInfo received:");
            console.log("  sub              :", userInfo.sub);
            console.log("  name             :", userInfo.name);
            console.log("  email            :", userInfo.email);
            console.log("  preferred_username:", userInfo.preferred_username);
            console.log("  full payload      :", JSON.stringify(userInfo, null, 2));

            // Store the UserInfo mapping
            sessionStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));

            // STEP 4: Fetch standard bank customer profile
            // We expect the customer UUID to be stored in `userInfo.id`.
            const customerUuid = userInfo.id as string;
            if (customerUuid && typeof customerUuid === "string") {
              try {
                // Dynamically import to keep it client safe since it's a client component
                const { getCustomerByUuid } = await import("@/services/customers/customerService");
                const customerProfile = await getCustomerByUuid(customerUuid, tokenData.access_token);
                console.log("[CustomerAPI] Customer Profile received:", JSON.stringify(customerProfile, null, 2));
                // Store in session storage using centralized keys array
                sessionStorage.setItem(STORAGE_KEYS.CUSTOMER_PROFILE, JSON.stringify(customerProfile));

                // STEP 5: Mobile Auth / OTP if partyId exists
                if (customerProfile?.customer?.partyId) {
                  try {
                    console.log("[MobileAuth] partyId found, initializing mobile auth...");
                    const { authenticateMobileOtp } = await import("@/features/auth/services/auth/mobileOtpService");
                    const mobileOtpAuth = await authenticateMobileOtp();

                    if (mobileOtpAuth?.access_token) {
                      const rawCellNumber = "0845484511"; //test : 0845484511; Praveen:0810395892 userInfo.cellnumber as string;
                      if (rawCellNumber) {
                        const cellNumber = rawCellNumber.startsWith("0") ? rawCellNumber.substring(1) : rawCellNumber;
                        console.log(`[MobileOTP] Sending OTP to ${cellNumber}...`);
                        const { sendOtp } = await import("@/features/auth/services/otp/unsecuredLendingOtpService");
                        const otpResponse = await sendOtp(cellNumber, mobileOtpAuth.access_token);
                        console.log("[MobileOTP] OTP dispatched successfully:", JSON.stringify(otpResponse, null, 2));

                        // Always transition to OTP view to allow Resend and surface errors correctly
                        setOtpCell(cellNumber);
                        setOtpQname(otpResponse?.extracted?.qname || "");
                        setCurrentView("otp");

                        if (otpResponse?.extracted?.responseCode !== "0000" && otpResponse?.extracted?.responseCode) {
                          const code = otpResponse?.extracted?.responseCode;
                          setOtpError(getOtpMessage(code));
                          console.error("[OTP] Invalid generate response code:", code);
                        }
                      } else {
                        console.warn("[MobileOTP] No cellnumber found in userInfo to send OTP.");
                      }
                    }
                  } catch (otpErr: unknown) {
                    const message = otpErr instanceof Error ? otpErr.message : String(otpErr);
                    console.error("[MobileOTP] Failed during Mobile Auth / OTP flow:", message);
                  }
                }
              } catch (customerErr: unknown) {
                const message = customerErr instanceof Error ? customerErr.message : String(customerErr);
                console.error("[CustomerAPI] Setup failed to fetch customer profile:", message);
                setShowErrorPopup(true);
              }
            } else {
              console.warn("[CustomerAPI] No valid id found on user profile to fetch customer details.");
            }

          } catch (userInfoErr: unknown) {
            const message =
              userInfoErr instanceof Error ? userInfoErr.message : String(userInfoErr);
            console.error("[PingAuth] UserInfo request failed:", message);
            // Not a fatal error — token was obtained successfully; log and continue
          }
        })
        .catch((err: unknown) => {
          const message = err instanceof Error ? err.message : String(err);
          console.error("[PingAuth] Token exchange failed:", message);
          setTokenError(message);
        });
    }
  }, [searchParams]);

  if (currentView === "signin") {
    return <SignInForm />;
  }

  if (currentView === "register") {
    return <RegisterForm />;
  }

  if (currentView === "invite") {
    return <InviteForm />;
  }

  if (currentView === "business") {
    return <BusinessProfiles />;
  }

  if (currentView === "otp") {
    const masked = otpCell && otpCell.length >= 4
      ? `******${otpCell.slice(-4)}`
      : "******0000";

    return (
      <OTPInput
        length={5}
        maskedDestination={masked}
        resendCooldownSeconds={30}
        isLoading={otpLoading}
        errorMessage={otpError}
        onComplete={async (otpCode) => {
          console.log("[OTP] Entered OTP is:", otpCode);
          setOtpLoading(true);
          setOtpError("");
          try {
            const { validateOtp } = await import("@/features/auth/services/otp/unsecuredLendingOtpService");
            const mobileToken = sessionStorage.getItem("sysauth_mobile_otp_token");
            if (!mobileToken) {
              setOtpError("Session expired. Please start over.");
              return;
            }

            const validResponse = await validateOtp(otpCell, otpCode, otpQname, mobileToken);
            console.log("[OTP] Validate response:", validResponse);

            if (validResponse?.extracted?.responseCode === "0000") {
              console.log("[OTP] Fully Validated! Continuing to business profile selection...");
              setCurrentView("business");
            } else {
              const code = validResponse?.extracted?.responseCode || null;
              setOtpError(getOtpMessage(code));
              console.error("[OTP] Invalid validation response code:", code);
            }
          } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            console.error("[OTP] Validate failed:", msg);
            setOtpError("Error verifying OTP. Please try again.");
          } finally {
            setOtpLoading(false);
          }
        }}
        onResend={async () => {
          console.log("[OTP] Requesting new OTP...");
          setOtpLoading(true);
          setOtpError("");
          try {
            const { authenticateMobileOtp } = await import("@/features/auth/services/auth/mobileOtpService");
            const mobileOtpAuth = await authenticateMobileOtp();

            if (mobileOtpAuth?.access_token) {
              const { sendOtp } = await import("@/features/auth/services/otp/unsecuredLendingOtpService");
              const otpResponse = await sendOtp(otpCell, mobileOtpAuth.access_token);
              console.log("[MobileOTP] OTP dispatched successfully:", JSON.stringify(otpResponse, null, 2));

              if (otpResponse?.extracted?.responseCode !== "0000" && otpResponse?.extracted?.responseCode) {
                const code = otpResponse?.extracted?.responseCode;
                setOtpError(getOtpMessage(code));
                console.error("[OTP] Invalid generate response code on resend:", code);
              } else {
                setOtpQname(otpResponse?.extracted?.qname || "");
              }
            } else {
              setOtpError("Failed to obtain mobile token.");
            }
          } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            console.error("[OTP] Resend failed:", msg);
            setOtpError("Error resending OTP. Please try again.");
          } finally {
            setOtpLoading(false);
          }
        }}
      />
    );
  }

  return (
    <AuthWelcomeLayout>
      <Dialog open={showErrorPopup} onOpenChange={setShowErrorPopup}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-center mt-4">Oops! something went wrong.</DialogTitle>
            <DialogDescription className="text-center pt-2 pb-6">
              Try Again
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center w-full">
            <Button onClick={() => window.location.href = "/"} className="w-1/2 py-6 font-medium text-lg">
              ok
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex-1 flex flex-col justify-center w-full max-w-md mx-auto px-2">
        <div className="text-center">
          <p className="text-white text-xl mb-0.5">Welcome to the</p>
          <h1 className="text-white text-[32px] font-medium mb-5">Business Hub</h1>
          <p className="text-blue-100/90 text-xs leading-relaxed md:px-10 mb-3.5">
            Sign in with your Online Banking for Business credentials. If you are new to the bank or
            on Business Online, please register first.
          </p>
        </div>
        <div className="space-y-4">
          <Link href="/signin" className="block">
            <Button className="w-full">SIGN IN</Button>
          </Link>

          <Link href="/register" className="block">
            <Button variant="outline" className="w-full">
              REGISTER
            </Button>
          </Link>

          <Link href="/invite" className="block">
            <Button
              variant="outline"
              className="w-full bg-transparent text-white border-white hover:text-white hover:bg-primary-dark hover:border-primary-dark"
            >
              USE INVITE
            </Button>
          </Link>
        </div>

        <div className="text-center px-8 mt-6">
          <p className="text-white text-xs max-w-64 mx-auto leading-relaxed">
            By signing in, I agree to the{" "}
            <Link href="/terms" className="text-blue-500 font-bold hover:underline">
              T&Cs
            </Link>{" "}
            on behalf of all the legal entities I represent
          </p>
        </div>
      </div>

      <div className="mt-auto">
        <p className="w-full sm:max-w-3xl mx-auto text-center text-blue-100/90 text-xs leading-relaxed">
          Standard Bank is a licensed financial services provider in terms of the Financial Advisory
          and Intermediary Services Act and a registered credit provider in terms of the National
          Credit Act, registration number NCRCP15.
        </p>
      </div>
    </AuthWelcomeLayout>
  );
}
