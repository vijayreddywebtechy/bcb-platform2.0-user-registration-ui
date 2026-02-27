import { NextRequest, NextResponse } from "next/server";
import { API_CONFIG } from "@/config";

/**
 * POST /api/otp/unsecured-lending
 *
 * Server-side proxy for the Unsecured Lending OTP SOAP API.
 * This hides the client certificate and safely constructs the XML payload
 * requested by the API using JSON provided by our frontend.
 *
 * Expected JSON body:
 * {
 *   "functionId": "GEN" | "VAL",
 *   "cellNo": "812893439",
 *   "otp": "", // Required for VAL
 *   "countryCode": "27",
 *   "msgType": "SIGNCD",
 *   "msgContent": "Business Account",
 *   "userId": "0026",
 *   "userIbt": "4586"
 * }
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            functionId = "GEN",
            cellNo,
            otp = "",
            countryCode = "27",
            msgType = "SIGNCD",
            msgContent = "Business Account",
            userId = "0026",
            userIbt = "4586"
        } = body;

        if (!cellNo) {
            return NextResponse.json({ error: "cellNo is required" }, { status: 400 });
        }

        // Caller must supply the OAuth Bearer token via the x-access-token header
        const accessToken = req.headers.get("x-access-token") || req.headers.get("Authorization")?.replace("Bearer ", "");
        if (!accessToken || accessToken.trim() === "") {
            return NextResponse.json(
                { error: "Missing x-access-token or Authorization header" },
                { status: 401 }
            );
        }

        const apiBaseUrl = API_CONFIG.baseApiGatewayUrl;
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
                <ver:vers_v_user_id>${userId}</ver:vers_v_user_id>
                <ver:vers_v_user_ibt>${userIbt}</ver:vers_v_user_ibt>
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
                <ver:otp_qname></ver:otp_qname>
                <ver:otp_msg_type>${msgType}</ver:otp_msg_type>
                <ver:otp_msg_content>${msgContent}</ver:otp_msg_content>
            </ver:otp_data>
        </ver:VERSIONROperation>
    </soapenv:Body>
</soapenv:Envelope>`;

        // ── Log request ───────────────────────────────────────────────────────
        console.log("═══════════════════════════════════════════════════");
        console.log(`[OTP API] POST ${functionId === "GEN" ? "Generate" : "Validate"} OTP`);
        console.log("  URL              :", otpUrl);
        console.log("  x-fapi-id        :", fapiInteractionId);
        console.log("  Cell             :", cellNo);
        console.log("═══════════════════════════════════════════════════");

        const apiResponse = await fetch(otpUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken.trim()}`,
                "Accept": "text/xml",
                "Content-Type": "text/xml",
                "x-fapi-interaction-id": fapiInteractionId,
                ...(clientCertificate && {
                    "x-client-certificate": clientCertificate,
                }),
            },
            body: xmlPayload
        });

        const textResponse = await apiResponse.text();

        // Very basic XML response extraction for convenience, while also returning raw payload
        const responseCodeMatch = textResponse.match(/<[^:]*:?vers_v_response_code[^>]*>(.*?)<\/[^:]*:?vers_v_response_code>/);
        const responseCode = responseCodeMatch ? responseCodeMatch[1] : null;

        const data = {
            raw: textResponse,
            extracted: {
                responseCode
            }
        };

        console.log("[OTP API] Response:");
        console.log("  HTTP Status  :", apiResponse.status, apiResponse.statusText);
        console.log("  Parsed Code  :", responseCode);
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
