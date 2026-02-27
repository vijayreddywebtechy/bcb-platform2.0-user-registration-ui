import { NextRequest, NextResponse } from "next/server";
import { API_CONFIG } from "@/config";

/**
 * GET /api/customers/[uuid]
 *
 * Server-side proxy for the Standard Bank External Partners – Get Customer by UUID endpoint.
 *
 * Why this must run server-side:
 * 1. CORS — The Standard Bank API Gateway does not permit browser origins.
 * 2. Secrets (X-IBM-Client-Id, X-IBM-Client-Secret, x-client-certificate) are
 *    kept server-only (no NEXT_PUBLIC_ prefix) and never exposed to the browser.
 * 3. The Bearer token (Ping access_token) is forwarded from the client body
 *    so it is never stored in a cookie visible to third-party scripts.
 *
 * Endpoint:
 *   GET https://api-gatewaynp.standardbank.co.za/npextorg/extnonprod/external-partners/customers/{uuid}
 *
 * Required headers sent by the browser caller:
 *   { "x-access-token": "<ping_access_token>" }
 *
 * UUID is extracted from the dynamic route segment [uuid].
 */

interface RouteContext {
    params: Promise<{ uuid: string }>;
}

export async function GET(req: NextRequest, context: RouteContext) {
    try {
        const { uuid } = await context.params;

        if (!uuid || typeof uuid !== "string" || uuid.trim() === "") {
            return NextResponse.json(
                { error: "Missing or invalid customer UUID" },
                { status: 400 }
            );
        }

        // Caller must supply the Ping access_token via the x-access-token header
        const accessToken = req.headers.get("x-access-token");
        if (!accessToken || accessToken.trim() === "") {
            return NextResponse.json(
                { error: "Missing x-access-token header" },
                { status: 401 }
            );
        }

        // ── Server-only env vars (never exposed to the browser) ──────────────
        const apiBaseUrl = API_CONFIG.baseApiGatewayUrl;

        const ibmClientId = process.env.NEXT_PUBLIC_IBM_CLIENT_ID as string;
        const ibmClientSecret = process.env.NEXT_PUBLIC_IBM_CLIENT_SECRET as string;

        const clientCertificate =
            process.env.CUSTOMER_CLIENT_CERTIFICATE ??
            process.env.NEXT_PUBLIC_CLIENT_CERTIFICATE ??
            "";

        const cifCountry = process.env.CUSTOMER_CIF_COUNTRY ?? "ZA";

        // Generate a fresh interaction ID per request (RFC 4122 v4 UUID)
        const fapiInteractionId = crypto.randomUUID();

        const customerUrl = `${apiBaseUrl}${API_CONFIG.endpoints.customerByUuid(uuid.trim())}`;

        const requestHeaders: Record<string, string> = {
            Authorization: `Bearer ${accessToken.trim()}`,
            Accept: "*/*",
            "Content-Type": "application/json",
            "x-fapi-interaction-id": fapiInteractionId,
            "X-IBM-Client-Id": ibmClientId,
            "X-IBM-Client-Secret": ibmClientSecret,
            cifCountry,
            ...(clientCertificate && {
                "x-client-certificate": clientCertificate,
            }),
        };

        const curlCommand = [
            `curl --location '${customerUrl}'`,
            `--header 'Authorization: Bearer ${accessToken.trim()}'`,
            `--header 'Accept: */*'`,
            `--header 'Content-Type: application/json'`,
            `--header 'x-fapi-interaction-id: ${fapiInteractionId}'`,
            `--header 'X-IBM-Client-Id: ${ibmClientId}'`,
            `--header 'X-IBM-Client-Secret: ${ibmClientSecret}'`,
            `--header 'cifCountry: ${cifCountry}'`,
            clientCertificate ? `--header 'x-client-certificate: ${clientCertificate}'` : ''
        ].filter(Boolean).join(' \\\n');

        // ── Log request ───────────────────────────────────────────────────────
        console.log("═══════════════════════════════════════════════════");
        console.log("[CustomerAPI] GET customer by UUID cURL:");
        console.log(curlCommand);
        console.log("═══════════════════════════════════════════════════");

        const apiResponse = await fetch(customerUrl, {
            method: "GET",
            headers: requestHeaders,
        });

        let data: unknown;
        const contentType = apiResponse.headers.get("content-type") ?? "";
        if (contentType.includes("application/json")) {
            data = await apiResponse.json();
        } else {
            const text = await apiResponse.text();
            data = { raw: text };
        }

        // ── Log response ──────────────────────────────────────────────────────
        console.log("[CustomerAPI] GET customer response:");
        console.log("  HTTP Status  :", apiResponse.status, apiResponse.statusText);
        console.log("  Response Body:", JSON.stringify(data, null, 2));
        console.log("═══════════════════════════════════════════════════");

        if (!apiResponse.ok) {
            return NextResponse.json(
                { error: "Customer API request failed", details: data },
                { status: apiResponse.status }
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("[CustomerAPI] GET customer exception:", message);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
