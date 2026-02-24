"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

/**
 * Detects the Ping Federate OAuth2 callback params (?code=&state=)
 * on the root page and forwards them to the server-side callback
 * Route Handler (/api/auth/callback) which exchanges the code for
 * tokens and redirects to /otp.
 *
 * Rendered inside a Suspense boundary in app/page.tsx.
 */
export default function OAuthCallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    if (error) {
      router.replace(
        `/signin?auth_error=${encodeURIComponent(errorDescription ?? error)}`
      );
      return;
    }

    if (code && state) {
      router.replace(
        `/api/auth/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state)}`
      );
    }
  }, [searchParams, router]);

  return null;
}
