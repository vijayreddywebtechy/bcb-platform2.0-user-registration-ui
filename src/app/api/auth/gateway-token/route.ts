import { NextResponse } from "next/server";
import { API_CONFIG } from "@/config";

/**
 * POST /api/auth/gateway-token
 *
 * Proxy for generating API Gateway OAuth Access Token using client_credentials grant.
 */
export async function POST() {
    try {
        const url = `${API_CONFIG.baseApiGatewayUrl}/sysauth/oauth2/token`;

        //const clientId = process.env.NEXT_PUBLIC_IBM_CLIENT_ID;
        //const clientSecret = process.env.NEXT_PUBLIC_IBM_CLIENT_SECRET;
        //const clientCertificate = process.env.NEXT_PUBLIC_CLIENT_CERTIFICATE;

        const clientId = process.env.GATEWAY_NEXT_PUBLIC_IBM_CLIENT_ID;
        const clientSecret = process.env.GATEWAY_NEXT_PUBLIC_IBM_CLIENT_SECRET;
        //const gatewayClientCertificate = process.env.GATEWAY_NEXT_PUBLIC_CLIENT_CERTIFICATE;



        if (!clientId || !clientSecret) {
            console.error("[Gateway Token API] Missing IBM credentials in local server config");
            return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
        }

        const fapiInteractionId = crypto.randomUUID();

        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");
        params.append("scope", "customer accounts prod retail write");

        console.log("═══════════════════════════════════════════════════");
        console.log("[Gateway Token API] Auth Request via Proxy");
        console.log("  URL              :", url);
        console.log("  x-fapi-id        :", fapiInteractionId);
        console.log("═══════════════════════════════════════════════════");

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/x-www-form-urlencoded",
                "x-fapi-interaction-id": fapiInteractionId,
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

        console.log("[Gateway Token API] Response:");
        console.log("  HTTP Status  :", response.status, response.statusText);
        console.log("═══════════════════════════════════════════════════");

        if (!response.ok) {
            return NextResponse.json(
                { error: "Failed to generate gateway token", details: data },
                { status: response.status }
            );
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("[Gateway Token API] Exception:", message);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
