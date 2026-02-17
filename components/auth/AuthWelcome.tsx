"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import RegisterForm from "./register/RegisterForm";
import InviteForm from "./invite/InviteForm";
import AuthWelcomeLayout from "./shared/AuthWelcomeLayout";
import { Button } from "../ui/button";
import Link from "next/link";
import SignInForm from "./signin/SignInForm";
import { FloatingTextField } from "../ui/FloatingTextField";


type ViewType = "welcome" | "signin" | "register" | "invite";

export default function AuthWelcome() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<ViewType>("welcome");

  // Old inline view switching - kept for reference, now using routes
  // if (currentView === "signin") {
  //   return <SignInForm />;
  // }
  // if (currentView === "register") {
  //   return <RegisterForm />;
  // }
  // if (currentView === "invite") {
  //   return <InviteForm />;
  // }

  return (
    <AuthWelcomeLayout>
      <div className="flex-1 flex flex-col justify-center w-full max-w-md mx-auto space-y-6 px-2">
        <div className="text-center">
          <p className="text-white text-xl mb-1">Welcome to the</p>
          <h1 className="text-white text-[32px] font-medium mb-6">Business Hub</h1>
          <p className="text-blue-200 text-xs leading-relaxed md:px-10">
            Sign in with your Online Banking for Business credentials. If you
            are new to the bank or on Business Online, please register first.
          </p>
        </div>

        <FloatingTextField 
          label="Username" 
          helperText="Create a username using letters only, or a combination of letters, numbers and these special characters ! $ & - ? . @ ^ _ ~"
        />

        <div className="space-y-4">
          <Button 
            onClick={() => {
              console.log("Navigating to Sign In");
              router.push("/auth/signin");
            }} 
            className="w-full"
          >
            SIGN IN
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              console.log("Navigating to Register");
              // setCurrentView("register"); // Old method - kept for reference
              router.push("/auth/register");
            }}
            className="w-full bg-white hover:bg-primary hover:text-white"
          >
            REGISTER
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              console.log("Navigating to Use Invite");
              // setCurrentView("invite"); // Old method - kept for reference
              router.push("/approval/capture-invitation");
            }}
            className="w-full bg-transparent text-white border-white hover:text-white hover:bg-primary hover:border-primary"
          >
            USE INVITE
          </Button>
        </div>

        <div className="text-center px-8">
          <p className="text-white text-xs max-w-64 mx-auto leading-relaxed">
            By signing in, I agree to the{" "}
            <Link
              href="/terms"
              className="text-blue-500 font-bold hover:underline"
            >
              T&Cs
            </Link>{" "}
            on behalf of all the legal entities I represent
          </p>
        </div>
      </div>

      <div className="mt-auto">
        <p className="w-full sm:max-w-3xl mx-auto text-center text-blue-200 text-xs leading-relaxed">
          Standard Bank is a licensed financial services provider in terms of
          the Financial Advisory and Intermediary Services Act and a registered
          credit provider in terms of the National Credit Act, registration
          number NCRCP15.
        </p>
      </div>
    </AuthWelcomeLayout>
  );
}
