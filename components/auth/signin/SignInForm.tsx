"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../shared/AuthLayout";
import AuthCard from "../shared/AuthCard";
import { Button } from "@/components/ui/button";
import { FloatingTextField } from "@/components/ui/FloatingTextField";
import { Eye, EyeOff } from "lucide-react";

interface SignInFormProps {
  onSignInSuccess?: () => void;
  onBack?: () => void;
}

export default function SignInForm({
  onSignInSuccess,
  onBack,
}: SignInFormProps) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call for sign in logic
    console.log("Sign in with:", { username, password });
    
    // Navigate to OTP page after successful sign in
    setTimeout(() => {
      setLoading(false);
      
      // Call callback if provided, otherwise use router navigation
      if (onSignInSuccess) {
        onSignInSuccess();
      } else {
        router.push("/auth/otp");
      }
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    
    // Call callback if provided, otherwise use router navigation
    if (onBack) {
      onBack();
    } else {
      router.push("/");
    }
  };

  return (
    <AuthLayout>
      <AuthCard className="w-full max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl text-secondary mb-2">Sign in</h1>
          <p className="text-neutral-900 text-base leading-relaxed">
            Use your username & password
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <FloatingTextField
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            helperText="*Required"
            // required prop removed for demo - allows navigation without entering details
          />

          {/* Password Field */}
          <div className="relative">
            <FloatingTextField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="*Required"
              // required prop removed for demo - allows navigation without entering details
              wrapperClassName="mb-0"
              style={{ paddingRight: '48px' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[14px] text-primary hover:text-primary-dark transition-colors z-10"
              style={{ pointerEvents: 'auto' }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="w-full"
            >
              CANCEL
            </Button>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
