import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/auth/ping-userinfo
 *
 * Server-side proxy for the Ping Federate UserInfo endpoint.
 *
 * Why this must run server-side:
 * 1. CORS — Ping does not allow browser origins to call the UserInfo endpoint directly.
 * 2. The access_token is forwarded through the server, never stored in a cookie
 *    or exposed to third-party scripts.
 *
 * Why 403 happens if called with a client_credentials token:
 * - client_credentials tokens are machine tokens with no user identity.
 * - The UserInfo endpoint requires a token issued via authorization_code+PKCE flow
 *   with the "openid" scope. Without it, Ping returns 403 Forbidden.
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as { access_token?: string };
        const { access_token } = body;

        if (!access_token || typeof access_token !== "string" || access_token.trim() === "") {
            return NextResponse.json(
                { error: "Missing or invalid access_token" },
                { status: 400 }
            );
        }

        // Read from server-only env var (no NEXT_PUBLIC_ prefix)
        const userInfoUrl =
            process.env.PING_USERINFO_URL ??
            "https://enterprisestssit.standardbank.co.za/idp/userinfo.openid";

        console.log("═══════════════════════════════════════════════════");
        console.log("[PingAuth] STEP 3 — UserInfo request");
        console.log("  UserInfo URL     :", userInfoUrl);
        console.log("  access_token (10):", access_token.slice(0, 10) + "…");
        console.log("═══════════════════════════════════════════════════");

        const pingResponse = await fetch(userInfoUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${access_token.trim()}`,
                Accept: "application/json",
            },
        });

        let data: unknown;
        const contentType = pingResponse.headers.get("content-type") ?? "";
        if (contentType.includes("application/json")) {
            data = await pingResponse.json();
        } else {
            // Some Ping deployments return application/jwt for the UserInfo response
            const text = await pingResponse.text();
            data = { raw: text };
        }

        console.log("[PingAuth] STEP 3 — UserInfo response:");
        console.log("  HTTP Status  :", pingResponse.status, pingResponse.statusText);
        console.log("  Response Body:", JSON.stringify(data, null, 2));
        console.log("═══════════════════════════════════════════════════");

        if (!pingResponse.ok) {
            // 403 = token lacks "openid" scope OR was issued via client_credentials
            // 401 = token is expired or malformed
            return NextResponse.json(
                { error: "UserInfo request failed", details: data },
                { status: pingResponse.status }
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("[PingAuth] STEP 3 — UserInfo exception:", message);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
