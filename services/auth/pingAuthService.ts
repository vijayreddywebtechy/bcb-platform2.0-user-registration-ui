/**
 * Ping Identity OAuth 2.0 – Authorization, Token & UserInfo Service
 *
 * STEP 1 – Authorization redirect (on Sign In click)
 *   → buildPingAuthUrl(username, password)  — builds the URL
 *   → redirectToPingAuth(username, password) — fires the redirect
 *
 * STEP 2 – Token exchange (on callback with ?code=)
 *   → fetchPingToken(code) — POSTs to token endpoint, returns access_token
 *
 * STEP 3 – UserInfo (after receiving access_token)
 *   → fetchPingUserInfo(access_token) — GETs user profile from Ping UserInfo endpoint
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
 * Redirects the browser to the Ping authorization endpoint via the server.
 * The server securely builds the URL and logs it (including unmasked username and password) 
 * for telemetry and troubleshooting, then returns it.
 */
export async function redirectToPingAuth(username: string, password: string): Promise<void> {
    console.log("[PingAuth] STEP 1 – Requesting authorization URL from local internal server...");

    try {
        const response = await fetch("/api/auth/ping-url", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok || !data?.url) {
            throw new Error(`[PingAuth] URL generation failed (${response.status}): ${data?.error}`);
        }

        const url = data.url;

        // Log for dev/SIT verification cleanly here on the browser too — never log the raw password
        console.log("  Navigating Browser to  :", url.replace(/pf\.pass=[^&]+/, "pf.pass=***"));
        console.log("  client_id   :", new URL(url).searchParams.get("client_id"));
        console.log("  redirect_uri:", new URL(url).searchParams.get("redirect_uri"));
        console.log("  scope       :", new URL(url).searchParams.get("scope"));

        window.location.href = url;
    } catch (err) {
        console.error("Error triggering Ping Auth:", err);
        throw err;
    }
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

    // Persist full token response object for future use (e.g. refresh_token, id_token)
    sessionStorage.setItem("ping_token_response", JSON.stringify({
        ...data,
        timestamp: Date.now() // Keep timestamp to calculate expiration manually if needed
    }));
    // Still keep the raw access token out for quick retrieval if some code depends on it
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

// ─── STEP 3: UserInfo ────────────────────────────────────────────────────────

export interface PingUserInfoResponse {
    sub?: string;
    name?: string;
    given_name?: string;
    family_name?: string;
    email?: string;
    email_verified?: boolean;
    preferred_username?: string;
    /** Any additional claims Ping returns */
    [key: string]: unknown;
}

/**
 * Retrieves the authenticated user's profile from the Ping UserInfo endpoint.
 * Calls the internal Next.js API route (/api/auth/ping-userinfo) which runs
 * server-side — logs appear in the terminal and CORS is bypassed.
 *
 * @param accessToken - The access_token received from STEP 2
 */
export async function fetchPingUserInfo(
    accessToken: string
): Promise<PingUserInfoResponse> {
    console.log("[PingAuth] STEP 3 — Requesting UserInfo");

    const response = await fetch("/api/auth/ping-userinfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: accessToken }),
    });

    const data = await response.json();

    console.log("[PingAuth] STEP 3 — UserInfo response:", data);

    if (!response.ok) {
        throw new Error(
            `[PingAuth] UserInfo request failed (${response.status}): ${JSON.stringify(data)}`
        );
    }

    // Persist user profile for the session
    sessionStorage.setItem("ping_user_info", JSON.stringify(data));

    return data as PingUserInfoResponse;
}
