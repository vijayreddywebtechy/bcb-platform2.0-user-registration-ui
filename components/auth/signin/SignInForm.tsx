"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "../shared/AuthLayout";
import AuthCard from "../shared/AuthCard";
import { Button } from "@/components/ui/button";
import { FloatingTextField } from "@/components/ui/FloatingTextField";
import { Eye, EyeOff, FlaskConical } from "lucide-react";
import Link from "next/link";
import { lsSet } from "@/lib/utils/localStorage";
import { LocalStorageKeys } from "@/lib/constants/localStorageKeys";

// ── Dev mock credentials ──────────────────────────────────────────────────────
const DEV_USERNAME = "simplybluweb";
const DEV_PASSWORD = "Simple@1234";
const IS_DEV_BYPASS = process.env.NEXT_PUBLIC_DEV_SKIP_PING_AUTH === "true";

export default function SignInForm() {
  const router = useRouter();

  // Pre-fill with mock credentials when dev bypass is active
  const [username, setUsername] = useState(IS_DEV_BYPASS ? DEV_USERNAME : "");
  const [password, setPassword] = useState(IS_DEV_BYPASS ? DEV_PASSWORD : "");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!username.trim() || !password.trim()) {
      setAuthError("Please enter your username and password.");
      return;
    }

    setLoading(true);

    

    // ── Production — POST to /api/auth/signin, receive Ping URL, redirect ──
    try {
      const res = await fetch("/api/auth/signin", { method: "POST" });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Sign-in initiation failed.");
      }

      const { authorizationUrl } = await res.json();

      // PKCE cookies are set server-side by /api/auth/signin — nothing sensitive
      // touches the browser. We only note the state in localStorage for debugging.
      lsSet(LocalStorageKeys.PING_OAUTH_STATE, new URL(authorizationUrl).searchParams.get("state") ?? "");
      
      window.location.href = authorizationUrl;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign-in failed. Please try again.";
      setAuthError(message);
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard className="w-full max-w-lg mx-auto">

        {/* Dev mode notice — only visible when bypass is active */}
        {IS_DEV_BYPASS && (
          <div className="flex items-start gap-2 rounded-md bg-amber-50 border border-amber-300 px-3 py-2 mb-6 text-xs text-amber-800">
            <FlaskConical className="w-4 h-4 mt-0.5 shrink-0" />
            <span>
              <strong>Dev mode</strong> — Ping auth bypassed.
              Sign in goes directly to the OTP screen.
              Set <code>NEXT_PUBLIC_DEV_SKIP_PING_AUTH=false</code> to enable Ping.
            </span>
          </div>
        )}

        <div className="text-center mb-8">
          <h1 className="text-3xl text-secondary mb-2">Sign in</h1>
          <p className="text-neutral-900 text-base leading-relaxed">
            Use your username &amp; password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {authError && (
            <div
              role="alert"
              aria-live="assertive"
              className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              {authError}
            </div>
          )}

          <FloatingTextField
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            helperText="*Required"
            autoComplete="username"
            required
            aria-required="true"
          />

          <div className="relative">
            <FloatingTextField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="*Required"
              required
              autoComplete="current-password"
              wrapperClassName="mb-0"
              style={{ paddingRight: "48px" }}
              aria-required="true"
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

          <div className="space-y-3 pt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              aria-busy={loading}
            >
              {loading
                ? IS_DEV_BYPASS
                  ? "SIGNING IN..."
                  : "REDIRECTING TO AUTHENTICATION..."
                : "SIGN IN"}
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
