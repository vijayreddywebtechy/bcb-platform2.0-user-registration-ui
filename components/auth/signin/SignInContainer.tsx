"use client";

import { useState } from "react";
import SignInWithQR from "./SignInWithQR";
import SignInForm from "./SignInForm";
import Dashboard from "@/components/dashboard/Dashboard";

export type SignInView = "qr" | "password" | "dashboard";

export default function SignInContainer() {
  const [view, setView] = useState<SignInView>("qr");

  const handleSignInWithPassword = () => setView("password");
  const handleSignInSuccess = () => setView("dashboard");
  const handleBackToQR = () => setView("qr");

  if (view === "dashboard") {
    return <Dashboard />;
  }

  if (view === "password") {
    return (
      <SignInForm
        onSignInSuccess={handleSignInSuccess}
        onBack={handleBackToQR}
      />
    );
  }

  return (
    <SignInWithQR
      onSignInWithPassword={handleSignInWithPassword}
      onCancel={handleBackToQR}
    />
  );
}
