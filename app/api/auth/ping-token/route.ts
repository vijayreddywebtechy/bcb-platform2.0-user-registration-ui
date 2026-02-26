import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/auth/ping-token
 *
 * Server-side proxy for the Ping Federate token exchange.
 * Running server-side means:
 *  - Logs appear in the terminal (not just browser DevTools)
 *  - No CORS issues — request originates from the server
 */
export async function POST(req: NextRequest) {
    try {
        const { code } = await req.json();

        if (!code) {
            return NextResponse.json({ error: "Missing authorization code" }, { status: 400 });
        }

        const tokenUrl = process.env.NEXT_PUBLIC_ACCESS_TOKEN_URL!;
        const clientId = process.env.NEXT_PUBLIC_PING_CLIENT_ID!;
        const clientSecret = process.env.NEXT_PUBLIC_PING_CLIENT_SECRET!;
        const redirectUri = process.env.NEXT_PUBLIC_PING_REDIRECT_URI!;
        const grantType = process.env.NEXT_PUBLIC_PING_GRANT_TYPE!;
        const codeVerifier = process.env.NEXT_PUBLIC_PING_CODE_VERIFIER!;

        const body = new URLSearchParams();
        body.append("code", code);
        body.append("redirect_uri", redirectUri);
        body.append("grant_type", grantType);
        body.append("client_id", clientId);
        body.append("code_verifier", codeVerifier);
        body.append("client_secret", clientSecret);

        // ── Terminal logs (visible in npm run dev output) ──────────────────────
        console.log("═══════════════════════════════════════════════════");
        console.log("[PingAuth] STEP 2 — Token exchange request");
        console.log("  Token URL    :", tokenUrl);
        console.log("  client_id    :", clientId);
        console.log("  redirect_uri :", redirectUri);
        console.log("  grant_type   :", grantType);
        console.log("  code         :", code);
        console.log("═══════════════════════════════════════════════════");

        const pingResponse = await fetch(tokenUrl, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: body.toString(),
        });

        const data = await pingResponse.json();

        console.log("[PingAuth] STEP 2 — Token exchange response:");
        console.log("  HTTP Status  :", pingResponse.status, pingResponse.statusText);
        console.log("  Response Body:", JSON.stringify(data, null, 2));
        console.log("═══════════════════════════════════════════════════");

        if (!pingResponse.ok || !data?.access_token) {
            return NextResponse.json(
                { error: "Token exchange failed", details: data },
                { status: pingResponse.status }
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("[PingAuth] STEP 2 — Token exchange exception:", message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
