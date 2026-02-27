import { NextRequest, NextResponse } from "next/server";
import { API_CONFIG } from "@/config";

/**
 * POST /api/auth/ping-token
 *
 * Server-side proxy for the Ping Federate Authorization Code + PKCE token exchange.
 *
 * Security notes:
 * - client_secret is read from a server-only env var (no NEXT_PUBLIC_ prefix)
 *   so it is never exposed to the browser bundle.
 * - grant_type is always "authorization_code" for this PKCE flow.
 *   Do NOT use "client_credentials" here — that issues machine tokens with no
 *   user identity, which will cause 403 on the UserInfo endpoint.
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as { code?: string };
        const { code } = body;

        if (!code || typeof code !== "string" || code.trim() === "") {
            return NextResponse.json(
                { error: "Missing or invalid authorization code" },
                { status: 400 }
            );
        }

        // ── Server-only env vars (NOT prefixed with NEXT_PUBLIC_) ───────────────
        // These are never shipped to the browser bundle.
        const tokenUrl = API_CONFIG.ping.tokenUrl;
        const clientId = process.env.PING_CLIENT_ID;
        const clientSecret = process.env.PING_CLIENT_SECRET;
        const redirectUri = process.env.PING_REDIRECT_URI;
        const codeVerifier = process.env.PING_CODE_VERIFIER;

        // Validate all required server config is present
        const missing = (
            [
                ["PING_TOKEN_URL", tokenUrl],
                ["PING_CLIENT_ID", clientId],
                ["PING_CLIENT_SECRET", clientSecret],
                ["PING_REDIRECT_URI", redirectUri],
                ["PING_CODE_VERIFIER", codeVerifier],
            ] as [string, string | undefined][]
        )
            .filter(([, v]) => !v)
            .map(([k]) => k);

        if (missing.length > 0) {
            console.error("[PingAuth] STEP 2 — Missing server env vars:", missing);
            return NextResponse.json(
                { error: "Server misconfiguration: missing environment variables" },
                { status: 500 }
            );
        }

        // ── Build token-exchange body ────────────────────────────────────────────
        // grant_type MUST be "authorization_code" for PKCE flow.
        // Using "client_credentials" issues a machine token with no user identity
        // → UserInfo will return 403.
        const params = new URLSearchParams({
            grant_type: "authorization_code",
            code: code.trim(),
            redirect_uri: redirectUri!,
            client_id: clientId!,
            code_verifier: codeVerifier!,
            client_secret: clientSecret!,
        });

        console.log("═══════════════════════════════════════════════════");
        console.log("[PingAuth] STEP 2 — Token exchange request");
        console.log("  Token URL    :", tokenUrl);
        console.log("  client_id    :", clientId);
        console.log("  redirect_uri :", redirectUri);
        console.log("  grant_type   : authorization_code");
        console.log("  code (first 10):", code.slice(0, 10) + "…");
        console.log("═══════════════════════════════════════════════════");

        const pingResponse = await fetch(tokenUrl!, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                // Some Ping deployments require Basic auth instead of body params.
                // If your SIT Ping client is configured for Basic auth, uncomment:
                // "Authorization": `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
            },
            body: params.toString(),
        });

        let data: unknown;
        const contentType = pingResponse.headers.get("content-type") ?? "";
        if (contentType.includes("application/json")) {
            data = await pingResponse.json();
        } else {
            const text = await pingResponse.text();
            data = { raw: text };
        }

        console.log("[PingAuth] STEP 2 — Token exchange response:");
        console.log("  HTTP Status  :", pingResponse.status, pingResponse.statusText);
        console.log("  Response Body:", JSON.stringify(data, null, 2));
        console.log("═══════════════════════════════════════════════════");

        if (!pingResponse.ok) {
            return NextResponse.json(
                { error: "Token exchange failed", details: data },
                { status: pingResponse.status }
            );
        }

        const tokenData = data as Record<string, unknown>;
        if (!tokenData?.access_token) {
            return NextResponse.json(
                { error: "Token exchange succeeded but no access_token in response", details: data },
                { status: 502 }
            );
        }

        // Return only what the client needs — never log or forward client_secret
        return NextResponse.json(
            {
                access_token: tokenData.access_token,
                token_type: tokenData.token_type,
                expires_in: tokenData.expires_in,
                scope: tokenData.scope,
                id_token: tokenData.id_token,
            },
            { status: 200 }
        );
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("[PingAuth] STEP 2 — Token exchange exception:", message);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
