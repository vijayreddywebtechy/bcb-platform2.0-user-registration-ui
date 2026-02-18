"use client";

import { useState, FormEvent } from "react";
import AuthLayout from "../shared/AuthLayout";
import AuthCard from "../shared/AuthCard";
import { Button } from "@/components/ui/button";
import { FloatingTextField } from "@/components/ui/FloatingTextField";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function SignInForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Add your sign in logic here
    console.log("Sign in with:", { username, password });
    setTimeout(() => setLoading(false), 2000);
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    // Add your navigation or logic here
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
            required
          />

          {/* Password Field */}
          <div className="relative">
            <FloatingTextField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="*Required"
              required
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
            <Link href="/otp" className="block">
              <Button
                type="button"
                className="w-full"
                disabled={loading}
              >
                {loading ? "SIGNING IN..." : "SIGN IN"}
              </Button>
            </Link>
            <Link href="/" className="block">
              <Button
                type="button"
                variant="outline"
                className="w-full"
              >
                CANCEL
              </Button>
            </Link>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
