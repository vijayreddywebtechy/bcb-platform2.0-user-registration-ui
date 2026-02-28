import { NextRequest, NextResponse } from "next/server";
import { API_CONFIG } from "@/config";

/**
 * POST /api/verify-otp
 *
 * Server-side proxy for the Unsecured Lending OTP SOAP API (Validation).
 *
 * Expected JSON body:
 * {
 *   "mobile": {
 *     "code": "27",
 *     "number": "821234567"
 *   },
 *   "otpValue": "123456",
 *   "otpQName": "QUEUE"
 * }
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { mobile, otpValue, otpQName } = body;

        if (!mobile || !mobile.number || !otpValue || !otpQName) {
            return NextResponse.json({ error: "mobile.number, otpValue, and otpQName are required" }, { status: 400 });
        }

        const cellNo = mobile.number;
        const countryCode = mobile.code || "27";
        const otp = otpValue;
        const qname = otpQName;
        const functionId = "VAL";

        // Caller must supply the OAuth Bearer token via the Authorization header
        const authHeader = req.headers.get("Authorization");
        const accessToken = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;
        if (!accessToken || accessToken.trim() === "") {
            return NextResponse.json(
                { error: "Missing Authorization header" },
                { status: 401 }
            );
        }

        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || API_CONFIG.baseApiGatewayUrl;
        const otpUrl = `${apiBaseUrl}${API_CONFIG.endpoints.unsecuredLendingOtp}`;

        const clientCertificate =
            process.env.UNSECURED_LENDING_CERTIFICATE ??
            process.env.NEXT_PUBLIC_CLIENT_CERTIFICATE ??
            "";

        const fapiInteractionId = crypto.randomUUID();

        // ── Construct SOAP XML Payload ──────────────────────────────────────
        const xmlPayload = `\
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ver="http://www.VERSIONR.VBOTPBRI.Request.com">
    <soapenv:Header/>
    <soapenv:Body>
        <ver:VERSIONROperation>
            <ver:vers_v_version_data>
                <ver:vers_v_trancode>VBOB</ver:vers_v_trancode>
                <ver:vers_v_version>5</ver:vers_v_version>
                <ver:vers_v_token> </ver:vers_v_token>
                <ver:vers_v_cardno>0</ver:vers_v_cardno>
                <ver:vers_v_channel_id>MAPP</ver:vers_v_channel_id>
                <ver:vers_v_user_id>0026</ver:vers_v_user_id>
                <ver:vers_v_user_ibt>4586</ver:vers_v_user_ibt>
                <ver:vers_v_response_code>0000</ver:vers_v_response_code>
                <ver:vers_v_digital_uid> </ver:vers_v_digital_uid>
            </ver:vers_v_version_data>
            <ver:otp_data>
                <ver:otp_function_id>${functionId}</ver:otp_function_id>
                <ver:otp_otp>${otp}</ver:otp_otp>
                <ver:otp_delivery_type>S</ver:otp_delivery_type>
                <ver:otp_country_code>${countryCode}</ver:otp_country_code>
                <ver:otp_cell_no>${cellNo}</ver:otp_cell_no>
                <ver:otp_email_address></ver:otp_email_address>
                <ver:otp_qname>${qname}</ver:otp_qname>
                <ver:otp_msg_type>SIGNCD</ver:otp_msg_type>
                <ver:otp_msg_content>Business Account</ver:otp_msg_content>
            </ver:otp_data>
        </ver:VERSIONROperation>
    </soapenv:Body>
</soapenv:Envelope>`;

        // ── Log request ───────────────────────────────────────────────────────
        console.log("═══════════════════════════════════════════════════");
        console.log(`[OTP API] POST Validate OTP`);
        console.log("  URL              :", otpUrl);
        console.log("  x-fapi-id        :", fapiInteractionId);
        console.log("  Cell             :", cellNo);
        console.log(`  Token            : ${accessToken ? "PRESENT (" + accessToken.substring(0, 15) + "...)" : "MISSING"}`);
        console.log("═══════════════════════════════════════════════════");

        const apiResponse = await fetch(otpUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken.trim()}`,
                "Accept": "text/xml",
                "Content-Type": "text/xml",
                "x-fapi-interaction-id": fapiInteractionId,
                "Cookie": "sap-usercontext=sap-client=700",
                "x-client-certificate": clientCertificate || "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",
            },
            body: xmlPayload
        });

        const textResponse = await apiResponse.text();

        // Very basic XML response extraction for convenience, while also returning raw payload
        const responseCodeMatch = textResponse.match(/<[^:]*:?vers_v_response_code[^>]*>(.*?)<\/[^:]*:?vers_v_response_code>/);
        const responseCode = responseCodeMatch ? responseCodeMatch[1] : null;

        const qnameMatch = textResponse.match(/<[^:]*:?otp_qname[^>]*>(.*?)<\/[^:]*:?otp_qname>/);
        const extractedQname = qnameMatch ? qnameMatch[1].trim() : null;

        const data = {
            raw: textResponse,
            extracted: {
                responseCode,
                qname: extractedQname,
            }
        };

        console.log("[OTP API] Response:");
        console.log("  HTTP Status  :", apiResponse.status, apiResponse.statusText);
        console.log("  Parsed Code  :", responseCode);
        console.log("  Parsed QName :", extractedQname);
        console.log("═══════════════════════════════════════════════════");

        if (!apiResponse.ok) {
            return NextResponse.json(
                { error: "OTP API request failed", details: data },
                { status: apiResponse.status }
            );
        }

        return NextResponse.json(data, { status: 200 });

    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("[OTP API] Exception:", message);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
