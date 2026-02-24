import OTPInput from "@/components/auth/signin/OTPInput";

/**
 * /otp — OTP entry screen.
 *
 * Rendered after the Ping OIDC callback flow completes:
 *   Ping → https://localhost:3000?code=...
 *   app/page.tsx forwards to /api/auth/callback
 *   /api/auth/callback exchanges tokens, sets HTTP-only cookies
 *   → redirects here
 */
export default function OtpPage() {
  return <OTPInput />;
}