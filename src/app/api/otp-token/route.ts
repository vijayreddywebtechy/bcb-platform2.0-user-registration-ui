import { NextResponse } from "next/server";
import { API_CONFIG } from "@/config";

/**
 * POST /api/otp-token
 *
 * Server-side proxy for the SysAuth Mobile OTP Token exchange.
 * Ensures that IBM Client ID and Secret are kept entirely on the server.
 */
export async function POST() {
    try {
        const url = `${API_CONFIG.baseApiGatewayUrl}${API_CONFIG.endpoints.sysauthToken}`;

        // Get server-only Client ID/Secret, fallback to NEXT_PUBLIC versions if needed.
        const clientId = process.env.IBM_CLIENT_ID ?? process.env.NEXT_PUBLIC_IBM_CLIENT_ID;
        const clientSecret = process.env.IBM_CLIENT_SECRET ?? process.env.NEXT_PUBLIC_IBM_CLIENT_SECRET;

        if (!clientId || !clientSecret) {
            console.error("[Mobile OTP] Missing IBM Client Credentials in environment config.");
            return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
        }

        // Generate dynamic interaction ID per request to trace
        const fapiInteractionId = crypto.randomUUID();

        // Prepare request body
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");
        // Required scopes as per the cURL reference
        params.append("scope", "prod write customer");

        console.log("═══════════════════════════════════════════════════");
        console.log("[Mobile OTP] Auth Token Exchange Request");
        console.log("  URL              :", url);
        console.log("  Grant Type       : client_credentials");
        console.log("  x-fapi-id        :", fapiInteractionId);
        console.log("═══════════════════════════════════════════════════");

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                "x-fapi-interaction-id": fapiInteractionId,
                "x-ibm-client-id": clientId,
                "x-ibm-client-secret": clientSecret,
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

        console.log("[Mobile OTP] Response:");
        console.log("  HTTP Status  :", response.status, response.statusText);
        console.log("═══════════════════════════════════════════════════");

        if (!response.ok) {
            return NextResponse.json({ error: "Failed to generate OTP token", details: data }, { status: response.status });
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("[Mobile OTP] Exception:", message);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
