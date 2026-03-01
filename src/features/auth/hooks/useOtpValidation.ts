import { useState } from "react";
import { STORAGE_KEYS } from "@/config";

const OTP_MESSAGES: Record<string, string> = {
    "0000": "Success",
    "2001": "Technical error. Please try again later",
    "1001": "Invalid OTP",
    "1021": "OTP regenerated after 3 invalid attempts",
    "1022": "OTP regenerated after 3 invalid attempts",
    "1023": "Your OTP has expired and a new one has been sent",
    "1025": "No OTP specified",
    "1026": "You have exceeded the number of attempts. Please contact your branch.",
    "1030": "System error",
};

export const getOtpMessage = (code: string | null) => {
    if (!code) return "An unexpected error occurred.";
    return OTP_MESSAGES[code] || `An unexpected error occurred. (Code: ${code})`;
};

export function useOtpValidation() {
    const [otpLoading, setOtpLoading] = useState<boolean>(false);
    const [otpError, setOtpError] = useState<string>("");

    const validateAndFetchAccounts = async (
        otpCell: string,
        otpCode: string,
        otpQname: string,
        onSuccess: () => void
    ) => {
        setOtpLoading(true);
        setOtpError("");
        try {
            const { validateOtp } = await import("@/features/auth/services/otp/unsecuredLendingOtpService");
            const mobileToken = sessionStorage.getItem("sysauth_mobile_otp_token");
            if (!mobileToken) {
                setOtpError("Session expired. Please start over.");
                setOtpLoading(false);
                return;
            }

            const validResponse = await validateOtp(otpCell, otpCode, otpQname, mobileToken);
            console.log("[OTP] Validate response:", validResponse);

            const code = validResponse?.extracted?.responseCode || null;

            if (code === "0000" || code === "1001") {
                console.log("[OTP] Validated OTP! Calling Customer Account List Service...");
                try {
                    const pingToken = sessionStorage.getItem(STORAGE_KEYS.PING_ACCESS_TOKEN);
                    const customerProfileStr = sessionStorage.getItem(STORAGE_KEYS.CUSTOMER_PROFILE);

                    if (!pingToken || !customerProfileStr) {
                        setOtpError("Authorization data missing. Please try signing in again.");
                        setOtpLoading(false);
                        return;
                    }

                    const customerProfile = JSON.parse(customerProfileStr);
                    const bpid = customerProfile?.customer?.partyId;

                    if (!bpid) {
                        setOtpError("Business Partner ID is missing. Cannot fetch account list.");
                        setOtpLoading(false);
                        return;
                    }

                    const { getCustomerAccountList } = await import("@/services/customers/customerAccountListService");
                    //const accountResponse = await getCustomerAccountList(bpid);
                    //TODO : Remove Hardcoded for testing
                    const bpid_test = "0533419624";
                    const accountResponse = await getCustomerAccountList(bpid_test);

                    if (accountResponse.success && accountResponse.data) {
                        console.log("[CustomerAccountList] successfully fetched accounts. Continuing to business profile selection...");
                        sessionStorage.setItem(STORAGE_KEYS.ACCOUNT_LIST, JSON.stringify(accountResponse.data));
                        onSuccess();
                    } else {
                        console.error("[CustomerAccountList] Error:", accountResponse.error);
                        setOtpError(accountResponse.error || "Account Retrieval Failed");
                    }
                } catch (accountErr) {
                    console.error("[CustomerAccountList] Exception:", accountErr);
                    setOtpError("Failed to retrieve customer accounts.");
                }
            } else {
                setOtpError(getOtpMessage(code));
                console.error("[OTP] Invalid validation response code:", code);
            }
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            console.error("[OTP] Validate failed:", msg);
            setOtpError("Error verifying OTP. Please try again.");
        } finally {
            setOtpLoading(false);
        }
    };

    const resendOtp = async (
        otpCell: string,
        onQnameUpdate: (qname: string) => void
    ) => {
        console.log("[OTP] Requesting new OTP...");
        setOtpLoading(true);
        setOtpError("");
        try {
            const { authenticateMobileOtp } = await import("@/features/auth/services/auth/mobileOtpService");
            const mobileOtpAuth = await authenticateMobileOtp();

            if (mobileOtpAuth?.access_token) {
                const { sendOtp } = await import("@/features/auth/services/otp/unsecuredLendingOtpService");
                const otpResponse = await sendOtp(otpCell, mobileOtpAuth.access_token);
                console.log("[MobileOTP] OTP dispatched successfully:", JSON.stringify(otpResponse, null, 2));

                const responseCode = otpResponse?.extracted?.responseCode;
                if (responseCode !== "0000" && responseCode) {
                    setOtpError(getOtpMessage(responseCode));
                    console.error("[OTP] Invalid generate response code on resend:", responseCode);
                } else {
                    onQnameUpdate(otpResponse?.extracted?.qname || "");
                }
            } else {
                setOtpError("Failed to obtain mobile token.");
            }
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err);
            console.error("[OTP] Resend failed:", msg);
            setOtpError("Error resending OTP. Please try again.");
        } finally {
            setOtpLoading(false);
        }
    };

    return {
        otpLoading,
        otpError,
        setOtpError,
        setOtpLoading,
        validateAndFetchAccounts,
        resendOtp
    };
}
