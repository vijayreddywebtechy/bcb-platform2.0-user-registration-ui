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
    qname?: string;
}

export interface UnsecuredLendingOtpResponse {
    raw: string; // The raw XML response
    extracted: {
        responseCode: string | null;
        qname: string | null;
    }
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
    const payload = {
        mobile: {
            code: overrides?.countryCode || "27",
            number: cellNo
        }
    };

    const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to Generate OTP");
    }

    return data as UnsecuredLendingOtpResponse;
}

/**
 * Use to validate an OTP code input by a user.
 * 
 * @param cellNo The target cell number the code was originally sent to
 * @param otp The input code provided by the user
 * @param qname The qname received during the OTP generation phase
 * @param accessToken The access token obtained from mobile auth oauth2 endpoint
 * @param overrides Any additional override parameters (e.g., countryCode, msgContent)
 */
export async function validateOtp(
    cellNo: string,
    otp: string,
    qname: string,
    accessToken: string,
    overrides?: Partial<UnsecuredLendingOtpRequest>
): Promise<UnsecuredLendingOtpResponse> {
    const payload = {
        mobile: {
            code: overrides?.countryCode || "27",
            number: cellNo
        },
        otpValue: otp,
        otpQName: qname
    };

    const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to Validate OTP");
    }

    return data as UnsecuredLendingOtpResponse;
}
