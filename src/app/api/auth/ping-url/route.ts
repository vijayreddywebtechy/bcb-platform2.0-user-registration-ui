import { NextRequest, NextResponse } from "next/server";
import { API_CONFIG } from "@/config";

/**
 * POST /api/auth/ping-url
 *
 * Server-side endpoint to generate the Ping Federate authorization URL
 * and log it natively in the server console along with the credentials.
 *
 * This was requested specifically for logging the first API call 
 * with the complete URL including username and password on the server.
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json(
                { error: "Username and password are required to build the auth URL" },
                { status: 400 }
            );
        }

        const authUrl = API_CONFIG.ping.authorizationUrl;
        const clientId = process.env.NEXT_PUBLIC_PING_CLIENT_ID ?? "faad9acc-584a-493d-8c8a-d4b3d68f269c";
        const redirectUri = process.env.NEXT_PUBLIC_PING_REDIRECT_URI ?? "https://localhost:3000";
        const codeChallenge = process.env.NEXT_PUBLIC_CODE_CHALLENGE ?? "xLlqIXgoZfiAwwsDUyE15sM3yN0iJLXgPA1ae32lMxc";
        const challengeMethod = process.env.NEXT_PUBLIC_CODE_CHALLENGE_METHOD ?? "S256";
        const nonceState = process.env.NEXT_PUBLIC_PING_NONCE_STATE ?? "ad8c7dea-7d3d-49dc-8f0a-5e0cec70c389";

        // Build query string manually to match the working URL format exactly
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

        const fullAuthUrl = `${authUrl}?${params}`;

        console.log("═══════════════════════════════════════════════════");
        console.log("[PingAuth] STEP 1 – Server Initial Auth URL Generaton & Trigger");
        console.log("  Full URL with Username & Password:");
        console.log("  ", fullAuthUrl);
        console.log("═══════════════════════════════════════════════════");

        return NextResponse.json({ url: fullAuthUrl }, { status: 200 });

    } catch (err) {
        console.error("[PingAuth] Server URL building exception:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
