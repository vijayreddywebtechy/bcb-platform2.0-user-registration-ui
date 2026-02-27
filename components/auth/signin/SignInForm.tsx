"use client";

import { useState, FormEvent } from "react";
import AuthLayout from "../shared/AuthLayout";
import AuthCard from "../shared/AuthCard";
import { Button } from "@/components/ui/button";
import { FloatingTextField } from "@/components/ui/FloatingTextField";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { redirectToPingAuth } from "@/services/auth/pingAuthService";

export default function SignInForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      return;
    }

    setLoading(true);

    // STEP 1 – Redirect to Ping Federate authorization endpoint.
    // Ping will authenticate and redirect back to redirect_uri?code=...
    try {
      await redirectToPingAuth(username.trim(), password.trim());
    } catch (err: unknown) {
      setLoading(false);
      const message = err instanceof Error ? err.message : String(err);
      setError(`Failed to initiate login: ${message}`);
    }
  };

  return (
    <AuthLayout>
      <AuthCard className="w-full max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl text-secondary mb-2">Sign in</h1>
          <p className="text-neutral-900 text-base leading-relaxed">Use your username &amp; password</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <FloatingTextField
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            helperText="*Required"
            required
            autoComplete="username"
          />

          <div className="relative">
            <FloatingTextField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="*Required"
              required
              wrapperClassName="mb-0"
              style={{ paddingRight: "48px" }}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[14px] text-primary hover:text-primary-dark transition-colors z-10"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {error && (
            <p role="alert" className="text-red-600 text-sm text-center">
              {error}
            </p>
          )}

          <div className="space-y-3 pt-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </Button>
            <Link href="/" className="block">
              <Button type="button" variant="outline" className="w-full">
                CANCEL
              </Button>
            </Link>
          </div>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}
