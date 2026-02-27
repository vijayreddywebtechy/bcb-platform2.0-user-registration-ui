/**
 * Unsecured Lending OTP Service
 * Handles requesting and validating XML based OTPs through our Next.js API proxy to
 * encapsulate SOAP logic and secure client certificate injections.
 */

export interface UnsecuredLendingOtpRequest {
    cellNo: string;
    otp?: string;
    countryCode?: string;
    msgType?: string;
    msgContent?: string;
    userId?: string;
    userIbt?: string;
}

export interface UnsecuredLendingOtpResponse {
    raw: string; // The raw XML response
    extracted: {
        responseCode: string | null;
    }
}

/**
 * Common abstraction to request the unsecured-lending endpoint.
 */
async function callUnsecuredLendingApi(
    functionId: "GEN" | "VAL",
    payload: UnsecuredLendingOtpRequest,
    accessToken: string
): Promise<UnsecuredLendingOtpResponse> {
    const response = await fetch("/api/otp/unsecured-lending", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": accessToken,
        },
        body: JSON.stringify({
            ...payload,
            functionId
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || `Failed to ${functionId === "GEN" ? "Generate" : "Validate"} OTP`);
    }

    return data as UnsecuredLendingOtpResponse;
}

/**
 * Use to generate and send an OTP to a cellphone number.
 * 
 * @param cellNo The target cell number
 * @param accessToken The access token obtained from mobile auth oauth2 endpoint
 * @param overrides Any additional override parameters (e.g., cellNo, countryCode)
 */
export async function sendOtp(
    cellNo: string,
    accessToken: string,
    overrides?: Partial<UnsecuredLendingOtpRequest>
): Promise<UnsecuredLendingOtpResponse> {
    return await callUnsecuredLendingApi("GEN", { cellNo, ...overrides }, accessToken);
}

/**
 * Use to validate an OTP code input by a user.
 * 
 * @param cellNo The target cell number the code was originally sent to
 * @param otp The input code provided by the user
 * @param accessToken The access token obtained from mobile auth oauth2 endpoint
 * @param overrides Any additional override parameters (e.g., countryCode, msgContent)
 */
export async function validateOtp(
    cellNo: string,
    otp: string,
    accessToken: string,
    overrides?: Partial<UnsecuredLendingOtpRequest>
): Promise<UnsecuredLendingOtpResponse> {
    return await callUnsecuredLendingApi("VAL", { cellNo, otp, ...overrides }, accessToken);
}
