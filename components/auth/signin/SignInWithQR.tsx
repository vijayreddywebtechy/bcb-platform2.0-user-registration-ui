"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../shared/AuthLayout";
import AuthCard from "../shared/AuthCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import qrCodeImage from "@/assets/images/general/qr_code_graphic.png";

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
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(expiryMinutes * 60);
  const [scanComplete, setScanComplete] = useState(false);

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
    // Navigate back to sign in with password
    router.push("/auth/signin");
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    onCancel?.();
    // Navigate back to home/welcome page
    router.push("/");
  };

  // Simulate QR scan completion for demo purposes
  // In production, this would be triggered by actual QR scan event
  const handleSimulateScan = () => {
    console.log("QR Code scanned successfully");
    setScanComplete(true);
    // Navigate to business profiles after successful QR scan
    setTimeout(() => {
      router.push("/auth/business-profiles");
    }, 1500);
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

          {/* Demo: Simulate QR Scan Button - Remove in production */}
          {!scanComplete && (
            <Button
              onClick={handleSimulateScan}
              className="w-full mb-4 bg-green-600 hover:bg-green-700"
            >
              ✓ SIMULATE QR SCAN (DEMO)
            </Button>
          )}

          {/* Success Message */}
          {scanComplete && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 text-center">
              <p className="text-green-700 font-medium">✓ QR Scanned Successfully!</p>
              <p className="text-sm text-green-600">Redirecting...</p>
            </div>
          )}

          {/* Expand QR Button */}
          <Button
            onClick={handleExpandQR}
            className="w-full mb-4"
            disabled={scanComplete}
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
          <Button
            variant="outline"
            onClick={handleSignInWithPassword}
            className="w-full mb-3"
          >
            SIGN IN WITH PASSWORD
          </Button>

          {/* Cancel Link */}
          <div className="text-center">
            <Button
              variant="link"
              type="button"
              onClick={handleCancel}
              className="hover:no-underline"
            >
              CANCEL
            </Button>
          </div>
        </div>
      </AuthCard>
    </AuthLayout>
  );
}
