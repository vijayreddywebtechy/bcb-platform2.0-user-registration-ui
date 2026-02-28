import { NextRequest, NextResponse } from "next/server";
import { API_CONFIG } from "@/config";

/**
 * GET /api/customers/[bpid]/accounts
 *
 * Proxy to fetch Customer Accounts List by BPID from Standard Bank Gateway.
 * Hides X-IBM-Client-Secret and x-client-certificate on the backend.
 */
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ bpid: string }> } // Note: params must be parsed as a promise in next 15 pages/route syntax
) {
    try {
        const { bpid } = await params;

        if (!bpid || typeof bpid !== "string" || bpid.trim() === "") {
            return NextResponse.json({ error: "Missing or invalid BPID" }, { status: 400 });
        }

        const accessToken = req.headers.get("Authorization")?.replace("Bearer ", "");
        if (!accessToken || accessToken.trim() === "") {
            return NextResponse.json({ error: "Missing Authorization header" }, { status: 401 });
        }

        const ibmClientId = process.env.NEXT_PUBLIC_IBM_CLIENT_ID;
        const ibmClientSecret = process.env.NEXT_PUBLIC_IBM_CLIENT_SECRET;
        const clientCertificate = process.env.NEXT_PUBLIC_CLIENT_CERTIFICATE;

        if (!ibmClientSecret || !clientCertificate) {
            console.error("[AccountList API] Missing secrets in backend environment variables (.env.local)");
            return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
        }

        const fapiInteractionId = crypto.randomUUID();
        const apiBaseUrl = API_CONFIG.baseApiGatewayUrl;
        const accountsUrl = `${apiBaseUrl}${API_CONFIG.endpoints.customerAccountsByBpid(bpid)}`;
        const cifCountry = process.env.CUSTOMER_CIF_COUNTRY ?? "ZA";

        console.log("═══════════════════════════════════════════════════");
        console.log("[AccountList API] GET Accounts by BPID");
        console.log("  URL              :", accountsUrl);
        console.log("  x-fapi-id        :", fapiInteractionId);
        console.log("═══════════════════════════════════════════════════");

        const response = await fetch(accountsUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Accept": "*/*",
                "Content-Type": "application/json",
                "x-fapi-interaction-id": fapiInteractionId,
                "cifCountry": cifCountry,
                "X-IBM-Client-Id": ibmClientId || "",
                "X-IBM-Client-Secret": ibmClientSecret,
                "x-client-certificate": clientCertificate,
            }
        });

        let data: unknown;
        const contentType = response.headers.get("content-type") ?? "";
        if (contentType.includes("application/json")) {
            data = await response.json();
        } else {
            const text = await response.text();
            data = { raw: text };
        }

        console.log("[AccountList API] Response:");
        console.log("  HTTP Status  :", response.status, response.statusText);
        console.log("═══════════════════════════════════════════════════");

        if (!response.ok) {
            return NextResponse.json(
                { error: "Account list request failed", details: data },
                { status: response.status }
            );
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("[AccountList API] Exception:", message);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
