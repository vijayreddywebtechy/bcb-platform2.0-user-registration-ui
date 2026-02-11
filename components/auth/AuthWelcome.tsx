"use client";

import { useState } from "react";
import SignInContainer from "./signin/SignInContainer";
import RegisterForm from "./register/RegisterForm";
import InviteForm from "./invite/InviteForm";
import AuthLayout from "./shared/AuthLayout";
import AuthCard from "./shared/AuthCard";
import AuthWelcomeLayout from "./shared/AuthWelcomeLayout";
import { Button } from "../ui/button";
import Link from "next/link";

type ViewType = "welcome" | "signin" | "register" | "invite";

export default function AuthWelcome() {
  const [currentView, setCurrentView] = useState<ViewType>("welcome");

  if (currentView === "signin") {
    return <SignInContainer />;
  }

  if (currentView === "register") {
    return <RegisterForm />;
  }

  if (currentView === "invite") {
    return <InviteForm />;
  }

  return (
    <AuthWelcomeLayout>
      <div className="flex-1 flex flex-col justify-center w-full max-w-md mx-auto space-y-6 px-2">
        <div className="text-center">
          <p className="text-white text-xl mb-1">Welcome to the</p>
          <h1 className="text-white text-4xl font-medium mb-5">Business Hub</h1>
          <p className="text-blue-200 text-xs leading-relaxed md:px-10">
            Sign in with your Online Banking for Business credentials. If you
            are new to the bank or on Business Online, please register first.
          </p>
        </div>

        <div className="space-y-4">
          <Button onClick={() => setCurrentView("signin")} className="w-full ">
            SIGN IN
          </Button>

          <Button
            variant="outline"
            onClick={() => setCurrentView("register")}
            className="w-full bg-white hover:bg-white"
          >
            REGISTER
          </Button>

          <Button
            variant="outline"
            onClick={() => setCurrentView("invite")}
            className="w-full bg-transparent hover:bg-transparent text-white hover:text-white border-white"
          >
            USE INVITE
          </Button>
        </div>

        <div className="text-center px-8">
          <p className="text-white text-xs max-w-64 mx-auto leading-relaxed">
            By signing in, I agree to the{" "}
            <Link
              href="/terms"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              T&Cs
            </Link>{" "}
            on behalf of all the legal entities I represent
          </p>
        </div>
      </div>

      <div className="mt-auto">
        <p className="text-center text-blue-200 text-xs leading-relaxed">
          Standard Bank is a licensed financial services provider in terms of
          the Financial Advisory and Intermediary Services Act and a registered
          credit provider in terms of the National Credit Act, registration
          number NCRCP15.
        </p>
      </div>
      {/* <AuthCard>
        <div className="space-y-4 mt-8">
          <button
            onClick={() => setCurrentView("signin")}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <div className="text-left">
                <div className="font-bold">Sign In</div>
                <div className="text-xs text-blue-100">Access your account</div>
              </div>
            </div>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={() => setCurrentView("register")}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <div className="text-left">
                <div className="font-bold">Register</div>
                <div className="text-xs text-gray-500">Create a new account</div>
              </div>
            </div>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={() => setCurrentView("invite")}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div className="text-left">
                <div className="font-bold">Invite Users</div>
                <div className="text-xs text-gray-500">Send team invitations</div>
              </div>
            </div>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Need help?{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact Support
            </a>
          </p>
        </div>
      </AuthCard> */}
    </AuthWelcomeLayout>
  );
}
