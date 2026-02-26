/**
 * Ping Identity OAuth 2.0 – Authorization & Token Service
 *
 * STEP 1 – Authorization redirect (on Sign In click)
 *   → buildPingAuthUrl(username, password)  — builds the URL
 *   → redirectToPingAuth(username, password) — fires the redirect
 *
 * STEP 2 – Token exchange (on callback with ?code=)
 *   → fetchPingToken(code) — POSTs to token endpoint, returns access_token
 */

// ─── STEP 1: Authorization Redirect ──────────────────────────────────────────

/**
 * Builds the Ping Federate authorization URL.
 * Includes pf.username / pf.pass for SIT direct credential pass-through.
 */
export function buildPingAuthUrl(username: string, password: string): string {
    const authUrl = process.env.NEXT_PUBLIC_PING_AUTHORIZATION_URL!;
    const clientId = process.env.NEXT_PUBLIC_PING_CLIENT_ID!;
    const redirectUri = process.env.NEXT_PUBLIC_PING_REDIRECT_URI!;
    const codeChallenge = process.env.NEXT_PUBLIC_CODE_CHALLENGE!;
    const challengeMethod = process.env.NEXT_PUBLIC_CODE_CHALLENGE_METHOD!;
    const nonceState = process.env.NEXT_PUBLIC_PING_NONCE_STATE!;

    // Build query string manually to match the working URL format exactly:
    // - scope uses %20 (URLSearchParams produces + which some Ping versions reject)
    // - redirect_uri is fully percent-encoded
    // - pf.username & pf.pass appended for SIT credential pass-through
    const params = [
        `client_id=${encodeURIComponent(clientId)}`,
        `response_type=code`,
        `scope=openid%20email%20profile`,
        `redirect_uri=${encodeURIComponent(redirectUri)}`,
        `code_challenge=${encodeURIComponent(codeChallenge)}`,
        `code_challenge_method=${encodeURIComponent(challengeMethod)}`,
        `nonce=${encodeURIComponent(nonceState)}`,
        `state=${encodeURIComponent(nonceState)}`,
        `pf.username=${encodeURIComponent(username)}`,
        `pf.pass=${encodeURIComponent(password)}`,
    ].join("&");

    return `${authUrl}?${params}`;
}

/**
 * Redirects the browser to the Ping authorization endpoint.
 * Logs the full URL and all params before navigating.
 */
export function redirectToPingAuth(username: string, password: string): void {
    const url = buildPingAuthUrl(username, password);

    // Log for dev/SIT verification
    console.log("[PingAuth] STEP 1 – Redirecting to authorization endpoint");
    console.log("  URL    :", url);
    console.log("  Params :", Object.fromEntries(new URL(url).searchParams.entries()));

    window.location.href = url;
}

// ─── STEP 2: Token Exchange ───────────────────────────────────────────────────

export interface PingTokenResponse {
    access_token: string;
    token_type: string;
    expires_in?: number;
    scope?: string;
    id_token?: string;
}

/**
 * Exchanges the Ping authorization code for an access token.
 * Calls the internal Next.js API route (/api/auth/ping-token) which runs
 * server-side — logs appear in the terminal and CORS is bypassed.
 *
 * @param code - Authorization code received from Ping callback (?code=...)
 */
export async function fetchPingToken(code: string): Promise<PingTokenResponse> {
    console.log("[PingAuth] STEP 2 — Sending code to internal token API:", code);

    const response = await fetch("/api/auth/ping-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
    });

    const data = await response.json();

    console.log("[PingAuth] STEP 2 — Internal API response:", data);

    if (!response.ok || !data?.access_token) {
        throw new Error(
            `[PingAuth] Token exchange failed (${response.status}): ${JSON.stringify(data)}`
        );
    }

    // Persist token for subsequent API calls
    sessionStorage.setItem("ping_access_token", data.access_token);
    if (data.expires_in) {
        sessionStorage.setItem("ping_access_token_data", JSON.stringify({
            access_token: data.access_token,
            expires_in: data.expires_in,
            timestamp: Date.now(),
        }));
    }

    // Mark session as authenticated
    document.cookie = "isAuthenticated=true; path=/; max-age=1800; secure; samesite=lax;";

    return data as PingTokenResponse;
}
