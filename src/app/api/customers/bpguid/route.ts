import { NextRequest, NextResponse } from "next/server";
import { API_CONFIG } from "@/config";

/**
 * POST /api/customers/bpguid
 *
 * Proxy for GetBPGUID service.
 * Accepts an array of identifiers (or single identifier like BPID)
 * Returns the BP GUIDs.
 */

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { bpId } = body;

        if (!bpId) {
            return NextResponse.json({ error: "Missing bpId" }, { status: 400 });
        }

        const accessToken = req.headers.get("x-access-token");
        if (!accessToken) {
            return NextResponse.json(
                { error: "Missing x-access-token header" },
                { status: 401 }
            );
        }

        const ibmClientId = process.env.BPGUID_IBM_CLIENT_ID || "";
        const ibmClientSecret = process.env.BPGUID_IBM_CLIENT_SECRET || "";
        const apiBaseUrl = API_CONFIG.baseApiGatewayUrl;

        // Use the proper Gateway endpoint for BPGUID mapping
        const bpguidUrl = `https://sit-gateway.apinp.standardbank.co.za/sit/sit/customer-bpid-bpguid/bpid/bpguids/${bpId}`;

        const requestHeaders: Record<string, string> = {
            Authorization: `Bearer ${accessToken.trim()}`,
            Accept: "application/json",
            "x-fapi-interaction-id": crypto.randomUUID(),
            "X-IBM-Client-Id": ibmClientId,
            "X-IBM-Client-Secret": ibmClientSecret,
        };

        const apiResponse = await fetch(bpguidUrl, {
            method: "GET",
            headers: requestHeaders,
        });

        const data = await apiResponse.json();

        if (!apiResponse.ok) {
            return NextResponse.json(
                { error: "GetBPGUID API request failed", details: data },
                { status: apiResponse.status }
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("[GetBPGUIDRoute] Exception:", message);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
