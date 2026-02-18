"use client";

import { useState, useEffect } from "react";
import AuthLayout from "../shared/AuthLayout";
import AuthCard from "../shared/AuthCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import qrCodeImage from "@/assets/images/general/qr_code_graphic.png";
import Link from "next/link";

interface QRScannerProps {
  expiryMinutes?: number;
  onSignInWithPassword?: () => void;
  onCancel?: () => void;
  onExpandQR?: () => void;
}

export default function SignInWithQR({
  expiryMinutes = 3,
  onSignInWithPassword,
  onCancel,
  onExpandQR,
}: QRScannerProps) {
  const [secondsLeft, setSecondsLeft] = useState(expiryMinutes * 60);

  useEffect(() => {
    setSecondsLeft(expiryMinutes * 60);
  }, [expiryMinutes]);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = window.setInterval(
      () => setSecondsLeft((prev) => Math.max(prev - 1, 0)),
      1000
    );

    return () => window.clearInterval(timer);
  }, [secondsLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleExpandQR = () => {
    console.log("Expand QR code clicked");
    onExpandQR?.();
  };

  const handleSignInWithPassword = () => {
    console.log("Sign in with password clicked");
    onSignInWithPassword?.();
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    onCancel?.();
  };

  return (
    <AuthLayout>
      <AuthCard className="w-full max-w-lg mx-auto mb-4">
        <div className="w-full md:max-w-80 mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl text-secondary mb-2">Sign in</h1>
            <p className="text-neutral-900 text-base leading-relaxed">
              Now, scan a digitally secure QR code with the banking app sign in.
            </p>
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <ol className="text-gray-900 text-sm leading-relaxed space-y-1 list-decimal pl-5">
              <li>Open the banking app on your phone.</li>
              <li>Tap the SCAN QR icon.</li>
              <li>Point the scanner at this QR code to scan it</li>
            </ol>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mb-6">
            <div className="relative w-52 h-52">
              <Image
                src={qrCodeImage}
                alt="QR Code"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Expand QR Button */}
          <Button
            onClick={handleExpandQR}
            className="w-full mb-4"
          >
            EXPAND QR CODE
          </Button>

          {/* Expiry Notice */}
          <p className="text-center text-sm text-gray-600 mb-4">
            This code expires in {formatTime(secondsLeft)} mins
          </p>

          {/* Info Link */}
          <div className="text-center mb-6">
            <a
              href="#"
              className="text-primary text-sm hover:text-primary-dark transition-colors"
            >
              Information about this security upgrade
            </a>
          </div>

          {/* Sign In with Password Button */}
          <Link href="/business-profiles">
            <Button
              variant="outline"
              onClick={handleSignInWithPassword}
              className="w-full mb-3"
            >
              SIGN IN WITH PASSWORD
            </Button>
          </Link>

          {/* Cancel Link */}
          <div className="text-center">
            <Link href="/" className="block">
              <Button
                variant="link"
                type="button"
                onClick={handleCancel}
                className="hover:no-underline"
              >
                CANCEL
              </Button>
            </Link>
          </div>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
