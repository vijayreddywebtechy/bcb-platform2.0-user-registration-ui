import { NextResponse } from "next/server";
import { API_CONFIG } from "@/config";

/**
 * POST /api/auth/mobile-accounts-token
 *
 * Proxy for exchanging a mobile API token required for the `accounts prod retail write` scope.
 * It's structured using client_credentials using standard OAuth2, similar to Mobile OTP
 * but isolated for separation of concerns and scope safety.
 */
export async function POST() {
    try {
        const url = `${API_CONFIG.baseApiGatewayUrl}${API_CONFIG.endpoints.accountsMobileToken}`;

        // Get standard Nextjs public client ID or fallback to server explicitly bounded one
        const clientId = process.env.NEXT_PUBLIC_IBM_CLIENT_ID;
        const clientSecret = process.env.MOBILE_AUTH_IBM_CLIENT_SECRET;
        const clientCertificate = process.env.MOBILE_AUTH_CLIENT_CERTIFICATE;

        if (!clientId || !clientSecret || !clientCertificate) {
            console.error("[Virtual Accounts Token] Missing IBM credentials in local server config");
            return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
        }

        const fapiInteractionId = crypto.randomUUID();

        // Standard url-form-encoded scope requested by curl payload.
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");
        params.append("scope", "accounts prod retail write");

        console.log("═══════════════════════════════════════════════════");
        console.log("[Mobile Accounts Token] Auth Request via Proxy");
        console.log("  URL              :", url);
        console.log("  x-fapi-id        :", fapiInteractionId);
        console.log("═══════════════════════════════════════════════════");

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/x-www-form-urlencoded",
                "x-fapi-interaction-id": fapiInteractionId,
                "x-client-certificate": clientCertificate,
                // The cURL sent basic Auth (Base64 of id:secret), standard for OAuth2 requests.
                "Authorization": `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
            },
            body: params.toString()
        });

        let data: unknown;
        const contentType = response.headers.get("content-type") ?? "";
        if (contentType.includes("application/json")) {
            data = await response.json();
        } else {
            const text = await response.text();
            data = { raw: text };
        }

        console.log("[Mobile Accounts Token] Response:");
        console.log("  HTTP Status  :", response.status, response.statusText);
        console.log("═══════════════════════════════════════════════════");

        if (!response.ok) {
            return NextResponse.json({ error: "Failed to allocate standard machine token for Virtual scope", details: data }, { status: response.status });
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("[Mobile Accounts Token] Exception:", message);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
