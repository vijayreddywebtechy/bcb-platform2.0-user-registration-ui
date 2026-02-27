"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import RegisterForm from "./register/RegisterForm";
import InviteForm from "./invite/InviteForm";
import AuthWelcomeLayout from "./shared/AuthWelcomeLayout";
import { Button } from "../ui/button";
import Link from "next/link";
import SignInForm from "./signin/SignInForm";
import { fetchPingToken, fetchPingUserInfo } from "@/services/auth/pingAuthService";
import { STORAGE_KEYS } from "@/config";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type ViewType = "welcome" | "signin" | "register" | "invite";

export default function AuthWelcome() {
  const [currentView, setCurrentView] = useState<ViewType>("welcome");
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const searchParams = useSearchParams();

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
