import { Suspense } from "react";
import AuthWelcome from "@/components/auth/AuthWelcome";
import OAuthCallbackHandler from "@/components/auth/OAuthCallbackHandler";

/**
 * Root page — dual purpose:
 *
 * 1. Ping Federate OAuth2 callback receiver
 *    Ping redirects to https://localhost:3000?code=...&state=...
 *    OAuthCallbackHandler (Client Component) reads the URL params,
 *    forwards to /api/auth/callback which exchanges the code for tokens,
 *    then redirects to /otp.
 *
 * 2. Welcome screen
 *    When no auth params are present, AuthWelcome is shown normally.
 */
export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <OAuthCallbackHandler />
      </Suspense>
      <AuthWelcome />
    </>
  );
}
