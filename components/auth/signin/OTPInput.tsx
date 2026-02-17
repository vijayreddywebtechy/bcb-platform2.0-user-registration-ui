"use client";

import {
  useState,
  useRef,
  useEffect,
  ClipboardEvent,
  KeyboardEvent,
  FormEvent,
} from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../shared/AuthLayout";
import AuthCard from "../shared/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface OTPInputProps {
  length?: number;
  maskedDestination?: string;
  resendCooldownSeconds?: number;
  onComplete?: (otp: string) => void;
  onResend?: () => void;
}

export default function OTPInput({
  length = 6,
  maskedDestination = "******4280",
  resendCooldownSeconds = 30,
  onComplete,
  onResend,
}: OTPInputProps) {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(resendCooldownSeconds);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, [length]);

  useEffect(() => {
    setSecondsLeft(resendCooldownSeconds);
  }, [resendCooldownSeconds]);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = window.setInterval(
      () => setSecondsLeft((prev) => Math.max(prev - 1, 0)),
      1000
    );

    return () => window.clearInterval(timer);
  }, [secondsLeft]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const nextOtp = [...otp];
    nextOtp[index] = value;
    setOtp(nextOtp);

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }

    const otpString = nextOtp.join("");
    if (otpString.length === length) {
      onComplete?.(otpString);
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Backspace") return;

    e.preventDefault();
    const nextOtp = [...otp];

    if (nextOtp[index]) {
      nextOtp[index] = "";
      setOtp(nextOtp);
      return;
    }

    if (index > 0) {
      nextOtp[index - 1] = "";
      setOtp(nextOtp);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d+$/.test(pastedData)) return;

    const nextOtp = new Array(length).fill("");
    pastedData.split("").forEach((char, index) => {
      nextOtp[index] = char;
    });
    setOtp(nextOtp);

    const focusIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[focusIndex]?.focus();

    if (pastedData.length === length) {
      onComplete?.(pastedData);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");

    // Validation removed for demo - allows navigation without complete OTP
    // This allows quick demo flow without entering all digits
    // if (otpString.length !== length) {
    //   const firstEmpty = otp.findIndex((digit) => !digit);
    //   if (firstEmpty !== -1) {
    //     inputRefs.current[firstEmpty]?.focus();
    //   }
    //   return;
    // }

    // Call the callback if provided (for custom logic)
    console.log("OTP verified:", otpString || "empty (demo mode)");
    onComplete?.(otpString);
    
    // Navigate to QR scan page after OTP verification
    router.push("/auth/qr-scan");
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;

    console.log("Resending OTP");
    setOtp(new Array(length).fill(""));
    setSecondsLeft(resendCooldownSeconds);
    onResend?.();
    inputRefs.current[0]?.focus();
  };

  const countdownLabel = secondsLeft === 1 ? "second" : "seconds";

  return (
    <AuthLayout>
      <AuthCard className="max-w-lg mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-secondary mb-2">Enter one-time PIN</h1>
          <p className="text-neutral-900 text-base leading-relaxed">
            A one-time PIN has been sent to{" "}<br />
            <span>{maskedDestination}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center !text-2xl rounded-lg focus-visible:ring-1 focus-visible:ring-primary p-0"
              />
            ))}
          </div>

          <p className={`text-center text-base text-gray-900`}>
            You can resend the OTP in{" "}
            <span className={secondsLeft > 0 ? "text-red-500 " : ""}>
              {secondsLeft > 0 ? `${secondsLeft} ${countdownLabel}` : "now"}
            </span>
          </p>

          <Button type="submit" className="w-full md:!mt-12">
            SUBMIT
          </Button>

          <div className="flex items-center justify-between text-sm font-medium uppercase">
            <button
              type="button"
              onClick={handleResend}
              disabled={secondsLeft > 0}
              className={`transition-colors ${secondsLeft > 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-primary hover:text-primary-dark"
                }`}
            >
              RESEND
            </button>
            <button
              type="button"
              className="text-primary transition-colors hover:text-primary-dark"
            >
              HELP
            </button>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
